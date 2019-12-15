// pages/spellList/index.js
import common from '../../utils/common'
const api = require('../../utils/api.js');
const www = getApp().globalData.www;
const imgUrl = getApp().globalData.url;
Page({
	data: {
		www: www,
		imgUrl: imgUrl,
		isOutTime:false,//是否失效
		order_data:{},
		id:'',
		isShowFriends: false, // 邀请弹窗
		isShowRule: false, // 规则弹窗
	},

	onLoad(options) {
		if (options) {
			let link = { method: 'frient_visit', canshu: '&id='+options.id };
			let logic = (ret) => {
				if (ret.remain_nums>0) {
					for(let i = 0;i<ret.remain_nums;i++){
						let obj = {headimg:''};
						ret.group_buy_user.push(obj);
					}
				}
				this.setData({
					order_data:ret,
					id:options.id
				})
				this.setPayTime();
			}
			api.postGroupBuy(this, link, {}, logic);
		}
		this.getList();
	},
	//获取拼团商品
	getList() {
		let link = { method: 'activity_list', canshu: '&page=1&recommend=0' };
		let logic = (ret) => {
			if(ret.list && ret.list.length > 0){
				for(let i = 0; i<ret.list.length; i++){
					ret.list[i].tg_price = (ret.list[i].tg_price/100).toFixed(2)
				}
				this.setData({
					group_buy_list:ret.list
				})
			}
		}
		api.postGroupBuy(this, link, {}, logic);
	},
	// 邀请好友
	isShowFriends() {
		this.setData({
			isShowFriends: !this.data.isShowFriends
		})
	},
	// 是否显示规则弹窗
	isShowRule() {
		this.setData({
			isShowRule: !this.data.isShowRule
		})
	},
	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage(res) {
		var id = 1;
		var fxs_id = 1;
		if (res.from === 'button') {
			this.inviteFriends()
		}
		return {
			title: '邀请好友',
			path: '/pages/detail/index?id=' + id + '&fxs_id=' + fxs_id,
		}
	},
	//倒计时
	setPayTime: function() {
		let _data = this.data.order_data;
		var newTime = parseInt(_data.remain_time)
		if (newTime <= 0) {
			return;
		}
		newTime--
		_data.remain_time = newTime;
		_data.lastTime = this.getFormat(newTime);
		this.setData({
			order_data:_data
		});
		setTimeout(() => this.setPayTime(), 1000);
	},
	/**
	 * 格式化时间
	 */
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
			return hh+':'+mm+':'+ss;
		}else{
			return '00:00:00';
		}
	},
})
