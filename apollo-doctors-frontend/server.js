const express = require('express');
const path = require('path');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const PORT = process.env.PORT || 3000;

app.prepare().then(() => {
  const server = express();

  // Serve static files from the Next.js .next/static directory
  server.use('/_next', express.static(path.join(__dirname, '.next')));

  // Serve public files
  server.use(express.static(path.join(__dirname, 'public')));

  // Handle all other routes with Next.js
  server.all('*', (req, res) => {
    const parsedUrl = parse(req.url, true);
    return handle(req, res, parsedUrl);
  });

  // Start the server
  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});