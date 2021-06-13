<style lang="stylus" type="text/stylus">

</style>

<template>
<div>
  <div class="logo"><img src="@/assets/img/logo.png" /></div>
  <div class="flip-box">
    <Form ref="form" :model="formData" :rules="ruleValidate" class="form">
      <div class="form-title">注册</div>
      <FormItem>
        <Input v-model="formData.email" placeholder="邮箱" @on-blur="emailCheck" />
        <p style="color: #E63828; font-size: 12px; line-height: 12px; margin-bottom: -5px; margin-top: 5px; margin-left: 10px" v-if="showHint">{{hintMsg}}</p>
      </FormItem>
      <FormItem>
        <Input v-model="vericode.mobile" placeholder="联系电话" />
      </FormItem>
      <FormItem>
        <Input v-model="vericode.code" placeholder="验证码">
          <Button slot="append" :disabled="veriBtnDisabled" @click="getCode">{{vericode.btnName}}</Button>
        </Input>
      </FormItem>
      <FormItem>
        <Input type="password" v-model="formData.password" placeholder="密码" />
      </FormItem>
      <FormItem prop="password2">
        <Input type="password" v-model="formData.password2" placeholder="重复密码" />
      </FormItem>
      <FormItem style="margin-top: 40px">
        <Button style="width: 90px" :disabled="nextDisabled" @click="handleNext">下一步</Button>
      </FormItem>
    </Form>
  </div>
</div>
</template>

<script type='es6'>
import vericode from '@/mixin/vericode'
import { postAction } from '@/utils'
export default {
  name: 'app',
  mixins: [vericode],
  data () {
    const psw2Valid = (rule, value, callback) => {
      if (value === this.formData.password) {
        callback()
      } else {
        callback(new Error('两次密码不相同'))
      }
    }
    return {
      formData: {
        email: '',
        mobile: '',
        code: '',
        password: '',
        password2: ''
      },
      vericodeEvent: 'register',
      ruleValidate: {
        password2: [{
          trigger: 'blur',
          validator: psw2Valid
        }]
      },
      showHint: false,
      hintMsg: '',
      emailPass: true,
      emailMsg: ''
    }
  },
  computed: {
    emailReg () {
      const reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
      return reg.test(this.formData.email)
    },
    nextDisabled () {
      if (!this.emailReg || this.phoneDisabled || this.vericode.code === '' || this.formData.password === '' || this.formData.password2 === '') {
        return true
      }
      return false
    }
  },
  inject: ['changePage'],
  methods: {
    handleNext () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (!this.showHint) {
            return false
          }
          this.formData.mobile = this.vericode.mobile
          this.formData.code = this.vericode.code
          this.$store.commit('SET_REGISTER', {
            key: 'account',
            data: this.formData
          })
          this.changePage('infos')
        }
      })
    },
    emailCheck (e) {
      if (!this.emailReg) {
        this.showHint = true
        this.hintMsg = '邮箱格式不正确'
        return false
      } else {
        this.showHint = false
        this.hintMsg = ''
      }
      postAction('/editor/validate/check_email_available', {
        email: this.formData.email
      }).then(res => {
        if (res.code === 0) {
          this.showHint = true
          this.hintMsg = res.msg
        }
      })
    }
  }
}
</script>
