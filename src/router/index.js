import Vue from 'vue'
import Router from 'vue-router'
// import HomePage from '../components/HomePage'
// import Loginpage from '../components/Loginpage'
// import InfoTab from '../components/InfoTab'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'Loginpage',
      component: () => import('@/components/Loginpage'),
    },
    {
      path: '/index',
      name: 'HomePage',
      redirect: {
        name: 'infotab'
      },
      component: () => import('@/components/HomePage'),
      children: [{
        path: 'infotab',
        name: 'infotab',
        component: () => import('@/components/InfoTab'),
      }]
    },
    {
      path: '*',
      redirect: '/index'
    }
  ]
})
// 添加路由守卫
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.eleToken ? true : false
  if (to.path === '/') {
    next()
  } else {
    isLogin ? next() : next('/')
  }
})

export default router
