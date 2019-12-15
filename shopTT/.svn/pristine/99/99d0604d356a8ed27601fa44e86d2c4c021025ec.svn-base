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
		isOver: false,
		isShare: false
	},

	onLoad: function(options) {
		if (options.isShare) {
			this.setData({
				isShare: true
			})
		}
		this.getList()
	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {
		this.getList()
	},

	getList() {
		let link = { method: 'activity_list', canshu: '&page=' + this.data.page };
		let logic = (ret) => {
			if(ret.list && ret.list.length > 0){
				this.setData({
					listData: ret.list,
					page: this.data.page + 1
				})
				this.setSpellTime('listData');
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
		api.postGroupBuy(this, link, {}, logic);
	},
	/**
	 * 倒计时
	 */
	// setCountDown() {
	//     let time = 100;
	//     let { listData } = this.data;
	//     let list = listData.map((v, i) =>{
	//         if (v.remain_time <= 0) {
	//             v.remain_time = 0;
	//         }
	//         let formatTime = common.getFormat(v.remain_time);
	//         v.remain_time -= time;
	//         v.countDown = `${formatTime.hh}:${formatTime.mm}:${formatTime.ss}`;
	//         // 毫秒：.${parseInt(formatTime.ms / time)}
	//         return v;
	//     })
	//     this.setData({
	//         listData: list
	//     });
	//     setTimeout(this.setCountDown, time);
	// },

	// 拼单列表倒计时
	setSpellTime: function(e) {
		let that = this
		this.data[e].forEach((item, index) => {
			var newTime = parseInt(item.remain_time)
			if (newTime <= 0) {
				return;
			}
			newTime--
			let formatSpellTime = that.getFormat(newTime);
			let arr = that.data[e]
			let list = e
			arr[index].remain_time = newTime
			arr[index].lastTime = formatSpellTime
			that.setData({
				[list]: arr
			})
		})
		setTimeout(() => this.setSpellTime(e), 1000);
	},
	getFormat: function(leftTime) {
		var leftSecond = parseInt(leftTime);
		var Day = Math.floor(leftSecond / (60 * 60 * 24)); //天数
		var Hour = Math.floor((leftSecond - Day * 24 * 60 * 60) / 3600); //小时
		var Minute = Math.floor((leftSecond - Day * 24 * 60 * 60 - Hour * 3600) / 60); //分钟
		var Second = Math.floor(leftSecond - Day * 24 * 60 * 60 - Hour * 3600 - Minute * 60); //秒数
		if (Hour >= 0 && Minute >= 0 && Second >= 0) {
			var dd = Day < 10 ? '0' + Day : Day
			var hh = Hour < 10 ? '0' + Hour : Hour
			var mm = Minute < 10 ? '0' + Minute : Minute
			var ss = Second < 10 ? '0' + Second : Second
			return dd ? dd+'天' +hh+':'+mm+':'+ss : hh+':'+mm+':'+ss
		}else{
			return '00:00:00';
		}
	},



})
