/**
 * 1.定义路由，每个路由应该映射一个组件
 * path : 浏览器的显示的路径
 * component : 路由的组件路径
 */
var _import = process.env.NODE_ENV == 'production' ?
                require('./_import_production'):
                require('./_import_development');

_import = require('./_import_production');

if(process.env.NODE_ENV != 'production'){
  //
  var home = r => require.ensure([], () => r(require('../views/home/index')), 'teacher/teacher-home');

}else{
  //
  var home = require('../views/home/index');
}

export default [
  {
    path: '/',
    name: 'index',
    component: home,
  },
];
