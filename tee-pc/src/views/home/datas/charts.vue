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
import { getAction } from '@/utils'
import { formatDate } from '@/utils/tools'
export default {
  name: 'app',
  data () {
    return {
      list1: [],
      list2: []
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      const date = formatDate(new Date(), 'yyyy-MM-dd')
      getAction('/shopapi/count/sell/rank', {
        date,
        type: 1
      }).then(res => {
        if (res.code === 0) {
          this.list1 = res.data
        }
      })
    }
  }
}
</script>
