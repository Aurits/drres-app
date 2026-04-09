# Dr-RES Backend Service Architecture

This document outlines the modular structure of the Dr-RES Digital Evidence Hub backend, built with **FastAPI** and **PostgreSQL (pgvector)**.

## Core Modules & Responsibilities

The system is organized into four domain-driven modules, ensuring a clear separation of concerns and scalability for AI-integrated workflows.

---

### 1. `auth` (Identity & Permissions)
*Focus: Security, Role-Based Access Control (RBAC), and Session Management.*

- **Public**: Transparent session handling for Guest users.
- **Contributor**: Secure authentication (JWT), profile management, and submission ownership.
- **Admin**: Elevated permissions for platform oversight and user account management.
- **Tech**: OAuth2 (Password flow) + JWT, Bcrypt for hashing.

---

### 2. `records` (Evidence Management)
*Focus: Document lifecycle, Taxonomy, and Metadata persistence.*

- **Public**: Read-only access to "Published" evidence and taxonomy categories.
- **Contributor**: Creation and management of evidence drafts, PDF/RIS file processing.
- **Admin**: Moderation workspace (Approve/Reject/Request Revision) and maintenance of platform taxonomies (SDGs, Priority Areas, Doc Types).
- **Tech**: Prisma/SQLAlchemy ORM, S3-compatible File Storage.

---

### 3. `search` (The Retrieval Engine)
*Focus: High-performance data discovery and hybrid search architecture.*

- **Keyword Discovery**: Multi-field full-text search across titles, abstracts, and full texts.
- **Faceted Navigation**: Dynamic filtering logic for SDGs, countries, and priority areas.
- **Semantic Search**: Meaning-based retrieval using vector similarity scores.
- **Tech**: PostgreSQL TSVector (Traditional) + **pgvector** (Semantic).

---

### 4. `intelligence` (AI Augmentation & RAG)
*Focus: Natural Language Processing, LLM Integration, and RAG Pipelines.*

- **Executive Summaries**: AI-driven distillation of complex evidence records.
- **MetaData Extraction**: Auto-parsing of authors, dates, and abstracts from uploaded PDFs.
- **Conversational RAG**: Intelligent policy assistant providing cited answers sourced from the Hub repository.
- **Tech**: OpenAI (Embeddings/GPT-4o), Anthropic (Claude-3 for RAG/Summary).

---

## Data Models & Schema (PostgreSQL)

The persistence layer is designed for a combination of traditional relational integrity and AI-driven vector similarity.

| Model | Primary Purpose | Key Fields / Relationships |
| :--- | :--- | :--- |
| **User** | Identity & Access | `email`, `hashed_password`, `role`, `org` |
| **Evidence** | Core Metadata | `uniqueId`, `title`, `abstract`, `submitter_id` (FK User) |
| **Author** | Provenance | `name`, `affiliation` |
| **EvidenceAuthor**| Attribution | `evidence_id` (FK), `author_id` (FK), `order` |
| **SDG** | Policy Strategy | `label` (SDG 3), `full_name`, `color_code` |
| **PriorityArea** | Sub-Taxonomy | `name`, `sdg_id` (FK SDG) |
| **Embedding** | Semantic Discovery| `evidence_id` (FK), **`vector` (pgvector)** |
| **Interaction** | Impact Analytics | `user_id` (FK), `evidence_id` (FK), `action` |

> [!NOTE]
> **Hybrid Search Strategy**: We will implement a dual-path retrieval system. Keyword searches will utilize indexed Postgres `TSVector` columns, while the `Embedding` model will facilitate meaning-based discovery using cosine similarity via `pgvector`.

---

## Technical Considerations
- **Search Latency Target**: <= 5s for hybrid retrieval.
- **Data Integrity**: Enforce schema constraints for Hub IDs (DRRES-YYYY-XXX).
- **Scalability**: Stateless service design to support horizontal scaling during high-traffic policy periods.
