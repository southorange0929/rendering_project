const Koa = require('koa');
const ReactDom = require('react-dom/server');
const React = require('react');

const Component = React.createElement('div',{
    children: '我是测试文案',
    onClick: e => {
        console.log(e);
    }
})

const app = new Koa()

app.use(async(ctx, next) => {
    const renderString = ReactDom.renderToString(Component);
    ctx.set("Content-Type", "text/html;charset=utf-8");
    ctx.body = `<html>
      <head>
        <title>React SSR</title>
      </head>
      <body>
        <div id="root">${renderString}</div>
      </body>
    </html>`
    next();
})
app.listen(3000)
