import { cp, mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import { dirname, resolve, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const output = resolve(root, 'public');
const routes = new Map([['/index.html', '/'], ['/pages/home.html', '/']]);
for (const language of ['', 'en/']) {
  for (const page of ['home', 'about', 'skill', 'projects', 'contact', 'inspirations']) {
    routes.set(`/pages/${language}${page}.html`, `/${language}${page === 'home' ? '' : `${page}/`}`);
  }
}
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
const allowed = new Set(['.css', '.js', '.json', '.woff2', '.svg', '.webp', '.gif', '.png', '.jpg', '.jpeg', '.jfif', '.webm', '.mp4', '.pdf']);
for (const directory of ['css/dist', 'js', 'fonts', 'imgs', 'media', 'lotties', 'loading-screens']) {
  await cp(resolve(root, directory), resolve(output, directory), {
    recursive: true,
    filter: (source) => !source.includes('/Auto-Save') && !source.includes('_AME') && (extname(source) === '' || allowed.has(extname(source).toLowerCase())),
  });
}
for (const [source, route] of routes) {
  if (source === '/pages/home.html') continue;
  let html = await readFile(resolve(root, `.${source}`), 'utf8');
  html = html.replace(/((?:href|src|data-[\w-]+)=)"([^"]+)"/g, (match, attribute, value) => {
    if (value.startsWith('#') || /^(?:[a-z]+:|\/\/)/i.test(value)) return match;
    if (!/^(?:href|src)=/.test(attribute) && !value.includes('/')) return match;
    const url = new URL(value, `https://portfolio.invalid${source}`);
    return `${attribute}"${routes.get(url.pathname) || url.pathname}${url.search}${url.hash}"`;
  });
  const destination = resolve(output, `.${route}`, 'index.html');
  await mkdir(dirname(destination), { recursive: true });
  await writeFile(destination, html);
}
await cp(resolve(root, 'scripts/hostgator.htaccess'), resolve(output, '.htaccess'));
console.log('Site pronto em public/: home na raiz e rotas sem .html.');
