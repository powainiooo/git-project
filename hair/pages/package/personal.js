// pages/package/personal.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        detailData:app.globalData.personalPackage,
        imgSrc:app.globalData.imgSrc
    },
    gotoList(e){
        setTimeout(()=>{
            let type = e.currentTarget.dataset.type;
            wx.navigateTo({
                url: '/pages/package/editor?type='+type
            })
        },150)
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            detailData:app.globalData.personalPackage
        })
    },
    doNext(){
        wx.showModal({
          title: '提示',
          content: '保存成功 可返回首页预定',
          success: res=>{
            if (res.confirm) {
                wx.reLaunch({
                    url: '/pages/index/index'
                })
            }
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