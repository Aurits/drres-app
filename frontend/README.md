# Dr-RES (Digital Repository for Rapid Evidence Synthesis)

## 📌 Project Overview
The Digital Repository for Rapid Evidence Synthesis (Dr-RES) is a digital evidence base developed to inform urgent policy decisions across Africa, currently piloted by ACRES. Dr-RES provides a living repository of locally relevant evidence and integrates Large Language Models (LLMs) to offer intelligent discovery, AI-generated summaries, and conversational evidence retrieval. 

---

## 🎨 Proposed Architecture & UI/UX Structure

To ensure a highly engaging, intuitive, and premium experience, we will structure the application around **Role-Based Workspaces**. The design aesthetic will be "Modern Academic"—clean, high-contrast, text-forward, with subtle micro-animations that make it feel alive and responsive. We will prioritize a highly accessible layout where information density is managed gracefully.

### 🌎 1. Public Domain (Discovery & Browsing)
*For policymakers and the public wanting frictionless access to evidence.*

* **`/` (Landing Page)**: 
  * **Hero Section**: A dynamic, prominent, natural-language search bar ("What policy evidence are you looking for today?"). 
  * **Highlights**: Stats (total records, countries), recent high-impact submissions.
* **`/search` (Evidence Search)**:
  * **Layout**: A two-column layout. Left sidebar for sticky faceted filters (SDG, Tag, Year, Type). Main content area for search results.
  * **UX**: Seamless transition between grid and list layouts. Real-time updates of result counts as filters are applied.
* **Evidence Detail (Slide-over Sheet)**:
  * *Instead of an independent page, clicking an evidence card opens a wide, immersive side-sheet over the `/search` context.*
  * **Routing**: Uses shallow routing (e.g., `?evidence=[id]`) to maintain shareable links without forcing a full page reload or losing search context.
  * **Content**: Title, abstract, full metadata.
  * **AI Actions**: "Generate AI Summary" (expands inline) and "Export RIS/CSV".
* **Global AI Chat (Persistent Drawer)**:
  * *Instead of an isolated page, the "Ask AI" feature is built as a persistent drawer toggled via a Floating Action Button (FAB) or top navigation.*
  * **UX**: Users can interrogate the entire repository while simultaneously browsing search results.

### 👤 2. Registered User Workspace
*For researchers and contributors managing their knowledge pipeline.*

* **`/dashboard` (Unified Contributor Hub)**:
  * **Layout**: A single, clean overview. The top displays personal metrics (Views, AI queries). The bottom contains the data table of their historical evidence submissions (Draft, Pending, Approved, Rejected).
  * **Quick Actions**: Prominent "Submit New Evidence" button. Allows resuming drafts directly from the table.
* **`/dashboard/submit` (Multi-step Submission Workflow)**:
  * **UX**: A beautiful vertical or horizontal stepper. 
  * Step 1: Upload PDF & automatic metadata extraction via RIS.
  * Step 2: Manual Metadata entry (SDG, Authors, etc.).
  * Step 3: Preview and Submit.
  * **Features**: Continuous background auto-saving (every 60s).
* **`/dashboard/settings`**: Profile config and notification management.

### 🛡️ 3. Admin Workspace
*A dedicated, secure area (potentially a darker theme) for comprehensive platform management.*

* **`/admin` (Platform Analytics)**: High-level dashboard showing search latency, AI usage, active users, and system health.
* **`/admin/database` (Unified Evidence Manager)**:
  * *Merges the Moderation Queue and Master Library into one powerful data grid.*
  * **Tabs**: `Needs Review`, `Published`, `Drafts`, `Rejected`.
  * **Flow**: Clicking an item in `Needs Review` opens the Split-Screen Moderation UI (PDF on left, metadata + Approve/Reject on right).
  * **Features**: Bulk Excel Imports, inline metadata editing.
* **`/admin/settings` (System Configuration)**:
  * *Merges User Management and Category Management into a single settings portal via tabs.*
  * **Tab - Users**: Manage user roles, deactivate accounts.
  * **Tab - Categories**: Manage SDGs, Priority Areas, and Document Types.

---

## 📋 System Requirements

