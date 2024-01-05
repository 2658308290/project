// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuebar from 'vuebar'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'normalize.css/normalize.css'
import 'nprogress/nprogress.css'
import '@/assets/styles/index.less'
import App from './App'
import '@/assets/iconfont-default'
import router from './router/'
import store from './store/'
import * as echarts from 'echarts'
import VueMoment from 'vue-moment'
import NP from 'number-precision'

// 自定义插件
import table from '@/directive/table'
import '@/libs/acl'
table.install(Vue)

// 需要挂载到Vue原型上
Vue.prototype.$echarts = echarts
Vue.prototype.$NP = NP
Vue.use(Vuebar)
Vue.use(ElementUI)
Vue.use(VueMoment)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
