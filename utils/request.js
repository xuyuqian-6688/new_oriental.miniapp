import store from '@/store'
// uni.request封装
// 小程序的域名文件
let config = require("../config.js")
const request = (options) => {
  return new Promise((resolve, reject) => {
    uni.request({
      url: `${config.service.host}${config.service.baseURL}${options.url}`,//获取域名接口地址
      method: options.method, //配置method方法
      data: options.method === 'GET' ? options.data : JSON.stringify(options.data), 
      //如果是GET,GET自动让数据成为query String,其他方法需要让options.data转化为字符串
      header: {
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': 'Bearer ' + store.state.access_token // 让每个请求携带自定义token                     
      },
      //header中可以监听到token值的变化
      success(request) {
      //监听成功后的操作
        if (request.data.code === 200) {
        //此处200是项目中数据获取成功后返回的值,成功后将request.data传入resolve方法中
          resolve(request.data)
        } else if (request.data.code === 1000) {
          // 1000access_token过期重新走登录流程
          uni.showModal({
            title: '提示',
            content: '登录已过期请重新登录！',
            showCancel: false,
            confirmText: '重新登录',
            success: function(res) {
                if (res.confirm) {
                    console.log('用户点击了“重新登录”')
                }
            }
          })
        } else {
        //如果没有获取成功返回值,把request.data传入到reject中
          reject(request.data)
        }
      },
      fail(error) {
      //返回失败也同样传入reject()方法
        reject(error.data)
      },
      complete() {
        
      }
    })
  })
}

export default request