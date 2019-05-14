import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import store from '@/store'
import iView from 'iview'
import { setToken, getToken, canTurnTo, setTitle, setAccess, getAccess, getMenuByRouter } from '@/libs/util'
import config from '@/config'
const { homeName } = config

Vue.use(Router)

const router = new Router({
  routes,
  mode: 'history'
})
const LOGIN_PAGE_NAME = 'login'

const turnTo = (to, access, next) => {
  if (canTurnTo(to.name, access, routes)) next() // 有权限，可访问
  else next({ replace: true, name: 'error_401' }) // 无权限，重定向到401页面
}

router.beforeEach((to, from, next) => {
  window.name = from.path;
  iView.LoadingBar.start()
  const token = getToken()
  if (!token && to.name !== LOGIN_PAGE_NAME) {
    // 未登录且要跳转的页面不是登录页
    next({
      name: LOGIN_PAGE_NAME // 跳转到登录页
    })
  } else if (!token && to.name === LOGIN_PAGE_NAME) {
    // 未登陆且要跳转的页面是登录页
    next() // 跳转
  } else if (token && to.name === LOGIN_PAGE_NAME) {
    next()
  } else{
    // 已登录且要跳转的页面是登录页
    if (store.state.user.hasGetInfo) {
      turnTo(to, store.state.user.access, next)
    } else {
      setTimeout(function(){
        store.dispatch('setUserInfo').then(res => {
          let user = res.data;
          if (!user.access || user.access.length <= 0) {
            next({
              name: LOGIN_PAGE_NAME // 跳转到登录页
            })
            return
          }
          let access = user.access
          let arr = []
          access.forEach(function (element, index) {
            arr.push(element.id*1)
          })
          turnTo(to, arr, next)
        })
      },200)
    }
  }
})

router.afterEach(to => {
  setTitle(to, router.app)
  iView.LoadingBar.finish()
  window.scrollTo(0, 0)
})

export default router
