import Vue from 'vue'
import Vuex from 'vuex'

import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

// 引入 vuex 插件
Vue.use(Vuex)

const state = {
  cartList: []
}

// 创建 store 实例
const store = new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})


// 挂载 vue 实例上
export default store
