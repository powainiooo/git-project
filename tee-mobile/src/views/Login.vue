<style scoped>
.login-container { min-height: calc(100vh - 104px); overflow: hidden; background: url("../assets/img/bg.png") no-repeat; background-size: 100%; background-color: #ffffff; }
.login-box { margin: 240px 84px; }
.login-box .btns { margin-top: 200px; text-align: center; }
.login-box .btns button { width: 175px; }
</style>

<template>
<div class="container2 login-container">
  <div class="login-box">
    <h3 class="f30 ml15 mb60">登录</h3>
    <div class="form-line mb60">
      <div class="form-item">
        <input type="text" placeholder="账号" />
      </div>
    </div>
    <div class="form-line">
      <div class="form-item">
        <input type="password" placeholder="密码" />
      </div>
    </div>
    <div class="btns">
      <button class="btn btn-style1">确定登录</button>
    </div>
  </div>
</div>
</template>

<script type='es6'>
export default {
  name: 'app',
  data () {
    return {}
  },
  methods: {}
}
</script>
