<style lang="stylus" type="text/stylus">
@import "../../assets/css/global.styl"
.c-alert
  size(100%, 100vh)
  fxTL(0, 0)
  background rgba(0, 0, 0, 0.92)
  z-index 1000
  .flip-box
    height 328px
    center()
    flex-direction column
    h3
      font-size 18px
      margin-top 26px
      margin-bottom 6px
    p
      font-size 10px
      color #C8C9CA
</style>

<template>
<div class="c-alert center" v-if="visible" @click="visible = false">
  <div>
    <div class="logo"><img src="@/assets/img/logo.png" /></div>
    <div class="flip-box" v-if="status === 'suc'">
      <img src="@/assets/img/ico-suc.png" />
      <h3>提交注册成功</h3>
      <p>通过审核后我们将会以短信的形式通知</p>
    </div>
    <div class="flip-box" v-else-if="status === 'fail'">
      <img src="@/assets/img/ico-fail.png" />
      <h3>提交注册失败</h3>
      <p>可能您的网络不太顺畅，请重新注册</p>
    </div>
    <div class="center" style="margin-top: 60px">
      <Button style="width: 135px" v-if="status === 'suc'">完成</Button>
      <Button style="width: 135px" v-else-if="status === 'fail'">返回重试</Button>
    </div>
  </div>
</div>
</template>

<script type='es6'>
export default {
  name: 'app',
  data () {
    return {
      status: 'suc',
      visible: false
    }
  },
  methods: {
    show (status) {
      this.status = status
      this.visible = true
    }
  }
}
</script>
