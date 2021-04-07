<style scoped>
.unit-list li { display: flex; height: 100px; }
.unit-list li img { width: 12px; position: absolute; top: 39px; right: 30px; }
.unit-list li div { width: 340px; font-size: 28px; position: relative; }
.unit-list li div:after { content: ''; width: 2px; height: 100%; position: absolute; top: 0; right: 0; background-color: #D5D5D5; transform: scaleX(.5); }
.unit-list li input { width: 300px; height: 100%; padding-left: 38px; font-size: 28px; }
</style>

<template>
<div class="container">
  <div class="hr20"></div>

  <ul class="unit-list">
    <li class="borderB">
      <div class="center">公里(kilometre)</div>
      <input placeholder="请输入数字" />
      <img src="/static/images/arrow6.png" mode="widthFix" />
    </li>
  </ul>

  <operates />
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

  created () {
  }
}
</script>
