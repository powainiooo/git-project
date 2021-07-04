<style lang="stylus" type="text/stylus">
@import "../../../assets/css/mixin.styl"
.charts-container
  size(58%, 640px)
  .chart
    height 570px;
  .tee-date
    abTR(0, 30px); z-index 10
</style>

<template>
<div class="box2 charts-container">
  <div class="pr">
    <c-date-time type="date" placeholder="下单日期" class="tee-date" v-model="date" @change="getData" />
    <Tabs type="card" class="tee-tabs" style="margin-top: 13px;">
      <TabPane label="今日收益">
        <div ref="chart1" class="chart"></div>
      </TabPane>
      <TabPane label="今日杯数">
        <div ref="chart2" class="chart"></div>
      </TabPane>
    </Tabs>
  </div>
</div>
</template>

<script type='es6'>
import * as echarts from 'echarts'
import { getAction } from '@/utils'
import { formatDate } from '@/utils/tools'
import cDateTime from '@/components/common/cDateTime'
export default {
  name: 'app',
  components: {
    cDateTime
  },
  data () {
    return {
      date: '',
      chart1: null,
      chart2: null
    }
  },
  mounted () {
    this.date = formatDate(new Date(), 'yyyy-MM-dd')
    this.getData()
  },
  methods: {
    getData () {
      getAction('/shopapi/count/hour/count', {
        date: this.date,
        type: 1
      }).then(res => {
        if (res.code === 0) {
          const income1 = []
          const income2 = []
          const xData = []
          for (const i of res.data) {
            income1.push(i.income1)
            income2.push(i.goods_nums)
            xData.push(i.hour)
          }
          this.drawChart1(xData, income1)
          this.drawChart2(xData, income2)
        }
      })
    },
    options (xData, ydata) {
      return {
        tooltip: { trigger: 'axis', backgroundColor: '#F0916C', borderWidth: 0, borderRadius: 20, padding: [5, 15], textStyle: { color: '#fff' }, formatter: '{c}' },
        grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          data: xData,
          axisLine: { lineStyle: { color: '#F2F2F2' } },
          axisLabel: { color: '#9E9E9F' }
        }],
        yAxis: [{
          type: 'value',
          splitLine: { lineStyle: { color: '#F2F2F2' } },
          axisLabel: { color: '#9E9E9F' }
        }],
        series: [
          {
            type: 'line',
            smooth: true,
            lineStyle: { width: 4, color: '#E8D1B9' },
            symbol: 'circle',
            showSymbol: false,
            symbolSize: 14,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: '#E9DDCF' }, { offset: 1, color: '#FFFFFF' }])
            },
            itemStyle: { color: '#F0916C', borderColor: '#F0916C', borderWidth: 0 },
            data: ydata
          }
        ]
      }
    },
    drawChart1 (xData, ydata) {
      if (!this.chart1) {
        this.chart1 = echarts.init(this.$refs.chart1)
      }
      this.chart1.setOption(this.options(xData, ydata))
    },
    drawChart2 (xData, ydata) {
      if (!this.chart2) {
        this.chart2 = echarts.init(this.$refs.chart2)
      }
      this.chart2.setOption(this.options(xData, ydata))
    }
  }
}
</script>
