/**
 * Adds this release to a Termix-Registry index.
 *
 *   node scripts/registry-entry.mjs <index.json> <file.tmxplug> <download url>
 *
 * Reads manifest.json and the .tmxplug next to its .sig, then writes the
 * version into the index. Refuses a version that is already listed.
 */

import crypto from "node:crypto";
import fs from "node:fs";
import process from "node:process";

const [indexPath, artifactPath, url] = process.argv.slice(2);
if (!indexPath || !artifactPath || !url) {
  console.error(
    "Usage: node scripts/registry-entry.mjs <index.json> <file.tmxplug> <url>",
  );
  process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync("manifest.json", "utf8"));
const artifact = fs.readFileSync(artifactPath);
const signature = fs.readFileSync(`${artifactPath}.sig`, "utf8").trim();
const index = JSON.parse(fs.readFileSync(indexPath, "utf8"));
const repository = process.env.GITHUB_REPOSITORY
  ? `https://github.com/${process.env.GITHUB_REPOSITORY}`
  : manifest.repository;
const now = new Date().toISOString();

function compareVersions(a, b) {
  const pa = a.split(/[.-]/).map((part) => Number.parseInt(part, 10) || 0);
  const pb = b.split(/[.-]/).map((part) => Number.parseInt(part, 10) || 0);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const diff = (pa[i] ?? 0) - (pb[i] ?? 0);
    if (diff !== 0) return diff;
  }
  return 0;
}

let plugin = index.plugins.find((entry) => entry.id === manifest.id);
if (!plugin) {
  plugin = { id: manifest.id, versions: [] };
  index.plugins.push(plugin);
  index.plugins.sort((a, b) => a.id.localeCompare(b.id));
}

if (plugin.versions.some((entry) => entry.version === manifest.version)) {
  console.error(`${manifest.id}@${manifest.version} is already listed`);
  process.exit(1);
}

Object.assign(plugin, {
  name: manifest.name,
  description: manifest.description,
  author: manifest.author?.name ?? String(manifest.author ?? ""),
  category: manifest.category,
  repository,
  icon: `${repository}/raw/v${manifest.version}/icon.svg`,
});

plugin.versions.push({
  version: manifest.version,
  api: String(manifest.engine.api),
  url,
  sha256: crypto.createHash("sha256").update(artifact).digest("hex"),
  signature,
  size: artifact.length,
  capabilities: manifest.capabilities ?? [],
  releaseNotesUrl: `${repository}/releases/tag/v${manifest.version}`,
  publishedAt: now,
});
plugin.versions.sort((a, b) => compareVersions(b.version, a.version));

// Keep the key order stable so the diff in the registry PR stays small.
const ordered = {
  id: plugin.id,
  name: plugin.name,
  description: plugin.description,
  author: plugin.author,
  category: plugin.category,
  repository: plugin.repository,
  icon: plugin.icon,
  versions: plugin.versions,
};
index.plugins[index.plugins.indexOf(plugin)] = ordered;
index.updatedAt = now;

fs.writeFileSync(indexPath, `${JSON.stringify(index, null, 2)}\n`);
console.log(`added ${manifest.id}@${manifest.version} to ${indexPath}`);
