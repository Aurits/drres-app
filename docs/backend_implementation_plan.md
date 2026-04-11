# DrRES Backend — Implementation Plan

> **How to use this document**
> Work top-to-bottom within each phase. Mark a task `[x]` only when it is running and tested end-to-end.
> Never skip a dependency — items that show `← requires` must be green before you proceed.
> Phases build additively; completed phases remain untouched when new phases are added.

---

## Legend
```
[x]  Complete & operational
[-]  In progress
[ ]  Not started
🔒  Locked — dependency incomplete
⚡  Operational checkpoint — endpoint/feature is testable end-to-end
```

---

## Foundation (Cross-Phase Infrastructure)

These are global — built once, used by every phase.

- [x] `requirements.txt` — all dependencies declared with pinned minimums
- [x] `db/base.py` — `DeclarativeBase` with global audit fields (`created_at`, `updated_at`, `deleted_at`, `created_by`, `updated_by`, `deleted_by`)
- [x] `db/database.py` — async SQLAlchemy engine, connection pool (`pool_size=10`, `max_overflow=20`, `pool_pre_ping`), `get_db` dependency
- [x] `alembic/` — initialized, `env.py` wired to `Base.metadata` and `DATABASE_URL` env var
- [ ] `.env` — local environment file (`DATABASE_URL` pointing to external DB, `AWS_*` etc.) — **never committed**
- [x] `docker-compose.yml` — postgres removed; backend reads `DATABASE_URL` from host environment / secret

> ⚡ **Foundation operational when:** `docker compose up postgres` starts clean and `alembic upgrade head` applies without errors.

---

## Phase 2 — Document Retrieval (Apr 13–19)

**Goal:** Public read-only search and listing of the evidence repository.

### 2A — Data Layer
```
evidence  ──< evidence_chunks
```

- [x] `models/evidence.py`
  - Fields: id, title, type, sdg, abstract, authors, year, country, priority_area, sub_area, doi, citation, s3_key
  - Persisted `tsvector` on title + abstract + authors with GIN index
  - Relationship → `EvidenceChunk` (chunks populated in Phase 3)
- [x] `models/evidence_chunk.py`
  - Fields: id, evidence_id (FK CASCADE), chunk_index, text
  - Persisted `tsvector` on text with GIN index
  - `embedding vector(1536)` column — **added via Alembic migration in Phase 4**, NULL until then
- [ ] Alembic migration `001_initial_evidence_tables`
  - `alembic revision --autogenerate -m "initial evidence tables"`
  - `alembic upgrade head`
- [ ] `db/seed.py` — bulk insert fixture data from JSON; run once on first deploy

> ⚡ **2A operational when:** `alembic upgrade head` creates `evidence` and `evidence_chunks` tables. `python db/seed.py` populates rows. `SELECT count(*) FROM evidence;` returns seeded count.

---

### 2B — Schema Layer
- [x] `schemas/evidence.py`
  - `EvidenceRead` — response model (from_attributes)
  - `EvidenceListResponse` — paginated wrapper (`items`, `total`, `page`, `per_page`)
  - `FacetsResponse` — distinct values per filterable field
  - `SearchParams` — query params (`q`, `sdg[]`, `type[]`, `country[]`, `sub_area[]`, `year[]`, `sort`, `page`, `per_page`)

---

### 2C — Service Layer ← requires 2A
- [x] `services/evidence_service.py`
  - `search_evidence(db, params)` — `websearch_to_tsquery` on `evidence.search_vector`, faceted `WHERE` clauses, `ts_rank` scoring, pagination
  - `get_evidence_by_id(db, id)` — single record fetch, `404` if missing
  - `get_facets(db)` — `SELECT DISTINCT` per filterable column

---

### 2C — API Layer ← requires 2B + 2C
- [x] `api/evidence.py` — `APIRouter(prefix="/evidence")`
  - `GET /api/v1/evidence` — search + filter + paginate
  - `GET /api/v1/evidence/facets` — filter dropdown values
  - `GET /api/v1/evidence/{id}` — single record
- [x] `main.py` — router registered, CORS configured

> ⚡ **Phase 2 operational when:**
> - `GET /api/v1/evidence?q=tuberculosis` returns ranked results
> - `GET /api/v1/evidence?sdg=SDG+3&type=Systematic+Review` filters correctly
> - `GET /api/v1/evidence?q=HIV+NOT+tuberculosis` handles boolean exclusion
> - `GET /api/v1/evidence/facets` returns all filter categories
> - `GET /api/v1/evidence/1` returns a single record

---

## Phase 3 — Document Registration (Apr 20–26)

**Goal:** Researchers submit evidence; admins approve/reject; submissions tracked in dashboard.
*← Requires Phase 2 fully operational*

### 3A — Storage
- [ ] `utils/s3.py` — S3 client wrapper (`boto3`/`aioboto3`)
  - `generate_upload_url(s3_key)` — presigned PUT URL (frontend uploads directly to S3)
  - `generate_download_url(s3_key)` — presigned GET URL for reading
  - `delete_object(s3_key)`
