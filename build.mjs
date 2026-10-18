import { readdir, mkdir, rm, copyFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const output = path.join(root, "dist");
const allowed = new Set([
  ".html", ".htm", ".css", ".js", ".mjs", ".json", ".xml", ".webmanifest",
  ".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp", ".avif", ".ico",
  ".woff", ".woff2", ".ttf", ".otf", ".mp4", ".webm", ".mp3", ".wav"
]);
const excludedDirs = new Set([".git", ".github", ".wrangler", "node_modules", "functions", "dist"]);

async function copyTree(source, target) {
  const entries = await readdir(source, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name.startsWith(".")) continue;
    const from = path.join(source, entry.name);
    const to = path.join(target, entry.name);
    if (entry.isDirectory()) {
      if (excludedDirs.has(entry.name)) continue;
      await mkdir(to, { recursive: true });
      await copyTree(from, to);
    } else if (entry.isFile() && allowed.has(path.extname(entry.name).toLowerCase())) {
      // Deliberately excludes Excel workbooks, PDFs, ZIPs, text notes and code archives.
      await copyFile(from, to);
    }
  }
}

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await copyTree(root, output);
const indexPath = path.join(output, "index.html");
try { await stat(indexPath); }
catch { throw new Error("Build failed: index.html was not copied to dist/."); }
console.log("Static website files copied to dist/. Cloudflare Pages Functions remain in functions/ at the repository root.");
