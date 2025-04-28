/**
 * Cloudflare Pages Middleware
 */

import { handleMiddleware } from "hono/cloudflare-pages";
import { basicAuth } from "hono/basic-auth";

export async function onRequest(pagesContext) {
  console.log(`You are accessing ${pagesContext.request.url}`);

  return await pagesContext.next();
}

export const onRequest = handleMiddleware(async (c, next) => {
  console.log(`You are accessing ${c.req.url}`);
  await next();
});

export const onRequest = handleMiddleware(
  basicAuth({
    username: "hono",
    password: "a_cool_project",
  })
);

export const onRequest = [
  handleMiddleware(async (c, next) => {
    c.env.eventContext.data.user = "Mark";
    await next();
  }),
];
