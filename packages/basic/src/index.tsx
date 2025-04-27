import { Hono } from "hono";
import { basicAuth } from "hono/basic-auth";
import { upgradeWebSocket } from "hono/cloudflare-workers";

const app = new Hono();

/**
 * Hello World
 */
app.get("/", (c) => {
  return c.text("Hello Hono!");
});

/**
 * Return JSON
 */
app.get("/api/hello", (c) => {
  return c.json({
    ok: true,
    message: "Hello Hono!",
  });
});

/**
 * Request and Response
 */
app.get("/posts/:id", (c) => {
  const page = c.req.query("page");
  const id = c.req.param("id");
  c.header("X-Message", "Hi");
  return c.text(`You want to see ${page} of ${id}`);
});
app.post("/posts", (c) => c.text("Created!", 201));
app.delete("/posts/:id", (c) => c.text(`${c.req.param("id")} is deleted!`));

/**
 * Return HTML
 */
const View = () => {
  return (
    <html>
      <body>
        <h1>Hello Hono!</h1>
      </body>
    </html>
  );
};

app.get("/page", (c) => {
  return c.html(<View />);
});

/**
 * Return raw Response
 */
app.get("/", () => {
  return new Response("Good Morning!");
});

/**
 * Using Middleware
 */
app.use(
  "/admin/*",
  basicAuth({
    username: "admin",
    password: "secret",
  })
);

app.get("/admin", (c) => {
  return c.text("You are authorized!");
});

/**
 * Adapter
 */
app.get(
  "/ws",
  upgradeWebSocket((c) => {
    return c.text("adapter");
  })
);

export default app;
