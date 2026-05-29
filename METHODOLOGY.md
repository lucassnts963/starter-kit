# Methodology Guide: Spec-Driven Development

## Overview

This methodology structures software development around **specification documents** (specs) that precede implementation. It combines:

- **Spec-driven workflow** — write what to build before building it
- **Architectural Decision Records** (ADRs) — document why decisions were made
- **Agent-friendly conventions** — structure your project so AI agents can work effectively
- **Custom skills** — reusable instructions for common project tasks

This guide is extracted from the **Horizon** project, where the methodology was developed and proven.

---

## 1. The Directory Structure

Every project following this methodology has:

```
project/
├── .opencode/
│   └── skills/                  # Custom agent skills
│       └── create-skill.md      # How to create new skills (always first)
│
├── .specs/
│   ├── templates/               # Reusable spec templates
│   │   ├── feature-spec.md      # For new features
│   │   ├── migration-spec.md    # For schema/database changes
│   │   └── bugfix-spec.md       # For bug corrections
│   │
│   ├── changes/                 # Active specs (one folder per change)
│   │   └── <nnn>-<slug>/
│   │       └── spec.md
│   │
│   ├── archive/                 # Completed specs
│   │
│   ├── memory/                  # Persistent project knowledge
│   │   ├── architecture.md      # Architectural decisions (ADRs)
│   │   ├── conventions.md       # Code conventions
│   │   └── glossary.md          # Terminology / entity map
│   │
│   └── shared/                  # Reference documents
│       ├── schema-current.md    # Current database schema
│       ├── schema-target.md     # Target / future schema
│       └── entity-map.md        # Column-level migration mapping
│
└── AGENTS.md                    # Project overview & agent instructions
```

### Starter Kit

A ready-to-use template is provided in `starter-kit/`. Clone or copy it to bootstrap a new project with the full structure plus blank templates with placeholder markers like `{PROJECT_NAME}`, `{STYLING_APPROACH}`, etc.

---

## 2. The Spec Workflow

### Step-by-Step

```
1. IDENTIFY NEED
   A feature, bugfix, or migration is needed.
   
2. CREATE SPEC FOLDER
   .specs/changes/<sequential-number>-<kebab-slug>/
   Example: .specs/changes/001-search-fields/
   
3. WRITE SPEC
   Use the appropriate template from .specs/templates/.
   Fill in: context, scope, requirements, design, risks, checklist.
   
4. REVIEW & APPROVE
   Stakeholders review the spec. Status: draft → review → approved.
   
5. IMPLEMENT
   Follow the spec's requirements and checklist.
   Update checklist items as work progresses.
   
6. VALIDATE
   All checklist items checked? Build passes? Tests pass?
   
7. ARCHIVE
   Move the spec folder from changes/ to archive/.
   
8. UPDATE MEMORY
   If new architectural decisions were made, add them to memory/architecture.md.
   If conventions changed, update memory/conventions.md.
```

### Naming Convention

- Folders: `changes/<sequential-number>-<kebab-slug>/`
- The number is sequential across the project lifetime
- The slug is a short description
- Examples: `001-search-fields`, `002-fix-encoding`, `003-migration-foundation`

### Spec Statuses

| Status | Meaning |
|---|---|
| `draft` | Initial write-up, not yet reviewed |
| `review` | Under stakeholder review |
| `approved` | Ready for implementation |
| `implemented` | Code is done, checks pass |

---

## 3. Spec Templates

### Feature Spec (`feature-spec.md`)

Use for: new features, UI changes, functional additions.

Key sections:
- **Context**: why this feature? what problem?
- **Scope**: what's included, what's explicitly NOT included
- **Requirements**: functional (REQ-01...), non-functional (NFR-01...), technical
- **Design**: frontend states (loading/empty/error/success), user flow, edge cases
- **Risks**: likelihood, impact, mitigation
- **Validation Checklist**: measurable pass/fail items

### Migration Spec (`migration-spec.md`)

Use for: schema changes, database migrations, data transformations.

Key sections:
- **Entity Mapping**: source → target with notes
- **Tables**: create, alter, drop with full column definitions
- **Data Migration**: order, transformation rules, validation queries
- **Rollback Plan**: how to undo if it fails

### Bugfix Spec (`bugfix-spec.md`)

Use for: correcting bugs.

Key sections:
- **Reproduction**: exact steps to trigger
- **Expected vs Actual**: what should happen vs what happens
- **Root Cause**: the underlying issue
- **Fix**: files to change, code changes
- **Side Effects**: what else could this affect?

---

## 4. Memory Documents

### `architecture.md` — Architecture Decision Records (ADRs)

Every significant technical decision gets recorded:

```markdown
## ADR-001: <Decision Title>
- Date: YYYY-MM-DD
- Status: Accepted | Proposed | Deprecated

**Context:** <Why was a decision needed?>
**Decision:** <What was decided?>
**Consequences:** <Trade-offs and impact>
```

