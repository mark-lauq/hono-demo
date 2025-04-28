import { Hono } from "hono";
import { handle, type EventContext } from "hono/cloudflare-pages";

type Env = {
  Bindings: {
    eventContext: EventContext;
  };
};

const app = new Hono<Env>();

app.get("/hello", (c) => {
  return c.json({
    message: `Hello, ${c.env.eventContext.data.user}!`,
  });
});

export const onRequest = handle(app);
