import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distPath = path.join(__dirname, 'dist');
const indexPath = path.join(distPath, 'index.html');

if (!existsSync(indexPath)) {
  console.log('dist/ not found, running production build...');
  execSync('npm run build', { stdio: 'inherit', cwd: __dirname });
}

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(distPath));

app.get('*', (_req, res) => {
  res.sendFile(indexPath);
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Portfolio server running on port ${port}`);
});
