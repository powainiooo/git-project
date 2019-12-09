<style scoped>
.z-date-picker { width: 300px; height: 310px; background-color: #ffffff; position: absolute; top: 233px; left: 17px; z-index: 100;}
.z-date-picker:before { content: ''; width: 100%; height: 3px; background: url("../assets/images/date-top.png") no-repeat; position: absolute; top: -3px; left: 0;}
.z-date-picker:after { content: ''; width: 100%; height: 63px; background: url("../assets/images/date-bottom.png") no-repeat; position: absolute; bottom: -63px; left: 0;}
.z-date-picker-opera { height: 40px; display: flex; justify-content: center; align-items: center;}
.z-date-picker-opera-btn { width: 14px; height: 14px; border-radius: 50%; background-color: #002aa6; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 3px rgba(0, 0, 0, 0.3);}
.z-date-picker-opera-btn-disable { background-color: #585657; opacity: 0.5; cursor: default;}
.z-date-picker-opera-btn:active { transform: scale(0.8);}
.z-date-picker-opera-btn-disable:active { transform: scale(1);}
.z-date-picker-opera-btn img { width: 4px; display: block;}
.z-date-picker-opera p { font-size: 16px; font-family: Helve; color: #585657; margin: 0 10px;}
.z-date-picker-header { margin: 0 24px; display: flex; justify-content: space-between; align-items: center;}
.z-date-picker-header li { width: 32px; height: 32px; display: flex; justify-content: center; color: #585657;}
.z-date-picker-body { margin: 0 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap;}
.z-date-picker-body li { width: 32px; height: 32px; display: flex; justify-content: center; align-items: center; color: #585657; border: 1px solid #585657; border-radius: 50%; margin-bottom: 5px; font-family: Helve; opacity: 0.5;}
.z-date-picker-body li.dates { opacity: 1; cursor: pointer;}
.z-date-picker-body li.selected { opacity: 1;  background: linear-gradient(244deg,#2353dd, #002bab 10%, #003ebe); border: none; color: #ffffff;}
</style>

<template>
<div class="z-date-picker">
   <div class="z-date-picker-opera">
      <a href="javascript:;" class="z-date-picker-opera-btn" :class="{'z-date-picker-opera-btn-disable':prevBtnDisable}" @click="prevMonth"><img src="../assets/images/arrow-left-active.png"></a>
      <p>{{year}}/{{month + 1 < 10 ? '0' + (month + 1) : month + 1}}</p>
      <a href="javascript:;" class="z-date-picker-opera-btn" @click="nextMonth"><img src="../assets/images/arrow-right-active.png"></a>
   </div>
   <ul class="z-date-picker-header">
      <li v-for="i in week" :key="i">{{i}}</li>
   </ul>
   <ul class="z-date-picker-body">
      <li v-for="i in daysList"
          :key="i.date"
          :class="{dates: i.activity, selected: value === i.date}" @click="doSelected(i)">{{i.day}}</li>
   </ul>
</div>
</template>

<script type='es6'>
import {getActivityDays} from '@/api.js'
export default {
	name: 'app',
   props: {
      value: {
         type: String,
         default: ''
      }
   },
	data() {
		return {
		   week: ['日', '一', '二', '三', '四', '五', '六'],
         year: '',
         month: '',
         nowYear: '',
         nowMonth: '',
         daysList: [],
         activityList: [],
      }
	},
   computed: {
	   prevBtnDisable () {
	      if (this.year < this.nowYear) {
	         return true
         } else if (this.year === this.nowYear) {
	         return this.month <= this.nowMonth
         } else {
	         return false
         }
      }
   },
   mounted () {
      let year, month
      const date = new Date()
      this.nowYear = date.getFullYear()
      this.nowMonth = date.getMonth()
      if (this.value === '') {
         year = date.getFullYear()
         month = date.getMonth()
      } else {
         const arr = this.value.split('/')
         year = parseInt(arr[0])
         month = parseInt(arr[1]) - 1
      }
      this.year = year
      this.month = month
      this.getActivityDays()
   },
	methods: {
      formatDate (year, month, day) {
         if (month === -1) month = 11
         if (month === 12) month = 0
         month += 1
         month = month < 10 ? `0${month}` : month
         day = day < 10 ? `0${day}` : day
         return `${year}/${month}/${day}`
      },
      initCalendar(year, month) { // 初始化日历
         const monthDays = [31, 28 + is_leap(year), 31, 30, 31, 31, 30, 31, 30, 31, 30, 31] // 每个月有多少天
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
            list.push({
               activity: this.activityList[i].is_act !== 0,
               // activity: true,
               date: this.formatDate(year, month, i + 1),
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
         // console.log(list)
         this.daysList = list
      },
      doSelected (item) {
         if (item.activity) {
            this.$emit('input', item.date)
            this.$emit('change', item.date)
         }
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
      getActivityDays () {
         getActivityDays({
            month: `${this.year}/${this.month + 1}`
         }).then(res => {
            this.activityList = res.list
            this.initCalendar(this.year, this.month)
         })
      }
   }
}

function is_leap(year) {  //判断是否为闰年
   return (year % 100 === 0 ? (year % 400 === 0 ? 1 : 0) : (year % 4 === 0 ? 1 : 0))
}
</script>
