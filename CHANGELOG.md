# Changelog

All notable changes to this project are documented here.
Generated automatically from `.specs/archive/` via the `update-changelog` skill.

---

## [Unreleased]

> Methodology version 1.1.0. See `METHODOLOGY.md## Methodology Versions` for the structure changelog.

### Added
- **Memory as an LLM-Wiki** (inspired by Karpathy's LLM-Wiki): `.specs/memory/troubleshooting.md`
  (topical error/fix memory, `TRB-NN`) with the `record-troubleshooting` skill, and an append-only
  `.specs/memory/log.md` working journal.
- **Two-tier consistency:** the `review-alignment` skill — an adversarial LLM check that a spec
  faithfully covers its requirements — producing a stamped `alignment-review.md` verdict.
- **Methodology versioning** (`.specs/config.md## Methodology Version`) and the `upgrade-methodology`
  skill, which brings an existing methodology project up to the kit's latest version non-destructively.

### Changed
- `check-consistency.mjs` gained four checks: troubleshooting-entry schema, requirements↔spec
  traceability integrity, no-dangling-`REQ`, and a **blocking alignment gate** on archived specs.
- `feature-spec.md` traceability now uses a portable relative Markdown link (GitHub + Obsidian); the
  canonical join key is the `REQ` id, not the link syntax.
- `run-change`, `run-tdd`, and `gather-requirements` now route through `review-alignment` at the
  requirements→spec transition and gate archiving on an `aligned` verdict.

### Fixed

### Removed

---

## [0.1.0] - 2026-06-02

### Added
- Initial release of the spec-driven + TDD starter kit.
