// pages/order/detail.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        timer:30*60,
        timeT:0,
        showDetails:false,
        orderNum:'',
        detailData:{},
        proDetailData:{},
        year:'',
        month:'',
        day:'',
        imgSrc:app.globalData.imgSrc
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.data.orderNum = options.orderNum;
        this.getData(this.data.orderNum);
    },
    doGetDetail(e){
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
    timerCount(){
        this.data.timeT = setInterval(()=>{
            if(this.data.timer == 0){
                clearInterval(this.data.timeT)
            }else{
                let timer = this.data.timer - 1;
                this.setData({
                    timer:timer
                })
            }
        },1000)
    },
    getData(orderNum){
        wx.request({
            url:app.globalData.ajaxSrc+"order_desc",
            data:{
                order_num:orderNum
            },
            success:res=>{
                let date = res.data.data.date;
                let timer = parseInt(res.data.data.sec);
                this.setData({
                    detailData:res.data.data,
                    year:date.slice(0,4),
                    month:date.slice(5,7),
                    day:date.slice(8,10),
                    timer:timer
                });
                if(res.data.data.status == 'useing'){
                    this.timerCount();
                }
            }
        })
    },
    gotoFeedback(){
        wx.navigateTo({
            url: '/pages/feedback/feedback?orderNum='+this.data.orderNum
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