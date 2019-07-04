<style>
    .bank-info{ margin: 50px;}
</style>

<template>
    <div class="bank-info">
        <div class="info-item">
            <p class="name">开户名</p>
            <p class="info">{{bankData.username}}</p>
        </div>
        <div class="info-item">
            <p class="name">预留手机</p>
            <p class="info">{{bankData.mobile}}</p>
        </div>
        <div class="info-item">
            <p class="name">身份证</p>
            <p class="info" style="width: 300px;">{{bankData.idnums}}</p>
        </div>
        <div class="info-item">
            <p class="name">银行卡号</p>
            <p class="info" style="width: 300px;">{{bankData.cardnums}}</p>
        </div>
        <div class="info-item" style="margin-bottom: 180px;">
            <p class="name">开户支行</p>
            <p class="info" style="width: 300px;">{{bankData.bankname}}</p>
        </div>
        <div style="width: 90px; margin-bottom: 20px;"><t-button size="min" @dotap="$emit('toggle','editorbank')">更改账号</t-button></div>
        <div style="font-size: 14px; color: #888888; margin-top: 60px;">更改银行卡号需要通过绑定手机的验证码进行验证，如若发生<br>手机保管不当被恶意修改银行卡信息，小夫有票拒不负责。</div>
    </div>
</template>

<script type="es6">
import TButton from '@/components/common/TButton.vue'
export default {
   name: 'App',
   components: { TButton },
   computed: {
      bankData () {
         return this.$store.state.bankData
      }
   },
   data () {
      return {

      }
   }
}

</script>
