---
name: new-post
description: Publish a new essay to Siddharth's blog. Use when the user pastes a draft or says "new post", "publish this", or "post this essay".
---

# Publish a new post

The owner is not a programmer. Do all file and git work yourself, keep explanations short, and never ask them to run commands.

## 1. Get the draft
Use the text the user pasted (or the file they point to). If there's no draft yet, ask for it and stop.

## 2. Prepare the post
Propose, in one short message, and wait for "yes" or edits:
- **Title**: the user's title, or suggest one if missing.
- **Dek**: one sentence summarizing the piece (shown under the title and in lists).
- **Topics**: one or two from `topics` in `src/_data/site.yaml`. Don't invent new topics unless the user asks; if they do, add it to that list.
- **Date**: today, unless they say otherwise.

Keep the user's words. Only fix obvious typos, and say which ones you fixed. Convert formatting to Markdown: `##` for section headings, `>` for quotes, `[^1]` footnotes with definitions at the bottom. Images go in `src/assets/images/` and are referenced as `/assets/images/name.jpg`.

## 3. Write the file
Create `src/posts/YYYY-MM-DD-short-slug.md` (lowercase slug from the title, hyphens, at most ~6 words):

```markdown
---
title: The Title
dek: One-sentence summary.
topics: [AI]
---

Post body…
```

If the user wants to save it without publishing, add `draft: true` to the front matter and stop after the preview.

## 4. Preview
Make sure the local preview is running (`npm start` in this folder, serves http://localhost:8080). Open the new post at `http://localhost:8080/writing/<slug>/` so the user can read it. Ask: "Publish it?"

## 5. Publish (only after the user says yes)
```bash
npm run build          # must succeed; fix any error before continuing
git add -A
git commit -m "Add post: <title>"
git push
```
Then watch the deploy with `gh run watch --exit-status $(gh run list --limit 1 --json databaseId --jq '.[0].databaseId')`.
When it finishes, give the live link: `https://switchfootsid.github.io/writing/<slug>/`. If the deploy fails, read the log (`gh run view --log-failed`), fix it, and push again.
