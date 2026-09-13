# Siddharth Kotwal's personal site

Owner: Siddharth. A product/strategy person, **not a web programmer**. Claude does all code, file, and git work. Explain outcomes in plain language, never ask the owner to run commands, and confirm before publishing.

## How it works
- **Eleventy** static site. Source in `src/`, built to `_site/` (never edit `_site/`).
- **Hosting:** GitHub Pages, repo `switchfootsid/switchfootsid.github.io`, branch `main`. Every push to `main` builds and publishes via `.github/workflows/deploy.yml`. Live at https://switchfootsid.github.io/
- Preview locally: `npm start` → http://localhost:8080 (shows drafts). `npm run build` = exactly what goes live (hides drafts).

## Where content lives
| What | File |
|---|---|
| Name, contact links, topic list | `src/_data/site.yaml` |
| Home page (headline, intro, beliefs, career path, interests, books, contact line) | `src/_data/home.yaml` |
| Talks, panels, podcasts, interviews | `src/_data/media.yaml` |
| Posts | `src/posts/YYYY-MM-DD-slug.md` (use the `/new-post` skill) |
| Photo / résumé | drop `src/assets/photo.jpg` or `src/assets/resume.pdf`; they appear automatically |

`draft: true` on a post or media item keeps it in the local preview only.

`drafts/` (the owner's private writing, usually in Typora) and `imports/` (Substack export zips) are gitignored and never published. `GUIDE.md` is the owner's how-to; keep it accurate when workflows change.

## Importing from Substack
Substack exports contain `posts.csv` (titles, subtitles, dates, slugs) and `posts/*.html`. For each post the owner picks: convert the HTML body to clean Markdown in `src/posts/YYYY-MM-DD-slug.md` using the original publish date, subtitle as `dek`, one or two `topics` from `site.yaml`, and `draft: true` until the owner approves. Download images to `src/assets/images/<slug>/`. Strip Substack buttons, subscribe widgets, and share links. Show the list and previews before publishing.

## Design rules (don't drift from these)
- Quiet, minimal, high contrast. Off-white `#F7F6F2` / near-black `#151412`, one vermilion accent `#D1452A` (dark theme has its own tokens in `site.css`). Light by default with a dark toggle.
- Archivo for headings and interface; Source Serif 4 for reading text. Modest sizes (page titles ~36px).
- The owner dislikes "AI-generated" styling: no monospace uppercase labels, numbered nav, pulsing dots, glows, gradients, ornaments, entrance animations, giant display type, or decorative post numbers. No curvy/high-contrast display serifs.
- Interactivity is welcome when it helps reading: filters, reading progress, contents tracker.

## Publishing changes (not just posts)
After editing, run `npm run build` to check, then `git add -A && git commit -m "<what changed>" && git push`, and confirm the deploy with `gh run watch`.
