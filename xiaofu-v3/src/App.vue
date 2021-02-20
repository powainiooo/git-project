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
/* this rule will be remove */
* {
  box-sizing: border-box;
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
@font-face {
  font-family: 'HelveB';
  src: url('https://github.com/powainiooo/git-project/blob/master/xiaofu-v3/static/fonts/HelveticaNowDisplay-Bold.ttf?raw=true') format('woff2');
}
@font-face {
  font-family: 'HelveL';
  src: url('https://github.com/powainiooo/git-project/blob/master/xiaofu-v3/static/fonts/HelveticaNowDisplay-Light.ttf?raw=true') format('woff2');
}
@font-face {
  font-family: 'HelveT';
  src: url('https://github.com/powainiooo/git-project/blob/master/xiaofu-v3/static/fonts/HelveticaNeueThin.ttf?raw=true') format('woff2');
}
page {
  background-color: #EEEEEF;
}
button {
  margin: 0;
  padding: 0;
}
button:after {
  border: none;
}
.c-tag { height: 67px; line-height: 67px; display: inline-block; font-size: 24px; color: #ffffff; font-family: HelveB; padding: 0 32px; background: linear-gradient(330deg, #5B85E6 0%, #6D9AF4 100%); border-radius: 34px; }

.btn { height: 57px; display: flex; align-items: center; justify-content: center; background: linear-gradient(349deg, #5B85E6 0%, #6D9AF4 100%); border-radius: 16px; font-size: 20px; color: #ffffff; }

.bBorder {
  position: relative;
}
.bBorder:after {
  content: '';
  width: 100%;
  height: 2px;
  transform: scaleY(.5);
  background-color: #DBDCDC;
  position: absolute;
  left: 0;
  bottom: 0;
}
</style>
