// pages/drink/detail.js
const app = getApp();
const {promisify} = require('../../utils/util.js');
const wxDownloadFile= promisify(wx.downloadFile);
Page({
	data: {
		orderID:0,
		numbersArr:[1,2,3,4,5,6,7,8,9,10],
		numberIndex:0,
		nameVal:'',
		phoneVal:'',
		btnDisabled:false,
		itemData:{id:-1},
		shareImgSrc:'',
		imgSrc:app.globalData.imgSrc,
		wxcodeimg:'',
		showRefresh:false,
	},
	checkValues(event){
		let key = event.target.dataset.key;
		this.data[key] = event.detail.value;
		if (this.data.nameVal != '' && this.data.phoneVal != '' && this.data.addressVal != '') {
			this.setData({
				btnDisabled: true
			})
		} else {
			this.setData({
				btnDisabled: false
			})
		}
	},
	numberChange: function(e) {
		this.setData({
			numberIndex: e.detail.value
		})
	},
	doPay(){
		let self = this;
		if(this.data.btnDisabled){
			self.data.btnDisabled = false;
			wx.showNavigationBarLoading();
			wx.request({
				url: app.globalData.ajaxSrc+'/news_order', //仅为示例，并非真实的接口地址
				data: {
					openid:app.globalData.userOpenID,
					id:self.data.orderID,
					name:self.data.nameVal,
					mobile:self.data.phoneVal,
					nums:self.data.numbersArr[self.data.numberIndex]
				},
				success: function(res) {
					let jsapi = res.data.jsapiparam;
					let order_num = res.data.order_num;
					if(res.data.flag == 1) {//福利票
						self.doBuySuccess(order_num);
					}else{
						wx.requestPayment({
							'timeStamp': jsapi.timeStamp,
							'nonceStr': jsapi.nonceStr,
							'package': jsapi.package,
							'signType': jsapi.signType,
							'paySign': jsapi.paySign,
							'success':function(res){
								wx.showToast({
									title:'支付成功'
								});
								self.doBuySuccess(order_num);
								wx.hideNavigationBarLoading();
							},
							'fail':function(res){
								wx.showToast({
									image:'../../res/images/warn.png',
									title:'支付失败'
								});
								self.data.btnDisabled = true;
								wx.hideNavigationBarLoading();
							}
						})
					}
				},
				fail(){
					wx.showModal({
						title:'购买失败，请重试',
						success(){
							self.data.btnDisabled = true;
							self.doPay();
						}
					})
				}
			})
		}
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		console.log(options);
		let id = options.id || options.scene || 2;
		this.data.orderID = id;
		this.getData();

	},
	//获取数据
	getData(){
		let self = this;
		wx.showNavigationBarLoading();
		wx.request({
			url: app.globalData.ajaxSrc+'/drink_info',
			data:{
				id:self.data.orderID
			},
			success: function(res) {
				let data = res.data;
				if(data.status == 0){
					let info = data.data.info;
					let limit = info.limit,arr = [];
					if(limit == '' || limit == 0){
						arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
					}else{
						for(let i=0;i<limit;i++){
							arr.push(i+1);
						}
					}

					self.setData({
						numbersArr:arr,
						itemData:info
					});
					self.drawSharePoster2();
					wx.hideNavigationBarLoading();
				}else{
					self.showToast({
						title:data.msg
					});
					self.setData({
						showRefresh:true
					});
					wx.hideNavigationBarLoading();
				}
			},
			fail(){
				self.showToast({
					title:'加载失败'
				});
				self.setData({
					showRefresh:true
				})
			}
		});
	},
	//画海报
	drawPoster(){
		let data = this.data.itemData,imgSrc = this.data.imgSrc;
		wx.showLoading({
			title:'生成中'
		});
		const ctx = wx.createCanvasContext('poster');
		Promise.all([
			wxDownloadFile({
				url: imgSrc+data.cover
			}),
			wxDownloadFile({
				url: data.wxacode
			})
		]).then(res => {
			//背景色
			ctx.rect(0, 0, 750, 410);
			ctx.setFillStyle('#ffffff');
			ctx.fill();

			//详情图
			ctx.drawImage(res[0].tempFilePath,0,0,800,276);
			//右边白色遮罩
			ctx.setFillStyle('#ffffff');
			ctx.fillRect(485, 0, 265, 410);
			//右上角logo
			ctx.drawImage('../../res/images/top2.png',0,0,188,188);
			//底部logo
			ctx.drawImage('../../res/images/bottom2.png',0,265,750,145);
			//名称
			ctx.font = "27px 'Helve'";
			ctx.setFillStyle('#000');
			ctx.setFontSize(26);
			let len = gblen(data.drink_name),row = Math.ceil(len/14);
			for(let i=0;i<row;i++){
				ctx.fillText(data.drink_name.slice(i*14,i*14+14), 500, 40*(i+1),230);
			}
			//商家
			ctx.font = "24px 'Helve'";
			ctx.setFillStyle('#000');
			ctx.setFontSize(24);
			let len2 = gblen(data.logo_pic),row2 = Math.ceil(len2/14);
			for(let i=0;i<row2;i++){
				ctx.fillText(data.logo_pic.slice(i*14,i*14+14), 500, 40*(i+1) + row*40,230);
			}
			//横线
			ctx.beginPath();
			ctx.moveTo(500,40*row+20 + 40*row2);
			ctx.lineTo(730,40*row+20 + 40*row2);
			ctx.stroke();

			//二维码
			ctx.drawImage(res[1].tempFilePath,550,120,120,120);

			ctx.draw(true,function(){
				wx.canvasToTempFilePath({
				  canvasId: 'poster',
				  x:0,
				  y:0,
				  width:750,
				  height:410,
				  destWidth:750,
				  destHeight:410,
				  success:function(res2){
				    wx.hideLoading();
				    wx.saveImageToPhotosAlbum({
				      filePath: res2.tempFilePath,
				      success(){
				        wx.showToast({
				          title: '保存成功',
				          icon: 'success',
				          duration: 2000
				        })
				      }
				    })
				  }
				})
			})
		})
	},
	//画分享图
	drawSharePoster2(){
		let data = this.data.itemData,imgSrc = this.data.imgSrc,self = this,offsetY = 100;
		const ctx = wx.createCanvasContext('posterShare');

		Promise.all([
			wxDownloadFile({
				url: imgSrc+data.cover
			}),
			wxDownloadFile({
				url: data.wxacode
			})
		]).then(res => {
			//背景色
			ctx.rect(0, 0, 750, 600);
			ctx.setFillStyle('#ffffff');
			ctx.fill();

			ctx.drawImage(res[0].tempFilePath,0,offsetY,800,276);
			//右边白色遮罩
			ctx.setFillStyle('#f6f6f6');
			ctx.fillRect(485, offsetY, 265, 410);
			//右上角logo
			ctx.drawImage('../../res/images/top3.png',0,offsetY,188,188);
			//名称
			ctx.font = "27px 'Helve'";
			ctx.setFillStyle('#000');
			ctx.setFontSize(26);
			let len = gblen(data.drink_name),row = Math.ceil(len/14);
			for(let i=0;i<row;i++){
				ctx.fillText(data.drink_name.slice(i*14,i*14+14), 500, 40*(i+1)+offsetY,230);
			}
			//商家
			ctx.font = "24px 'Helve'";
			ctx.setFillStyle('#000');
			ctx.setFontSize(24);
			let len2 = gblen(data.logo_pic),row2 = Math.ceil(len2/14);
			for(let i=0;i<row2;i++){
				ctx.fillText(data.logo_pic.slice(i*14,i*14+14), 500, 40*(i+1) + row*40 + offsetY,230);
			}
			//横线
			ctx.beginPath();
			ctx.moveTo(500,40*row+20 + 40*row2);
			ctx.lineTo(730,40*row+20 + 40*row2);
			ctx.stroke();

			//二维码
			ctx.drawImage(res[1].tempFilePath,550,120 + offsetY,120,120);
			//底部logo
			ctx.drawImage('../../res/images/bottom3.png',0,265 + offsetY,750,145);
			ctx.draw(true,function(){
				wx.canvasToTempFilePath({
					canvasId: 'posterShare',
					x:0,
					y:0,
					width:750,
					height:600,
					destWidth:750,
					destHeight:600,
					success:function(res2){
						self.data.shareImgSrc = res2.tempFilePath;
					}
				})
			})
		})
	},
	drawSharePoster(){
		let data = this.data.itemData,imgSrc = this.data.imgSrc,self = this,offsetY = 100;
		const ctx = wx.createCanvasContext('posterShare');
		//背景色
		ctx.rect(0, 0, 750, 510);
		ctx.setFillStyle('#ffffff');
		ctx.fill();
		//详情图
		wx.downloadFile({
			url: imgSrc+data.cover,
			success: function(res) {
				if (res.statusCode === 200) {
					ctx.drawImage(res.tempFilePath,0,offsetY,800,276);
					//右边白色遮罩
					ctx.setFillStyle('#f6f6f6');
					ctx.fillRect(485, offsetY, 265, 410);
					//右上角logo
					ctx.drawImage('../../res/images/top3.png',0,offsetY,188,188);
					//名称
					ctx.font = "27px 'Helve'";
					ctx.setFillStyle('#000');
					ctx.setFontSize(26);
					let len = data.drink_name.length,row = Math.ceil(len/9);
					for(let i=0;i<row;i++){
						ctx.fillText(data.drink_name.slice(i*9,i*9+9), 500, 40*(i+1) + offsetY,230);
					}
					//横线
					ctx.beginPath();
					ctx.moveTo(500,40*row+20 + offsetY);
					ctx.lineTo(730,40*row+20 + offsetY);
					ctx.stroke();
					//底部logo
					ctx.drawImage('../../res/images/bottom3.png',0,265 + offsetY,750,145);
					//产品logo
					wx.downloadFile({
						url: imgSrc+data.logo_pic,
						success: function(res1) {
							if (res1.statusCode === 200) {
								ctx.drawImage(res1.tempFilePath,582,150 + offsetY,70,70);
								ctx.draw(true,function(){
									wx.canvasToTempFilePath({
										canvasId: 'posterShare',
										x:0,
										y:0,
										width:750,
										height:510,
										destWidth:750,
										destHeight:510,
										success:function(res2){
											self.data.shareImgSrc = res2.tempFilePath;
										}
									})
								})
							}
						}
					});
				}
			}
		});
	},
	//返回特饮首页
	doClose(){
		wx.reLaunch({
			url: '/pages/drink/index'
		})
	},
	//购买成功
	doBuySuccess(orderNum){
		let self = this;
		wx.showNavigationBarLoading();
		wx.request({
			url:app.globalData.ajaxSrc+'/buysuccess',
			data:{
				tid:self.data.orderID,
				order_num:orderNum
			},
			success:res=>{
				wx.navigateTo({
					url: '/pages/result/result?page=drinkSuc'
				})
			},
			fail(){
				wx.navigateTo({
					url: '/pages/error/error'
				})
			}
		})
	},
	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {
		return {
			title:this.data.itemData.drink_name,
			//imageUrl:this.data.imgSrc+this.data.detailData.info.cover2,
			imageUrl:this.data.shareImgSrc,
			path:'pages/drink/detail?id='+this.data.itemData.id
		}
	}
});
const gblen = function(str) {
	let len = 0;
	for (let i=0; i<str.length; i++) {
		if (str.charCodeAt(i)>127 || str.charCodeAt(i)===94) {
			len += 2;
		} else {
			len ++;
		}
	}
	return len;
}