### 1. Evidence Discovery & Browsing
| ID | Requirement | Priority |
|---|---|---|
| **REQ01** | Public browsing of all approved products without login. | Must Have |
| **REQ02** | Evidence list displays: title, year, document type, SDG tags, priority area, country. | Must Have |
| **REQ03** | Sort by date, title (A-Z), and relevance score. | Should Have |
| **REQ04** | Detail view displays: full metadata (authors, year, SDG, priority, outcomes, ethics, DOI link). | Must Have |
| **REQ05** | Display related evidence (up to 5 records) based on tags/semantic similarity. | Should Have |

### 2. Search
| ID | Requirement | Priority |
|---|---|---|
| **REQ06** | Free-text keyword search across titles, abstracts, keywords, policies. | Must Have |
| **REQ07** | AI semantic search via vector embeddings (latency ≤5s for 95%). | Must Have |
| **REQ08** | Advanced Boolean search (AND, OR, NOT) with parenthetical grouping. | Must Have |
| **REQ09** | Faceted filters (document type, SDG, priority, country, year, quality). | Must Have |
| **REQ10** | Paginated results with configurable sizes, total counts, shareable URLs. | Should Have |
| **REQ11** | Export search results to CSV/RIS (limit 500 records/request). | Could Have |

### 3. AI Features
| ID | Requirement | Priority |
|---|---|---|
| **REQ12** | On-demand AI summaries for individual records, grounded in text/abstract. | Must Have |
| **REQ13** | AI chat assistant (RAG) providing answers grounded in repository and explicit citations. | Must Have |
| **REQ14** | Source attribution with inline links. No hallucinated references. | Must Have |
| **REQ15** | Conversational context maintained per session (cleared on "New Chat"). | Should Have |
| **REQ16** | User feedback (thumbs up/down) for AI responses, stored for quality monitoring. | Could Have |
| **REQ17** | Visible disclaimer for all AI-generated content. | Must Have |

### 4. User Accounts & Authentication
| ID | Requirement | Priority |
|---|---|---|
| **REQ18** | Registration with email verification and secure password policies. | Must Have |
| **REQ19** | Login with standard lockout policy (5 failed attempts = 30m lockout). | Must Have |
| **REQ20** | Time-limited (60m) password reset via email link. | Must Have |
| **REQ21** | View/update profile (name, institution, avatar, notifications). | Must Have |
| **REQ22** | Single Sign-On (SSO) via Google, Microsoft Azure AD, etc. | Could Have |
| **REQ23** | 8-hour session expiry with 10-minute warning prompt. | Must Have |

### 5. Evidence Submission
| ID | Requirement | Priority |
|---|---|---|
| **REQ24** | Guided multi-step form for submitting evidence with required metadata. | Must Have |
| **REQ25** | Support for PDF upload (max 50 MB) stored securely. | Must Have |
| **REQ26** | Draft support with 60-second auto-save functionality. | Must Have |
| **REQ27** | Bulk RIS reference import via file upload, parsing entries to the submission. | Must Have |
| **REQ28** | Email notifications for submission receipt and status changes (approve/reject). | Must Have |
| **REQ29** | Personal dashboard listing past submissions, status, view counts, AI interactions. | Must Have |

### 6. Admin & Moderation
| ID | Requirement | Priority |
|---|---|---|
| **REQ30** | Queue to approve, reject (w/ reasons text), or request revisions. | Must Have |
| **REQ31** | Ability to edit any metadata field with a comprehensive audit log. | Must Have |
| **REQ32** | Bulk import evidence via structured Excel template. | Must Have |
| **REQ33** | Manage controlled vocabularies (document types, SDGs, country lists). | Should Have |
| **REQ34** | Usage analytics dashboard (total records, daily searches, AI usage, active users). | Should Have |
| **REQ35** | User management (view, deactivate, reactivate, change roles). | Must Have |

### 7. Content Indexing & AI Backend
| ID | Requirement | Priority |
|---|---|---|
| **REQ36** | Auto-index newly approved evidence within 15 minutes (PDF text + metadata). | Must Have |
| **REQ37** | Internal vector embedding model/store for semantic similarity retrieval. | Must Have |
| **REQ38** | RAG enforcement ensuring LLM answers strictly derive from indexed content (no hallucinations). | Must Have |
| **REQ39** | Retention of queries/responses log for 12 months for quality monitoring. | Must Have |
| **REQ40** | Auto re-index upon metadata/document update within 30 minutes. | Should Have |
