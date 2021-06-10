<style scoped>
.result-container { height: calc(100vh - 104px); overflow: hidden; }
.result-container .content { width: 100%; position: absolute; top: 0; left: 0; }
.result-container .content .icon { width: 190px; margin: 180px auto 0 auto; }
.result-container .content .title { font-size: 54px; line-height: 65px; margin-top: 38px; text-align: center; }
.result-container .content .title .en { font-family: DinB; }
.result-container .content .info { width: 400px; margin: 38px auto 130px auto; font-size: 20px; line-height: 26px; color: #C9C9C9; }
.result-container .content .btn { width: 175px; }
</style>

<template>
<div class="page">
  <c-header />
  <div class="container2 result-container">
    <img src="/static/images/bg3.png" mode="widthFix" class="w100" />
    <div class="content">
      <div class="icon">
        <img src="/static/images/suc.png" mode="widthFix" class="w100" v-if="status === 'suc'" />
        <img src="/static/images/fail.png" mode="widthFix" class="w100" v-else-if="status === 'fail'" />
      </div>
      <div class="title" v-if="status === 'suc'">
        <p class="en">Payment Success</p>
        <p>支付成功</p>
      </div>
      <div class="title" v-else-if="status === 'fail'">
        <p class="en">Payment failure</p>
        <p>支付失败</p>
      </div>
      <p class="info" v-if="status === 'suc'">
        <span v-if="from === 'tee'">请耐心等候产品出餐，注意查看店内取餐码。或关注小程序消息通知。</span>
        <span v-else>若选择邮寄，请耐心等待发货，注意查看物流信息。选择自提，请尽快前往相应门店领取周边商品。</span>
      </p>
      <p class="info" v-else-if="status === 'fail'">网络拥堵 或 网络异常，请点击“重新支付”，以完成订单支付。</p>
      <div class="center">
        <button class="btn btn-style1 mr25" v-if="status === 'suc'" @click="toOrder">查看订单详情</button>
        <button class="btn btn-style1 mr25" v-else-if="status === 'fail'" @click="repay">重新支付</button>
        <button class="btn btn-style2" @click="backIndex">返回首页</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import cHeader from '@/components/header'
import store from '@/store'
export default {
  components: {
    cHeader
  },
  data () {
    return {
      status: 'suc',
      orderId: '',
      from: ''
    }
  },

  methods: {
    toOrder () {
      if (this.from === 'tee') {
        mpvue.navigateTo({
          url: `/pages/order/detail/tee/main?id=${this.orderId}`
        })
      } else {
        mpvue.navigateTo({
          url: `/pages/order/detail/nearby/main?id=${this.orderId}`
        })
      }
    },
    backIndex () {
      mpvue.reLaunch({
        url: '/pages/index/main'
      })
    },
    getMessageAuth () {
      console.log('发起订阅消息')
      wx.requestSubscribeMessage({
        tmplIds: [
          'yVssW3D0_5NerH2vZnkhDgz5G_ZpOm5Oq3u6dH2ylAw',
          'vv3tLHo6Ig1p0Rj0MlfESFu69Vv2ETau7tNO-rG0tFw',
          'tn5jGLoQ2dnK85A0fqG-3p3Q17sk0h1bj8LdkVGwgrI'
        ],
        success (res) {
          console.log('订阅消息成功')
          console.log(res)
          console.log('--------------------')
        },
        fail (err) {
          console.log('订阅消息失败')
          console.log(err)
          console.log('--------------------')
        }
      })
    },
    repay () {
      mpvue.showLoading({
        title: '支付中'
      })
      const jsapi = store.state.pay
      mpvue.requestPayment({
        'timeStamp': jsapi.timeStamp,
        'nonceStr': jsapi.nonceStr,
        'package': jsapi.package,
        'signType': jsapi.signType,
        'paySign': jsapi.paySign,
        'success': res => {
          // this.getMessageAuth()
          console.log('pay success', res)
          this.status = 'suc'
          this.getMessageAuth()
          mpvue.hideLoading()
        },
        'fail': err => {
          console.log('pay fail', err)
          this.status = 'fail'
          mpvue.hideLoading()
        }
      })
    }
  },

  onLoad (option) {
    this.status = option.result
    this.orderId = option.id
    this.from = option.from
    if (this.status === 'suc') {
      this.getMessageAuth()
    }
  }
}
</script>
