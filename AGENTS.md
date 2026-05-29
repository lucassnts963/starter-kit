# AGENTS.md — {PROJECT_NAME}

> **TEMPLATE:** Replace all `{PLACEHOLDERS}` below with your project's specifics. Keep this file updated as the project evolves — it is the primary instruction source for AI agents working on this codebase.

## Overview

| Layer | Tech |
|---|---|
| Shell / Platform | {TAURI or ELECTRON or WAILLS or WEB or CLI or MOBILE or LIBRARY} |
| Frontend | {REACT or VUE or SVELTE or ANGULAR or SOLID or HTMX or VANILLA or NONE} |
| Backend | {RUST or NODE or PYTHON or GO or CSHARP or JAVA or ELIXIR or NONE} |
| Database | {SQLITE or POSTGRES or MYSQL or MONGODB or SURREALDB or NONE} |
| Auth | {LOGIN_METHOD} |
| Language | {LANGUAGE} |

---

## Spec-Driven Development Methodology

This project uses **spec-driven development**. All changes flow through specs in `.specs/`.

### Directory Structure

```
.opencode/
└── skills/                    # Custom agent skills
    ├── create-skill.md        # How to create new skills
    └── ...

.specs/
├── templates/                 # Spec templates (reusable)
│   ├── feature-spec.md        # For new features
│   ├── migration-spec.md      # For schema/database changes
│   └── bugfix-spec.md         # For bug corrections
├── changes/                   # Active specs (one folder per change)
│   └── <nnn>-<slug>/
│       └── spec.md
├── archive/                   # Completed specs (moved here after implementation)
├── memory/                    # Persistent project knowledge
│   ├── architecture.md        # Architectural decisions (ADRs)
│   ├── conventions.md         # Code conventions
│   └── glossary.md            # Entity mapping / terminology
└── shared/                    # Shared reference documents
    ├── schema-current.md      # Current database schema
    ├── schema-target.md       # Target / future schema
    └── entity-map.md          # Detailed entity mapping
```

### Spec Workflow

1. Identify need → create folder `changes/<nnn>-<slug>/`
2. Write `spec.md` using the appropriate template from `templates/`
3. Review and approve spec with stakeholders
4. Implement following the spec's requirements and checklist
5. Move folder to `archive/`
6. Update `memory/` if new architectural decisions were made

### Naming Convention

- Folders: `changes/<sequential-number>-<kebab-slug>/`
- Examples: `changes/001-search-fields/`, `changes/002-fix-encoding/`, `changes/003-migration-foundation/`

---

## Project Structure

```
src/                          # Application source
├── {ENTRY_POINT}             # Route mapping / entry
├── {ENTRY_POINT}             # Bootstrapping
├── types/                    # Type definitions
├── {STYLE_FILE}              # Global styles
├── stores/                   # State management
├── components/               # Reusable components
│   └── layout/               # Layout components
└── routes/                   # Page / route components
    └── <Module>/
        ├── <Module>List.{EXT}
        └── <Module>Form.{EXT}

backend/                      # Backend (if applicable)
├── {MANIFEST_FILE}
├── .env
├── migrations/               # Database migrations
├── src/
│   ├── {ENTRY_POINT}
│   ├── models/               # Data models
│   ├── db/                   # Database layer
│   │   ├── {DB_MODULE}
│   │   ├── {SCHEMA_FILE}
│   │   └── repository/       # CRUD per entity
│   ├── {HANDLERS}/           # API handlers / controllers
│   └── business/             # Business logic
```

---

## Commands

| Command | Where | Description |
|---|---|---|
| `{DEV_COMMAND}` | root | Start dev server |
| `{BUILD_COMMAND}` | root | Build for production |
| `{TEST_COMMAND}` | root | Run tests |
| `{LINT_COMMAND}` | root | Lint code |

---

## Architecture & Data Flow

```
{FRONTEND_COMPONENT}
  → {API_CALL}({endpoint}, {args})
    → {BACKEND_HANDLER}
      → {REPOSITORY}
        → {DATABASE}
```

### Routing
- {ROUTING_STRATEGY}

### Auth
- {AUTH_MECHANISM}

---

## Coding Conventions

### Frontend
- {STYLING_APPROACH}
- {UI_LIBRARY}
- **State management**: {STATE_MANAGEMENT}
- **Forms**: {FORM_PATTERN}
- **Client-side filtering**: Use a memoized/computed filter from the input state:
  ```pseudocode
  search = state("")
  filtered = computed(() => {
    if empty(search) return items
    term = lowercase(search)
    return items.filter(item => contains(lowercase(item.field), term))
  })
  ```

### Backend
- **Repository pattern**: Each entity has its own repository module
- **{HANDLER_PATTERN}**: Thin wrappers that call repository functions
- **Naming**: {NAMING_CONVENTION}
- **IDs**: {ID_STRATEGY}

---

## Testing (TDD Mandatory)

> **IMPORTANT:** Tests are written BEFORE implementation. Never write code first.

### Framework
- **Unit/Integration:** {TEST_FRAMEWORK}
- **Component:** {COMPONENT_TEST_LIB}
- **E2E:** {E2E_FRAMEWORK}
- **Coverage:** {COVERAGE_TOOL} (threshold: {COVERAGE_THRESHOLD}%)

### Test File Convention
- Location: {co-located (`{File}.test.{EXT}`) | `__tests__/` directory}
- Naming: `<FileUnderTest>.test.{EXT}`

### TDD Workflow
```
Spec → Red (write failing test) → Green (implement) → Refactor → Repeat
```

### Test Command
| Command | Where | Description |
|---|---|---|
| `{TEST_COMMAND}` | root | Run all tests |
| `{TEST_WATCH_COMMAND}` | root | Run tests in watch mode |
| `{TEST_COVERAGE_COMMAND}` | root | Run tests with coverage report |

---

## Database

### Tables
| Table | Purpose |
|---|---|
| {TABLE_1} | {DESCRIPTION} |
| {TABLE_2} | {DESCRIPTION} |

### Seed Data
{DEFAULT_SEED_DATA}

---

## Sections with Search/Filter Status

| Section | File | Search |
|---|---|---|
| {SECTION_1} | `{FILE}` | ✅ Text search |
| {SECTION_2} | `{FILE}` | ❌ No search |

---

## Key Observations for Agents

1. **{OBSERVATION_1}**
2. **Pattern for new search fields**: follow existing implementations
3. **When adding a new endpoint**: define model → repository → handler → register → add type definition
4. **All changes must go through `.specs/`** — write spec first, implement second
5. **TDD is mandatory** — write tests BEFORE implementation, follow Red → Green → Refactor
6. **Every bugfix requires a regression test** that reproduces the bug and passes after the fix
