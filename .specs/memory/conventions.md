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

## Spec Files

- All spec documents in `.specs/`
- Templates in `.specs/templates/`
- Active specs in `.specs/changes/<nnn>-<slug>/`
- Completed specs moved to `.specs/archive/`
- Knowledge in `.specs/memory/`
- Reference docs in `.specs/shared/`
