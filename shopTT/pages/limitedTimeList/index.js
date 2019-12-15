// pages/limitedTimeList/index.js
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
		let link = { method: 'xsg_list', canshu: '&page=' + this.data.page };
		let logic = (ret) => {
			if(ret && ret.length){
				this.setData({
					listData: ret,
					page: this.data.page + 1
				})
				this.setTime()
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
	setTime() {
		let { listData } = this.data
		let list = listData.map( (v,i) => {
			v.startTime = common.timestampToTime(v.start_time).replace(/-/g,'.')
			v.endTime = common.timestampToTime(v.end_time).replace(/-/g,'.')
			return v
		})
		this.setData({
			listData: list
		})
	}
})
