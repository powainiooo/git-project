<style>

</style>

<template>
<div class="swiper-sec">
  <div class="line1 between">
    <div class="l">
      <img src="/static/images/index/tag3.png" mode="widthFix" />
      <p>{{nums}}</p>
    </div>
    <div class="r acenter">
      <button class="btn-circle mr15"><img src="/static/images/index/scan.png" mode="widthFix" class="w26" /></button>
      <button class="btn" @click="toPage('/pages/personal/gift/main?status=used')">使用记录</button>
    </div>
  </div>
  <div class="icons">
    <div class="gift"
         hover-class="hscale"
         hover-stay-time="10"
         @click="toPage('/pages/personal/gift/main')">
      <img src="/static/images/index/gift.png"
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
    toPage: mpvue.toPage
  }
}
</script>
