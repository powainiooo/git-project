<script>
export default {
   created () {
      // 调用API从本地缓存中获取数据
      /*
       * 平台 api 差异的处理方式:  api 方法统一挂载到 mpvue 名称空间, 平台判断通过 mpvuePlatform 特征字符串
       * 微信：mpvue === wx, mpvuePlatform === 'wx'
       * 头条：mpvue === tt, mpvuePlatform === 'tt'
       * 百度：mpvue === swan, mpvuePlatform === 'swan'
       * 支付宝(蚂蚁)：mpvue === my, mpvuePlatform === 'my'
       */
      console.log('app created')
      let logs
      if (mpvuePlatform === 'my') {
         logs = mpvue.getStorageSync({key: 'logs'}).data || []
         logs.unshift(Date.now())
         mpvue.setStorageSync({
            key: 'logs',
            data: logs
         })
      } else {
         logs = mpvue.getStorageSync('logs') || []
         logs.unshift(Date.now())
         mpvue.setStorageSync('logs', logs)
      }
   },
   log () {
      console.log(`log at:${Date.now()}`)
   }
}
</script>

<style>
.img_block { width: 100%; display: block;}

.btn-round { width: 100%; height: 70px; border-radius: 50px; background-color: #3a3a3a; display: flex; justify-content: center; align-items: center; font-size: 26px; color: #ffffff;}

.goods-list { margin: 30px; display: flex; flex-wrap: wrap;}
.goods-list .c-goods-item { margin-bottom: 35px;}
.goods-list .c-goods-item:nth-child(2n) { margin-left: 30px;}

.load-over { font-size: 20px; color: #666666; text-align: center; margin: 30px 0 40px 0;}
</style>
