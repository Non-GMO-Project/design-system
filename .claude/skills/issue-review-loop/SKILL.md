---
name: issue-review-loop
description: One pass of the design-system maintenance loop. Implements clear GitHub issues from org members and repo collaborators (branch, PR, squash-merge, summary comment), asks questions on unclear ones, and syncs direct commits to main that skipped the build (regenerates index.html, tokens, trademark pages and any docs that need follow-up). Run hourly with /loop.
---

# Issue review loop

One pass of the maintenance loop for `Non-GMO-Project/design-system`. Every pass does two jobs:

- **A. Direct edits.** Catch commits pushed to `main` without a pull request and compile them into the generated files and any other docs they affect.
- **B. Issues.** Work open issues from people with access to the repo.

Each pass is safe to repeat. If nothing changed since the last pass, it changes nothing.

## Start, stop and restart

- **Start (this session only):** `/loop 1h /issue-review-loop`. Pick "This session only" when asked. The session job runs at a fixed minute each hour and expires after 7 days.
- **Start (keeps running after the session closes):** pick "Cloud schedule" at the same prompt.
- **One pass by hand:** `/issue-review-loop`.
- **Stop:** `CronList`, then `CronDelete <id>`.
- **Restart after expiry or a new session:** start it again. The loop keeps its state in GitHub and in one local file (see A1), so nothing else needs setting up.

## Ground rules

- **Who counts.** An issue counts when its author is a member of the Non-GMO-Project org or a repo collaborator with write, maintain or admin permission:
  ```sh
  (gh api orgs/Non-GMO-Project/members --jq '.[].login'
   gh api repos/Non-GMO-Project/design-system/collaborators --jq '.[] | select(.permissions.push) | .login') | sort -u
  ```
- **Nobody reviews these PRs before they merge.** Only implement what is clear. When an issue is unclear, ask instead of guessing.
- **The repo is public.** Don't put internal links (Google Drive, Dropbox, internal tools), personal contact details or unreleased business information in docs, commits, PRs or comments.
- **Follow `CLAUDE.md`.** The docs in `docs/design-system/` are the source of truth. Never hand-edit generated files (`index.html`, `styles/tokens.css`, `trademark/*.html`) or the content between the `scales`, `pairings` and `palette` markers. Never invent brand values; leave a `TODO(design)` or `TODO(brand)` instead. Never redraw, recolor or generate logos and seals.
- **Attribution.** End commit messages and PR bodies with the attribution lines the session gives for commits and pull requests.

## Workspace

Work in a git worktree of this repo, never the main checkout. Start every pass from a clean, detached `origin/main`:

```sh
git fetch -q origin
git status --porcelain        # must be empty; if not, stop and report
git switch --detach origin/main
[ -d node_modules ] && npm ls --silent >/dev/null 2>&1 || npm ci
```

Without `node_modules` the build falls back to placeholder icons and leaves out the fonts. That is a false diff, so install first.

## A. Direct edits

Commits pushed straight to `main` skip the pre-commit hook (always true for edits made in the GitHub web editor). The generated files then lag behind the docs, and follow-ups like the asset inventory or changelog get missed.

### A1. Find direct commits

The last commit the loop has synced is stored per machine, outside the repo:

```sh
STATE="$(git rev-parse --git-common-dir)/issue-review-loop-last-sync"
BASE=$(cat "$STATE" 2>/dev/null || true)
```

- If `BASE` is missing or no longer an ancestor of `origin/main`, use the most recent commit on `origin/main` whose subject ends in `(#N)` (a squash-merged PR).
- List `git log --format='%H %an %s' "$BASE"..origin/main`.
- A commit is **direct** if GitHub links no PR to it:
  ```sh
  gh api repos/Non-GMO-Project/design-system/commits/<sha>/pulls --jq length   # 0 = direct
  ```

### A2. Check that the generated files are current

Do this every pass, even when A1 finds no direct commits:

```sh
npm run colors      # only when scripts/palette.config.json changed in a direct commit
npm run build       # first line must say 0 errors
npm run check
git status --porcelain
```

If `npm run check` passes and the tree is clean, generation is up to date.

### A3. Review each direct commit for follow-ups

Read each direct commit's diff (`git show --stat <sha>`, then the full diff). Fix only what the edit leaves inconsistent. Never change what the author wrote or decided.

