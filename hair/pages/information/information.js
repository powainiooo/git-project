// pages/information/information.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        sexArr:['男','女'],
        sexVal:'',
        name:'',
        mobile:''
    },
    bindSexChange(e){
        let sex = this.data.sexArr[e.detail.value];
        this.setData({
            sexVal: sex
        })
    },
    inputChange(e){
        let name = e.currentTarget.dataset.name;
        let value = e.detail.value;
        this.data[name] = value;
    },
    doNext(){
        if(this.data.name == ''){
            wx.showToast({
                title: '请输入姓名',
                icon: 'none'
            });
            return;
        }
        if(this.data.mobile == ''){
            wx.showToast({
                title: '请输入手机号',
                icon: 'none'
            });
            return;
        }
        if(this.data.sexVal == ''){
            wx.showToast({
                title: '请选择性别',
                icon: 'none'
            });
            return;
        }
        app.globalData.buyerInfo.name = this.data.name;
        app.globalData.buyerInfo.mobile = this.data.mobile;
        app.globalData.buyerInfo.sex = this.data.sexVal == '男' ? 1 : 2;
        wx.navigateTo({
          url: '/pages/order/confirm'
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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