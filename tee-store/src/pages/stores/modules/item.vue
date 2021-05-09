<style scoped>
.c-store-item { width: 700px; height: 267px; background: #F9F9F9; box-shadow: 0px 3px 20px 0px rgba(0, 0, 0, 0.08); border-radius: 35px; overflow: hidden; position: relative; }
.c-store-item .line1 { height: 80px; background-color: #EDECEB; }
.c-store-item .line1 .l { margin-left: 35px; }
.c-store-item .line1 .logo { width: 175px; }
.c-store-item .line1 .r { width: 168px; height: 100%; background-color: #F0916C; font-size: 24px; color: #FFFFFF; }
.c-store-item .line2 { margin: 22px 35px; font-size: 24px; }
.c-store-item .line3 { display: flex; align-items: baseline; margin-bottom: 10px; margin-left: 35px; }
.c-store-item .line3 img { margin-right: 10px; }
.c-store-item .line3>div { width: 360px; font-size: 20px; line-height: 26px; color: #C9C9C9; }
.c-store-item .line3>div div { width: 2px; height: 20px; margin: 0 24px; }
.c-store-item .btn { width: 108px; background-color: #E8D1B9; position: absolute; right: 30px; bottom: 24px; }
</style>

<template>
<div class="c-store-item">
  <div class="line1 between">
    <div class="l">
      <img src="/static/images/logo@2x.png" mode="widthFix" class="logo" />
    </div>
    <div class="r center">
      <img src="/static/images/icon-cup.png" mode="widthFix" class="w24 mr5" />
      <span>去点餐</span>
    </div>
  </div>
  <div class="line2">喜茶·深圳大仟里店</div>
  <div class="line3">
    <img src="/static/images/icon-clock.png" mode="widthFix" class="w20" />
    <div class="acenter">
      <span>10:00 ~ 22:00</span>
      <div class="borderL"></div>
      <span>距离你1km</span>
    </div>
  </div>
  <div class="line3">
    <img src="/static/images/icon-geo2.png" mode="widthFix" class="w18" />
    <div>广东省深圳市宝安区西乡街道宝安大仟里购物中心一楼L135号</div>
  </div>
  <button class="btn center">
    <img src="/static/images/icon-guide.png" mode="widthFix" class="w26 mr10" />
    <span>导航</span>
  </button>
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
