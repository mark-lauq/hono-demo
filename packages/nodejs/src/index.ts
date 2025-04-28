import { serve, type HttpBindings } from "@hono/node-server";
import { serveStatic } from "hono/serve-static";
import { Hono } from "hono";
import { createServer, createSecureServer } from "node:http2";
import { readFile, readFileSync } from "node:fs";

type Bindings = HttpBindings & {};

const app = new Hono<{ Bindings: Bindings }>();

app.get("/", (c) => {
  return c.json({
    remoteAddress: c.env.incoming.socket.remoteAddress,
  });
});

/**
 * Serve static files
 */
app.use("/static/*", serveStatic({ root: "./", getContent: async () => null }));
app.use(
  "/favicon.ico",
  serveStatic({ path: "./favicon.ico", getContent: async () => null })
);

app.get(
  "/static/*",
  serveStatic({
    root: "./",
    rewriteRequestPath: (path) => path.replace(/^\/static/, "/statics"),
    getContent: async () => null,
  })
);

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);

/**
 * HTTP2
 */
const server = serve({
  fetch: app.fetch,
  createServer: createSecureServer,
  serverOptions: {
    key: readFileSync("localhost-key.pem"),
    cert: readFileSync("localhost-cert.pem"),
  },
});
