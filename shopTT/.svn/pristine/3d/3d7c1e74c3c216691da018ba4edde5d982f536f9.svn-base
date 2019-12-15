// pages/tuihuan/index.js
const api = require('../../utils/api.js');
//获取应用实例
const app = getApp();
var www = app.globalData.www;
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		type:2, //售后类型
		yuanyin:[],  //原因
		idx: null, //申请原因的下标
		cause:'', //详细原因
		isNewAdds:false
	},

	//选择申请原因
	yuanyinTap:function(e){
		this.setData({
			idx: e.detail.value
		})
	},

	//收货地址
	selectAddsTap:function(){
		wx.chooseAddress({
			success: (res)=>{
				this.setData({
					adds:res,
					isNewAdds:true
				})
			}
		})
	},

	//详细原因
	xiangxiyyTap:function(e){
		var word_num = 120 - e.detail.value.length;
		this.setData({
			cause: e.detail.value,
			word_num:word_num
		})
	},

	//售后类型
	thTap:function(e){
		var s = e.currentTarget.dataset.s;
		this.setData({
			type:s
		})
	},

	//退款金额
	tkAmountTap:function(e) {
		var tk_amount = e.detail.value;
		this.setData({
			tk_amount:tk_amount
		})
	},

	//提交申请
	subsqTap:function(e){
		var id = this.data.id;
		var yuanyin = this.data.yuanyin;
		var type = this.data.type;
		var cause_id = Number(this.data.idx) + 1;
		var cause = this.data.cause;
		var tk_amount = this.data.tk_amount;
		if (!cause_id){
			wx.showToast({
				title: '请选择原因',
				icon: 'none'
			})
			return false;
		}
		if (!cause || cause == '') {
			wx.showToast({
				title: '请输入问题描述',
				icon: 'none'
			})
			return false;
		}
		if (type == 1 && (!tk_amount || tk_amount==0)) {
			wx.showToast({
				title: '请输入退款金额',
				icon: 'none'
			})
			return false;
		}
		if (type == 3 && (!tk_amount || tk_amount ==0)) {
			wx.showToast({
				title: '请输入退款金额',
				icon: 'none'
			})
			return false;
		}
		if(tk_amount>this.data.order_amount/100) {
			wx.showToast({
				title: '退款金额不能大于订单金额'+this.data.order_amount/100,
				icon: 'none'
			})
			return false;
		}

		if(this.data.isNewAdds){
			var adds = this.data.adds;
			var data = {
				id: id, type: type, cause_id: cause_id, cause: cause, province: adds.provinceName, city: adds.cityName, area: adds.countyName, address: adds.detailInfo, lxr: adds.userName, phone: adds.telNumber,tk_amount: tk_amount,order_id: this.data.order_id};
		}else{
			var sh_address = this.data.sh_address;
			var data = {
				id: id,
				type: type,
				cause_id: cause_id,
				cause: cause,
				province: sh_address.province,
				city: sh_address.city,
				area: sh_address.area,
				address: sh_address.address,
				lxr: sh_address.lxr,
				phone: sh_address.phone,
				tk_amount:tk_amount,
				order_id:this.data.order_id
			};
		}
		let link = { method: 'apply_sales', canshu: '' };
		let logic = (ret) => {
			wx.redirectTo({
				url: '../shouhouList/index',
			})
		}
		console.log(data);
		api.post(this, link, data, logic);
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		//options.type == 1是申请，2是编辑
		if (options && options.oid){
			let link = { method: 'after_detail', canshu: '&id=' + options.id + '&order_id=' + options.oid};
			let logic = (ret) => {

				var yuanyin = [];
				var cause_arr = ret.cause_arr;
				for (var i in cause_arr) {
					yuanyin.push(cause_arr[i]);
				}

				if (ret.sh_detail) {
					if (ret.sh_detail.type == 1) {
						var type = 1;
					}
					if (ret.sh_detail.type == 2) {
						var type = 2;
					}
					if (ret.sh_detail.type == 3) {
						var type = 3;
					}
					var cause_id = ret.sh_detail.cause_id - 1;
					var cause = ret.sh_detail.cause;
					var sh_detail = ret.sh_detail;
					var sh_address = ret.sh_address;
					var tk_amount = ret.sh_detail.tk_amount/100;
				}else {
					var type = 0;
					var cause_id = 0;
					var cause = '';
					var sh_detail = [];
					var sh_address = '';
					var tk_amount = '';
				}
				if(ret.fh_time==0) {
					type = 1;//如果未发货就只能退款
				}

				this.setData({
					id: options.id,
					order_id:options.oid,
					sh_detail: sh_detail,
					sh_address: sh_address,
					hj_address: ret.hj_address,
					type: type,
					idx: cause_id,
					cause_arr: ret.cause_arr,
					cause: cause,
					yuanyin: yuanyin,
					tk_amount:tk_amount,
					word_num:120-cause.length,
					order_amount:ret.order_amount,
					fh_time:ret.fh_time
				})
			}
			api.post(this, link, {}, logic);
		} else {
			wx.navigateBack({
				delta: 1
			})
		}
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
})
