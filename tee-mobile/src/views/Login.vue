<style scoped>
.login-container { min-height: calc(100vh - 104px); overflow: hidden; background: url("../assets/img/bg.png") no-repeat; background-size: 100%; background-color: #ffffff; }
.login-box { margin: 240px 84px; }
.login-box .btns { margin-top: 200px; text-align: center; }
.login-box .btns button { width: 175px; }
</style>

<template>
<div class="container">
  <div class="container2 login-container">
    <div class="login-box">
      <h3 class="f30 ml15 mb60">登录</h3>
      <div class="form-line mb60">
        <div class="form-item">
          <input type="text" placeholder="账号" v-model="username" />
        </div>
      </div>
      <div class="form-line">
        <div class="form-item">
          <input type="password" placeholder="密码" v-model="password" />
        </div>
      </div>
      <div class="btns">
        <button class="btn btn-style1" @click="handleLogin">确定登录</button>
      </div>
    </div>
  </div>
</div>
</template>

<script type='es6'>
import Vue from 'vue'
import { ACCESS_TOKEN } from '@/config'
import { postAction } from '@/utils'

export default {
  name: 'app',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    handleLogin () {
      if (this.username === '') {
        this.$Toast.warning('请输入账号')
        return false
      }
      if (this.password === '') {
        this.$Toast.warning('请输入密码')
        return false
      }
      postAction('/shopapi/login', {
        account: this.username,
        password: this.password
      }).then(res => {
        if (res.code === 0) {
          Vue.ls.set(ACCESS_TOKEN, res.data.api_token, 7 * 24 * 60 * 60 * 1000)
          this.$router.push({
            name: 'Home'
          })
        }
      })
    }
  }
}
</script>
