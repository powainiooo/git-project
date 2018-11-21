// pages/date/date.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        selectTime:'',
        selectDate:'',
        selectWeek:'',
        dateList:[],
        timeList:[]
    },
    //选择
    doselect(e){
        setTimeout(()=>{
            let index = e.currentTarget.dataset.index;
            this.setData({
                selectTime:index
            })
        },200);
    },
    //下一步
    doNext(){
        app.globalData.selectDate = this.data.selectDate;
        app.globalData.selectTime = this.data.selectTime;
        app.globalData.selectWeek = this.data.selectWeek;
        wx.navigateTo({
            url: '/pages/package/package'
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getData();
    },
    getData(){
        wx.request({
            url:app.globalData.ajaxSrc+"get_dates",
            data:{shop_id:app.globalData.storeId},
            success:res=>{
                this.setData({
                    dateList:res.data.data.list
                });
                this.getTime(this.data.dateList[0].date);
            }
        })
    },
    getTime(date){
        wx.request({
            url:app.globalData.ajaxSrc+"working_time",
            data:{
                shop_id:app.globalData.store.id,
                date:'2018-11-15'
            },
            success:res=>{
                this.setData({
                    timeList:res.data.data.info.workdata
                })
            }
        })
    },
    changeDay(e){
        let date = e.currentTarget.dataset.date;
        this.data.selectDate = date.date;
        this.data.selectWeek = date.week;
        this.getTime(date);
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