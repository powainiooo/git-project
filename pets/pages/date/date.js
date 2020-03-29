// pages/date/date.js
import {getActivityDays} from '../../utils/api.js'
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
	    week: ['Sun\n周日', 'Mon\n周一', 'Tue\n周二', 'Wed\n周三', 'Thur\n周四', 'Fri\n周五', 'Sat\n周六'],
	    year: '',
	    month: '',
	    nowYear: '',
	    nowMonth: '',
	    selectedDate: '',
	    daysList: [],
	    activityList: [],
	    prevBtnDisable: true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
	    let year, month
	    const date = new Date()
	    this.setData({
		    nowYear: date.getFullYear(),
		    nowMonth: date.getMonth(),
	    })
	    if (this.data.selectedDate === '') {
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
	    // this.initCalendar(this.data.year, this.data.month)
    },
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
			const aData = this.data.activityList[i]
         const date = aData.date.split('/')
         const day = new Date().getDate()
         let activity = true
         if (this.data.prevBtnDisable) {
            activity = i + 1 < day ? false : aData.nums < aData.max
         } else {
            activity = aData.nums < aData.max
         }
			list.push({
				activity,
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
		if (this.data.prevBtnDisable) return
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
		this.checkDisable()
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
		this.checkDisable()
		this.getActivityDays()
	},
   checkDisable () {
      let disable = true
      if (this.data.year < this.data.nowYear) {
         disable = true
      } else if (this.data.year === this.data.nowYear) {
         disable = this.data.month <= this.data.nowMonth
      } else {
         disable = false
      }
      this.setData({
         prevBtnDisable: disable
      })
   },
	selectDate (e) {
		const date = e.target.dataset.item
		if (!date.activity) return
		this.setData({
			selectedDate: date.date
		})
	},
	doConfirm () {
		app.globalData.selectedDate = this.data.selectedDate
		wx.navigateTo({
			url: '/pages/select/select'
		})
	},
	getActivityDays () {
		getActivityDays({
			month: `${this.data.year}/${this.data.month + 1}`,
			shop_id: app.globalData.store.id
		}).then(res => {
			this.data.activityList = res.list
			this.initCalendar(this.data.year, this.data.month)
		})
	},
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})
function is_leap(year) {  //判断是否为闰年
	return (year % 100 === 0 ? (year % 400 === 0 ? 1 : 0) : (year % 4 === 0 ? 1 : 0))
}
