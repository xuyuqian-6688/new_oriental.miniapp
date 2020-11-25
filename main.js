import Vue from 'vue'
import App from './App'
import './acsset/style/reset.scss'
import "static/iconfont/iconfont.css";
import store from '@/store'
import { login } from '@/api/api.js'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

Vue.prototype.$store = store;

uni.login({
    success (res) {
        if (res.code) {
            //发起网络请求
            login({code: res.code}).then(res => {
                // 保存access_token
                store.state.access_token = res.data.access_token
                uni.setStorageSync('access_token', res.data.access_token)
            })
        } else {
            console.log('登录失败！' + res.errMsg)
        }
    }
})

uni.getSystemInfo({
    success: res => {
        //导航高度
        store.state.navHeight = res.statusBarHeight
    }, fail(err) {
        console.log(err);
    }
})

store.state.menuButton = uni.getMenuButtonBoundingClientRect()

console.log(store.state.navHeight, uni.getMenuButtonBoundingClientRect())
