<style>

</style>

<template>
<div class="swiper-sec">
  <div class="line1 between">
    <div class="l">
      <img src="/static/images/index/tag1.png" mode="widthFix" />
      <p>{{nums}}</p>
    </div>
    <div class="r acenter">
      <button class="btn-circle mr15"
              hover-class="hscale"
              hover-stay-time="10"
              @click="openScan"><img src="/static/images/index/scan.png" mode="widthFix" class="w26" /></button>
      <button class="btn"
              hover-class="hscale"
              hover-stay-time="10"
              @click="toPage('/pages/personal/points/main?page=detail')" v-if="nums > 0">使用记录</button>
    </div>
  </div>
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
