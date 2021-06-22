<style scoped>
.c-store-item { position: relative; }
.c-store-item { width: 700px; height: 267px; background: #F9F9F9; box-shadow: 0px 3px 20px 0px rgba(0, 0, 0, 0.08); border-radius: 35px; overflow: hidden; position: relative; }
.c-store-item .line1 { height: 80px; background-color: #EDECEB; }
.c-store-item .line1 .l { margin-left: 35px; }
.c-store-item .line1 .logo { width: 175px; }
.c-store-item .line1 .x { width: 15px; margin: 0 10px; }
.c-store-item .line1 .logo2 { height: 40px; }
.c-store-item .line1 .r { width: 168px; height: 100%; background-color: #F0916C; font-size: 24px; color: #FFFFFF; }
.c-store-item .line1 .break { background-color: #CECBC6; }
.c-store-item .line2 { margin: 22px 35px; font-size: 24px; }
.c-store-item .line3 { display: flex; align-items: baseline; margin-bottom: 10px; margin-left: 35px; }
.c-store-item .line3 img { margin-right: 10px; }
.c-store-item .line3>div { width: 360px; font-size: 20px; line-height: 26px; color: #C9C9C9; }
.c-store-item .line3>div div { width: 2px; height: 20px; margin: 0 24px; }
.c-store-item .btn { width: 108px; background-color: #E8D1B9; position: absolute; right: 30px; bottom: 24px; }
</style>

<template>
<div class="c-store-item" :hover-class="hscale" hover-stay-time="10" @click="toDetail">
  <div class="line1 between">
    <div class="l acenter">
      <!--      <img :src="imgSrc + record.shop_logo" mode="widthFix" class="logo" />-->
      <img src="/static/images/logo@2x.png" mode="widthFix" class="logo" />
      <img src="/static/images/x.png" mode="widthFix" class="x" />
      <img :src="imgSrc + record.shop_logo" mode="heightFix" class="logo2" />
    </div>
    <div class="r center" v-if="record.word_status === 1">
      <img src="/static/images/icon-cup.png" mode="widthFix" class="w24 mr5" />
      <span>去点餐</span>
    </div>
    <div class="r center break" v-if="record.word_status === 0">
      <img src="/static/images/z.png" mode="widthFix" class="w20 mr5" />
      <span>休息中</span>
    </div>
  </div>
  <div class="line2">{{record.shop_name}}</div>
  <div class="line3">
    <img src="/static/images/icon-clock.png" mode="widthFix" class="w20" />
    <div class="acenter">
      <span>{{record.word_time_start}} ~ {{record.word_time_end}}</span>
      <div class="borderL"></div>
      <span>距离你{{record.distance}}km</span>
    </div>
  </div>
  <div class="line3">
    <img src="/static/images/icon-geo2.png" mode="widthFix" class="w18" />
    <div>{{record.province}}{{record.city}}{{record.area}}{{record.address}}</div>
  </div>
  <button class="btn center"
          hover-stop-propagation
          hover-class="hscale"
          hover-stay-time="10"
          @click.stop="handleGuide">
    <img src="/static/images/icon-guide.png" mode="widthFix" class="w26 mr10" />
    <span>导航</span>
  </button>
</div>
</template>

<script type='es6'>
import store from '@/store'

export default {
  name: 'app',
  props: {
    record: Object
  },
  data () {
    return {
      imgSrc: mpvue.imgSrc
    }
  },
  methods: {
    handleGuide (e) {
      mpvue.openLocation({
        latitude: Number(this.record.lat),
        longitude: Number(this.record.lng),
        success (res) {
          console.log('openLocation success', res)
        },
        fail (res) {
          console.log('openLocation fail', res)
        }
      })
    },
    toDetail () {
      this.$emit('tap', this.record)
    }
  }
}
</script>
