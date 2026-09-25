/* Static file server for local development — no dependencies, no build step. */
import { createServer } from "node:http";
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { extname, join, normalize, sep } from "node:path";

const ROOT = process.cwd();
const PORT = Number(process.env.PORT ?? 5599);

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".mp4": "video/mp4",
};

const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  let pathname = decodeURIComponent(url.pathname);
  if (pathname.endsWith("/")) pathname += "index.html";

  // keep requests inside the project directory
  const target = join(ROOT, normalize(pathname));
  if (!target.startsWith(ROOT + sep)) {
    res.writeHead(403).end("Forbidden");
    return;
  }

  try {
    const info = await stat(target);
    if (info.isDirectory()) {
      res.writeHead(302, { location: `${pathname.replace(/\/?$/, "/")}index.html` }).end();
      return;
    }
    res.writeHead(200, {
      "content-type": TYPES[extname(target).toLowerCase()] ?? "application/octet-stream",
      "content-length": info.size,
      "cache-control": "no-cache",
    });
    createReadStream(target).pipe(res);
  } catch {
    res.writeHead(404, { "content-type": "text/html; charset=utf-8" })
      .end(`<pre style="font:14px ui-monospace;padding:2rem">404 — ${pathname}</pre>`);
  }
});

server.listen(PORT, () => {
  console.log(`\n  Bezel dev server running\n  http://localhost:${PORT}/index.html\n`);
});
