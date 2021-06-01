<style scoped>
.c-calendar { width: 100%; overflow: hidden; }
.c-calendar-show { top: 100px; }
.c-calendar .btn1 { padding: 0 38px; }

.c-calendar .operates { display: flex; align-items: center; justify-content: center; }
.c-calendar .operates button { width: 34px; height: 34px; display: flex; justify-content: center; align-items: center; background-color: #ffffff; border-radius: 50%; box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.15); }
.c-calendar .operates button.disabled { opacity: 0.5 }
.c-calendar .operates button img { width: 8px; }
.c-calendar .operates span { width: 220px; font-size: 54px; text-align: center; font-family: DinB; margin: 0 12px; }

.c-calendar-weeks { margin: 40px 25px 20px 25px; display: flex; }
.c-calendar-weeks li { width: 80px; margin: 0 10px; font-size: 20px; color: #9E9E9F; text-align: center; }

.c-calendar-days { display: flex; flex-wrap: wrap; margin: 0 25px 50px 25px; }
.c-calendar-days li { width: 94px; height: 94px; box-sizing: border-box; border-radius: 15px; display: flex; justify-content: center; align-items: center; font-size: 54px; font-family: DinL; margin: 0 3px 6px 3px; background-color: #F9F9F9; }
.c-calendar-days li.disabled { color: #B9BABB; background-color: #EDECEB; }
.c-calendar-days li.active { color: #ffffff; background-color: #F0916C; font-family: DinB; }
</style>

<template>
<div class="c-calendar" :class="{'c-calendar-show': show}">
  <div class="ml25 mt20 mb75">
    <button class="btn btn1">喜茶·深圳宝安大仟里店</button>
  </div>
  <div class="operates">
    <button @click="prevMonth" :class="{'disabled': prevBtnDisable}"><img src="@/assets/img/arrow-left.png" /></button>
    <span>{{dateStr}}</span>
    <button @click="nextMonth"><img src="@/assets/img/arrow-right.png" /></button>
  </div>
  <ul class="c-calendar-weeks">
    <li v-for="i in week" :key="i">周{{i}}</li>
  </ul>
  <ul class="c-calendar-days">
    <li
      v-for="item in daysList"
      :key="item.date"
      :class="{
        'disabled': !item.activity,
        'active': item.date === selectedDate
      }"
      @click="select(item)">{{item.day}}</li>
  </ul>
</div>
</template>

<script type='es6'>
// import { postAction } from '@/utils/api'

function isLeap (year) { // 判断是否为闰年
  return (year % 100 === 0 ? (year % 400 === 0 ? 1 : 0) : (year % 4 === 0 ? 1 : 0))
}
export default {
  name: 'app',
  computed: {
    dateStr () {
      return `${this.year}/${this.month + 1 < 10 ? '0' + (this.month + 1) : this.month + 1}`
    }
  },
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
    },
    formatDate (year, month, day) {
      if (month === -1) month = 11
      if (month === 12) month = 0
      month += 1
      month = month < 10 ? `0${month}` : month
      day = day < 10 ? `0${day}` : day
      return `${year}-${month}-${day}`
    },
    initCalendar (year, month) { // 初始化日历
      const monthDays = [31, 28 + isLeap(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31] // 每个月有多少天
      const lastMonth = month - 1 === -1 ? 11 : month - 1
      const lastMonthDay = monthDays[lastMonth] // 上个月的天数
      const thisMonthDay = monthDays[month] // 这个月的天数
      const startWeek = new Date(year, month, 1).getDay() // 获取当月第一天的星期
      const endWeek = new Date(year, month, thisMonthDay).getDay() // 获取当月最后一天的星期
      const list = []
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
      // postAction('/api/ticket/events_calendar', {
      //   month: `${this.year}${this.month + 1}`
      // }).then(res => {
      //   this.activityList = res.data
      //   this.initCalendar(this.year, this.month)
      // })
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
