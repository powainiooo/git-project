// pages/spellList/index.js
import common from '../../utils/common'
const api = require('../../utils/api.js');
const www = getApp().globalData.www;
const imgUrl = getApp().globalData.url;
Page({
	data: {
		listData: [],
		www: www,
		imgUrl: imgUrl,
		page:1,
		isOver: false
	},

	onLoad: function(options) {
		this.getList()
	},
	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {
		this.getList()
	},
	getList() {
		let link = { method: 'ms_list', canshu: '&page=' + this.data.page };
		let logic = (ret) => {
			if(ret && ret.length){
				this.setData({
					listData: ret,
					page: this.data.page + 1
				})
				this.setCountDown()
				if(ret.length < 4) {
					this.setData({
						isOver: true
					})
				}
			}else{
				this.setData({
					isOver: true
				})
			}
		}
		api.post(this, link, {}, logic);
	},
	/**
	 * 倒计时
	 */
	setCountDown: function () {
		let that = this
		let time = 1000
		let { listData } = this.data
		let list = listData.map((v, i) =>{
			if (v.end_time <= 0) {
				v.end_time = 0;
			}
			var remain_time = v.end_time
			var getTime = Date.parse(new Date()) //当前时间戳
			// console.log(remain_time, getTime)
			var newTime = parseInt(remain_time) - getTime / 1000
			// console.log(newTime)
			if (newTime <= 1) {
				var dd = `00`
				var hh = `00`
				var mm = `00`
				var ss = `00`
				return;
			}
			let formatTime = common.getFormat(newTime)
			v.countDown = `${formatTime.hh}:${formatTime.mm}:${formatTime.ss}`;
			return v;
		})
		that.setData({
			listData: list
		})
		setTimeout(this.setCountDown, time)
	},

})
