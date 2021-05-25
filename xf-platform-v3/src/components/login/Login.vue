<style lang="stylus" type="text/stylus">

</style>

<template>
<div>
  <div class="logo"><img src="@/assets/img/logo.png" /></div>
  <div class="flip-box">
    <Form class="form" @keyup.enter.native="handleLogin">
      <div class="form-title">登陆</div>
      <FormItem>
        <Input v-model="formData.account" placeholder="邮箱 / 联系电话" />
      </FormItem>
      <FormItem>
        <Input type="password" v-model="formData.password" placeholder="密码" />
      </FormItem>
      <FormItem style="margin-top: -6px">
        <a href="javascript:;" class="txt" @click="changePage('forget')">忘记密码？</a>
      </FormItem>
      <div class="form-item" style="margin-top: 40px">
        <Button size="small" style="width: 90px;" @click="handleLogin">登录</Button>
      </div>
    </Form>
  </div>
</div>
</template>

<script type='es6'>
import Vue from 'vue'
import { ACCESS_TOKEN } from '@/config'
import { postAction } from '@/utils'
export default {
  name: 'app',
  inject: ['changePage'],
  data () {
    return {
      formData: {
        account: '',
        password: ''
      },
      isAjax: false
    }
  },
  mounted () {
  },
  methods: {
    handleLogin () {
      if (this.isAjax) return
      this.isAjax = true
      postAction('/editor/user/login', {
        ...this.formData
      }).then(res => {
        this.isAjax = false
        if (res.code === 1) {
          Vue.ls.set(ACCESS_TOKEN, res.data.token, 7 * 24 * 60 * 60 * 1000)
          this.$router.push({
            name: 'Home'
          })
        }
      })
    }
  }
}
</script>
