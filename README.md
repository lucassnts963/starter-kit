# Starter Kit — Spec-Driven + TDD Methodology

Um kit de partida para projetos de software com metodologia integrada de engenharia de requisitos, desenvolvimento orientado a especificações e TDD.

## Metodologia

Este starter-kit implementa um fluxo completo de engenharia de software:

```
IDEA BRUTA
  → ELICITAÇÃO (requirements-gathering: User Stories, Use Cases, Job Stories, BDD)
    → ANÁLISE (MoSCoW, stakeholders, riscos, dependências)
      → ESPECIFICAÇÃO (specs em .specs/changes/)
        → TDD (Red → Green → Refactor)
          → ARQUIVO (specs completas em .specs/archive/)
```

### Pilares

| Pilar | Descrição |
|---|---|
| **Requirements Engineering** | Elicitação e análise de requisitos antes de qualquer código |
| **Spec-Driven Development** | Toda mudança passa por um documento de especificação |
| **Test-Driven Development** | Testes escritos antes da implementação (Red → Green → Refactor) |
| **ADR (Architecture Decision Records)** | Decisões de arquitetura documentadas e rastreáveis |
| **AI-Agent Friendly** | Estrutura otimizada para agentes de IA via `AGENTS.md` e skills |

## Uso Rápido

### 1. Copie o starter-kit

```bash
git clone https://github.com/lucassnts963/starter-kit.git meu-projeto
cd meu-projeto
rm -rf .git
git init
```

### 2. Execute o bootstrap interativo

Diga ao seu agente de IA: `"start project"` ou `"iniciar projeto"`

A skill `init-project` fará 9 perguntas sobre sua stack (shell, frontend, backend, banco, testes, cobertura, linguagem, package manager) e preencherá os templates automaticamente.

### 3. Comece a desenvolver

Diga ao agente: `"levantar requisitos"` para iniciar a elicitação com a skill `requirements-gathering`.

## Estrutura de Diretórios

```
├── .opencode/
│   └── skills/                    # Skills para agentes de IA
│       ├── create-skill.md        # Como criar novas skills
│       ├── init-project.md        # Bootstrap de projeto novo
│       ├── requirements-gathering.md  # Elicitação de requisitos
│       └── tdd-workflow.md        # Ciclo TDD integrado às specs
│
├── .specs/
│   ├── requirements/              # Documentos de elicitação e análise
│   │   └── <nnn>-<slug>/
│   │       └── requirements.md
│   ├── changes/                   # Specs ativas (implementação)
│   │   └── <nnn>-<slug>/
│   │       └── spec.md
│   ├── templates/                 # Templates reutilizáveis
│   │   ├── requirements-spec.md   # Template de requisitos (15 seções)
│   │   ├── feature-spec.md        # Template de feature
│   │   ├── bugfix-spec.md         # Template de bugfix
│   │   ├── migration-spec.md      # Template de migração
│   │   └── test-spec.md           # Template de cobertura de testes
│   ├── archive/                   # Specs concluídas
│   ├── memory/                    # Conhecimento persistente
│   │   ├── architecture.md        # ADRs
│   │   ├── conventions.md         # Convenções de código
│   │   └── glossary.md            # Glossário de domínio
│   └── shared/                    # Documentos de referência
│       ├── schema-current.md
│       ├── schema-target.md
│       └── entity-map.md
│
├── AGENTS.md                      # Instruções para agentes de IA
├── METHODOLOGY.md                 # Guia completo da metodologia
└── README.md
```

## Templates de Especificação

| Template | Quando usar |
|---|---|
| `requirements-spec.md` | Elicitação: problem statement, stakeholders, user stories, use cases, job stories, BDD, MoSCoW |
| `feature-spec.md` | Features novas: design, estados, edge cases, traceability |
| `bugfix-spec.md` | Correções: reprodução, causa raiz, teste de regressão |
| `migration-spec.md` | Migrações: schema, dados, rollback |
| `test-spec.md` | Cobertura de testes: plano de testes unitários, integração, e2e |

## Skills Disponíveis

| Skill | Trigger | Função |
|---|---|---|
| `init-project` | `"start project"`, `"iniciar projeto"` | Bootstrap interativo de projeto novo |
| `requirements-gathering` | `"levantar requisitos"`, `"requirements"` | Elicitação guiada de requisitos |
| `tdd-workflow` | `"TDD"`, `"test first"` | Ciclo Red → Green → Refactor |
| `create-skill` | `"create a skill"`, `"criar uma skill"` | Criar novas skills padronizadas |

## Tecnologias Suportadas

O starter-kit é agnóstico a tecnologia. Templates e placeholders suportam:

| Camada | Opções |
|---|---|
| **Shell** | Tauri, Electron, Wails, Web, CLI, Mobile, Library |
| **Frontend** | React, Vue, Svelte, Angular, Solid, HTMX, Vanilla |
| **Backend** | Rust, Node, Python, Go, C#, Java, Elixir |
| **Database** | SQLite, PostgreSQL, MySQL, MongoDB, SurrealDB |
| **Testes** | Vitest, Jest, Pytest, Cargo test, Go test, JUnit, xUnit |

## Convenções

- **IDs sequenciais** por projeto: o mesmo número rastreia `requirements/` → `changes/` → `archive/`
- **Slugs kebab-case**: `001-search-fields`, `002-fix-encoding`
- **Placeholders** `{ENTRE_CHAVES}`: devem ser substituídos por valores reais do projeto
- **Testes primeiro**: nunca escreva implementação antes de testes
- **Bugfix = regression test**: todo bugfix começa com um teste que reproduz o bug

## Referência Rápida de Comandos

| Comando | Descrição |
|---|---|
| `git clone https://github.com/lucassnts963/starter-kit.git <projeto>` | Criar novo projeto |
| `"start project"` | Iniciar bootstrap com agente de IA |
| `"levantar requisitos"` | Iniciar elicitação de requisitos |
| Ver `METHODOLOGY.md` | Guia completo da metodologia |

## Licença

MIT
