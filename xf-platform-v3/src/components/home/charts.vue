<style>
.pro-chars { margin-top: 50px; }
.pro-chars .chart-line1{margin: 0 20px; border-top: 1px solid #EEEEEF; border-bottom: 1px solid #EEEEEF; display: flex;}
.pro-chars .chart-line1 #proChart1{ width: 40%; height: 420px; border-right: 1px solid #EEEEEF; box-sizing: border-box;}
.pro-chars .chart-line1 .proChart2{ width: 60%;}
.pro-chars .chart-line1 .proChart2 .opera{ height: 70px; display: flex; justify-content: space-between; align-items: center; margin-left: 30px;}
</style>

<template>
<div class="pro-chars">
  <div class="chart-line1">
    <div id="proChart1"></div>
    <div class="proChart2">
      <div class="opera">
        <RadioGroup class="xf-radios" v-model="chart2Type" @on-change="getChart2">
          <Radio label="2">点击量(次)</Radio>
          <Radio label="3">销售量</Radio>
        </RadioGroup>
        <DatePicker v-model="dateArr" type="daterange" style="display: none;"></DatePicker>

        <c-date-time type="daterange" style="width: 250px;" v-model="dateArr" :clearable="false" @change="getChart2" />
      </div>
      <div id="proChart2" style="height: 310px;"></div>
    </div>
  </div>
  <div class="pr">
    <c-date-time ref="date2" style="width: 200px; position: absolute; top: 20px; right: 20px; z-index: 10;" v-model="date" :clearable="false" @change="getChart3" />
    <div id="proChart3" style="height:460px;"></div>
  </div>
</div>
</template>

<script type='es6'>
import * as echarts from 'echarts'
import { formatDate } from '@/utils/tools'
import { postAction } from '@/utils'
import cDateTime from '../cDateTime'
console.log('echarts', echarts)
export default {
  name: 'app',
  components: {
    cDateTime
  },
  data () {
    return {
      chart2Type: '2',
      dateArr: [],
      date: ''
    }
  },
  props: {
    record: Object
  },
  mounted () {
    this.date = formatDate(new Date(), 'yyyy-MM-dd')
    this.dateArr[0] = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000)
    this.dateArr[1] = new Date()
    setTimeout(() => {
      this.getDatas()
    }, 200)
  },
  methods: {
    ajax (params) {
      return postAction('/editor/ticket/stats', params)
    },
    getDatas () {
      this.getChart1()
      this.getChart2()
      this.getChart3()
    },
    getChart1 () { // 已购票用户地区
      this.ajax({
        id: this.record.id,
        type: '1'
      }).then(res => {
        if (res.code === 1) {
          const data = res.data.area_data
          const userData = []
          for (const item of data) {
            userData.push({
              value: item.num,
              name: item.city
            })
          }
          this.drawChart1(userData)
        }
      })
    },
    getChart2 () {
      this.ajax({
        id: this.record.id,
        type: this.chart2Type,
        start_date: this.dateArr[0],
        end_date: this.dateArr[1]
      }).then(res => {
        if (res.code === 1) {
          const data = this.chart2Type === '2' ? res.data.day_click_data : res.data.day_sales_data
          const clickData = {
            x: [],
            y: []
          }
          for (const item of data) {
            clickData.x.push(item.date)
            clickData.y.push(this.chart2Type === '2' ? item.click_num : item.num)
          }
          this.drawChart2(clickData)
        }
      })
    },
    getChart3 () {
      this.ajax({
        id: this.record.id,
        type: '4',
        date: this.date
      }).then(res => {
        if (res.code === 1) {
          const data = res.data.hour_sales_data
          const list = []
          let index = 0
          const map = {}
          for (const item of data) {
            if (map[item.price_name] === undefined) {
              map[item.price_name] = index
              list[map[item.price_name]] = {
                name: item.price_name,
                x: [],
                y: []
              }
              index += 1
            }
            list[map[item.price_name]].x.push(item.hour + ':00')
            list[map[item.price_name]].y.push(item.num)
          }
          this.drawChart3(list)
        }
      })
    },
    drawChart1 (data) {
      const myChart = echarts.init(document.getElementById('proChart1'))
      myChart.setOption({
        title: { text: '已购票用户地区', textStyle: { color: '#000', fontSize: 18 } },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '65%',
            color: ['#003AC3', 'rgba(33, 84, 218, 0.8)', 'rgba(33, 84, 218, 0.6)', 'rgba(33, 84, 218, 0.4)'],
            labelLine: { length: 30 },
            label: {
              normal: {
                show: true,
                formatter: [
                  '{a|{b}\n}',
                  '{b|{c}}',
                  '{a| 人}'
                ].join(''),
                rich: {
                  a: { fontSize: 14, color: '#C8C9CA' },
                  b: { fontSize: 20, color: '#C8C9CA' }
                }
              },
              emphasis: {
                show: true
              }
            },
            data: data
          }
        ]
      })
    },
    drawChart2 (data) {
      const myChart = echarts.init(document.getElementById('proChart2'))
      myChart.setOption({
        tooltip: {
          trigger: 'axis',
          formatter: '{c}',
          padding: [2, 20],
          backgroundColor: '#5B85E6',
          borderColor: '#5B85E6',
          textStyle: { color: '#fff' }
        },
        grid: {
          top: '3%',
          left: '3%',
          right: 40,
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: data.x
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '联盟广告',
            type: 'line',
            stack: '总量',
            areaStyle: { normal: { color: 'rgba(109, 154, 244, 0.4)', opacity: '0.3' } },
            itemStyle: {
              normal: { color: '#5B85E6', borderColor: '#5B85E6', borderWidth: 4 },
              emphasis: { color: '#5B85E6', borderColor: '#5B85E6', borderWidth: 4 }
            },
            lineStyle: { opacity: 0 },
            data: data.y
          }
        ]
      })
    },
    drawChart3 (data) {
      const all = []
      for (let i = 0; i < data[0].x.length; i++) {
        all[i] = 0
        for (const item of data) {
          all[i] += parseInt(item.y[i])
        }
      }
      const series = [{
        name: '总数',
        type: 'line',
        stack: '总量',
        areaStyle: { normal: { color: '#0029a9', opacity: '0.3' } },
        itemStyle: {
          normal: { color: '#5B85E6', borderColor: '#5B85E6', borderWidth: 4 },
          emphasis: { color: '#5B85E6', borderColor: '#5B85E6', borderWidth: 4 }
        },
        lineStyle: { opacity: 0 },
        data: all
      }]
      let index = 1; let formatter = ''
      for (const item of data) {
        series.push({
          name: item.name,
          type: 'line',
          stack: '总量',
          areaStyle: { normal: { opacity: 0 } },
          itemStyle: { opacity: 0 },
          lineStyle: { opacity: 0 },
          data: item.y
        })
        formatter += `{a${index}}: {c${index}}<br />`
        index += 1
      }
      const myChart = echarts.init(document.getElementById('proChart3'))
      myChart.setOption({
        title: {
          text: '24小时销售量',
          textStyle: {
            color: '#000',
            fontSize: 18
          },
          left: 20,
          top: 20
        },
        tooltip: {
          trigger: 'axis',
          formatter: formatter,
          padding: [2, 20],
          backgroundColor: '#5B85E6',
          borderColor: '#5B85E6',
          textStyle: { color: '#fff' }
        },
        grid: {
          top: '20%',
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: data[0].x
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: series
      })
    }
  }
}

</script>
