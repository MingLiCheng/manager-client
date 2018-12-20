import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '../components/HomePage'
import Loginpage from '../components/Loginpage'

Vue.use(Router)

const router = new Router({
  routes: [{
      path: '/',
      name: 'Loginpage',
      component: Loginpage
    },
    {
      path: '/index',
      name: 'HomePage',
      redirect: '/index/infotab',
      component: HomePage,
      children: [
        {
          path: 'infotab',
          name: 'infotab',
          component: () => import('../components/InfoTab')
        }
      ]
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
