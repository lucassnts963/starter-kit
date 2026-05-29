# Architectural Decision Records

## ADR-001: Spec-Driven Development

- **Date:** {YYYY-MM-DD}
- **Status:** Accepted

**Context:** Without structured planning, scope creep and inconsistent implementation are risks. Complex projects need traceable decisions.

**Decision:** All changes (features, migrations, bugfixes) must go through a spec document in `.specs/changes/` before implementation. Specs follow templates in `.specs/templates/`. Completed specs are archived.

**Consequences:**
- Slightly slower start for small changes
- Better traceability and documentation
- Architectural decisions captured here
- Entity mapping stays current in `shared/`

---

## ADR-002: {DECISION_NAME}

- **Date:** {YYYY-MM-DD}
- **Status:** {Accepted | Proposed | Deprecated}

**Context:** {Situation that calls for a decision.}

**Decision:** {What was decided and why.}

**Consequences:** {Trade-offs and impact.}
