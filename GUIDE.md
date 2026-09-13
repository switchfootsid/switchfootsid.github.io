# How to edit, import, and write

Open **Documents/blog** in Claude Code for everything below. You never need to type commands.

---

## Your apps

| For | Use | Why |
|---|---|---|
| **Writing essays** | **Typora** (typora.io) | Looks like a normal word processor, but saves plain Markdown files the site reads directly. Bold, headings, links, and footnotes all work. |
| Alternative | **iA Writer** | Calmer, focused writing app, also Markdown. Pick one; both work. |
| **Editing home page / talks** | **Just ask Claude** | These files have strict formatting. Describe the change in plain words. |
| If you want to edit those files yourself | **CotEditor** (free, Mac App Store) | A plain text editor that won't add curly quotes or hidden formatting. |

**Avoid** TextEdit, Pages, and Word for site files. They add curly quotes and hidden formatting that break the site.

---

## 1. Edit the home page sections

**Easiest:** tell Claude what you want.

> "Change my headline to …"
> "Set the NVIDIA role years to 2022–2026 and rewrite the Learned line to say …"
> "Add a belief: … and link it to …"
> "Add my email siddharth@… and my LinkedIn …"
> "Here's my photo" (drag the image into the chat)

**Doing it yourself (CotEditor):** open `src/_data/home.yaml`.
- Change only the words after the colons. Keep the spacing at the start of each line exactly as it is.
- Each item in a list starts with `- `.
- If a line has a colon (`:`) in your text, wrap the text in double quotes.
- Leave `""` for anything you don't want shown.

Other files: `site.yaml` (name, email, LinkedIn, topics), `media.yaml` (talks).

**See it before it's live:** ask Claude to "start the preview". It opens http://localhost:8080 and refreshes every time you save.

**Publish:** say "publish my changes". Live in about a minute.

---

## 2. Bring over your Substack posts

1. On Substack: **Settings → Import/Export → Export** (wording may vary slightly). Substack emails you a zip.
2. Unzip it into `Documents/blog/imports/`. This folder is private and never published.
3. Tell Claude:

> "Import my Substack posts from the imports folder. Keep the original dates, move images into the site, pick topics, and show me the list before publishing."

Claude will show you each post in the preview, and you choose which ones to publish. Posts are saved as drafts until you say yes.

Only want a few? Paste their Substack links instead:
> "Import these Substack posts: <link>, <link>"

(Paid-subscriber posts need the export, since Claude can't read them from a link.)

---

## 3. Write something new

1. In Typora, create a file in `Documents/blog/drafts/` (for example `drafts/compound-ai.md`). This folder is private.
2. Write normally. What Typora shortcuts turn into on the site:
   - **Section heading:** start a line with `## `. These headings build the contents list beside the essay.
   - **Quote:** start a line with `> `.
   - **Footnote:** type `[^1]` in the text, then `[^1]: your note` at the bottom.
   - **Link:** Cmd+K.
3. When it's ready, tell Claude:

> "/new-post drafts/compound-ai.md"

Claude suggests a title, a one-line summary, and topics, then shows you a preview. It publishes when you say yes and gives you the live link.

**Not ready but want to see it on the site?** Say "save it as a draft". It will show in your preview only.

---

## Quick reference

| I want to… | Say to Claude |
|---|---|
| See my site locally | "Start the preview" |
| Publish any changes | "Publish my changes" |
| Post an essay | "/new-post" plus paste text or a drafts file |
| Fix a typo in a live post | "Fix 'teh' in my post about …" |
| Unpublish a post | "Unpublish the post about …" |
| Add a talk | "Add a talk: title, event, date, private or link" |
| Something looks broken | "The site looks broken, here's what I see" |
