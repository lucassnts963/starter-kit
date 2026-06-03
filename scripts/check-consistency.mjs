#!/usr/bin/env node
// Validates the starter-kit's own structural conventions. Deterministic replacement for the
// prose checklist that used to live inside the check-consistency skill.
//
// Usage: node scripts/check-consistency.mjs
// Exit code 0 = all checks pass; 1 = one or more violations.

import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { join, dirname, resolve, basename } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const SKILLS_DIR = join(ROOT, ".claude", "skills");
const CONFIG = join(ROOT, ".specs", "config.md");
const CHANGELOG = join(ROOT, "CHANGELOG.md");
const ARCHIVE_DIR = join(ROOT, ".specs", "archive");

const NAME_RE = /^[a-z]+(-[a-z]+)+$/;
const CANONICAL_SECTIONS = [
  "## Purpose",
  "## Prerequisites",
  "## Instructions",
  "## Output",
  "## Examples",
  "## References",
];
const REPO_URL_LITERAL = "github.com/lucassnts963/starter-kit";
// Patterns require the `.md` suffix so prose that merely names the old files (e.g. config.md
// describing what this checker looks for) is not flagged — only real broken references are.
const ORPHAN_PATTERNS = [
  /\.opencode\/skills\/[a-z-]+\.md/, // old flat skill paths
  /\btdd-workflow\.md\b/,
  /\brequirements-gathering\.md\b/,
];

const violations = [];
const passes = [];
const violate = (msg) => violations.push(msg);
const pass = (msg) => passes.push(msg);

/**
 * Parse a leading `---` YAML frontmatter block. Line-based so YAML block scalars (`>-`, `|`)
 * spanning multiple indented lines are captured correctly. Returns { name, description } or null.
 */
function parseFrontmatter(text) {
  text = text.replace(/\r\n/g, "\n"); // tolerate CRLF (Windows autocrlf checkouts)
  if (!text.startsWith("---")) return null;
  const end = text.indexOf("\n---", 3);
  if (end === -1) return null;
  const lines = text.slice(3, end).split("\n");

  const scalars = {}; // top-level key -> string value
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^([a-zA-Z_]+):\s*(.*)$/); // top-level key (no indentation)
    if (!m) continue;
    const [, key, inline] = m;
    if (inline && !/^[>|]/.test(inline)) {
      scalars[key] = inline.trim();
      continue;
    }
    // Block scalar (or empty inline): gather following indented lines.
    const parts = [];
    for (let j = i + 1; j < lines.length && /^\s+\S/.test(lines[j]); j++) parts.push(lines[j].trim());
    scalars[key] = parts.join(" ").trim();
  }
  return { name: scalars.name || null, description: scalars.description || null };
}

function listSkillDirs() {
  if (!existsSync(SKILLS_DIR)) return [];
  return readdirSync(SKILLS_DIR).filter((d) =>
    statSync(join(SKILLS_DIR, d)).isDirectory()
  );
}

function walkMarkdown(dir, acc = []) {
  if (!existsSync(dir)) return acc;
  for (const entry of readdirSync(dir)) {
    if (entry === "node_modules" || entry === ".git") continue;
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) walkMarkdown(full, acc);
    else if (entry.endsWith(".md")) acc.push(full);
  }
  return acc;
}

