import { Hono } from "hono";
import { basicAuth } from "hono/basic-auth";
import type { R2Bucket } from "@cloudflare/workers-types";

const app = new Hono();

/**
 * Hello World
 */
app.get("/", (c) => {
  return c.text("Hello Cloudflare Workers!");
});

/**
 * Testing
 */
app.get("/", (c) => {
  return c.text("Please test me!");
});

/**
 * Bindings
 */
type Bindings = {
  MY_BUCKET: R2Bucket;
  USERNAME: string;
  PASSWORD: string;
};
const appWithBindings = new Hono<{ Bindings: Bindings }>();
appWithBindings.put("/upload/:key", async (c) => {
  const key = c.req.param("key");
  const body = await c.req.arrayBuffer();
  await c.env.MY_BUCKET.put(key, body);
  return c.text(`Put ${key} successfully!`);
});

/**
 * Using Variables in Middleware
 */
type VBindings = {
  USERNAME: string;
  PASSWORD: string;
};

const appVB = new Hono<{ Bindings: VBindings }>();

appVB.use("/auth/*", async (c, next) => {
  const auth = basicAuth({
    username: c.env.USERNAME,
    password: c.env.PASSWORD,
  });

  return auth(c, next);
});

/**
 * Load env when local development
 */
type LocalBindings = {
  SECRET_KEY: string;
};

const localApp = new Hono<{ Bindings: LocalBindings }>();

localApp.get("/env", (c) => {
  const SECRET_KEY = c.env.SECRET_KEY;

  return c.text(SECRET_KEY);
});

/**
 * Using Hono with other event handlers
 */
export default {
  fetch: app.fetch,
  scheduled: async (batch, env) => {},
};

export { app };
