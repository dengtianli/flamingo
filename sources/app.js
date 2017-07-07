// library
import Vue from "vue";
import VueRouter from "vue-router";
// css
import "./common/reset.less";
import "font-awesome/css/font-awesome.css";
// ui
import ElementUI from "element-ui";
import "element-ui/lib/theme-default/index.css";
// util
import Http from "./common/http.js";
import Auth from "./common/auth.js";
// component
import Layout from "./layout";

Vue.use(VueRouter);
Vue.use(ElementUI);

const Login = resolve => require(["./login/index.vue"], resolve);

const router = new VueRouter({
  routes: [{
    path: "/",
    component: Login
  }, {
    path: "/login",
    component: Login
  }, {
    path: "/layout",
    component: Layout,
    children: [{
      path: "dashboard",
      meta: {
        auth: true
      },
      component: resolve => require(["./dashboard/index.vue"], resolve),
    },{
        path: "dashboard-detail",
        meta: {
          auth: true
        },
        component: resolve => require(["./dashboard/row2/detail/index.vue"], resolve),
    },{
      path: "analysis-case",
      meta: {
        auth: true
      },
      component: resolve => require(["./analysis.case/index.vue"], resolve)
    }, {
      path: "analysis-transact",
      meta: {
        auth: true
      },
      component: resolve => require(["./analysis.transact/index.vue"], resolve)
    }, {
      path: "analysis-transactor",
      meta: {
        auth: true
      },
      component: resolve => require(["./analysis.transactor/index.vue"], resolve)
    }]
  }]
});

router.beforeEach((to, from, next) => {
  Auth.accessibility(to, from, next);
  Auth.interceptor();
})

const app = new Vue({
  router
}).$mount("#app")
