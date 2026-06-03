# CLAUDE.md

This project uses `AGENTS.md` as the single, harness-agnostic instruction source for AI agents
(read by both opencode and Claude Code). To avoid drift, this file simply imports it:

@AGENTS.md

Skills live in `.claude/skills/<name>/SKILL.md` and are discovered automatically. See the **Skills**
and **Choosing the Change Path** sections in `AGENTS.md`, and `.specs/config.md## Skill Format`
for how skills are structured.
