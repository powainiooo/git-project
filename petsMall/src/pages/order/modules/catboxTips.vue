<style>
.c-catbox-tips { padding-bottom: 200px; }
</style>

<template>
<div class="c-catbox-tips modal-hints" :style="{top: show ? 0 : '100vh'}">
   <div class="frame1">
      <div class="tips-content">
         <img src="/static/images/order/tips.png" mode="widthFix" />
         <p><text>订购的猫盒为一次性付款，第一盒将在下单后48小时候发出，之后每月按所选日期定时发出。\n所订购的产品，每月将按以上产品清单及数量进行配送。</text></p>
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
       show: false
    }
  },
  methods: {
     closeDetail () {
        this.show = false
        this.$emit('close')
     }
  }
}
</script>
