// pages/order/confirm.js
const app = getApp();
import {getUserMoney} from '../../utils/api.js'
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		btnColor:'#e7e3e2',//#d9c39f
		showRule:false,
		showDetails:false,
		proPackage:app.globalData.proPackage,
		buyerInfo:app.globalData.buyerInfo,
		store:app.globalData.store,
		selectDate:app.globalData.selectedDate,
		selectWeek:app.globalData.selectWeek,
		selectTime:app.globalData.selectTime,
		ruleContent:'',
		proInfo:[
			{
				show:false,
				imgSrc:'',
				id:0
			},
			{
				show:false,
				imgSrc:'',
				id:0
			},
			{
				show:false,
				imgSrc:'',
				id:0
			}
		],
		imgSrc:app.globalData.imgSrc,
		proDetailData:{},
		week: ['Sun\n周日', 'Mon\n周一', 'Tue\n周二', 'Wed\n周三', 'Thur\n周四', 'Fri\n周五', 'Sat\n周六'],
		userAmount: 0,
		canUseAmount: true,
		showPayWay: false,
		hasAmount: false
	},
	doGetDetail(e){
		setTimeout(()=>{
			let id = e.currentTarget.dataset.id;
			setTimeout(()=>{
				wx.request({
					url:app.globalData.ajaxSrc+"product_info",
					data:{id:id},
					success:res=>{
						this.setData({
							proDetailData:res.data.data.info,
							showDetails:true
						})
					}
				});
			},150)
		},150)
	},
	hideDetails(){
		this.setData({
			showDetails:false
		})
	},
	amountPay () {
		if (this.data.canUseAmount) {
			this.doPay(2)
		}
	},
	wechatPay () {
		this.doPay(1)
	},
	doNext(){
		if(this.data.showRule){
			if (this.data.hasAmount) {
				this.setData({
					showPayWay: true
				})
			} else {
				this.doPay(1)
			}
		}else{
			this.setData({
				btnColor:'#d9c39f',
				showRule:true
			})
		}
	},
	hidePayWay () {
		this.setData({
			showPayWay: false
		})
	},
	doPay (payType) {
		if (app.globalData.userInfo === null) {
			wx.navigateTo({
				url: '/pages/index/index?result=auth'
			})
			return
		}
		wx.showNavigationBarLoading();
		let obj = {},gb = app.globalData;
		obj.openid = gb.userOpenID;
		obj.shop_id = gb.store.id;
		obj.gid = gb.proPackage.id;
		obj.pet_id = gb.petId;
		obj.name = gb.buyerInfo.name;
		obj.mobile = gb.buyerInfo.mobile;
		obj.pet_sex = gb.buyerInfo.sex;
		obj.pet_name = gb.buyerInfo.petsname;
		obj.remark = gb.buyerInfo.remarks;
		obj.date = gb.selectedDate;
		obj.pay_type = payType;
		// obj.price = gb.proPackage.price;
		wx.request({
			url:app.globalData.ajaxSrc+"create_order",
			data:obj,
			success:res=>{
				if (res.data.status === 0) {
					let order_num = res.data.order_num;
					app.globalData.orderNum = res.data.order_num;
					if (res.data.pay_type === 1) {
						let jsapi = res.data.jsapiparam;
						wx.requestPayment({
							'timeStamp': jsapi.timeStamp,
							'nonceStr': jsapi.nonceStr,
							'package': jsapi.package,
							'signType': jsapi.signType,
							'paySign': jsapi.paySign,
							'success':res=>{
								wx.showToast({
									title:'支付成功'
								});
								this.getMessageAuth()
								this.doBuySuccess(order_num);
							},
							'fail':function(res){
								wx.showToast({
									image:'../../res/img/warn.png',
									title:'支付失败'
								});
								wx.hideNavigationBarLoading();
							}
						})
					} else {
						this.getMessageAuth()
						this.doBuySuccess(order_num);
					}
				} else {
					wx.showToast({
						image:'../../res/img/warn.png',
						title:res.data.msg
					});
				}
			}
		});
	},
	doBuySuccess(orderNum){
		let self = this;
		wx.request({
			url:app.globalData.ajaxSrc+'/buy_success',
			data:{
				order_num:orderNum
			},
			success:res=>{
				wx.reLaunch({
					url: '/pages/result/result?result=suc'
				});
			},
			fail(){
				//wx.reLaunch({
				//    url: '/pages/error/error'
				//})
			}
		})
	},
	hideRules(){
		this.setData({
			btnColor:'#e7e3e2',
			showRule:false
		})
	},
	ruleMove(){},
	//打开详情页
	openDetail(e){
		let id = e.currentTarget.dataset.id;
		setTimeout(()=>{
			wx.request({
				url:app.globalData.ajaxSrc+"product_info",
				data:{id:id},
				success:res=>{
					this.setData({
						proDetailData:res.data.data.info,
						showDetails:true
					})
				}
			});
		},150)
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		const selectWeek = new Date(app.globalData.selectedDate).getDay()
		this.setData({
			proPackage:app.globalData.proPackage,
			buyerInfo:app.globalData.buyerInfo,
			store:app.globalData.store,
			selectDate:app.globalData.selectedDate,
			selectWeek: this.data.week[selectWeek],
			ruleContent:app.globalData.ruleContent
		});
		this.getMoney();
	},
	//打开地图
	openMap(e){
		setTimeout(() => {
			let store = this.data.store;
			wx.openLocation({
				latitude: parseFloat(store.latitude),
				longitude: parseFloat(store.longitude),
				name:store.title,
				address:store.address,
				scale: 28
			})
		},150);
	},
	getMessageAuth () {
		console.log('发起订阅消息')
		const self = this
		wx.requestSubscribeMessage({
			tmplIds: [
				'CVJxO6GHDXC5rL4nzcXh63dc9i_DXDiEhBM5G5uyymI',
				'gUczF-SZ04idnWNOWJtBOFoqU-csBAqohK2DWb5WPcg'
			],
			success (res) {
				console.log('订阅消息成功')
				console.log(res)
				console.log('--------------------')
				self.doSendMsg()
			},
			fail (err) {
				console.log('订阅消息失败')
				console.log(err)
				console.log('--------------------')
			}
		})
	},
	doSendMsg () {
		wx.request({
			url:app.globalData.ajaxSrc+"buy_send",
			data: {
				order_num:app.globalData.orderNum
			},
			success:res=>{
				console.log('发送订阅消息成功')
			}
		});
	},
	getMoney () {
		const openid = app.globalData.userOpenID
		if (openid === '') return
		getUserMoney({openid}).then(res=> {
			let userAmount
			if (Array.isArray(res.data)) {
				userAmount = 0
			} else {
				userAmount = res.data.amount
			}
			this.setData({
				userAmount,
				canUseAmount: parseFloat(userAmount) >= parseFloat(this.data.proPackage.price),
				hasAmount: !Array.isArray(res.data)
			})
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

	}
})
