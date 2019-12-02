// components/datepicker/datepicker.js
import {getActivityDays} from '../../utils/api.js'
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		currentDate: {
			type: String,
			value: '',
			observer (newVal) {
				console.log(newVal)
				this.setData({
					selectedDate: newVal
				})
			}
		}
	},

	/**
	 * 组件的初始数据
	 */
	data: {
		week: ['日', '一', '二', '三', '四', '五', '六'],
		year: '',
		month: '',
		selectedDate: '',
		daysList: [],
		activityList: [],
	},
	attached() {
		let year, month
		if (this.data.selectedDate === '') {
			const date = new Date()
			year = date.getFullYear()
			month = date.getMonth()
		} else {
			const arr = this.data.selectedDate.split('/')
			year = parseInt(arr[0])
			month = parseInt(arr[1]) - 1
		}
		this.setData({
			year,
			month
		})
		this.getActivityDays()
	},
	/**
	 * 组件的方法列表
	 */
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
					activity: this.data.activityList[i].is_act !== 0,
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
			this.setData({
				daysList: list
			})
		},
		prevMonth () { // 上一个月
			let month = this.data.month - 1
			let year = this.data.year
			if (month === -1) {
				month = 11
				year -= 1
			}
			this.setData({
				year,
				month
			})
         this.getActivityDays()
		},
		nextMonth () { // 下一个月
			let month = this.data.month + 1
			let year = this.data.year
			if (month === 12) {
				month = 0
				year += 1
			}
			this.setData({
				year,
				month
			})
         this.getActivityDays()
		},
		selectDate (e) {
			const date = e.target.dataset.item
			if (!date.activity) return
			this.setData({
				selectedDate: date.date
			})
		},
		doConfirm () {
			if (this.data.selectedDate === '') return
			this.triggerEvent('selectDate', this.data.selectedDate)
		},
      getActivityDays () {
         getActivityDays({
            month: `${this.data.year}/${this.data.month + 1}`
         }).then(res => {
            this.data.activityList = res.list
            this.initCalendar(this.data.year, this.data.month)
         })
      }
	}
})

function is_leap(year) {  //判断是否为闰年
	return (year % 100 === 0 ? (year % 400 === 0 ? 1 : 0) : (year % 4 === 0 ? 1 : 0))
}