ADRs serve as institutional memory. When someone asks "why is X built this way?", the answer is here.

### `conventions.md` — Code Conventions

Document your project's coding standards:
- Styling approach (inline CSS, Tailwind, etc.)
- Component patterns
- State management
- Form patterns
- Data fetching pattern
- Naming conventions
- Repository structure

### `glossary.md` — Terminology & Entity Map

Map between different terminologies:
- Domain terms across languages (Portuguese ↔ English)
- Column name translations
- Status value mappings
- Legacy ↔ modern table names

---

## 5. `shared/` — Reference Documents

### `schema-current.md`

Full documentation of the current database schema:
- Every table with all columns, types, constraints
- Seed data
- Indexes
- Foreign key relationships

### `schema-target.md`

The schema you're migrating toward:
- Tables with 🔧 (needs changes) or 🆕 (must create)
- Column additions documented with reason
- Migration execution order

### `entity-map.md`

Column-level mapping from current → target:
- Every source column mapped to its destination
- Transformation rules
- What's dropped and why

---

## 6. `AGENTS.md` — The Agent Instruction File

This is the single most important file for AI-assisted development. It should contain:

1. **Overview** — project name, tech stack, language
2. **Directory structure** — full tree with annotations
3. **Commands** — dev, build, test, lint
4. **Architecture** — data flow, routing, auth
5. **Coding conventions** — styling, state, forms, filtering patterns
6. **Database** — tables, seed data, schema references
7. **Key features** — core workflows explained
8. **Known gaps** — missing CRUD, scaffolded features, pending work
9. **Future plans** — migrations, new schemas, planned additions
10. **Observations for agents** — critical rules agents must follow

The AGENTS.md is **living documentation** — update it when conventions change, new ADRs are written, or features are completed.

---

## 7. Custom Skills (`skills/`)

Skills are Markdown files that teach AI agents how to perform specific project tasks.

### Anatomy of a Skill

```markdown
# <Skill Title>

**Name:** <skill-name>
**Version:** 1.0.0
**Triggers:** <when to use this skill>

## Purpose
<1-2 sentences>

## Instructions
### Step 1: <action>
<specific guidance>

## Examples
<real-world scenario walkthrough>

## References
AGENTS.md, .specs/memory/conventions.md, ...
```

### The `create-skill` Skill

Always the first skill in any project. It teaches agents how to create new skills following the project's conventions.

### When to Create Skills

- Repetitive tasks (e.g., "create a CRUD endpoint", "add a search field")
- Domain-specific patterns (e.g., "add a new report", "create a dashboard tile")
- Compliance checks (e.g., "review for security", "validate conventions")
- Code generation (e.g., "generate Rust model from SQL", "create React form from interface")

---

## 8. Bootstrap Checklist

When starting a new project with this methodology:

1. [ ] Copy everything from this starter-kit to your new project root
2. [ ] Fill in `AGENTS.md` with project specifics (replace `{PLACEHOLDERS}`)
3. [ ] Fill in `.specs/memory/conventions.md` with your coding standards
4. [ ] Fill in `.specs/shared/schema-current.md` with your DB schema
5. [ ] Create your first skill in `.opencode/skills/` (use `create-skill`)
6. [ ] Write your first ADR in `.specs/memory/architecture.md`
7. [ ] Begin spec-driven: create `.specs/changes/001-init/` for initial setup

---

## 9. Real-World Example: Horizon Project

The **Horizon** project (Tauri v2 + React 19 + Rust/Diesel/SQLite) adopted this methodology with these results:

### Specs Created
| ID | Title | Outcome |
|---|---|---|
| 001 | Search fields in all lists | 5 TSX files modified, search in every list page |
| 002 | Fix Unicode encoding | ~20 files, ~133 escapes replaced with real UTF-8 |
| 003 | Migration foundation | PostgreSQL + r2d2 + sync engine + 2 Diesel migrations |
| 004 | Fix compiler warnings | 18 warnings resolved, 0 remaining |

### ADRs Written
- ADR-001: Offline-First with SQLite + PostgreSQL Sync
- ADR-002: Dual Paradigm (workforce-centric + project-centric)
- ADR-003: English naming for PostgreSQL, Portuguese for SQLite
- ADR-004: Spec-Driven Development
- ADR-005: Areas ≠ Cost Centers (independent dimensions)
- ADR-006: Attendance + Rateio de Horas (two-step flow)

### Key Pattern
Every spec follows: **draft → approved → implemented → archived**. The `memory/` folder grows with each ADR, building institutional knowledge that outlives any single developer.

---

## 10. Why This Works

- **No ambiguity**: specs define exactly what to build before coding starts
- **Traceability**: every change has a spec with context, decisions, and validation
- **Knowledge retention**: ADRs persist after developers leave
- **AI-friendly**: `AGENTS.md` + `skills/` give AI agents the full project context
- **Incremental**: start small (one spec, one ADR), grow organically
- **Portable**: the methodology is 100% file-based — works with any language, any framework, any Git host
