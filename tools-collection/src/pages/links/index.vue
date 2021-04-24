<style scoped>
.banner { width: 100%; }
.top { width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; flex-direction: column; position: absolute; top: 0; left: 0; font-size: 34px; color: #FFFFFF; }
.links-list>.item { width: 100%; height: 150px; display: flex; align-items: center; position: relative; border-bottom: 1px solid #F8F8F8; }
.links-list>.item .img { width: 80px; height: 80px; border-radius: 50%; border: 1px solid #F8F8F8; overflow: hidden; margin-left: 44px; margin-right: 30px; }
.links-list>.item .img img { width: 100%; height: 100%; }
.links-list>.item h3 { font-size: 32px; color: #000000; }
.links-list>.item .arrow { width: 16px; position: absolute; top: 50%; right: 40px; transform: translateY(-50%); }
</style>

<template>
  <div class="container">
    <div class="pr">
      <img src="/static/images/banner2.png" mode="widthFix" class="banner"/>
      <div class="top">相关小程序推荐</div>
    </div>
    <div class="links-list">
      <div class="item" v-for="item in list" :key="index" @click="toApp(item)">
        <div class="img">
          <img :src="imgSrc + item.icon" mode="aspectFill" />
        </div>
        <h3>{{item.name}}</h3>
        <img src="/static/images/arrow7.png" mode="widthFix" class="arrow" />
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
      postAction('links').then(res => {
        if (res.ret === 0) {
          this.list = res.data
        }
      })
    },
    toApp (record) {
      mpvue.navigateToMiniProgram({
        appId: record.appid
      })
    }
  },
  onShow () {
    this.getData()
  }
}
</script>
