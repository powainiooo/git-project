<style scoped>
.line1 { height: 88px; background-color: #FFFFFF; box-shadow: 0px 1px 0px 0px #E2E8EF; padding: 0 40px; margin-bottom: 20px; }
.line1 p { font-size: 26px; color: #666666; }
.line1 button { width: 30px; height: 30px; background-color: transparent; }
.line1 button img { width: 18px; height: 30px; display: block; margin: 0 auto; }
.line1 div { font-size: 32px; color: #000000; }

.thead { width: 700px; height: 60px; margin: 0 auto 30px auto; display: flex; align-items: center; background-color: #446CB2; border-radius: 10px; }
.thead li { width: 100px; font-size: 24px; color: #FFFFFF; text-align: center; }

.tbody { width: 700px; display: flex; flex-wrap: wrap; margin: 0 auto 80px auto; }
.tbody li { width: 100px; margin-bottom: 40px; text-align: center; }
.tbody li .box { width: 80px; height: 80px; border-radius: 10px; margin: 0 10px; display: flex; justify-content: center; align-items: center; flex-direction: column; }
.tbody li.active .box { background-color: #446CB2; }
.tbody li .box div { font-size: 32px; line-height: 32px; margin-bottom: 10px; }
.tbody li.active .box div { color: #FFFFFF; }
.tbody li:nth-child(7n) div { color: #999999; }
.tbody li:nth-child(7n + 1) div { color: #999999; }
.tbody li .box p { font-size: 22px; line-height: 22px; color: #999999; }
.tbody li.active .box p { color: #FFFFFF; }

.line2 { margin-left: 46px; margin-bottom: 26px; display: flex; align-items: baseline; }
.line2 h3 { font-size: 60px; color: #446CB2; margin-right: 20px; }
.line2 div { font-size: 24px; margin-right: 20px; }
.line2 p { font-size: 22px; color: #999999; }

.line3 { display: flex; font-size: 24px; margin-left: 46px; }
.line3 span { width: 34px; height: 34px; line-height: 22px; border-radius: 50%; background-color: #67CC3F; color: #FFFFFF; margin-right: 10px; }
.line3 p { width: 670px; }
</style>

<template>
  <div class="container3">
    <div class="hr20"></div>
    <div class="line1 between">
      <p>今日</p>
      <button @click="prevMonth"><img src="/static/images/arrow4.png" /></button>
      <div>{{year}}年{{month + 1}}月</div>
      <button @click="nextMonth"><img src="/static/images/arrow5.png" /></button>
      <p>选择日期</p>
    </div>

    <ul class="thead">
      <li v-for="i in week" :key="index">{{i}}</li>
    </ul>

    <ul class="tbody">
      <li v-for="i in daysList" :key="index" :class="{'active': i.date === current}">
        <div class="box" @click="toggle(i.day)">
          <div>{{i.day}}</div>
          <p>{{i.lunar}}</p>
        </div>
      </li>
    </ul>

    <div class="line2">
      <h3>{{day}}日</h3>
      <div>农历{{record.lunar}}</div>
      <p>{{record.lunarYear}}</p>
    </div>

    <div class="line3 mb10">
      <span class="center">宜</span>
      <p>{{record.avoid}}</p>
    </div>
    <div class="line3">
      <span class="center" style="background-color: #DB3D3D;">忌</span>
      <p>{{record.suit}}</p>
    </div>
<!--    <a href="#" class="f30 c-link ml45 mt20 bold mb45">查看今天的行程</a>-->
    <operates :id="id" />
  </div>
</template>

<script>
import operates from '@/components/operates'
import { GetLunarDay, isLeap } from '@/utils/lunarDay'
import {postAction} from '@/utils/api'

export default {
  components: {
    operates
  },
  data () {
    return {
      id: '',
      week: ['日', '一', '二', '三', '四', '五', '六'],
      current: '',
      year: '',
      month: '',
      day: '',
      daysList: [],
      record: {}
    }
  },
  methods: {
    formatDate (year, month, day) {
      if (month === -1) month = 11
      if (month === 12) month = 0
      month += 1
      return `${year}-${month}-${day}`
    },
    initCalendar (year, month) { // 初始化日历
      const monthDays = [31, 28 + isLeap(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31] // 每个月有多少天
      const lastMonth = month - 1 === -1 ? 11 : month - 1
      const lastMonthDay = monthDays[lastMonth] // 上个月的天数
      const thisMonthDay = monthDays[month] // 这个月的天数
      const startWeek = new Date(year, month, 1).getDay() // 获取当月第一天的星期
      const endWeek = new Date(year, month, thisMonthDay).getDay() // 获取当月最后一天的星期
      let list = []
      let beforeDays = 0
      let afterDays = 0
      if (startWeek === 0) {
        beforeDays = startWeek + 7
        afterDays = 6 - endWeek
      } else {
        beforeDays = startWeek
        afterDays = 13 - endWeek
      }
      for (let i = beforeDays - 1; i >= 0; i--) { // 前一个月 日期
        list.push({
          date: this.formatDate(year, month - 1, lastMonthDay - i),
          lunar: '',
          day: ''
        })
      }
      for (let i = 0; i < thisMonthDay; i++) { // 当月 日期
        const date = this.formatDate(year, month, i + 1)
        list.push({
          date,
          lunar: GetLunarDay(date),
          day: i + 1
        })
      }
      for (let i = 0; i < afterDays; i++) { // 下一个月 日期
        // list.push({
        //   date: this.formatDate(year, month + 1, i + 1),
        //   lunar: '',
        //   day: ''
        // })
      }
      this.daysList = list
    },
    getData () {
      postAction('perpetual_calendar', {
        date: this.current
      }).then(res => {
        if (res.ret === 0) {
          this.record = res.data
        }
      })
    },
    nextMonth () { // 下一个月
      let month = this.month + 1
      let year = this.year
      if (month === 12) {
        month = 0
        year += 1
      }
      this.year = year
      this.month = month
      this.initCalendar(this.year, this.month)
    },
    prevMonth () { // 上一个月
      let month = this.month - 1
      let year = this.year
      if (month === -1) {
        month = 11
        year -= 1
      }
      this.year = year
      this.month = month
      this.initCalendar(this.year, this.month)
    },
    toggle (day) {
      this.day = day
      this.current = this.formatDate(this.year, this.month, day)
      this.getData()
    }
  },
  onShareAppMessage () {
    const pages = getCurrentPages()
    const view = pages[pages.length - 1]
    return {
      title: '万年历',
      path: `/${view.route}?id=${this.id}`
    }
  },
  onLoad (options) {
    this.id = options.id
    const date = new Date()
    this.year = date.getFullYear()
    this.month = date.getMonth()
    this.day = date.getDate()
    this.initCalendar(this.year, this.month)
    this.current = this.formatDate(this.year, this.month, this.day)
    this.getData()
  }
}
</script>
