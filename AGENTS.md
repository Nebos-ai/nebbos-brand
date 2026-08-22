# AGENTS.md — nebbos-brand

<!-- derives-from: nebos-governance/docs/agents/BASELINE.md -->

Brand-tokens package (`@nebbos/brand`): design tokens, fonts, logos. Minimal surface — but governed.

<!-- Governance binding (ADR-86 structure class / ADR-76 AD-7): bind this surface into the
     living agent-governance map. Canonical shared rules live in the `Nebos-ai/nebos-governance`
     root `AGENTS.md`; the map is `nebos-governance/docs/governance/agent_governance_map.md`. -->
@docs/governance/agent_governance_map.md

> **Shared org rules (canonical):** this repo inherits the org-wide shared-rule index in the
> **`Nebos-ai/nebos-governance` root `AGENTS.md`** (the canonical baseline). Read it before any edit.

## This repo

- Pure brand-token / asset package; no application surface.
- `main` is branch-protected (≥1 review, no force-push) — open a PR, never commit on `main`.
- Token/asset changes ship via PR; downstream surfaces consume the published package.
