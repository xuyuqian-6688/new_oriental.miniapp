import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      access_token: uni.getStorageSync('access_token') ? uni.getStorageSync('access_token') : '',
      navHeight: '',
      menuButton: '',
      hasUserInfo: uni.getStorageSync('has_user_info') ? uni.getStorageSync('has_user_info') : ''
  },
  mutations: [],
  plugins: [createLogger()]
})
