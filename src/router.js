import Vue from 'vue'
import Router from 'vue-router'

const Index = () => import( /* webpackChunkName: "ERP" */ './views/Index.vue')
const BasicContent = () => import( /* webpackChunkName: "BasicContent" */ './views/basicModel/basic_content.vue')
const PersonalCenter = () => import( /* webpackChunkName: "PersonalCenter" */ './views/personalCenter.vue')
const ChangeName = () => import( /* webpackChunkName: "ChangeName" */ './views/changeName.vue')
const ChangePwd = () => import( /* webpackChunkName: "ChangePwd" */ './views/changePwd.vue')

// const PurchaseDangerLine = () => import( /* webpackChunkName: "ERP" */ './views/purchase/List.vue')
// const EditTable = () => import( /* webpackChunkName: "ERP" */ './views/purchase/EditTable.vue')
const Print = () => import( /* webpackChunkName: "Print" */ './views/print.vue')

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/inventory',
  routes: [{
      path: '/',
      component: Index,
      redirect: '/erp/purchase/dangerLine',
      meta: {
        title: '首页',
        checkLogin: true,
      },
      children: [{
          path: '/:lead/:sublead/:model',
          name: 'BasicContent',
          component: BasicContent,
          props: true,
          meta: {
            checkLogin: true,
          },
          children: [{
            path: '/erp/personalCenter',
            name: 'personalCenter',
            component: PersonalCenter,
            meta: {
              checkLogin: true,
            },
          }, {
            path: '/erp/changeName',
            name: 'changeName',
            component: ChangeName,
            meta: {
              checkLogin: true,
            }
          }, {
            path: '/erp/changePwd',
            name: 'changePwd',
            component: ChangePwd,
            meta: {
              checkLogin: true,
            }
          }]
        },
        // {
        //   path: '/erp/EditTable',
        //   component: EditTable,
        // },

      ]
    },
    {
      path: '/erp/print/:model/:id',
      name: 'print',
      component: Print,
    },
    // {
    //   path: '/login',
    //   component: Login,
    //   meta: {
    //     title: '登录',
    //     checkLogin: false,
    //   }
    // },
  ]
})