// --- Check 1: skill folder + frontmatter + sections ---
function checkSkills() {
  const dirs = listSkillDirs();
  if (dirs.length === 0) {
    violate("No skills found under .claude/skills/");
    return;
  }
  for (const dir of dirs) {
    const skillFile = join(SKILLS_DIR, dir, "SKILL.md");
    if (!existsSync(skillFile)) {
      violate(`${dir}/: missing SKILL.md`);
      continue;
    }
    const text = readFileSync(skillFile, "utf8");
    const fm = parseFrontmatter(text);
    if (!fm) {
      violate(`${dir}/SKILL.md: missing or malformed YAML frontmatter`);
      continue;
    }
    if (!fm.name) violate(`${dir}/SKILL.md: frontmatter missing 'name'`);
    else if (fm.name !== dir)
      violate(`${dir}/SKILL.md: name '${fm.name}' must match folder '${dir}'`);
    else if (!NAME_RE.test(fm.name))
      violate(`${dir}/SKILL.md: name '${fm.name}' must be verb-substantive (lowercase, hyphens)`);

    if (!fm.description || fm.description.length < 40)
      violate(`${dir}/SKILL.md: 'description' missing or too short (be specific, embed triggers)`);

    const missing = CANONICAL_SECTIONS.filter((s) => !text.includes(s));
    if (missing.length) violate(`${dir}/SKILL.md: missing sections: ${missing.join(", ")}`);

    if (!violations.some((v) => v.startsWith(`${dir}/`)))
      pass(`skill ${dir}: frontmatter + 6 sections OK`);
  }
}

// --- Check 2: skills must not hardcode the repo URL (docs/badges may) ---
function checkHardcoded() {
  const files = walkMarkdown(SKILLS_DIR);
  let found = false;
  for (const f of files) {
    if (readFileSync(f, "utf8").includes(REPO_URL_LITERAL)) {
      violate(`${rel(f)}: skill hardcodes repo URL — reference .specs/config.md## Repository`);
      found = true;
    }
  }
  if (!found) pass("hardcoded values: no skill hardcodes the repo URL");
}

// --- Check 3: orphaned references to renamed files/skills ---
function checkOrphans() {
  const files = walkMarkdown(ROOT).filter((f) => !f.includes(`${join(".git")}`));
  let found = false;
  for (const f of files) {
    if (basename(f) === "check-consistency.mjs") continue;
    const text = readFileSync(f, "utf8");
    for (const re of ORPHAN_PATTERNS) {
      if (re.test(text)) {
        violate(`${rel(f)}: orphaned reference matching ${re}`);
        found = true;
      }
    }
  }
  if (!found) pass("orphaned references: none");
}

// --- Check 4: changelog covers archived specs (and vice-versa) ---
function checkChangelog() {
  if (!existsSync(ARCHIVE_DIR)) return pass("changelog: no archive yet (skipped)");
  const specDirs = readdirSync(ARCHIVE_DIR).filter(
    (d) => statSync(join(ARCHIVE_DIR, d)).isDirectory() && d !== ".gitkeep"
  );
  const archivedIds = [];
  for (const d of specDirs) {
    const spec = join(ARCHIVE_DIR, d, "spec.md");
    if (!existsSync(spec)) continue;
    const m = readFileSync(spec, "utf8").match(/\b(CHG|FIX|MIG)-\d+\b/);
    if (m) archivedIds.push(m[0]);
  }
  if (archivedIds.length === 0) return pass("changelog: archive empty (skipped)");

  const changelog = existsSync(CHANGELOG) ? readFileSync(CHANGELOG, "utf8") : "";
  const changelogIds = [...changelog.matchAll(/\b(CHG|FIX|MIG)-\d+\b/g)].map((m) => m[0]);

  for (const id of archivedIds)
    if (!changelogIds.includes(id)) violate(`changelog: ${id} archived but missing from CHANGELOG.md`);
  for (const id of changelogIds)
    if (!archivedIds.includes(id)) violate(`changelog: ${id} in CHANGELOG.md but not in archive (stale)`);

  if (!violations.some((v) => v.startsWith("changelog:")))
    pass(`changelog: ${archivedIds.length} archived specs, all covered`);
}

function rel(p) {
  return p.slice(ROOT.length + 1).replace(/\\/g, "/");
}

// --- Run ---
checkSkills();
checkHardcoded();
checkOrphans();
checkChangelog();

console.log("Consistency check\n");
for (const p of passes) console.log(`  OK   ${p}`);
if (violations.length) {
  console.log("");
  for (const v of violations) console.log(`  FAIL ${v}`);
  console.log(`\n${violations.length} violation(s) found.`);
  process.exit(1);
}
console.log("\nAll checks passed.");
