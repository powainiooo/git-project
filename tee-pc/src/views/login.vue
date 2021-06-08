<style lang="stylus">
@import "../assets/css/mixin.styl"
.login-box
  size(100%, 100%); position relative; overflow hidden;
.hint-box
  background-color #E8D1B9; size(100%, 100%); abTL(calc(100% - 70px), 0); color #ffffff;
  a
    abTL(-12px, 40px); center(); flex-direction column;
    .ar1
      size(45px, 13px)
    .ar2
      width 9px;
    .rotate
      transform rotateZ(180deg)
  h3
    font-weight normal; height 70px; margin-bottom 5px; padding-left 30px; font-size 18px;
  p
    line-height 18px; margin 0 30px 15px 30px;
  div
    margin-bottom 28px; margin-left 30px;
.hint-box-show
  top 42px;
</style>

<template>
<float-box v-model="visible" :mask="false" :width="400">
  <div class="login-box">
    <!-- 登录表单 -->
    <Form class="c-form mt120" ref="form" :model="formData" :rules="ruleValidate" @keyup.enter.native="handleLogin">
      <h3 class="f18 mb30 ml10">登陆</h3>
      <FormItem prop="username">
        <Input placeholder="账号" v-model="formData.username" />
      </FormItem>
      <FormItem prop="password">
        <Input type="password" placeholder="密码" v-model="formData.password" />
      </FormItem>
      <FormItem class="mt80">
        <Button @click="handleLogin">确认</Button>
      </FormItem>
    </Form>
    <!-- 提示 -->
    <div class="hint-box box ts1" :class="{'hint-box-show': showHint}">
      <a href="javascript:;" @click="showHint = !showHint">
        <img src="@/assets/img/ar1.png" class="ar1" />
        <img src="@/assets/img/ar2.png" class="ar2 ts1" :class="{'rotate': showHint}" />
      </a>
      <h3 class="acenter">如何获取账</h3>
      <p>“无事干杯”提供预订点餐、在线点餐等服务于一体的智能餐饮服务平台。 了解详情 全美食商家管理平台 最大化的帮助商户实现规范工作流程,提高运营效率;降低运营成本,提高经营效益;提升企业形象。</p>
      <p>与“无事干杯”达成商务合作，由“无事干杯”发放合作账号。具体合作方式详情请致“无事干杯”。</p>
      <div class="acenter mt70">
        <img src="@/assets/img/wechat.png" width="26" class="mr15" />wushiganbei
      </div>
      <div class="acenter">
        <img src="@/assets/img/phone.png" width="22" class="mr20" />13729492910
      </div>
    </div>
  </div>
</float-box>
</template>

<script type='es6'>
import Vue from 'vue'
import floatBox from '@/components/common/floatBox'
import { postAction } from '../utils'
import { ACCESS_TOKEN } from '@/config'
export default {
  name: 'app',
  components: {
    floatBox
  },
  data () {
    return {
      visible: false,
      showHint: false,
      formData: {
        username: '',
        password: ''
      },
      ruleValidate: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    setTimeout(() => {
      this.visible = true
    }, 1000)
  },
  methods: {
    handleLogin () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          //
          postAction('/shopapi/login', {
            account: this.formData.username,
            password: this.formData.password
          }).then(res => {
            if (res.code === 0) {
              Vue.ls.set(ACCESS_TOKEN, res.data.api_token, 7 * 24 * 60 * 60 * 1000)
              this.$router.push({
                name: 'Home'
              })
            }
          })
        }
      })
    }
  }
}
</script>
