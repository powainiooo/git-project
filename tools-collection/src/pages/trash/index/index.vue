<style scoped>
.ipt { width: 690px; height: 100px; margin: 20px auto 46px auto; border: 1px solid #E5E5E5; border-radius: 50px; text-align: center; font-size: 32px; background-color: #FFFFFF; }

.camera { width: 205px; height: 202px; background-color: #FFFFFF; border-radius: 10px; margin: 0 auto; display: flex; flex-direction: column; justify-content: center; align-items: center; font-size: 32px; color: #666666; }
.camera img { width: 92px; margin-bottom: 24px; }

.nav { margin: 60px 80px; display: flex; justify-content: space-between; flex-wrap: wrap; }
.nav a { width: 254px; display: block; margin-bottom: 38px; }
.nav a img { width: 100%; }
</style>

<template>
  <div class="container3 ovh">
    <input type="text" class="ipt" placeholder="请输入垃圾名称" v-model="keyword" @confirm="queryData" />

    <div class="camera">
      <img src="/static/images/trash/camera.png" mode="widthFix" />
      <p>拍照识别</p>
    </div>

    <div class="nav">
      <a href="#"><img src="/static/images/trash/fl1.png" mode="widthFix" /></a>
      <a href="#"><img src="/static/images/trash/fl2.png" mode="widthFix" /></a>
      <a href="#"><img src="/static/images/trash/fl3.png" mode="widthFix" /></a>
      <a href="#"><img src="/static/images/trash/fl4.png" mode="widthFix" /></a>
    </div>

    <operates :id="id" />
  </div>
</template>

<script>
import operates from '@/components/operates'

export default {
  components: {
    operates
  },
  data () {
    return {
      id: '',
      keyword: ''
    }
  },
  methods: {
    queryData () {
      mpvue.navigateTo({
        url: `/pages/trash/list/main?keyword=${this.keyword}`
      })
    }
  },
  onShareAppMessage () {
    const pages = getCurrentPages()
    const view = pages[pages.length - 1]
    return {
      title: '垃圾分类',
      path: `/${view.route}?id=${this.id}`
    }
  },
  onLoad (options) {
    this.id = options.id
  }
}
</script>
