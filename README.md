# Dr-RES — Digital Repository for Rapid Evidence Synthesis

<p align="center">
  <strong>AI-powered evidence discovery for African policy decisions</strong><br/>
  <sub>Built by <a href="#">ACRES</a> · Piloted at Makerere University</sub>
</p>

<p align="center">
  <img alt="License" src="https://img.shields.io/badge/license-MIT-green?style=flat-square"/>
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=nextdotjs"/>
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white"/>
  <img alt="Tailwind" src="https://img.shields.io/badge/Tailwind-4.x-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white"/>
  <img alt="Status" src="https://img.shields.io/badge/status-active_development-amber?style=flat-square"/>
</p>

---

## 📌 What is Dr-RES?

Dr-RES is a **living digital evidence repository** designed to inform urgent policy decisions across Africa. It combines a curated library of locally relevant research with **Large Language Model (LLM) intelligence** — offering semantic search, AI-generated summaries, and conversational evidence retrieval grounded in indexed content.

The platform is currently piloted by the **Africa Centre for Rapid Evidence Synthesis (ACRES)** at Makerere University, Uganda, and covers evidence mapped to the **UN Sustainable Development Goals** (SDGs 3, 4, 13).

### Why Dr-RES?

| Problem | Solution |
|---|---|
| Policy evidence is fragmented across journals, reports, and grey literature | Unified, curated repository with standardized metadata |
| Finding relevant evidence takes hours of manual searching | AI semantic search + RAG-powered chat assistant |
| No rapid synthesis tool exists for African policy contexts | On-demand AI summaries grounded in local evidence |
| Quality moderation is manual and disconnected | Integrated split-screen moderation workflow |

---

## 🏗️ Architecture

```
drres/
├── frontend/          # Next.js 15 + TypeScript + Tailwind v4
│   ├── app/           # App Router pages & layouts
│   │   ├── page.tsx              # Landing page (hero, search, stats)
│   │   ├── search/               # Evidence library & discovery
│   │   ├── dashboard/            # Contributor workspace
│   │   │   ├── page.tsx          # Overview (metrics, submissions)
│   │   │   ├── submit/           # Multi-step evidence wizard
│   │   │   └── settings/         # Profile & notifications
│   │   └── admin/                # Admin console
│   │       ├── page.tsx          # Platform analytics
│   │       ├── database/         # Evidence DB + moderation modal
│   │       └── settings/         # Users & category management
│   ├── components/    # Shared UI components
│   └── lib/           # Utilities & data helpers
│
├── backend/           # API services (planned)
│   ├── api/           # REST/tRPC endpoints
│   ├── models/        # Database schema & migrations
│   ├── services/      # AI, search, email, storage
│   └── workers/       # Background indexing jobs
│
└── README.md          # ← You are here
```

---

## 🎨 Design System — "Vintage Academic"

A warm, scholarly aesthetic that feels premium and intentional.

| Token | Value | Usage |
|---|---|---|
| **Deep Espresso** | `#141210` | Dark backgrounds, admin sidebar |
| **Warm Paper** | `#ede9e0` | Light backgrounds, text on dark |
| **Amber Primary** | `#d4a843` | CTA buttons, active states, accent |
| **Forest** | `hsl(152, 45%, 40%)` | Success, published status |
| **Sky** | `hsl(205, 65%, 55%)` | Info, draft status, SDG 13 |
| **Rose** | `hsl(0, 65%, 55%)` | Error, reject, danger zone |

**Typography**: Serif headings (Playfair Display), monospace labels (DM Mono), sans-serif body (DM Sans)

---

## 👥 Role-Based Workspaces

### 🌎 Public — Evidence Discovery

| Route | Description |
|---|---|
| `/` | Landing page — hero search bar, platform stats, call-to-action |
| `/search` | Evidence library — faceted sidebar filters (3-level SDG taxonomy), sort, paginated cards |
| Evidence Sheet | Slide-over detail view — full metadata, DOI, exports, AI summary button |
| AI Chat | Floating drawer — RAG-powered chat with citation grounding + AI disclaimer |

### 👤 Contributor — `/dashboard`

| Route | Description |
|---|---|
| `/dashboard` | Overview — metric cards, submissions table (with status badges), activity feed |
| `/dashboard/submit` | 3-step wizard — Upload PDF → Metadata & Tags → Review & Submit |
| `/dashboard/settings` | Profile management, notification toggles, danger zone |

### 🛡️ Admin — `/admin`

| Route | Description |
|---|---|
| `/admin` | Analytics — key metrics, CSS bar charts, system health table, admin activity log |
| `/admin/database` | Evidence manager — tabbed data grid + split-screen moderation modal (Approve / Revise / Reject) |
| `/admin/settings` | User management (roles, deactivate) + Category management (SDGs, priority areas, doc types) |

---

## 📋 Requirements Coverage (40 Total)

| Category | Total | ✅ UI Built | ⚠️ Partial | 🔴 Backend |
|---|---|---|---|---|
| Evidence Discovery | 5 | 4 | 1 | — |
| Search | 6 | 2 | 2 | 2 |
| AI Features | 6 | — | 3 | 3 |
| Auth & Accounts | 6 | 1 | — | 5 |
| Evidence Submission | 6 | 3 | 2 | 1 |
| Admin & Moderation | 6 | 4 | 2 | — |
| Content Indexing | 5 | — | — | 5 |
| **Total** | **40** | **14** | **10** | **16** |

