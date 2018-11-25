// pages/order/list.js
const app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        listData:[]
    },
    gotoDetail(e){
        let status = e.currentTarget.dataset.status;
        let num = e.currentTarget.dataset.num;
        if(status == 'used'){
            wx.navigateTo({
                url: '/pages/order/used?orderNum='+num
            })
        }else if(status == 'over'){
            wx.navigateTo({
                url: '/pages/order/overdue?orderNum='+num
            })
        }else if(status == 'useing'){
            wx.navigateTo({
                url: '/pages/order/useing?orderNum='+num
            })
        }else if(status == 'nouse'){
            wx.navigateTo({
                url: '/pages/order/notuse?orderNum='+num
            })
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getData();
    },
    getData(){
        wx.request({
            url:app.globalData.ajaxSrc+"user_order",
            data:{
                openid:app.globalData.userOpenID,
                page:1
            },
            success:res=>{
                this.setData({
                    listData:res.data.data.list
                })
            }
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