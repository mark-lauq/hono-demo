app.get("/", (c) => {
  return c.html(
    <html>
      <head>
        {import.meta.env.PROD ? (
          <script type="module" src="/static/client.js"></script>
        ) : (
          <script type="module" src="/src/client.ts"></script>
        )}
      </head>
      <body>
        <h1>Hello</h1>
      </body>
    </html>
  );
});
