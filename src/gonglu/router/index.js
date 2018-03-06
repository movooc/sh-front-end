/**
 * 1.定义路由，每个路由应该映射一个组件
 * path : 浏览器的显示的路径
 * component : 路由的组件路径
 */
const _import = process.env.NODE_ENV == 'production' ?
                require('./_import_production'):
                require('./_import_development');

export default [
  {
    path: '/',
    name: 'index',
    component: _import('home/index'),
  },
  {
    path: '/page',
    name: 'page',
    component: _import('page/index'),
  },
];
