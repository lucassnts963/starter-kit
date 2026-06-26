# AGENTS.md — {PROJECT_NAME}

> Primary instruction source for AI agents working on this codebase. Keep this file updated as the project evolves.

## Overview

| Layer | Tech |
|---|---|
| Shell / Platform | {TAURI or ELECTRON or WAILS or WEB or CLI or MOBILE or LIBRARY} |
| Frontend | {REACT or VUE or SVELTE or ANGULAR or SOLID or HTMX or VANILLA or NONE} |
| Backend | {RUST or NODE or PYTHON or GO or CSHARP or JAVA or ELIXIR or NONE} |
| Database | {SQLITE or POSTGRES or MYSQL or MONGODB or SURREALDB or NONE} |
| Auth | {LOGIN_METHOD} |
| Language | {LANGUAGE} |

---

## Commands

| Command | Where | Description |
|---|---|---|
| `{DEV_COMMAND}` | root | Start dev server |
| `{BUILD_COMMAND}` | root | Build for production |
| `{TEST_COMMAND}` | root | Run tests |
| `{LINT_COMMAND}` | root | Lint code |

---

## Architecture

```
{FRONTEND_COMPONENT}
  → {API_CALL}({endpoint}, {args})
    → {BACKEND_HANDLER}
      → {SERVICE}
        → {REPOSITORY} (local data)
        → {ADAPTER}    (external API)
```

- **Routing:** {ROUTING_STRATEGY}
- **Auth:** {AUTH_MECHANISM}

---

## Project Conventions

Full conventions in `.specs/memory/conventions.md`. Summary:

- **Frontend:** {STYLING_APPROACH}, {UI_LIBRARY}, state via {STATE_MANAGEMENT}
- **Backend:** Repository (data), Adapter (external API), Service (business logic), {HANDLER_PATTERN}, naming: {NAMING_CONVENTION}
- **Client-side filtering:** memoized/computed filter from input state
- **IDs:** {ID_STRATEGY}
- **Clean Code:** SOLID principles in `.specs/memory/clean-code.md`
- **Reusable code:** catalog in `.specs/memory/component-catalog.md` — check before creating, add after creating
- **Memory as an LLM-Wiki:** `.specs/memory/` is a persistent, compounding knowledge base the agent maintains (inspired by [Karpathy's LLM-Wiki](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)) — curated pages (ADRs, conventions, catalog), an append-only journal (`log.md`), and a topical error memory (`troubleshooting.md`). Compile durable knowledge; don't re-derive it.
- **Troubleshooting:** after a non-trivial debug, record the lesson in `.specs/memory/troubleshooting.md` via the `record-troubleshooting` skill — search it before debugging something familiar
- **Working log:** append a short block to `.specs/memory/log.md` at the end of a work session (what you did, learned, next) so the next session resumes without re-reading everything
- **Changelog:** generated from `.specs/archive/` via `update-changelog` skill, validated by `check-consistency`

---

## Testing (TDD Mandatory)

> Tests are written BEFORE implementation. Never write code first.

| | |
|---|---|
| **Framework** | {TEST_FRAMEWORK} |
| **Coverage** | {COVERAGE_TOOL} (threshold: {COVERAGE_THRESHOLD}%) |
| **Run tests** | `{TEST_COMMAND}` |
| **Watch mode** | `{TEST_WATCH_COMMAND}` |
| **Coverage report** | `{TEST_COVERAGE_COMMAND}` |

Full testing conventions in `.specs/memory/conventions.md## Testing`.

---

## Key Rules

1. **All changes go through `.specs/`** — write spec first, implement second
2. **TDD is mandatory** — follow Red → Green → Refactor cycle
3. **Every bugfix requires a regression test** that reproduces the bug and passes after the fix
4. **New endpoint pattern:** model → repository → service → handler → register → add type definition
5. **New adapter pattern:** for external services, create adapter → inject into service → test with mock
6. **Keep AGENTS.md updated** as the project evolves — it is the primary instruction source for agents
7. **Maintain consistency** — run `node scripts/check-consistency.mjs` (or `"verificar consistência"`) before committing skill or config changes. Never hardcode config values; reference `.specs/config.md`.
8. **Feed the memory** — search `memory/troubleshooting.md` before debugging; after a non-trivial fix, record a `TRB-` entry; at the end of a work session, append a block to `memory/log.md`. Memory that isn't written is re-derived.
9. **Two-tier consistency** — `check-consistency.mjs` validates *structure* (links, ids, schema) deterministically; the `review-alignment` skill validates *semantics* (does the spec actually cover its requirements?). A requirements-backed spec cannot be archived until its `alignment-review.md` is complete and `aligned`. Structure is enforced by script; meaning is enforced by an LLM review the script gates on.

---

## Skills

Skills live in `.claude/skills/<name>/SKILL.md` (discovered by both opencode and Claude Code).
Format rules: `.specs/config.md## Skill Format`.

| Skill | Use it to… |
|---|---|
| `create-project` | Bootstrap a brand-new project from the starter-kit (clone + init). |
| `init-project` | Configure an already-cloned starter-kit (9 stack questions, fills AGENTS.md, ADR-003). |
| `adopt-project` | Overlay the methodology onto an EXISTING project (detect stack, no clobber, draft memory from code). |
| `gather-requirements` | Elicit requirements for a non-trivial change → `.specs/requirements/`. |
| `review-alignment` | Semantically verify a spec covers its requirements (omissions, drift) before TDD/archive. |
| `run-change` | Decide ceremony (lightweight vs full) and drive small changes end to end. |
| `run-tdd` | Drive the Red → Green → Refactor cycle for an active spec. |
| `record-troubleshooting` | Append a distilled error/fix entry to `memory/troubleshooting.md` after a non-trivial debug. |
| `update-changelog` | Generate `CHANGELOG.md` entries from archived specs (script-backed). |
| `check-consistency` | Validate skills/conventions via `scripts/check-consistency.mjs`. |
| `create-skill` | Author a new skill in the canonical format. |

---

## Choosing the Change Path

Match ceremony to the size of the change (the `run-change` skill automates this):

- **Lightweight** — typo/docs/formatting (edit directly, no spec), or refactor / dependency bump /
  trivial bugfix (micro-spec: Context + Tests + Checklist, then `run-tdd`).
- **Full** — new user-facing behavior, multi-stakeholder, or unclear scope → `gather-requirements`
  → full spec → `review-alignment` (semantic gate) → `run-tdd`. Schema/data changes use
  `migration-spec.md`.
