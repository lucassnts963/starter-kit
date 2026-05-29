# Code Conventions

## Frontend

### Styling
- {STYLING_APPROACH: inline CSS, CSS modules, Tailwind, styled-components}
- Pattern: {HOW_STYLES_ARE_DEFINED}

### Components
- {UI_LIBRARY_OR_NATIVE}
- Functional components with hooks
- One component per file (default export)
- Files named PascalCase

### State Management
- {STATE_APPROACH: React Context, Redux, Zustand, MobX}
- Local `useState` for component-level state

### Forms
- {FORM_PATTERN: modal overlay, inline form, drawer}

### Filtering / Search
- Use `useMemo` with the input state for client-side filtering
- Pattern:
  ```tsx
  const [search, setSearch] = useState("");
  const filtered = useMemo(() => {
    if (!search.trim()) return items;
    const term = search.toLowerCase();
    return items.filter(item => 
      item.field.toLowerCase().includes(term)
    );
  }, [items, search]);
  ```

### Data Fetching
- {API_CALL_METHOD: invoke, fetch, axios}
- Always handle loading, error, and empty states

### TypeScript
- All interfaces in `src/types/index.ts` (or co-located)
- Naming follows {NAMING_CONVENTION: snake_case from backend, camelCase, PascalCase}
- IDs: {UUID_v4_string | number | autoincrement}

---

## Backend

### Architecture
- **Repository pattern**: each entity has a module in `db/repository/`
- **Command handlers**: thin wrappers calling repository functions
- Entry point registers all handlers

### Models
- {MODEL_PATTERN}

### Naming
- Tables and columns: {snake_case | camelCase | PascalCase}
- Structs/Classes: {PascalCase | camelCase}
- IDs: {TYPE}

### Database
- {DB_ENGINE: SQLite, PostgreSQL, MySQL}
- Migrations via {DIESEL | PRISMA | KNEX | ALEMBIC}
- Connection pooling via {R2D2 | PG_POOL | built-in}

---

## Testing

### Framework
- {TEST_FRAMEWORK: Vitest, Jest, Mocha, Pytest, Cargo test}
- {COMPONENT_TEST_LIB: React Testing Library, Vue Test Utils, etc.}
- {E2E_FRAMEWORK: Playwright, Cypress}

### Test File Convention
- **Location:** co-located (`Component.test.tsx`) or `__tests__/` directory
- **Naming:** `<FileUnderTest>.test.{ts|tsx|rs|py}` or `<FileUnderTest>.spec.{ts|tsx|rs|py}`
- **Pattern:** one test file per source file

### Coverage
- **Threshold:** {COVERAGE_THRESHOLD}% (minimum)
- **Measured by:** {COVERAGE_TOOL: istanbul, c8, tarpaulin, coverage.py}
- Coverage reports generated on: `{TEST_COMMAND} --coverage`

### Test Types
| Type | Scope | Framework | Location |
|---|---|---|---|
| **Unit** | Single function/component | {UNIT_FRAMEWORK} | Co-located |
| **Integration** | Module/API interaction | {INTEGRATION_FRAMEWORK} | `tests/integration/` |
| **E2E** | Full user flows | {E2E_FRAMEWORK} | `tests/e2e/` |

### TDD Workflow (Mandatory)
1. **Read spec** → understand requirements and `## Tests` section
2. **Red** → write a failing test that validates the requirement
3. **Green** → write minimum code to make the test pass
4. **Refactor** → clean up code, ensure all tests still pass
5. **Repeat** → next test case until all spec requirements are covered

### Test Standards
- Tests must be **deterministic** (no flaky tests)
- Tests must be **independent** (no shared mutable state)
- Tests must have **descriptive names** following the pattern: `should <expected behavior> when <condition>`
- Mock external dependencies; never mock the unit under test
- Each bugfix MUST include a regression test

---

## Spec Files

- All spec documents in `.specs/`
- Templates in `.specs/templates/`
- Active specs in `.specs/changes/<nnn>-<slug>/`
- Completed specs moved to `.specs/archive/`
- Knowledge in `.specs/memory/`
- Reference docs in `.specs/shared/`
