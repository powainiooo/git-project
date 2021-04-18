<style scoped>
.unit-list li { height: 100px; }
.unit-list li a { display: flex; height: 100%; align-items: center; padding-left: 32px; font-size: 30px; position: relative; }
.unit-list li a img { width: 12px; position: absolute; top: 39px; right: 30px; }
</style>

<template>
  <div class="container">
    <div class="hr20"></div>

    <ul class="unit-list">
      <li class="borderB" v-for="item in list" :key="index">
        <a :href="'/pages/unit/detail/main?key=' + item.value">{{item.name}} <img src="/static/images/arrow6.png" mode="widthFix" /></a>
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
    return {
      list: [
        { name: '长度换算', value: 'length' },
        { name: '面积换算', value: 'area' },
        { name: '体积换算', value: 'volume' },
        { name: '时间换算', value: 'time' },
        { name: '人民币换算', value: 'money' },
        { name: '压力换算', value: 'pressure' },
        { name: '功率换算', value: 'power' },
        { name: '功率热', value: 'power' },
        { name: '时间换算', value: 'calories' },
        { name: '密度换算', value: 'density' },
        { name: '力的换算', value: 'force' },
        { name: '速度换算', value: 'speed' },
        { name: '数据存储换算', value: 'storage' }
      ]
    }
  },

  created () {
  }
}
</script>
