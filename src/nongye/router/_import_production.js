module.exports = file => {
  /*异步路由*/
  return routerAsyn[file];
};

const routerAsyn = {
  'home/index': r => require.ensure([], () => r(require(`../views/home/index`)), `nongye/nongye-home`),
  'page/index': r => require.ensure([], () => r(require(`../views/page/index`)), `nongye/nongye-page`),
};
