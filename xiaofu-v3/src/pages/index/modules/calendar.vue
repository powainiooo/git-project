<style scoped>
.c-calendar { width: 100%; height: calc(100vh - 100px); background-color: #EEEEEF; position: fixed; top: -100vh; left: 0; z-index: 100; transition: top .5s cubic-bezier(.23,.78,.33,.97); }
.c-calendar-show { top: 100px; }
.c-calendar h3 { height: 92px; margin: 30px 25px 52px 25px; display: flex; align-items: center; font-size: 24px; position: relative; }
.c-calendar h3:after { content: ''; width: 100%; height: 2px; transform: scaleY(.5); position: absolute; bottom: 0; left: 0; background-color: #DBDCDC; }
.c-calendar h3 span { font-family: HelveB; font-size: 26px; margin-right: 16px; }

.c-calendar .operates { display: flex; align-items: center; justify-content: center; }
.c-calendar .operates button { width: 58px; height: 58px; display: flex; justify-content: center; align-items: center; background-color: transparent; }
.c-calendar .operates button.disabled { opacity: 0.5 }
.c-calendar .operates button img { width: 41px; height: 41px; }
.c-calendar .operates span { width: 220px; font-size: 48px; color: #9E9E9F; text-align: center; font-family: HelveL; }

.c-calendar-weeks { margin: 40px 25px 20px 25px; display: flex; }
.c-calendar-weeks li { width: 80px; margin: 0 10px; font-size: 20px; color: #9E9E9F; text-align: center; }

.c-calendar-days { display: flex; flex-wrap: wrap; margin: 0 25px 50px 25px; }
.c-calendar-days li { width: 80px; height: 80px; box-sizing: border-box; border: 2px solid #6D9BF5; border-radius: 50%; display: flex; justify-content: center; align-items: center; font-size: 32px; color: #6D9BF5; font-family: HelveB; margin: 0 10px 20px 10px; }
.c-calendar-days li.disabled { color: #DBDCDC; border-color: #ffffff; font-family: HelveL; }
.c-calendar-days li.active { color: #ffffff; border-color: transparent; background: linear-gradient(330deg, #5B85E6 0%, #6D9AF4 100%); }
</style>

<template>
<div class="c-calendar" :class="{'c-calendar-show': show}">
  <h3><span>Select the date</span>选择日期</h3>
  <div class="operates">
    <button @click="prevMonth" :class="{'disabled': prevBtnDisable}"><img src="/static/images/common/arrow-left.png" /></button>
    <span>{{year}}/{{month + 1 < 10 ? '0' + (month + 1) : month + 1}}</span>
    <button @click="nextMonth"><img src="/static/images/common/arrow-right.png" /></button>
  </div>
  <ul class="c-calendar-weeks">
    <li v-for="i in week" :key="i">{{i}}</li>
  </ul>
  <ul class="c-calendar-days">
    <li
      v-for="item in daysList"
      :key="date"
      :class="{
        'disabled': !item.activity,
        'active': item.date === selectedDate
      }"
      @click="select(item)">{{item.day}}</li>
  </ul>
</div>
</template>

<script type='es6'>
import { postAction } from '@/utils/api'

function is_leap(year) {  //判断是否为闰年
  return (year % 100 === 0 ? (year % 400 === 0 ? 1 : 0) : (year % 4 === 0 ? 1 : 0))
}
export default {
  name: 'app',
  data () {
    return {
      show: false,
      week: ['日', '一', '二', '三', '四', '五', '六'],
      year: '',
      month: '',
      nowYear: '',
      nowMonth: '',
      selectedDate: '',
      daysList: [],
      activityList: [],
      prevBtnDisable: true
    }
  },
  created () {
    let year, month
    const date = new Date()
    this.nowYear = date.getFullYear()
    this.nowMonth = date.getMonth()
    if (this.selectedDate === '') {
      year = date.getFullYear()
      month = date.getMonth()
    } else {
      const arr = this.data.selectedDate.split('/')
      year = parseInt(arr[0])
      month = parseInt(arr[1]) - 1
    }
    this.year = year
    this.month = month
    this.getActivityDays()
  },
  watch: {
    'month' (year, month) {
      let disable = true
      if (this.year < this.nowYear) {
        disable = true
      } else if (this.year === this.nowYear) {
        disable = this.month <= this.nowMonth
      } else {
        disable = false
      }
      this.prevBtnDisable = disable
    }
  },
  methods: {
    toggleShow (status) {
      this.show = status
      if (status) {
        this.selectedDate = ''
      }
    },
    formatDate (year, month, day) {
      if (month === -1) month = 11
      if (month === 12) month = 0
      month += 1
      month = month < 10 ? `0${month}` : month
      day = day < 10 ? `0${day}` : day
      return `${year}-${month}-${day}`
    },
    initCalendar(year, month) { // 初始化日历
      const monthDays = [31, 28 + is_leap(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31] // 每个月有多少天
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
          activity: false,
          date: this.formatDate(year, month - 1, lastMonthDay - i),
          day: lastMonthDay - i
        })
      }
      for (let i = 0; i < thisMonthDay; i++) { // 当月 日期
        const date = this.formatDate(year, month, i + 1)
        list.push({
          activity: this.activityList[date] === 1,
          date,
          day: i + 1
        })
      }
      for (let i = 0; i < afterDays; i++) { // 下一个月 日期
        list.push({
          activity: false,
          date: this.formatDate(year, month + 1, i + 1),
          day: i + 1
        })
      }
      this.daysList = list
    },
    getActivityDays () {
      postAction('/api/ticket/events_calendar', {
        month: `${this.year}${this.month + 1}`
      }).then(res => {
        this.activityList = res.data
        this.initCalendar(this.year, this.month)
      })
      this.initCalendar(this.year, this.month)
    },
    prevMonth () { // 上一个月
      if (this.prevBtnDisable) return
      let month = this.month - 1
      let year = this.year
      if (month === -1) {
        month = 11
        year -= 1
      }
      this.year = year
      this.month = month
      this.getActivityDays()
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
      this.getActivityDays()
    },
    select (record) {
      if (record.activity) {
        this.selectedDate = record.date
        this.$emit('confirm', record.date)
        this.toggleShow(false)
      }
    }
  }
}
</script>
