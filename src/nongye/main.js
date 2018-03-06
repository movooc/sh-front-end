// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import vueResource from 'vue-resource';
import App from './App';
import store from './vuex/store';
import routes from './router';
import SetWechatTitle from '@lib/js/setWechatTitle';
import * as filters from './filters' // global filters
import '@lib/css/font.styl';
import 'normalize.css/normalize.css';

/* register compoent */
Vue.use(VueRouter);
Vue.use(vueResource);

/* bind router */
const router = new VueRouter({
  'linkActiveClass': 'active',
  //mode:'history',
  routes,
});

/* change title */
router.afterEach((transition) => {
  let title = transition.meta.pageTitle;
  SetWechatTitle(title);
});

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

/* el app */
new Vue({
  router,
  store,
  template: '<App/>',
  components: { App },
}).$mount('#app');
