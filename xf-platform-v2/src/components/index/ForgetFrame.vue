<style>
    .login-frame h3{ color: #fff; font-size: 18px; margin-bottom: 20px;}
    .login-frame .line{ margin-bottom: 20px;}
    .login-frame .code-line{ display: flex; justify-content: space-between; align-items: center;}
    .login-frame .code-line input{ width: 50%;}
    .login-frame .code-line .n-btn{ width: 40%;}
    .login-frame input{ width: 100%; box-sizing: border-box; border: 1px solid #ffffff; border-radius: 6px; font-size: 16px; padding: 7px 16px; color: #ffffff}
    .login-frame input::-webkit-input-placeholder{ color: #ffffff;}
    .login-frame .line>a{ font-size: 12px; color: #ffffff;}
    .login-frame .warn{ width: 130px; position: absolute; top: 270px; left: 290px; background-color: #e73828; padding: 10px 15px; border-radius: 5px; z-index: 50; font-size: 12px; color: #fff;}
    .login-frame .warn:before{ content: ''; width: 10px; height: 10px; border: 5px solid rgba(0,0,0,0); border-right-color: #e73828; position: absolute; top: 50%; left: -10px; margin-top: -5px;}
</style>

<template>
    <div class="login-frame">
        <h3>忘记密码</h3>
        <div class="line"><input type="text" placeholder="联系电话" v-model="mobile" @keyup="inputBlur('phone')"></div>
        <div class="line code-line">
            <input type="text" placeholder="验证码" v-model="vericode">
            <t-button extraClass="white" :isDisabled="veriBtnDisabled" size="min" @dotap="getCode">{{codeBtnName}}</t-button>
        </div>
        <div class="line"><input type="password" placeholder="新密码" v-model="password" @keyup="inputBlur('psw')"></div>
        <div class="line"><input type="password" placeholder="确认新密码" v-model="confirmPSW" @keyup="inputBlur('cpsw')"></div>
        <div class="line" style="margin-top: 35px;"><t-button extraClass="white" :isDisabled="btnDisabled" @dotap="doSend">确认</t-button></div>

        <div class="warn" :style="{top:warnTop+'px'}" v-if="showWarn">{{warnTxt}}</div>
    </div>
</template>

<script type='es6'>
import TButton from '@/components/common/TButton.vue'
import qs from 'qs'
import vericode from '@/components/mixin/vericode.js'
export default {
   name: 'app',
   components: { TButton },
   mixins: [vericode],
   data () {
      return {
         password: '',
         confirmPSW: '',
         showWarn: false,
         warnTop: 0,
         warnTxt: ''
      }
   },
   computed: {
      pswPass () {
         let reg = /^(?=.*[0-9])(?=.*[a-zA-Z])(.{8,})$/
         return reg.test(this.password)
      },
      btnDisabled () {
         if (this.phoneDisabled || this.password === '' || this.confirmPSW === '') {
            return true
         }
         return false
      }
   },
   methods: {
      doSend () {
         let self = this
         let obj = {
            mobile: this.mobile,
            password: this.password,
            repassword: this.confirmPSW,
            vericode: this.vericode
         }
         this.$ajax.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
         this.$ajax.post('/client/api/edit_pwd', qs.stringify(obj)).then(res => {
            let data = res.data
            if (data.status === 1) {
               this.phone = ''
               this.password = ''
               this.confirmPSW = ''
               this.code = ''
               self.$emit('doHideForget')
            }
            self.$Message.warning(data.msg)
         })
      },
      inputBlur (name) {
         if (name === 'phone') {
            this.showWarn = this.phoneDisabled
            this.warnTop = 48
            this.warnTxt = '手机号格式不正确'
         } else if (name === 'psw') {
            this.showWarn = !this.pswPass
            this.warnTop = 168
            this.warnTxt = '密码格式不正确'
         } else if (name === 'cpsw') {
            this.showWarn = this.password !== this.confirmPSW
            this.warnTop = 228
            this.warnTxt = '密码不一致'
         }
      }
   }
}

</script>