| The direct commit… | Follow-up |
|---|---|
| Edits a doc, the palette config, a script or `public/brand/` | Rebuild: `index.html`, `styles/tokens.css`, `trademark/*.html` |
| Edits `scripts/palette.config.json` | `npm run colors` to rewrite the scales, pairings and palette block |
| Hand-edits content between generator markers, or a generated file | Move the change to its source (palette config or doc), then regenerate. If the intent isn't clear, ask in an issue (A5) |
| Adds or renames a file in `public/brand/` | Add or fix its row in the asset inventory in `04-logos-and-marks.md` |
| Adds a doc file | Add it to the file table in `docs/design-system/README.md` and to the CLAUDE block's topic list |
| Renames a heading or table column the showcase reads | Update the lookup in `scripts/showcase/render.mjs` (the build reports the section as missing) |
| Changes what the system says (a rule, value, section or asset) | Add a changelog row in `README.md`, bump the version (breaking token changes bump the first number), and credit the commit: "Direct edit by @author in `abc1234`" |
| Changes a `trademark/*.md` doc | Make sure it still follows the program's trademark use guide, then rebuild its participant page |
| Only fixes typos or wording | Rebuild only. No changelog row |

### A4. Merge the sync

If A2 or A3 changed anything:

1. Branch from `origin/main`: `sync/direct-edits-YYYY-MM-DD`.
2. Rebuild. Confirm `npm run build` shows 0 errors and `npm run check` passes.
3. Commit with a message that lists the direct commits being synced.
4. Push, open a PR, and squash-merge with `gh pr merge --squash --delete-branch`. The PR body should cover:
   - which direct commits it syncs (sha, author, subject)
   - the files regenerated
   - each follow-up and why

   A warning about deleting the local branch is expected in a worktree.
5. `git switch --detach origin/main` after `git fetch`.

### A5. When a direct edit can't be synced safely

Don't revert it, and don't merge broken output. Open an issue, mention the author, and list exactly what is wrong. Examples:

- the build reports errors such as contrast, missing assets, unknown icons or undefined tokens
- the edit breaks a hard rule in `README.md`
- the edit hand-edits generated content and its intent is unclear

Leave the generated files as they are until someone answers.

### A6. Record progress

After the sync merges, or right away when there was nothing to sync, write the new head:

```sh
git fetch -q origin && git rev-parse origin/main > "$STATE"
```

Skip this step when A5 opened an issue, so the next pass looks at those commits again.

## B. Issues

### B1. Pick issues

```sh
gh issue list --state open --json number,title,author,comments,updatedAt
gh pr list --state open --json number,title,body,headRefName
```

Skip an issue when:

- its author doesn't count (see Ground rules)
- an open PR already references it
- the loop already asked a question on it and nobody has commented since

The loop's comments post as the same account that may also have opened the issue. Treat any comment after the loop's question as the reply.

### B2. Decide: clear or unclear

Read the body, every comment and every attached image (download images to the scratchpad and look at them).

The issue is **unclear** if any of these holds:

- it has several reasonable readings
- details are missing
- it needs a brand or design value the style guide doesn't give
- it conflicts with a hard rule in `README.md` or with `08-accessibility.md`

For an unclear issue, post one comment with specific, numbered questions. Say what you would do for each likely answer. Then move on.

### B3. Implement a clear issue

1. Branch from `origin/main`, for example `issue-N-short-slug`.
2. Make the change following `CLAUDE.md` and the relevant docs. Update everything the change touches:
   - the docs
   - `render.mjs` lookups, when headings or columns change
   - the asset inventory, for new artwork
   - the README file table and CLAUDE block, for a new doc
   - a changelog row and version bump in `README.md` naming the issue (`#N`)
3. `npm run build` must show 0 errors, and `npm run check` must pass.
4. Commit, push, open a PR whose body includes `Closes #N`, then `gh pr merge --squash --delete-branch`.
5. `git fetch -q origin && git switch --detach origin/main`.

### B4. Close the loop on the issue

After the merge, comment on the closed issue with:

- what changed, by file
- the visible effect in the showcase or participant pages
- any `TODO`s left open
- a link to the PR

Someone reading the issue should understand the result without opening the PR.

## Report

End every pass with a short summary:

- direct commits found and synced
- issues merged, with their PR numbers
- questions posted
- issues still waiting on an answer

Send a push notification only when something merged, a question was posted, or an issue was opened about a direct edit.
