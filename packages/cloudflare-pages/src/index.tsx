import { Hono } from "hono";
import { renderer } from "./renderer";

/**
 * Using Bindings
 */
type Bindings = {
  MY_NAME: string;
  MY_KV: KVNamespace;
};

const app = new Hono<{ Bindings: Bindings }>();

app.use(renderer);

app.get("/", async (c) => {
  await c.env.MY_KV.put("name", c.env.MY_NAME);
  const name = await c.env.MY_KV.get("name");
  return c.render(<h1>Hello! {name}</h1>);
});

export default app;
