<style>

</style>

<template>
<div class="swiper-sec">
  <div class="icons">
    <div class="pig"
         hover-class="hscale"
         hover-stay-time="10"
         @click="toPage('/pages/personal/points/main')">
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
    return {}
  },
  methods: {
    toPage: mpvue.toPage,
    openScan () {
      mpvue.scanCode({
        success(res) {
          console.log('scanCode success', res)
        }
      })
    }
  }
}
</script>
