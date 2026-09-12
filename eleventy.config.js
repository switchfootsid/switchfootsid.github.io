import { load as loadYaml } from "js-yaml";
import footnotes from "markdown-it-footnote";
import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import fs from "node:fs";

// "build" = publishing to the live site. "serve" = local preview.
const isLive = process.env.ELEVENTY_RUN_MODE === "build";
const site = loadYaml(fs.readFileSync("src/_data/site.yaml", "utf8"));

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const toDate = (d) => (d instanceof Date ? d : new Date(d));

export default function (eleventyConfig) {
  eleventyConfig.addDataExtension("yaml,yml", (contents) => loadYaml(contents));
  eleventyConfig.addGlobalData("isLive", isLive);

  // Posts and media marked `draft: true` show in preview but never on the live site
  eleventyConfig.addPreprocessor("drafts", "*", (data) => {
    if (data.draft && isLive) return false;
  });

  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.amendLibrary("md", (md) => {
    md.use(footnotes);
    // Show footnote markers as 1, 2, 3 instead of [1], [2], [3]
    md.renderer.rules.footnote_caption = (tokens, idx) => {
      const { id, subId } = tokens[idx].meta;
      return String(id + 1) + (subId > 0 ? `:${subId}` : "");
    };
  });

  eleventyConfig.addCollection("posts", (api) => api.getFilteredByGlob("src/posts/*.md"));

  // Dates (post dates come from the file name, stored as UTC)
  eleventyConfig.addFilter("longDate", (d) => { d = toDate(d); return `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`; });
  eleventyConfig.addFilter("shortDate", (d) => { d = toDate(d); return `${MONTHS[d.getUTCMonth()].slice(0, 3)} ${d.getUTCDate()}`; });
  eleventyConfig.addFilter("monthYear", (d) => { d = toDate(d); return `${MONTHS[d.getUTCMonth()].slice(0, 3)} ${d.getUTCFullYear()}`; });
  eleventyConfig.addFilter("year", (d) => toDate(d).getUTCFullYear());
  eleventyConfig.addFilter("isoDate", (d) => toDate(d).toISOString().slice(0, 10));

  eleventyConfig.addFilter("readingTime", (html = "") => {
    const words = html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.round(words / 230));
  });

  // Inline markdown for short text in YAML files (links, *italics*)
  eleventyConfig.addFilter("inline", function (text = "") {
    return eleventyConfig.markdownLibrary ? eleventyConfig.markdownLibrary.renderInline(String(text)) : text;
  });

  // Section headings: add ids for the contents list, and list them
  const slug = (s) => s.replace(/<[^>]+>/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  eleventyConfig.addFilter("withHeadingIds", (html = "") => html.replace(/<h2>(.*?)<\/h2>/g, (_, t) => `<h2 id="${slug(t)}">${t}</h2>`));
  eleventyConfig.addFilter("headings", (html = "") => [...html.matchAll(/<h2>(.*?)<\/h2>/g)].map((m) => ({ id: slug(m[1]), text: m[1].replace(/<[^>]+>/g, "") })));

  // Media: group formats for the filter buttons
  const mediaGroup = (type) => ({ Talk: "Talks & panels", Panel: "Talks & panels", Podcast: "Podcasts", Interview: "Interviews" })[type] || "Other";
  eleventyConfig.addFilter("mediaGroup", mediaGroup);
  eleventyConfig.addFilter("mediaGroups", (items = []) => {
    const counts = new Map();
    items.forEach((m) => counts.set(mediaGroup(m.type), (counts.get(mediaGroup(m.type)) || 0) + 1));
    return [...counts].map(([name, count]) => ({ name, count }));
  });
  eleventyConfig.addGlobalData("year", new Date().getFullYear());
  eleventyConfig.addFilter("published", (items = []) => items.filter((i) => !(i.draft && isLive)));
  eleventyConfig.addFilter("countTopic", (posts, topic) => posts.filter((p) => (p.data.topics || []).includes(topic)).length);

  eleventyConfig.addPlugin(feedPlugin, {
    type: "atom",
    outputPath: "/feed.xml",
    collection: { name: "posts", limit: 20 },
    metadata: {
      language: "en",
      title: site.name,
      subtitle: site.description,
      base: site.url,
      author: { name: site.name },
    },
  });

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
