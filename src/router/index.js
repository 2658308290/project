import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import permission from './permission'
import store from '../store/'
import {clearHttpRequestingList} from '@http/httpRequestList'
import routes from './routes'
import {isInWhiteList} from '@/libs/acl/routeProtection'

Vue.$httpRequestList = []
Vue.use(Router)

let router = new Router({
  routes
})
router.beforeEach((to, from, next) => {
  if (to.meta.keepAlive) {
    store.commit('routecache/keepAlive', to.name)
  }
  clearHttpRequestingList()

  NProgress.start()
  if (isInWhiteList(to)) {
    next()
  } else if (!store.getters['user/getUserId']) {
    store.dispatch('user/fetchUserInfo').then(res => {
      if (res.ok) {
        // 权限校验
        permission(to, next)
      } else {
        switch (res.code) {
          case -500:
            next({name: 'badGateway'})
            break
          case 70005:
            next({name: 'login'})
            break
        }
      }
    })
  } else {
    // 权限校验
    permission(to, next)
  }
})
router.afterEach(() => {
  NProgress.done()
})
export default router
