<style lang="stylus" type="text/stylus">
@import "../assets/css/global.styl"
.container
  size(100%, 100vh)
  overflow hidden
  position relative
  .ft-btn
    width 250px
    fxBR(0, 50%)
    border-radius 10px 10px 0 0
    transform translateX(50%)
.login-container
  size(100%, 100%)
  abTL(0, 0)
  overflow hidden
  center()
  .logo
    text-align center
    margin-bottom 40px
    font-size 0
.moveIn
  animation moveIn 1s cubic-bezier(.23,.56,.24,.92) both
@keyframes moveIn
  0%
    transform translateY(100px)
    opacity 0
  100%
    transform translateY(0)
    opacity 1
.moveOut
  animation moveOut 1s cubic-bezier(.23,.56,.24,.92) both
@keyframes moveOut
  0%
    transform translateY(0)
    opacity 1
  100%
    transform translateY(-100px)
    opacity 0
.fadeIn
  animation fadeIn 1s cubic-bezier(.23,.56,.24,.92) both
@keyframes fadeIn
  0%
    opacity 0
  100%
    opacity 1
.fadeOut
  animation fadeOut 1s cubic-bezier(.23,.56,.24,.92) both
@keyframes fadeOut
  0%
    opacity 1
  100%
    opacity 0
</style>

<template>
<div class="container">
  <!-- 登录 -->
  <transition enter-active-class="moveIn" leave-active-class="moveOut">
  <section class="login-container" v-if="page === 'login'">
    <Login />
  </section>
  </transition>
  <!-- 注册账号信息 -->
  <transition enter-active-class="moveIn" leave-active-class="moveOut">
    <section class="login-container" v-if="page === 'register'">
      <Register />
    </section>
  </transition>
  <!-- 注册详细信息 -->
  <transition enter-active-class="moveIn" leave-active-class="moveOut">
    <section class="login-container" v-if="page === 'infos' || page === 'form'">
      <info-form :page="page" />
    </section>
  </transition>
  <!-- 忘记密码 -->
  <transition enter-active-class="moveIn" leave-active-class="moveOut">
    <section class="login-container" v-if="page === 'forget'">
      <Forget />
    </section>
  </transition>
  <!-- 底部按钮 -->
  <transition enter-active-class="fadeIn" leave-active-class="fadeOut">
    <Button class="ft-btn" v-if="page === 'login'" @click="page = 'register'">注册新用户</Button>
  </transition>
  <transition enter-active-class="fadeIn" leave-active-class="fadeOut">
    <Button class="ft-btn" v-if="page === 'register' || page === 'forget'" @click="page = 'login'">已有账户</Button>
  </transition>
  <copy-right />
</div>
</template>

<script type='es6'>
import Login from '../components/login/Login'
import Register from '../components/login/Register'
import infoForm from '../components/login/infoForm'
import Forget from '../components/login/Forget'
import copyRight from '../components/copyRight'
export default {
  name: 'app',
  components: {
    Login,
    Register,
    infoForm,
    Forget,
    copyRight
  },
  data () {
    return {
      page: ''
    }
  },
  provide () {
    return {
      changePage: this.changePage
    }
  },
  mounted () {
    setTimeout(() => {
      this.page = 'infos'
    }, 1000)
  },
  methods: {
    changePage (page) {
      this.page = page
    }
  }
}
</script>