- [ ] Add `AWS_BUCKET`, `AWS_REGION`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY` to `Settings`
- [ ] Add `boto3`/`aioboto3` to `requirements.txt`

### 3B — Ingestion Worker ← requires 3A
- [ ] `workers/ingest.py` — background task triggered after submission approval
  - Download PDF from S3 via `s3_key`
  - Extract text (`pdfplumber` or `PyMuPDF`)
  - Chunk into ~500-token segments
  - Bulk insert → `evidence_chunks` table
  - Update `evidence.updated_at`
- [ ] Add `pdfplumber` (or `pymupdf`) to `requirements.txt`

### 3C — Submission Data Layer
- [ ] `models/submission.py`
  - Fields: id, evidence_id (FK nullable — set on approval), submitter_id (Phase 6), title, type, sdg, abstract, authors, year, country, priority_area, sub_area, doi, citation, s3_key, status (`pending`/`approved`/`rejected`/`revisions_requested`), reviewer_notes
  - Status transitions: `pending → approved | rejected | revisions_requested`
- [ ] Alembic migration `002_submission_table`

### 3D — Schema + Service + API ← requires 3C
- [ ] `schemas/submission.py` — `SubmissionCreate`, `SubmissionRead`, `SubmissionStatusUpdate`
- [ ] `services/submission_service.py`
  - `create_submission(db, data, s3_key)` — saves draft
  - `get_submission(db, id)`
  - `list_submissions(db, status, submitter_id)` — filtered list
  - `update_status(db, id, status, notes)` — admin moderation action; triggers `ingest.py` on approval
- [ ] `api/submissions.py` — `APIRouter(prefix="/submissions")`
  - `POST /api/v1/submissions` — create submission + return presigned S3 upload URL
  - `GET /api/v1/submissions/{id}` — submission detail
  - `GET /api/v1/submissions` — list (admin: all, user: own)
  - `PATCH /api/v1/submissions/{id}/status` — admin approve/reject/request revisions

> ⚡ **Phase 3 operational when:**
> - `POST /api/v1/submissions` returns a presigned S3 upload URL
> - Uploading a PDF to S3 then approving the submission triggers chunking
> - `SELECT count(*) FROM evidence_chunks WHERE evidence_id = X;` shows chunks created
> - `GET /api/v1/evidence?q=term-only-in-pdf` returns the approved evidence record

---

## Phase 4 — Semantic Search & Summaries (Apr 27–May 3)

**Goal:** AI-powered vector search over document chunks + on-demand summarisation.
*← Requires Phase 3 fully operational (chunks must exist)*

### 4A — pgvector
- [ ] Enable `pgvector` extension in PostgreSQL (`CREATE EXTENSION IF NOT EXISTS vector;`)
- [ ] Alembic migration `003_add_embedding_column`
  - `ALTER TABLE evidence_chunks ADD COLUMN embedding vector(1536);`
  - `CREATE INDEX ON evidence_chunks USING ivfflat (embedding vector_cosine_ops);`

### 4B — Embedding Pipeline ← requires 4A
- [ ] `workers/embed.py` — background task
  - Reads un-embedded chunks (`WHERE embedding IS NULL`)
  - Calls OpenAI `text-embedding-3-small` (or `text-embedding-ada-002`)
  - Bulk updates `embedding` column in batches
- [ ] Add `openai` to `requirements.txt`
- [ ] Add `OPENAI_API_KEY` to `Settings`

### 4C — Semantic Search Service ← requires 4B
- [ ] `services/search_service.py`
  - `semantic_search(db, query, top_k, filters)` — embed query → `ORDER BY embedding <=> query_embedding LIMIT k` → group by `evidence_id`
  - `hybrid_search(db, params)` — merge FTS + semantic scores (RRF or weighted sum)

### 4D — Summarisation ← requires 4B
- [ ] `services/ai_service.py`
  - `summarise_evidence(evidence_id)` — fetch top chunks → prompt LLM → return structured summary
  - Add `ANTHROPIC_API_KEY` to `Settings`, `anthropic` to `requirements.txt`
- [ ] `GET /api/v1/evidence/{id}/summary` — on-demand summary endpoint

> ⚡ **Phase 4 operational when:**
> - `GET /api/v1/evidence?q=food+security&mode=semantic` returns results ranked by embedding similarity
> - `GET /api/v1/evidence/1/summary` returns an AI-generated summary with source chunks cited

---

## Phase 5 — Conversational RAG (May 4–10)

**Goal:** Chat assistant answers policy questions using the evidence repository with citations.
*← Requires Phase 4 fully operational (embeddings must be populated)*

- [ ] `models/conversation.py` — `Conversation` (id, user_id, title) + `ConversationMessage` (id, conversation_id, role, content, sources JSON)
- [ ] Alembic migration `004_conversations`
- [ ] `services/rag_service.py`
  - `rag_query(db, conversation_id, user_message)` — retrieve top-K chunks by cosine similarity → build context → call LLM → stream response → persist message + sources
  - Sliding context window — last N messages included for continuity
- [ ] `api/conversations.py`
  - `POST /api/v1/conversations` — create conversation
  - `POST /api/v1/conversations/{id}/messages` — send message, receive streamed response
  - `GET /api/v1/conversations/{id}/messages` — message history
- [ ] `POST /api/v1/feedback` — thumbs up/down on a message (stored for RLHF/eval)

> ⚡ **Phase 5 operational when:**
> - Sending "What interventions reduced TB in Uganda?" returns a cited answer drawing from indexed chunks
> - Follow-up messages maintain context from the prior turn
> - Source chunks are returned alongside the response

---

## Phase 6 — Auth & User Management (May 11–17)

**Goal:** Secure the platform; implement roles (Public, Researcher, Admin).

- [ ] `models/user.py` — `User` (id, email, password_hash, role, is_active, email_verified_at)
- [ ] Alembic migration `005_users`
- [ ] Add `passlib[bcrypt]`, `python-jose[cryptography]` to `requirements.txt`
- [ ] `services/auth_service.py`
  - `register(db, email, password)` — hash password, send verification email
  - `login(db, email, password)` → JWT access + refresh tokens
  - `refresh_token(token)`
  - `reset_password_request(email)` / `reset_password(token, new_password)`
- [ ] `api/auth.py` — `POST /api/v1/auth/register`, `/login`, `/refresh`, `/reset-password`
- [ ] `utils/auth.py` — `get_current_user` dependency, role guards (`require_role`)
- [ ] Backfill `created_by` / `updated_by` audit fields across all services with `current_user.id`
- [ ] Add `WHERE deleted_at IS NULL` soft-delete filter to all evidence/submission queries

> ⚡ **Phase 6 operational when:**
> - `POST /auth/register` + `POST /auth/login` returns JWT
> - Unauthenticated `POST /submissions` returns `401`
> - Admin JWT can access `PATCH /submissions/{id}/status`; Researcher JWT cannot

---

## Phase 7 — Admin Dashboard & Analytics (May 18–24)

**Goal:** Admin tooling, taxonomy management, usage analytics, performance validation.

- [ ] `models/audit_log.py` — append-only log of admin actions
- [ ] `api/admin.py`
  - `GET /api/v1/admin/stats` — submission counts, search volumes, active users
  - `GET /api/v1/admin/audit-log` — admin action history
  - `PATCH /api/v1/admin/taxonomy` — update SDG / priority area / sub-area taxonomy
- [ ] `services/analytics_service.py` — aggregate query stats, user activity
- [ ] Search latency validation — `GET /evidence?q=...` must respond ≤ 5s under load (per workplan)
- [ ] End-to-end tests for all critical paths
- [ ] Final deployment hardening
  - CORS `allow_origins` locked to production domain
  - Rate limiting (`slowapi`)
  - Security headers middleware

> ⚡ **Phase 7 operational when:**
> - Admin dashboard returns live stats
> - Search latency benchmark passes (≤5s @ p95)
> - All E2E tests green

---

## Module Dependency Map

```
Foundation
  └── Phase 2: Evidence Retrieval          ← evidence + evidence_chunks tables, FTS
        └── Phase 3: Submission & Ingestion ← submission table, S3, chunk worker
              └── Phase 4: Semantic Search  ← pgvector, embeddings, summaries
                    └── Phase 5: RAG Chat   ← conversation table, RAG pipeline
