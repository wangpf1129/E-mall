import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from "./store";


import toast from "./components/common/toast/index"
import FastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'

Vue.config.productionTip = false

// 添加事件总线对象
Vue.prototype.$bus = new Vue()

Vue.use(toast)

// 解决移动端300ms延迟问题
FastClick.attach(document.body)

// 图片懒加载
Vue.use(VueLazyload, {
  loading: require('./assets/img/common/load.jpg'),
})
/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
