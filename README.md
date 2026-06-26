# Starter Kit — Spec-Driven + TDD Methodology

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Methodology](https://img.shields.io/badge/methodology-spec--driven_%2B_TDD-blue)](https://github.com/lucassnts963/starter-kit/blob/master/METHODOLOGY.md)
[![AI Ready](https://img.shields.io/badge/AI_Agent-ready-green)](https://github.com/lucassnts963/starter-kit/blob/master/AGENTS.md)
![Status](https://img.shields.io/badge/status-stable-brightgreen)

Um kit de partida para projetos de software com metodologia integrada de engenharia de requisitos, desenvolvimento orientado a especificações e TDD.

## Metodologia

Este starter-kit implementa um fluxo completo de engenharia de software:

```
IDEA BRUTA
  → ELICITAÇÃO (gather-requirements: User Stories, Use Cases, Job Stories, BDD)
    → ANÁLISE (MoSCoW, stakeholders, riscos, dependências)
      → ESPECIFICAÇÃO (specs em .specs/changes/)
        → TDD (Red → Green → Refactor)
          → ARQUIVO (specs completas em .specs/archive/)
        ↙
MEMÓRIA (clean-code.md, component-catalog.md)
CONSISTÊNCIA (check-consistency pré-commit)
```

### Pilares

| Pilar | Descrição |
|---|---|
| **Requirements Engineering** | Elicitação e análise de requisitos antes de qualquer código |
| **Spec-Driven Development** | Toda mudança passa por um documento de especificação |
| **Test-Driven Development** | Testes escritos antes da implementação (Red → Green → Refactor) |
| **ADR (Architecture Decision Records)** | Decisões de arquitetura documentadas e rastreáveis |
| **Clean Code** | SOLID, métricas e anti-padrões definidos em `.specs/memory/clean-code.md` |
| **Reusable Catalog** | Catálogo vivo de componentes reutilizáveis em `.specs/memory/component-catalog.md` |
| **Consistency** | Validação automática de skills e convenções via `check-consistency` |
| **AI-Agent Friendly** | Estrutura otimizada para agentes de IA via `AGENTS.md` e skills |

## Uso Rápido

### 1. (Recomendado) One-shot com skill

Diga ao seu agente de IA: `"criar novo projeto"` ou `"create new project"`

A skill `create-project` faz **tudo automaticamente**: clona o starter-kit do GitHub, limpa o `.git`, e inicia o bootstrap interativo com as 9 perguntas da stack. Nenhum comando manual necessário.

### 2. (Alternativo) Clone manual

```bash
git clone https://github.com/lucassnts963/starter-kit.git meu-projeto
cd meu-projeto
rm -rf .git
git init
```

Diga ao seu agente de IA: `"start project"` ou `"iniciar projeto"`

A skill `init-project` fará 9 perguntas sobre sua stack (shell, frontend, backend, banco, testes, cobertura, linguagem, package manager) e preencherá os templates automaticamente.

### Projeto já existente? Adote a metodologia

Se você **já tem um projeto** com código, não use `create-project`/`init-project` (são para projeto
novo). Dentro do repositório existente, diga: `"adotar metodologia"` ou `"adopt methodology"`.

A skill `adopt-project` **detecta** sua stack (sem perguntas cegas), traz os arquivos da metodologia
**sem sobrescrever** nada do projeto, **rascunha** os documentos de memória a partir do seu código
real (convenções, catálogo de componentes, schema, ADR da stack) e registra um **baseline de
cobertura forward-only** (TDD obrigatório só para mudanças novas).

### 3. Comece a desenvolver

Diga ao agente: `"levantar requisitos"` para iniciar a elicitação com a skill `gather-requirements`,
ou `"mudança rápida"` para o caminho leve.

## Estrutura de Diretórios

```
├── .claude/
│   └── skills/                     # Skills (descobertas por opencode E Claude Code)
│       └── <nome>/SKILL.md         # Uma pasta por skill, com frontmatter name+description
│           # check-consistency, create-project, create-skill, gather-requirements,
│           # init-project, record-troubleshooting, run-change, run-tdd, update-changelog
│
├── scripts/
│   ├── check-consistency.mjs       # Validador determinístico (roda no CI)
│   └── update-changelog.mjs        # Gera changelog a partir do archive (idempotente)
│
├── .github/workflows/consistency.yml  # CI: valida skills + changelog em cada push/PR
│
├── .specs/
│   ├── config.md                  # Fonte única de constantes (URL, stacks, defaults, formato de skill)
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
│   ├── memory/                    # Conhecimento persistente (LLM-Wiki: ver METHODOLOGY.md §6)
│   │   ├── architecture.md        # ADRs
│   │   ├── clean-code.md          # Padrões de código limpo (SOLID, métricas)
│   │   ├── component-catalog.md   # Catálogo de código reutilizável
│   │   ├── conventions.md         # Convenções de código
│   │   ├── glossary.md            # Glossário de domínio
│   │   ├── troubleshooting.md     # Memória de erros e estratégias de correção (TRB-NN)
│   │   └── log.md                 # Journal cronológico append-only (sessão a sessão)
│   └── shared/                    # Documentos de referência
│       ├── schema-current.md
│       ├── schema-target.md
│       └── entity-map.md
│
├── AGENTS.md                      # Instrução-raiz para agentes (índice de skills, fast-path)
├── CLAUDE.md                      # Importa AGENTS.md (@AGENTS.md) — evita divergência
├── CHANGELOG.md                   # Histórico de mudanças (gerado do archive)
├── METHODOLOGY.md                 # Guia completo da metodologia
├── package.json                   # Scripts de tooling do kit (check, changelog)
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
| `check-consistency` | `"verificar consistência"`, `"check consistency"` | Valida skills, catálogo e convenções |
| `update-changelog` | `"atualizar changelog"`, `"update changelog"` | Gera changelog a partir do archive |
| `create-project` | `"criar novo projeto"`, `"create new project"`, `"começar do zero"` | One-shot: clone + limpeza + bootstrap |
| `init-project` | `"iniciar projeto"`, `"start project"`, `"bootstrap project"` | Bootstrap interativo (projeto já clonado) |
| `adopt-project` | `"adotar metodologia"`, `"adopt methodology"`, `"adicionar metodologia"` | Adota a metodologia em projeto existente (sem clobber) |
| `gather-requirements` | `"levantar requisitos"`, `"gather requirements"`, `"elicitar requisitos"` | Elicitação guiada de requisitos |
| `run-change` | `"mudança rápida"`, `"quick change"`, `"fazer mudança"`, `"run change"` | Roteador de cerimônia: caminho leve vs completo |
| `run-tdd` | `"executar TDD"`, `"run TDD cycle"`, `"TDD"`, `"write tests"` | Ciclo Red → Green → Refactor |
| `record-troubleshooting` | `"registrar troubleshooting"`, `"record troubleshooting"`, `"registrar solução"` | Grava erro/correção em `memory/troubleshooting.md` |
| `create-skill` | `"criar skill"`, `"create skill"`, `"adicionar skill"` | Criar novas skills padronizadas |

## Tecnologias Suportadas

O starter-kit é agnóstico a tecnologia. Veja `.specs/config.md` para a lista completa de stacks suportadas.

| Camada | Opções |
|---|---|
| **Shell** | Tauri, Electron, Wails, Web, CLI, Mobile, Library |
| **Frontend** | React, Vue, Svelte, Angular, Solid, HTMX, Vanilla |
| **Backend** | Rust, Node, Python, Go, C#, Java, Elixir |
| **Database** | SQLite, PostgreSQL, MySQL, MongoDB, SurrealDB |
| **Testes** | Vitest, Jest, Pytest, Cargo test, Go test, JUnit, xUnit |

## Convenções

- **Backend:** Repository (dados locais), Adapter (API externa), Service (lógica de negócio)
- **Clean Code:** SOLID, funções ≤20 linhas, ≤3 parâmetros, injeção de dependência — veja `.specs/memory/clean-code.md`
- **Reutilização:** consulte `.specs/memory/component-catalog.md` antes de criar código novo
- **IDs sequenciais** por projeto: o mesmo número rastreia `requirements/` → `changes/` → `archive/`
- **Slugs kebab-case**: `001-search-fields`, `002-fix-encoding`
- **Placeholders** `{ENTRE_CHAVES}`: devem ser substituídos por valores reais do projeto
- **Testes primeiro**: nunca escreva implementação antes de testes
- **Bugfix = regression test**: todo bugfix começa com um teste que reproduz o bug
- **Consistência**: execute `"verificar consistência"` antes de commits em skills ou config

## Referência Rápida de Comandos

| Comando | Descrição |
|---|---|
| `"criar novo projeto"` | One-shot: criar projeto do zero (clone + bootstrap) |
| `"iniciar projeto"` | Bootstrap interativo (projeto já clonado) |
| `"adotar metodologia"` | Adotar a metodologia em projeto existente (detecta stack, sem clobber) |
| `"mudança rápida"` | Roteador de cerimônia: leve vs completo |
| `"levantar requisitos"` | Iniciar elicitação de requisitos |
| `"executar TDD"` | Ciclo Red → Green → Refactor |
| `"registrar troubleshooting"` | Gravar erro + estratégia de correção em `memory/troubleshooting.md` |
| `"criar skill"` | Criar nova skill padronizada |
| `"verificar consistência"` | Validar skills, catálogo e convenções |
| `"atualizar changelog"` | Gerar changelog a partir do archive |
| Ver `METHODOLOGY.md` | Guia completo da metodologia |

## Licença

MIT
