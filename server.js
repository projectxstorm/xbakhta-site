import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import compression from 'compression';
import { parse } from 'url';
import next from 'next';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

app.prepare().then(() => {
  const server = express();

  // Enable gzip compression for faster loading
  server.use(compression());

  // Serve static files from the public directory
  server.use(express.static(path.join(__dirname, 'public')));

  // Handle API routes and NextJS pages
  server.all('*', (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  // Start the server
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`BlinkBox server running on port ${port}`);
  });
}).catch(err => {
  console.error('Error starting server:', err);
  process.exit(1);
}); 