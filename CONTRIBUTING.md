# Contributing

## Setup

```bash
bun install
bun run dev
```

Requires Bun `>=1.3.14` (see `package.json`'s `engines` field). See
[README.md](README.md) for the dev loop, release process, and known
Windows dev-mode issues.

## Workflow

Work here is issue-driven: every change starts from a GitHub issue, not
from a conversation or a PR opened cold. See
[AGENTS.md](AGENTS.md#workflow-follow-this-before-writing-any-code) for
the full workflow this repo (and any AI agent working in it) follows.
Short version:

1. Pick an open issue, or file one if what you want to do isn't tracked
   yet ([issue list](https://github.com/draylegend/letora/issues)).
2. Create a branch from that issue's page on GitHub ("create a branch"
   link) — this names it `<issue-number>-<slug>` for you.
3. Check the branch out locally and implement.
4. Open a PR against `dev` (the main branch here, not `main`).

## Before opening a PR

```bash
bunx nx run-many -t lint test typecheck
bunx nx build desktop --configuration=dev
```

This is what CI runs (`.github/workflows/ci.yml`). A `pre-commit` hook
already runs formatting, lint --fix, and tests on staged files, and a
`commit-msg` hook enforces commit message format — see below.

## Commit messages

Enforced by commitlint ([Conventional Commits](https://www.conventionalcommits.org/)):

```
<type>(<scope>): <short summary>
```

`type` is one of `feat`, `fix`, `chore`, `docs`, etc.; `scope` is
optional and usually a project or area name (`desktop`, `eslint`,
`deps`). Examples from this repo's history:

```
feat(desktop): add lint and typecheck coverage
fix(eslint): configure tailwindcss plugin and error on violations
chore(deps): update
```
