# DrRES Development Work Plan (Apr 7 - May 24)

This phased development timeline for DrRES builds upon environment setup and wireframing, mapping out the core Document Management and AI modules for a target completion by May 24, 2026.

## Technical Considerations (Tech Stack)
- **Frontend:** React (Next.js)
- **Backend:** Python (FastAPI)
- **Relational Database:** PostgreSQL
- **Vector Database:** pgvector (PostgreSQL extension)
- **AI/LLM Integration:** OpenAI and Anthropic (Claude) for summarisation and conversational RAG pipelines

## Phase 1: Planning & Setup (Apr 7 - Apr 12)
**Goal:** Establish a strong project foundation, align all stakeholders on design and priorities, and ensure the development team is ready to build.
**Technical Tasks:**
- Wireframing and UI/UX design conceptualization.
- Clarification of system requirements and priority assignments.
- Development environment setup for frontend and backend modules.

## Phase 2: Document Management - Retrieval (Apr 13 - Apr 19)
**Goal:** Enable public and registered users to easily discover, search, and read existing evidence in the repository.
**Technical Tasks:**
- Develop core backend indexing pipeline assuming an existing repository of documents.
- Implement free-text keyword search, advanced Boolean search, and faceted filtering.
- Build evidence listing and detailed record pages on the frontend.

## Phase 3: Document Management - Registration (Apr 20 - Apr 26)
*Depends on Phase 2*
**Goal:** Allow registered researchers to contribute new evidence while providing administrators the tools to review and approve submissions to maintain repository quality.
**Technical Tasks:**
- Build multi-step evidence submission form with PDF/RIS upload & draft auto-save to collect document metadata.
- Implement Admin moderation queue (approve/reject/revisions).
- Create user dashboards for submission tracking.

## Phase 4: AI Module - Semantic Search & Summaries (Apr 27 - May 3)
*Depends on Phase 2 & 3*
**Goal:** Enhance discovery by understanding the *intent* of user searches (not just exact keywords), and provide quick, AI-generated summaries to help users digest documents faster.
**Technical Tasks:**
- Integrate vector database and embedding generation pipelines.
- Implement AI semantic search and result ranking.
- Add on-demand AI summarisation for individual evidence records.

## Phase 5: AI Module - Conversational RAG (May 4 - May 10)
*Depends on Phase 4*
**Goal:** Introduce an intelligent, interactive chat assistant that can answer specific policy questions using the repository's evidence, complete with trustworthy citations.
**Technical Tasks:**
- Build RAG (Retrieval-Augmented Generation) pipeline for the chat assistant.
- Develop conversational UI with source citations, context retention, and feedback (thumbs up/down).
- Implement AI query and response logging.

## Phase 6: Foundation, Auth & Sub-modules (May 11 - May 17)
**Goal:** Secure the platform by implementing user accounts, roles (Public, Registered, Admin), and reliable authentication flows like login and password resets.
**Technical Tasks:**
- Implement database schemas for Users and Config.
- Develop Auth service (Registration, Login, Password Reset, SSO).
- Setup base frontend layouts, routing, and role-based access control.

## Phase 7: Admin, Analytics & Finalisation (May 18 - May 24)
*Parallel with polish*
**Goal:** Give administrators the dashboard tools they need to monitor platform usage and manage taxonomies, while ensuring the entire system undergoes rigorous testing before launch.
**Technical Tasks:**
- Complete Admin dashboards (metadata taxonomies, usage analytics).
- End-to-end testing, bug fixing, and performance optimization (e.g., search latency <= 5s).
- Final user acceptance testing (UAT) and deployment preparations.

---

*Prepared by: Development Team*
*Date: April 7, 2026*

