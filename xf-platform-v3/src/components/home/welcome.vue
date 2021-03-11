<style lang="stylus" type="text/stylus" scoped>
@import "../../assets/css/global.styl"
.c-welcome
  size(100%, 100vh)
  abTL(0, 0)
  center()
  .c-welcome-img1
    width 73.8%
    abTL(50%, 13.1%)
    transform translateY(-50%)
  div
    img
      display block
    button
      width 250px
      margin-left -20px
    position relative
    z-index 5
    text-align center
</style>

<template>
<div class="c-welcome">
  <img src="@/assets/img/welcome.png" class="c-welcome-img1" />
  <div>
    <img src="@/assets/img/f1.png" class="c-welcome-img2" />
    <Button>发布你的第一场活动</Button>
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
