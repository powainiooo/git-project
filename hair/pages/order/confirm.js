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
        selectDate:app.globalData.selectDate,
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
        price:0,
        proDetailData:{}
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
            if(gb.proPackage.id == 0){
                obj.one_id = gb.proClean.id;
                obj.two_id = gb.proConditioner.id;
                obj.three_id = gb.proTreatment.id;
            }else{
                obj.gid = gb.proPackage.id;
                obj.one_id = gb.proPackage.pro_one.id;
                obj.two_id = gb.proPackage.pro_two.id;
                obj.three_id = gb.proPackage.pro_three.id;
            }
            obj.name = gb.buyerInfo.name;
            obj.mobile = gb.buyerInfo.mobile;
            obj.sex = gb.buyerInfo.sex;
            obj.date = gb.selectDate;
            obj.worktime = gb.selectTime;
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
    ruleMove(){

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.proInit();
        this.setData({
            proPackage:app.globalData.proPackage,
            proClean:app.globalData.proClean,
            proConditioner:app.globalData.proConditioner,
            proTreatment:app.globalData.proTreatment,
            buyerInfo:app.globalData.buyerInfo,
            store:app.globalData.store,
            selectDate:app.globalData.selectDate,
            selectWeek:app.globalData.selectWeek,
            selectTime:app.globalData.selectTime,
            ruleContent:app.globalData.ruleContent
        })
    },
    proInit(){
        let arr = this.data.proInfo;
        let pro1 = {},pro2 = {},pro3 = {},price = 0;
        if(this.data.proPackage.id == 0){
            pro1 = this.data.proClean;
            pro2 = this.data.proConditioner;
            pro3 = this.data.proTreatment;
            price = parseFloat(pro1.price) + parseFloat(pro2.price) + parseFloat(pro3.price);
        }else{
            pro1 = this.data.proPackage.pro_one;
            pro2 = this.data.proPackage.pro_two;
            pro3 = this.data.proPackage.pro_three;
            price = this.data.proPackage.price;
        }
        if(pro1 == 0){
            arr[0].show = false;
        }else{
            arr[0].show = true;
            arr[0].imgSrc = this.data.imgSrc+pro1.share_logo;
        }
        if(pro2 == 0){
            arr[1].show = false;
        }else{
            arr[1].show = true;
            arr[1].imgSrc = this.data.imgSrc+pro2.share_logo;
        }
        if(pro3 == 0){
            arr[2].show = false;
        }else{
            arr[2].show = true;
            arr[2].imgSrc = this.data.imgSrc+pro3.share_logo;
        }
        arr[0].id = pro1.id;
        arr[1].id = pro2.id;
        arr[2].id = pro3.id;
        this.setData({
            proInfo:arr,
            price:price
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