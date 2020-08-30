export default [
    { path: '/', component: resolve=>(require(["../pages/index/index"],resolve)) },
    { path: '/index', component: resolve=>(require(["../pages/index/index"],resolve)) },
    { path: '/exchange', component: resolve=>(require(["../pages/exchange/exchange"],resolve)) },
    { path: '/exchange/:pair', component: resolve=>(require(["../pages/exchange/exchange"],resolve)), name: "ExchangePair"},
    { path: '*', component: resolve=>(require(["../pages/index/index"],resolve)) }
];