> **Current phase**: Frontend UI is complete across all 9 pages and 3 workspaces. Backend integration (database, auth, AI pipeline) is the next milestone.

<details>
<summary><strong>📖 Full Requirements Matrix (REQ01–REQ40)</strong></summary>

### 1. Evidence Discovery & Browsing
| ID | Requirement | Priority | Status |
|---|---|---|---|
| REQ01 | Public browsing without login | Must | ✅ |
| REQ02 | Evidence list: title, year, type, SDG, priority, country | Must | ✅ |
| REQ03 | Sort by date, title, relevance | Should | ✅ |
| REQ04 | Detail view: full metadata, DOI | Must | ✅ |
| REQ05 | Related evidence (up to 5) | Should | ⚠️ |

### 2. Search
| ID | Requirement | Priority | Status |
|---|---|---|---|
| REQ06 | Free-text keyword search | Must | ✅ |
| REQ07 | AI semantic search (≤5s) | Must | 🔴 |
| REQ08 | Boolean search (AND/OR/NOT) | Must | 🔴 |
| REQ09 | Faceted filters | Must | ✅ |
| REQ10 | Paginated results, shareable URLs | Should | ✅ |
| REQ11 | Export to CSV/RIS | Could | ⚠️ |

### 3. AI Features
| ID | Requirement | Priority | Status |
|---|---|---|---|
| REQ12 | On-demand AI summaries | Must | ⚠️ |
| REQ13 | AI chat assistant (RAG) | Must | ⚠️ |
| REQ14 | Source attribution | Must | 🔴 |
| REQ15 | Session context | Should | 🔴 |
| REQ16 | Thumbs up/down feedback | Could | 🔴 |
| REQ17 | AI disclaimer | Must | ✅ |

### 4. Auth & Accounts
| ID | Requirement | Priority | Status |
|---|---|---|---|
| REQ18 | Registration + email verification | Must | 🔴 |
| REQ19 | Login + lockout | Must | 🔴 |
| REQ20 | Password reset | Must | 🔴 |
| REQ21 | Profile management | Must | ✅ |
| REQ22 | SSO (Google/Azure) | Could | 🔴 |
| REQ23 | Session expiry | Must | 🔴 |

### 5. Evidence Submission
| ID | Requirement | Priority | Status |
|---|---|---|---|
| REQ24 | Multi-step guided form | Must | ✅ |
| REQ25 | PDF upload (50MB) | Must | ✅ |
| REQ26 | Draft + auto-save | Must | ⚠️ |
| REQ27 | Bulk RIS import | Must | ⚠️ |
| REQ28 | Email notifications | Must | 🔴 |
| REQ29 | Personal dashboard | Must | ✅ |

### 6. Admin & Moderation
| ID | Requirement | Priority | Status |
|---|---|---|---|
| REQ30 | Approve/reject/revision queue | Must | ✅ |
| REQ31 | Edit metadata + audit log | Must | ⚠️ |
| REQ32 | Bulk Excel import | Must | ⚠️ |
| REQ33 | Manage vocabularies | Should | ✅ |
| REQ34 | Usage analytics dashboard | Should | ✅ |
| REQ35 | User management (roles) | Must | ✅ |

### 7. Content Indexing
| ID | Requirement | Priority | Status |
|---|---|---|---|
| REQ36 | Auto-index on approval | Must | 🔴 |
| REQ37 | Vector embeddings | Must | 🔴 |
| REQ38 | RAG enforcement | Must | 🔴 |
| REQ39 | Query log retention (12mo) | Must | 🔴 |
| REQ40 | Re-index on update | Should | 🔴 |

</details>

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x (or pnpm/yarn)

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Backend (Planned)

```bash
cd backend
# Coming soon — database, auth, AI pipeline
```

---

## 🗺️ Roadmap

- [x] **Phase 1** — Public Discovery (landing, search, evidence library)
- [x] **Phase 2** — Contributor Workspace (dashboard, submission wizard, settings)
- [x] **Phase 3** — Admin Console (analytics, evidence DB, moderation, settings)
- [x] **Phase 4** — UI Polish (collapsible sidebars, URL sync, AI disclaimers)
- [ ] **Phase 5** — Database & Auth (Prisma, PostgreSQL, NextAuth)
- [ ] **Phase 6** — AI Pipeline (vector DB, embeddings, RAG chat)
- [ ] **Phase 7** — File Storage & Email (S3, transactional notifications)
- [ ] **Phase 8** — Production Deployment & Security Hardening

---

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript 5.x |
| **Styling** | Tailwind CSS v4 |
| **Animations** | Framer Motion |
| **UI Primitives** | Radix UI |
| **Icons** | Lucide React |
| **Database** | PostgreSQL + Prisma (planned) |
| **Auth** | NextAuth.js (planned) |
| **AI/ML** | OpenAI API + pgvector (planned) |
| **Storage** | S3-compatible (planned) |
| **Email** | Resend / SendGrid (planned) |

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<p align="center">
  <sub>Built with 🤎 for evidence-informed policymaking in Africa</sub>
</p>
