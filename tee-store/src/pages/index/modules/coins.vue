<style>

</style>

<template>
<div class="swiper-sec">
  <div class="icons">
    <div class="pig"
         :class="{'icon-move': moving}"
         hover-class="hscale"
         hover-stay-time="10"
         @click="toPage('/pages/personal/points/main')"
         @animationend="moveEnd">
      <img src="/static/images/index/pig.png"
           mode="heightFix"
           class="img" />
    </div>
  </div>
</div>
</template>

<script type='es6'>
export default {
  name: 'app',
  props: {
    nums: [Number, String]
  },
  data () {
    return {
      moving: false
    }
  },
  methods: {
    toPage: mpvue.toPage,
    shake () {
      this.moving = true
    },
    moveEnd () {
      this.moving = false
    }
  }
}
</script>
