import Vue from 'vue'
import Router from 'vue-router'

const Index = () => import(/* webpackChunkName: "Credit" */  './views/credit/Index.vue')
const CreditApp = () => import(/* webpackChunkName: "Credit" */  './views/credit/App.vue')
// const CreditLogin = () => import(/* webpackChunkName: "Credit" */  './views/credit/Login.vue')
const CreditApplicationList = () => import(/* webpackChunkName: "Credit" */  './views/credit/List.vue')
const CreditApplicationDetail = () => import(/* webpackChunkName: "Credit" */  './views/credit/Detail.vue')
const CreditForgetPwd = () => import(/* webpackChunkName: "Credit" */  './views/credit/ForgetPwd.vue')


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/inventory/credit',
  routes: [
    {
      path: "",
      component: CreditApp,
      children: [
        {
          path: '',
          component: Index,
          meta: {
            checkLogin: false,
            type: 'credit',                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
            title: '首页'
          }
        },
        // {
        //   path: 'login',
        //   component:CreditLogin,
        //   meta: {
        //     checkLogin: false,
        //     type: 'credit',
        //     title: '登录'
        //   }
        // },
        {
          path: 'forgetPwd',
          component: CreditForgetPwd,
          meta: {
            checkLogin: false,
            type: 'credit',
            title: '找回密码'
          }
        },
        {
          path: 'list',
          component: CreditApplicationList,
          meta: {
            checkLogin: true,
            type: 'credit',
            title: '订单列表'
          }
        },
        {
          path: 'detail/:id',
          component: CreditApplicationDetail,
          meta: {
            checkLogin: true,
            type: 'credit',
            title: '订单详情'
          }
        },
      ]
    },
  ]
})
