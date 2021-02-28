<style>
.container { padding: 180px 0 200px 0;}
.result-frame { height: calc(100vh - 380px); display: flex; flex-direction: column; }
.result-frame .frame1 { flex: 1; background-color: #ffffff; }
.result-frame .frame2 { height: 330px; background-color: #EFEDEC; display: flex; align-items: center; }
</style>

<template>
<div class="container">
   <c-header />
   <div class="result-frame">
      <div class="frame1">
         <div class="hint-result" v-if="status === 'suc'">
            <img src="/static/images/order/success2.png" mode="widthFix" style="width: 74rpx;" />
            <h3 class="en">Payment Success！</h3>
            <h3>支付成功！</h3>
         </div>
         <div class="hint-result" v-else>
            <img src="/static/images/order/fail.png" mode="widthFix" style="width: 70rpx;" />
            <h3 class="en">Payment Error！</h3>
            <h3>支付出错！</h3>
         </div>
      </div>
      <div class="frame2" v-if="status === 'suc'">
         <div class="tips-content">
            <img src="/static/images/order/tips.png" mode="widthFix" style="width: 70rpx;" />
            <p>我们将以公众号消息通知形式发送订单进度状态。 (取消关注的用户将无法收取订单进度，请手动 关注 黑耳宠物商城）</p>
         </div>
      </div>
      <div class="frame2" v-else>
         <div class="tips-content">
            <img src="/static/images/order/tips.png" mode="widthFix" />
            <p>网络链接失败 或 用户量拥挤等原因，支付出错，请尝试重新支付。</p>
         </div>
      </div>
   </div>
   <c-footer showClose :btnName="btnName" @close="handleClose" @btnFunc="btnFunc" />
</div>
</template>

<script>
import cHeader from '@/components/header'
import cFooter from '@/components/footer'

export default {
   components: {
      cHeader,
      cFooter
   },
   computed: {
      btnName () {
         if (this.status === 'suc') {
            return '订单详情|Order details'
         } else {
            return '付款|Payment'
         }
      }
   },
   data () {
      return {
         status: '',
         orderNum: ''
      }
   },
   methods: {
      handleClose () {
         mpvue.reLaunch({
            url: '/pages/index/main'
         })
      },
      btnFunc () {
         if (this.status === 'suc') {
            mpvue.redirectTo({
               url: `/pages/order/detail/main?orderNum=${this.orderNum}`
            })
         }
      }
   },
   onLoad (options) {
      Object.assign(this.$data, this.$options.data())
      console.log('order onLoad', options)
      this.status = options.status || 'suc'
      this.orderNum = options.orderNum || ''
   }
}
</script>
