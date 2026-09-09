---
doc_id: BASELINE-pointer
doc_type: pointer
source: nebos-governance/docs/agents/BASELINE.md
extracted_at: 2026-08-22
ratifying_authority: Constitution Article XV (nebos-governance PR #2222)
rssb_task: RSSB-21 W3a rollout
---

# BASELINE.md — pointer

This repo's canonical AGENTS.md baseline lives at
`nebos-governance/docs/agents/BASELINE.md` (v1.0.0). Every rule in that
baseline binds this repo's AGENTS.md as its shared floor.

**Rationale for pointer over copy**: per Constitution Article XV para 5,
the baseline is versioned in nebos-governance; per-repo copies would drift.
This pointer file satisfies `check_baseline_md_exists.py` (which accepts
"top-level pointer" per its docstring) while keeping the canonical text
single-sourced.

To read the baseline:
```bash
gh api repos/Nebos-ai/nebos-governance/contents/docs/agents/BASELINE.md \
    -H "Accept: application/vnd.github.raw" > /tmp/BASELINE.md
```

Or navigate: https://github.com/Nebos-ai/nebos-governance/blob/main/docs/agents/BASELINE.md
