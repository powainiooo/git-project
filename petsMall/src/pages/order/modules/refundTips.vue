<style>
.c-refund-tips .btn-round { width: 345px;  margin-top: 105px; margin-left: 66px; font-size: 24px; }
</style>

<template>
<div class="c-refund-tips modal-hints" :style="{top: show ? 0 : '100vh'}" @touchmove.stop="tmove">
   <div class="frame1">
      <div>
         <div class="tips-content">
            <img src="/static/images/order/tips.png" mode="widthFix" />
            <p><text>如有特殊情况需退款，请拨打以下电话告知客服获取退款许可，其他疑问也可拨打以下电话或添加客服微信（手机同号）。</text></p>
         </div>
         <button class="btn-round"
                 @click="makePhone"
                 hover-class="hscale"
                 hover-stay-time="10">{{phone}}</button>
      </div>
   </div>
   <div class="frame2">
      <img src="/static/images/header/logo@2x.png" mode="widthFix" />
   </div>
   <img src="/static/images/header/close2.png" class="close" @click="closeDetail" />
</div>
</template>

<script type='es6'>
export default {
  name: 'app',
  data () {
    return {
       show: false,
       phone: '13812341234'
    }
  },
  methods: {
     tmove () {},
     closeDetail () {
        this.show = false
        this.$emit('close')
     },
     makePhone () {
        mpvue.makePhoneCall({
           phoneNumber: this.phone
        })
     }
  }
}
</script>
