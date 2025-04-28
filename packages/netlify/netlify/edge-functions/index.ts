import { Hono } from "https://esm.sh/jsr/@hono/hono@4";
import { handle } from "https://esm.sh/jsr/@hono/hono/netlify";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

export default handle(app);