Phase 6: Auth (parallel track — gates write endpoints across all phases)
Phase 7: Admin + Analytics (parallel — depends on Phase 6)
```

---

## Environment Variables Checklist

| Variable | Required from | Used by |
|---|---|---|
| `DATABASE_URL` | Foundation | All phases — **external DB, set as server env var / GitHub secret** |
| `DB_POOL_SIZE` | Foundation | `db/database.py` |
| `DB_MAX_OVERFLOW` | Foundation | `db/database.py` |
| `AWS_BUCKET` | Phase 3 | `utils/s3.py` |
| `AWS_REGION` | Phase 3 | `utils/s3.py` |
| `AWS_ACCESS_KEY_ID` | Phase 3 | `utils/s3.py` |
| `AWS_SECRET_ACCESS_KEY` | Phase 3 | `utils/s3.py` |
| `OPENAI_API_KEY` | Phase 4 | `workers/embed.py` |
| `ANTHROPIC_API_KEY` | Phase 4 | `services/ai_service.py` |
| `JWT_SECRET_KEY` | Phase 6 | `utils/auth.py` |
| `JWT_ALGORITHM` | Phase 6 | `utils/auth.py` |
| `SMTP_HOST` / `SMTP_PORT` | Phase 6 | Email verification / password reset |

---

*Last updated: April 11, 2026 — Phase 2 in progress*
