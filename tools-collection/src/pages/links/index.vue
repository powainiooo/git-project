<style scoped>
.banner { width: 100%; }
.top { width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; flex-direction: column; position: absolute; top: 0; left: 0; font-size: 34px; color: #FFFFFF; }
</style>

<template>
  <div class="container2">
    <div class="pr">
      <img src="/static/images/banner2.png" mode="widthFix" class="banner"/>
      <div class="top">相关小程序推荐</div>
    </div>
    <div class="b-fff pt65 pb100">
      <div class="tool-list">
        <a href="#" class="tool-item">
          <img src="/static/images/img/icon1.png" mode="aspectFill" />
          <div>汇率转换</div>
        </a>
        <a href="#" class="tool-item">
          <img src="/static/images/img/icon1.png" mode="aspectFill" />
          <div>汇率转换</div>
        </a>
        <a href="#" class="tool-item">
          <img src="/static/images/img/icon1.png" mode="aspectFill" />
          <div>汇率转换</div>
        </a>
        <a href="#" class="tool-item">
          <img src="/static/images/img/icon1.png" mode="aspectFill" />
          <div>汇率转换</div>
        </a>
        <a href="#" class="tool-item">
          <img src="/static/images/img/icon1.png" mode="aspectFill" />
          <div>汇率转换</div>
        </a>
        <a href="#" class="tool-item">
          <img src="/static/images/img/icon1.png" mode="aspectFill" />
          <div>汇率转换</div>
        </a>

      </div>
    </div>
  </div>
</template>

<script>
import { postAction } from '@/utils/api'

export default {

  data () {
    return {
      imgSrc: mpvue.imgSrc,
      list: []
    }
  },
  methods: {
    getData () {
      postAction('dsjl').then(res => {
        if (res.code === 1) {
          this.list = res.data.dsjl
        }
      })
    }
  },
  onShow () {
    this.getData()
  }
}
</script>
