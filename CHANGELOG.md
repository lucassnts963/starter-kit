# Changelog

All notable changes to this project are documented here.
Generated automatically from `.specs/archive/` via the `update-changelog` skill.

---

## [Unreleased]

### Added
- **`spec-kit` CLI** (`bin/spec-kit.mjs`, run via `npx github:lucassnts963/starter-kit <cmd>`): the
  deterministic "hands" of the methodology — `init` / `adopt` / `upgrade` / `check`. It copies files
  from its own npx-fetched location (no separate clone), resets identity files, refreshes tooling,
  regenerates the skills index, and stamps the version; the agent skills still do the judgment parts.
  Solves the bootstrap chicken-egg (no manual clone) and makes the mechanical file ops reliable.

### Changed
- **Troubleshooting schema is now bilingual and groupable.** `check-consistency` accepts the required
  fields in English **or** Portuguese (`Sintoma`/`Causa`/`Solução`) and validates entries whether flat
  (`## TRB-NN`) or grouped by area (`## <Area>` + `### TRB-NN`). Previously a pt-BR or area-grouped
  troubleshooting file passed silently (zero entries recognised) instead of being validated.
  (Surfaced by a real pt-BR project's troubleshooting.md.)

### Fixed
- **Forward-only baseline** for the 1.1.0 traceability + alignment-gate checks: upgrading a mature
  repo no longer fails CI on specs archived before those rules existed. `upgrade` (and the
  `upgrade-methodology` skill) snapshot the existing archive into `.specs/baseline.json` when crossing
  into 1.1.0, and `check-consistency` grandfathers those legacy specs. Specs archived afterward comply.
  (Surfaced by upgrading a real 16-spec project.)

### Removed

---

## [1.1.0] - 2026-06-26

> Methodology version 1.1.0. See `METHODOLOGY.md## Methodology Versions` for the structure changelog.

### Added
- **Memory as an LLM-Wiki** (inspired by Karpathy's LLM-Wiki): `.specs/memory/troubleshooting.md`
  (topical error/fix memory, `TRB-NN`) with the `record-troubleshooting` skill, and an append-only
  `.specs/memory/log.md` working journal.
- **Two-tier consistency:** the `review-alignment` skill — an adversarial LLM check that a spec
  faithfully covers its requirements — producing a stamped `alignment-review.md` verdict.
- **Methodology versioning** (`.specs/config.md## Methodology Version`) and the `upgrade-methodology`
  skill, which brings an existing methodology project up to the kit's latest version non-destructively.
- **Generated skills index** (`.claude/skills/INDEX.md` via `scripts/update-skills-index.mjs`): the
  single source for the skills catalog, compiled from each `SKILL.md`. `AGENTS.md`/`README` reference
  it instead of hand-maintaining the list; `check-consistency` + CI enforce it stays in sync.
- **Session continuity** ("where you left off"): `scripts/session-context.mjs` summarizes the latest
  `log.md` entry, specs in flight (with alignment-gate state), and requirements without a spec. Wired
  as a Claude Code `SessionStart` hook (`.claude/settings.json`) and runnable via the `resume-session`
  skill (`"onde paramos"`) — harness-agnostic, silent when there's nothing to resume.

### Changed
- `check-consistency.mjs` gained four checks: troubleshooting-entry schema, requirements↔spec
  traceability integrity, no-dangling-`REQ`, and a **blocking alignment gate** on archived specs.
- `feature-spec.md` traceability now uses a portable relative Markdown link (GitHub + Obsidian); the
  canonical join key is the `REQ` id, not the link syntax.
- `run-change`, `run-tdd`, and `gather-requirements` now route through `review-alignment` at the
  requirements→spec transition and gate archiving on an `aligned` verdict.

### Fixed
- Projects bootstrapped from the kit no longer inherit the kit's own `CHANGELOG.md`. A clean
  `.specs/templates/changelog-template.md` is shipped, and `init-project`/`create-project` reset the
  project's `CHANGELOG.md` (plus `package.json` identity and `README.md`) from it; `adopt-project`
  creates a clean one only when the project has none.

### Removed

---

## [0.1.0] - 2026-06-02

### Added
- Initial release of the spec-driven + TDD starter kit.
