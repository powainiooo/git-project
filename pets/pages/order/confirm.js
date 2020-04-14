// pages/order/confirm.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        btnColor:'#e7e3e2',//#d9c39f
        showRule:false,
        showDetails:false,
        proPackage:app.globalData.proPackage,
        proClean:app.globalData.proClean,
        proConditioner:app.globalData.proConditioner,
        proTreatment:app.globalData.proTreatment,
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
       week: ['Sun\n周日', 'Mon\n周一', 'Tue\n周二', 'Wed\n周三', 'Thur\n周四', 'Fri\n周五', 'Sat\n周六']
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
    doNext(){
        if(this.data.showRule){
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
            obj.price = gb.proPackage.price;
            wx.request({
                url:app.globalData.ajaxSrc+"create_order",
                data:obj,
                success:res=>{
                    let jsapi = res.data.jsapiparam;
                    let order_num = res.data.order_num;
                    app.globalData.orderNum = res.data.order_num;
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
                }
            });
        }else{
            this.setData({
                btnColor:'#d9c39f',
                showRule:true
            })
        }
    },
    doBuySuccess(orderNum){
        let self = this;
        wx.request({
            url:app.globalData.ajaxSrc+'/buy_success',
            data:{
                order_num:orderNum
            },
            success:res=>{
                wx.navigateTo({
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
            proClean:app.globalData.proClean,
            proConditioner:app.globalData.proConditioner,
            proTreatment:app.globalData.proTreatment,
            buyerInfo:app.globalData.buyerInfo,
            store:app.globalData.store,
            selectDate:app.globalData.selectedDate,
            selectWeek: this.data.week[selectWeek],
            ruleContent:app.globalData.ruleContent
        });
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
