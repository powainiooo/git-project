<style scoped>
.result-frame {
  margin: 0 80px;
  height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.result-frame img {
  width: 177px;
  height: 201px;
  margin-bottom: 57px;
}
.result-frame h3 {
  font-size: 48px;
  line-height: 72px;
  margin-bottom: 190px;
}
.result-frame h3 p.en {
  font-family: HelveB;
  line-height: 58px;
  margin-bottom: 10px;
  font-weight: bold;
}
.result-frame div {
  display: flex;
}
.result-frame .btn {
  width: 173px;
  margin-right: 20px;
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.15);
}
.result-frame .btn2 {
  background: #ffffff;
  color: #000000;
}
</style>

<template>
<div>
<c-header onlyLogo />
  <div class="result-frame" v-if="result === 'success'">
    <img src="/static/images/common/icon-success.png" />
    <h3>
      <p class="en">Payment Success!</p>
      <p>支付成功！</p>
    </h3>
    <div>
      <button class="btn" @click="toDetail">已购票务</button>
      <button class="btn btn2" @click="toIndex">返回首页</button>
    </div>
  </div>
  <div class="result-frame" v-else-if="result === 'fail'">
    <img src="/static/images/common/icon-fail.png" />
    <h3>
      <p class="en">Payment failure.</p>
      <p>支付失败。</p>
    </h3>
    <div>
      <button class="btn" @click="repay">重新支付</button>
      <button class="btn btn2" @click="toIndex">返回首页</button>
    </div>
  </div>
</div>
</template>

<script>
import cHeader from '@/components/header/header'
import store from '@/store'
export default {
  data () {
    return {
      result: ''
    }
  },

  components: {
    cHeader
  },

  methods: {
    toDetail () {
      mpvue.redirectTo({
        url: '/pages/order/list/main'
      })
    },
    toIndex () {
      mpvue.reLaunch({
        url: '/pages/index/main'
      })
    },
    repay () {
      const jsapi = store.state.payParams
      mpvue.requestPayment({
        'timeStamp': jsapi.timeStamp,
        'nonceStr': jsapi.nonceStr,
        'package': jsapi.package,
        'signType': jsapi.signType,
        'paySign': jsapi.paySign,
        'success': res => {
          this.getMessageAuth()
          this.result = 'success'
        },
        'fail': err => {
          console.log('pay fail', err)
        }
      })
    },
    getMessageAuth () {
      console.log('发起订阅消息')
      wx.requestSubscribeMessage({
        tmplIds: [
          'WRge3txz54ZhpQ4md9mG0RHSdLSaMlcuW5TPTWUi_Xk',
          'Qr4BpwVZGPkOYqBHpPDryPuDZkmYoEEDPY-VMBpOGR8',
          'BCUfqqnuvWiwzYjvcQDKEUumjXsMioiEBKzl3chuE_w'
        ],
        success (res) {
          console.log('订阅消息成功')
          console.log(res)
          console.log('--------------------')
          mpvue.reLaunch({
            url: `/pages/result/main?result=success`
          })
        },
        fail (err) {
          console.log('订阅消息失败')
          console.log(err)
          console.log('--------------------')
          mpvue.reLaunch({
            url: `/pages/result/main?result=success`
          })
        }
      })
    }
  },

  onLoad (options) {
    // let app = getApp()
    this.result = options.result || 'success'
  }
}
</script>
