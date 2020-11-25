<script>
export default {
  created () {
    // 调用API从本地缓存中获取数据
    /*
     * 平台 api 差异的处理方式:  api 方法统一挂载到 uni 名称空间, 平台判断通过 uniPlatform 特征字符串
     * 微信：uni === wx, uniPlatform === 'wx'
     * 头条：uni === tt, uniPlatform === 'tt'
     * 百度：uni === swan, uniPlatform === 'swan'
     * 支付宝(蚂蚁)：uni === my, uniPlatform === 'my'
     */

    let logs
    // if (uniPlatform === 'my') {
    //   logs = uni.getStorageSync({key: 'logs'}).data || []
    //   logs.unshift(Date.now())
    //   uni.setStorageSync({
    //     key: 'logs',
    //     data: logs
    //   })
    // } else {
      logs = uni.getStorageSync('logs') || []
      logs.unshift(Date.now())
      uni.setStorageSync('logs', logs)
    // }
  },
  log () {
    console.log(`log at:${Date.now()}`)
  }
}
</script>

<style>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
