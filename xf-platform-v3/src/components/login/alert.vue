<style lang="stylus" type="text/stylus">
@import "../../assets/css/global.styl"
.c-alert
  size(100%, 100vh)
  fxTL(0, 0)
  background rgba(0, 0, 0, 0.92)
  z-index 1000
  .logo
    text-align center
    margin-bottom 40px
    font-size 0
    img
      width 161px
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
    <div class="logo"><img src="@/assets/img/logo.png" width="161" /></div>
    <div class="flip-box" v-if="status === 'empty'">
      <img src="@/assets/img/ico-suc2.png" width="86" />
      <h3>{{title}}</h3>
      <p v-html="msg"></p>
    </div>
    <div class="flip-box" v-if="status === 'suc' || status === 'checkSuc'">
      <img src="@/assets/img/ico-suc.png" />
      <h3>{{title}}</h3>
      <p v-html="msg"></p>
    </div>
    <div class="flip-box" v-else-if="status === 'fail' || status === 'checkFail'">
      <img src="@/assets/img/ico-fail.png" />
      <h3>{{title}}</h3>
      <p v-html="msg"></p>
    </div>
    <div class="center" style="margin-top: 60px">
      <Button style="width: 135px" v-if="status === 'empty'" @click="onOk">返回</Button>
      <Button style="width: 135px" v-if="status === 'suc'" @click="onOk">完成</Button>
      <Button style="width: 135px" v-else-if="status === 'fail'" @click="onRetry">返回重试</Button>
      <Button style="width: 135px" v-else-if="status === 'checkSuc'" @click="onOk">返回首页</Button>
      <Button style="width: 135px" v-else-if="status === 'checkFail'" @click="onRetry">编辑后重新提交</Button>
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
      title: 'suc',
      msg: 'suc',
      visible: false
    }
  },
  methods: {
    show (status, msg = '') {
      this.status = status
      if (status === 'suc') {
        this.title = '提交成功'
      } else if (status === 'fail') {
        this.title = '提交失败'
      } else if (status === 'empty') {
        this.title = '无相关内容'
      }
      this.msg = msg
      this.visible = true
    },
    check (status, msg = '') {
      this.status = status
      if (status === 'checkSuc') {
        this.title = '账号审核中'
      } else if (status === 'checkFail') {
        this.title = '账号审核失败'
      }
      this.msg = msg
      this.visible = true
    },
    onOk () {
      this.visible = false
      this.$emit('onOk')
    },
    onRetry () {
      this.visible = false
      this.$emit('onRetry')
    }
  }
}
</script>
