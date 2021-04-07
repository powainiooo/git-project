<style scoped>
.unit-list li { height: 100px; }
.unit-list li a { display: flex; height: 100%; align-items: center; padding-left: 32px; font-size: 30px; position: relative; }
.unit-list li a img { width: 12px; position: absolute; top: 39px; right: 30px; }
</style>

<template>
  <div class="container">
    <div class="hr20"></div>

    <ul class="unit-list">
      <li class="borderB">
        <a href="#">长度换算 <img src="/static/images/arrow6.png" mode="widthFix" /></a>
      </li>
      <li class="borderB">
        <a href="#">长度换算 <img src="/static/images/arrow6.png" mode="widthFix" /></a>
      </li>
      <li class="borderB">
        <a href="#">长度换算 <img src="/static/images/arrow6.png" mode="widthFix" /></a>
      </li>
      <li class="borderB">
        <a href="#">长度换算 <img src="/static/images/arrow6.png" mode="widthFix" /></a>
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
