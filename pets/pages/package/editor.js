// pages/select/select.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        stepArr:['Clean\n清洁'],
        step:1,
        selectedID:-1,
        listData:[{id:1},{id:2}],
        type:0,
        imgSrc:app.globalData.imgSrc,
        price:0,
        index:0,
        lastPrice:0
    },
    //选择清洁
    doSelectClean(e){
        setTimeout(()=>{
            let id = e.currentTarget.dataset.id;
            let price = e.currentTarget.dataset.price;
            let index = e.currentTarget.dataset.index;
            this.setData({
                lastPrice:price,
                selectedID:id,
                price:price,
                index:index
            })
        },150)
    },
    //下一步
    doNext(){
        if(this.data.selectedID == -1){
            wx.showToast({
                title:'请选择套餐',
                icon:'none'
            })
        }else{
            wx.request({
                url:app.globalData.ajaxSrc+"edit_person_group",
                data:{
                    openid:app.globalData.userOpenID,
                    id:this.data.selectedID,
                    type:this.data.type
                },
                success:res=>{
                    app.getPerson();
                    wx.showToast({
                        title:'保存成功',
                        icon:'none'
                    });
                    setTimeout(()=>{
                        wx.navigateTo({
                            url: '/pages/package/personal'
                        })
                    },1500)
                }
            })
        }

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let type = options.type;
        this.data.type = type;
        let arr = ['Clean\n清洁','Conditioner\n润发','Treatment\n调理'];
        this.setData({
            stepArr:[arr[type-1]]
        });
        this.getData(type);
    },
    getData(type){
        wx.request({
            url:app.globalData.ajaxSrc+"product_list",
            data:{
                type:type,
                shop_id:app.globalData.store.id
            },
            success:res=>{
                this.setData({
                    listData:res.data.data.list
                });
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

    }
})
