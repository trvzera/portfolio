import { spawnSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
const host = process.env.DEPLOY_HOST;
const destination = process.env.DEPLOY_PATH;
if (!host || !destination || !/^[a-zA-Z0-9][a-zA-Z0-9_.@-]*$/.test(host) || !/^\/[a-zA-Z0-9_./-]+$/.test(destination) || destination === '/' || destination.split('/').includes('..')) {
  console.error('Configure DEPLOY_HOST (alias SSH) e DEPLOY_PATH (pasta absoluta do domínio). Consulte docs/publicacao.md.');
  process.exit(1);
}
const publish = process.argv.includes('--publish');
const root = resolve(dirname(fileURLToPath(import.meta.url)), '../public');
// No --delete: do not remove server-owned files, mail settings or other sites.
const args = ['-az', '--checksum', '--itemize-changes', '--delay-updates', '-e', 'ssh', ...(publish ? [] : ['--dry-run']), `${root}/`, `${host}:${destination}/`];
const result = spawnSync('rsync', args, { stdio: 'inherit' });
if (result.error) console.error(result.error.message);
process.exit(result.status ?? 1);
