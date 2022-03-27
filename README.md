### Web渲染方案的演进

- CSR（Client Side Rendering）/ BSR(Broswer Side Rendering)  客户端渲染
- SSR (Server Side Rendering)  服务端渲染
- SSG (Static Site Generation)  静态网站生成
- ISR (Incremental Static ReGeneration) 增量式的网站渲染
- DPR (Distributed Persistent Rendering) 分布式的网站渲染
- NSR (Native Side Rendering) 原生应用渲染
- ESR (Edge Side Rendering) 边缘节点渲染

#### CSR / BSR  客户端渲染

目前主流的渲染方案，Vue/React/Angular等现代化前端框架均以此方案进行渲染。表现为：所有的页面渲染，路由分发，逻辑处理和接口请求等均在客户端（一般指浏览器）中执行。

##### 优点
1. 前后端完全分离，开发人员更加聚焦对应的模块
2. 服务端压力变小，前端资源可通过CDN等方式部署

##### 缺点
1. 不利于SEO   
因为这种方案大部分最后构建的结果是一个没有内容HTML文件。所有的内容都需要在Client上加载对应的JS资源之后动态生成，对于搜索引擎来说无法抓取到对应的SEO信息  

```html
<!DOCTYPE html>
<html lang="en">
 <head> 
  <title data-react-helmet="true">react app</title> 
  <noscript> 
  </noscript>
 </head>
 <body>
  <noscript>
   You need to enable JavaScript to run this app.
  </noscript> 
  <div id="root"></div>
  <script type="text/javascript" src="/static/js/vender.js"></script>
 </body>
</html>
```

2. 首屏加载慢  
所有的渲染必须等待JS资源加载完毕之后，才开始渲染。并且如果首页存在过多资源需要加载，则会长时间无法变成最终的渲染内容。

#### SSR 服务端渲染
顾名思义：即为在服务端进行页面渲染。服务端渲染其实并不是在最近才出现，最开始PHP/JSP等方案也属于服务端渲染。当然可能与我们现代化框架提供的SSR方案略有不同，但整体思路基本一致

##### 优点
1. SEO友好
2. 首屏加载速度快（当然不是绝对的快，跟页面内容相关，比如存在很多IO读写）

##### 缺点
1. 服务端压力大，所有的页面都需要经过服务端去渲染

#### SSG 静态网站渲染
在最开始编译成静态的HTML/JS/CSS资源进行部署。常见的使用场景：hexo storybook等静态文档方案。

##### 优点
1. 服务端压力小，访问速度快。可通过CDN等方案部署
2. SEO友好

##### 缺点
1. 只适用于静态数据

#### ISR 增量式的网站渲染
整体方案类似于SSG与SSR的同构方案。主要分为两部分  
- 关键页面  
例如网站首页，热点TOP等关键页面，通过预渲染成静态资源部署到CDN，于是便有了SSG的好处
- 非关键页面  
非关键性页面有两个步骤。用户请求页面，页面返回fallback，同时服务开始渲染页面。服务端异步渲染完成后部署CDN，最后返回给用户CDN资源。

ISR遵循 stale-while-revalidate 的逻辑，即始终返回 CDN 的缓存数据（无论是否过期）

`Next.js`提供了对应的[ISR方案](https://nextjs.org/docs/basic-features/data-fetching/overview#incremental-static-regeneration)

##### 优点
- 解决了SSG无法渲染动态数据的问题
- 解决了SSR需要每次都通过服务端构建的问题

##### 缺点
- 同时也引入了新的问题。用户所有的请求资源均为CDN缓存资源。对于实时性要求高的页面无法满足需求，同时缓存资源更新策略也是需要考量的
- 对于非关键性页面如果不存在缓存，则需要等待服务端实时渲染等待时间更久。

#### DPR 分布式的网站渲染

[Netlify提案](https://github.com/jamstack/jamstack.org/discussions/549)   

基于ISR渲染，为了解决ISR带来的一系列问题。
1. 去除了 fallback 行为，而是直接用 On-demand Builder（按需构建器）来响应未经过预渲染的页面，然后将结果缓存至 CDN；
2. 数据页面过期时，不再响应过期的缓存页面，而是 CDN 回源到 Builder 上，渲染出最新的数据；
3. 每次发布新版本时，自动清除 CDN 的缓存数据。

然而依旧存在一些问题
1. 新构建页面时依旧存在渲染等待时长的问题
2. 服务端压力大。如果大量请求触发构建会导致过多Builder同时执行

#### NSR 原生应用渲染
基于Android iOS Windows等平台的客户端内置提前进行请求渲染，使得在客户端上渲染时能够直出页面。比较适用于内嵌H5等场景

#### ESR 边缘网站渲染
依托于CDN多节点部署方案，将静态资源和动态请求数据等都部署到用户领近的CDN节点上。通过流的形式给用户渲染。
整体方案核心： 通过提供多节点服务，为领近的用户提供更快的访问



