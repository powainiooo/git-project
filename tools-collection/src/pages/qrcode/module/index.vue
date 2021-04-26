<style scoped>
.module-list { margin: 20px 12px 60px 12px; display: flex; flex-wrap: wrap; }
.module-list .item { width: 242px; position: relative; }
.module-list .item img { width: 100%; height: 242px; }
.module-list .item span { width: 100%; height: 78px; display: flex; align-items: center; justify-content: center; font-size: 30px; color: #3F3F3F; }
</style>

<template>
  <div class="container">
    <div class="module-list mb60">
      <div class="item">
        <img src="/static/images/qrcode/module1.png" />
        <span>默认</span>
      </div>
      <div class="item">
        <img src="/static/images/qrcode/module2.png" />
        <span>液态1</span>
      </div>
      <div class="item">
        <img src="/static/images/qrcode/module3.png" />
        <span>液态2</span>
      </div>
      <div class="item">
        <img src="/static/images/qrcode/module4.png" />
        <span>液态3</span>
      </div>
      <div class="item">
        <img src="/static/images/qrcode/module5.png" />
        <span>液态4</span>
      </div>
      <div class="item">
        <img src="/static/images/qrcode/module6.png" />
        <span>液态5</span>
      </div>
      <div class="item">
        <img src="/static/images/qrcode/module7.png" />
        <span>液态6</span>
      </div>
      <div class="item">
        <img src="/static/images/qrcode/module8.png" />
        <span>液态7</span>
      </div>
    </div>
    <div class="ml120 mr120">
      <button class="btn mb40">生成二维码</button>
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
    return {}
  },

  created () {}
}
</script>
