<style lang="stylus" type="text/stylus" scoped>
@import "../../assets/css/global.styl"
.c-welcome
  size(100%, 100vh); abTL(0, 0); center()
  .c-welcome-img1
    width 73.8%; abTL(50%, 13.1%); transform translateY(-50%); opacity 0;
  div
    img
      display block; opacity 0;
    button
      width 250px; margin-left -20px; opacity 0;
    position relative; z-index 5; text-align center;
.move1
  animation welcome .8s cubic-bezier(.28,.69,.46,1.35) .2s both
.move2
  animation frame .8s cubic-bezier(.28,.69,.46,1.35) .4s both
.move4
  animation frame .8s cubic-bezier(.28,.69,.46,1.35) .6s both
.move3
  animation blink 2s linear 2s infinite both
@keyframes welcome
  0%
    transform translateY(0); opacity 0
  100%
    transform translateY(-50%); opacity 1
@keyframes frame
  0%
    transform translateY(30%); opacity 0
  100%
    transform translateY(0); opacity 1
@keyframes blink
  0%, 100%
    opacity 1
  50%
    opacity .5
</style>

<template>
<div class="c-welcome">
  <img src="@/assets/img/welcome.png" class="c-welcome-img1" :class="{'move1': show}" @load="loadOver" />
  <div>
    <img src="@/assets/img/f1.png" class="c-welcome-img2" :class="{'move2': show}" @load="loadOver" />
    <p :class="{'move4': show}">
      <Button to="/publish" style="width: 250px; margin-left: -30px;" :class="{'move3': show}">发布你的第一场活动</Button>
    </p>
  </div>
</div>
</template>

<script type='es6'>
export default {
  name: 'app',
  data () {
    return {
      index: 0,
      show: false
    }
  },
  methods: {
    loadOver () {
      this.index += 1
      if (this.index === 2) {
        console.log('move')
        this.show = true
      }
    }
  }
}
</script>
