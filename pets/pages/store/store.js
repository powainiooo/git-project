// pages/store/store.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        lnglat:[114.053987,22.533577],
        shopList:[],
        selectId:0,
        bannerImgSrc:'',
        imgSrc:app.globalData.imgSrc,
        store:{}
    },
    //下一步
    doNext(){
       console.log(JSON.stringify(this.data.store))
        app.globalData.store = this.data.store;
        wx.navigateTo({
            url: '/pages/date/date'
        })
    },
    //打开地图
    openMap(e){
        setTimeout(function(){
            let store = e.currentTarget.dataset.store;
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
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getData();
    },
    getData(){
        wx.request({
            url:app.globalData.ajaxSrc+"shop_list",
            data:{page:1},
            success:res=>{
                this.setData({
                    shopList:res.data.data.list,
                    bannerImgSrc:res.data.data.list[0].cover,
                    selectId:res.data.data.list[0].id
                })
                this.data.store = res.data.data.list[0];
            }
        })
    },
    doSelect(e){
        setTimeout(()=>{
            let store = e.currentTarget.dataset.store;
            this.setData({
                selectId:store.id,
                store:store,
                bannerImgSrc:store.cover
            })
        },200)
    },
    doCancel(){
        this.setData({
            selectId:0
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
