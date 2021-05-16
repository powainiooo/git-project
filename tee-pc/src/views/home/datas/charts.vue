<style lang="stylus" type="text/stylus">
@import "../../../assets/css/mixin.styl"
.charts-container
  size(58%, 640px)
</style>

<template>
<div class="box2 charts-container">
  <div class="pr">
    <Tabs type="card" class="tee-tabs" style="margin-top: 13px;">
      <TabPane label="今日收益">标签一的内容</TabPane>
      <TabPane label="今日杯数">标签二的内容</TabPane>
    </Tabs>
  </div>
</div>
</template>

<script type='es6'>
import * as echarts from 'echarts'
export default {
  name: 'app',
  data () {
    return {}
  },
  methods: {}
}
</script>
