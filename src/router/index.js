import Vue from "vue";
import VueRouter from "vue-router";
import findLast from 'lodash/findLast'
import { Notification} from 'ant-design-vue'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
// import AppLayout from '../layouts/AppLayout'
import NotFind from '../views/ErrorPage/404.vue'
import NotAuth from '../views/ErrorPage/403.vue'
import { check, isLogin } from '../utils/auth'

Vue.use(VueRouter);

const routes = [
  {
    path: "/user",
    hideMenu: true,
    component: () => import(/* webpackChunkName: "layouts" */ "../layouts/UserLayout.vue"),
    children: [
      {
        path: "/user",
        redirect: "/user/login"
      },
      {
        path: "/user/login",
        name: "login",
        meta: {
          title: '登录'
        },
        component: () => import(/* webpackChunkName: "User" */ "../views/Users/Login.vue")
      },
      {
        path: "/user/register",
        name: "register",
        meta: {
          title: '注册'
        },
        component: () => import(/* webpackChunkName: "User" */ "../views/Users/Register.vue")
      }
    ]
  },
  {
    path: "/",
    meta: {
      authority: ['user', 'admin']
    },
    component: () => import(/* webpackChunkName: "layouts" */ "../layouts/AppLayout.vue"),
    children: [
      {
        path: "/",
        redirect: "/dashboard/welcome"
      },
      {
        path: "/dashboard",
        name: "dashboard",
        meta: {
          title: '首页',
          icon: 'dashboard'
        },
        component: { render: h=> h("router-view")},
        children: [
          {
            path: "/dashboard/welcome",
            name: "welcome",
            meta: {
              title: '欢迎页'
            },
            component: () => 
              import(/* webpackChunkName: "Dashboard" */ "../views/Dashboard/index.vue")
          }
        ]
      },
      // from
      {
        path: "/test",
        name: "test",
        meta: {
          title: '功能页',
          icon: 'dashboard',
          authority: ['admin']
        },
        component: { render: h=> h("router-view")},
        children: [
          {
            path: "/test/page1",
            name: "page-1",
            meta: {
              title: '功能一'
            },
            component: () => import(/* webpackChunkName: "Nav" */ "../views/Nav/Nav1/Base.vue")
          },
          {
            path: "/test/page2",
            name: "page-2",
            meta: {
              title: '功能二'
            },
            hideChildrenMenu: true,
            component: () => import(/* webpackChunkName: "Nav" */ "../views/Nav/Nav2"),
            children: [
              {
                path: '/test/page2',
                redirect: '/test/page2/index1'
              },
              {
                path: "/test/page2/index1",
                name: 'index1',
                component: () => import(/* webpackChunkName: "Nav" */ "../views/Nav/Nav2/Test1")
              },
              {
                path: "/test/page2/index2",
                name: 'index2',
                component: () => import(/* webpackChunkName: "Nav" */ "../views/Nav/Nav2/Test3")
              },
              {
                path: "/test/page2/index3",
                name: 'index3',
                component: () => import(/* webpackChunkName: "Nav" */ "../views/Nav/Nav2/Test3")
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: "/403",
    hideMenu: true,
    name: "403",
    component: NotAuth
  },
  {
    path: "*",
    hideMenu: true,
    name: "404",
    component: NotFind
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if(to.path !== from.path){
    Nprogress.start()
  }
  // 获取和选中菜单最近的路由信息
  const record = findLast(to.matched, record => record.meta.authority)
  if(record && !check(record.meta.authority)){
    if(!isLogin() && to.path !== "/user/login"){
      next({
        path: "/user/login"
      })
    } else if(to.path !=="/403"){
      Notification.error({
        message: '403',
        description:
          '您没权限访问，请联系管理员',
      });
      next({
        path:"/403"
      })
    }
    Nprogress.done()
  }
  next()
})

router.afterEach(() => {
  Nprogress.done()
})

export default router;
