import React from "react";
import Koa from "koa";
import ReactDom from "react-dom/server";
import * as koaStatic from "koa-static";
import Router from "koa-router";
import path from "path";
import App from "./client/counter";

const app = new Koa();
const route = new Router();

const staticPath = "../public";

app.use(koaStatic(path.join(__dirname, staticPath)));

route.get("/ssr", async (ctx, next) => {
  const renderString = ReactDom.renderToString(<App />);
  ctx.set("Content-Type", "text/html;charset=utf-8");
  ctx.body = `<html>
          <head>
            <title>React SSR</title>
          </head>
          <body>
            <div id="root">${renderString}</div>
            <script src="/client.js"></script>
          </body>
        </html>`;
  await next();
});

app.use(route.routes()).use(route.allowedMethods());

app.listen(3000);
