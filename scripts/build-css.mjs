import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const cssDirectory = join(root, 'css');
const outputDirectory = join(cssDirectory, 'dist');
const entries = {
  home: 'main.css',
  about: 'about.css',
  projects: 'projects.css',
  skills: 'skills.css',
  contact: 'contact.css',
  inspirations: 'inspirations.css',
};
const importPattern = /@import\s+["']([^"']+)["'];?/g;

async function bundle(filePath, loaded = new Set()) {
  const absolutePath = resolve(filePath);
  if (loaded.has(absolutePath)) return '';
  loaded.add(absolutePath);

  const source = await readFile(absolutePath, 'utf8');
  const parts = [];
  let cursor = 0;

  for (const match of source.matchAll(importPattern)) {
    parts.push(source.slice(cursor, match.index));
    parts.push(await bundle(resolve(dirname(absolutePath), match[1]), loaded));
    cursor = match.index + match[0].length;
  }

  parts.push(source.slice(cursor));
  return parts.join('').trim();
}

function minify(source) {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{}:;,>~])\s*/g, '$1')
    .replace(/;}/g, '}')
    .trim();
}

await mkdir(outputDirectory, { recursive: true });

for (const [name, entry] of Object.entries(entries)) {
  const content = minify(await bundle(join(cssDirectory, entry)));
  await writeFile(
    join(outputDirectory, `${name}.css`),
    `${content}\n`,
  );
}
