// pages/select/select.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        stepArr:['Clean\n清洁','Conditioner\n润发','Treatment\n调理'],
        step:1,
        selectedID:[-1,-1,-1],
        selectedPrice:[0,0,0],
        selectedIndex:[0,0,0],
        cleanList:[],
        conditionerList:[],
        treatmentList:[],
        imgSrc:app.globalData.imgSrc
    },
    //切换选择
    changeStep(e){
        let index = e.currentTarget.dataset.index;
        if(this.data.selectedID[index] != -1){
            this.setData({
                step:index+1
            })
        }
    },
    //选择清洁
    doSelectClean(e){
        setTimeout(()=>{
            let id = e.currentTarget.dataset.id;
            let price = e.currentTarget.dataset.price;
            let index = e.currentTarget.dataset.index;
            let arr = this.data.selectedID;
            let arr2 = this.data.selectedPrice;
            let arr3 = this.data.selectedIndex;
            arr[0] = id;
            arr2[0] = parseFloat(price);
            arr3[0] = index;
            this.setData({
                selectedID:arr,
                selectedPrice:arr2,
                selectedIndex:arr3
            })
        },150)

    },
    //选择润发
    doSelectConditioner(e){
        setTimeout(()=>{
            let id = e.currentTarget.dataset.id;
            let price = e.currentTarget.dataset.price;
            let index = e.currentTarget.dataset.index;
            let arr = this.data.selectedID;
            let arr2 = this.data.selectedPrice;
            let arr3 = this.data.selectedIndex;
            arr[1] = id;
            arr2[1] = parseFloat(price);
            arr3[1] = index;
            this.setData({
                selectedID:arr,
                selectedPrice:arr2,
                selectedIndex:arr3
            })
        },150)

    },
    //选择调理
    doSelectTreatment(e){
        setTimeout(()=>{
            let id = e.currentTarget.dataset.id;
            let price = e.currentTarget.dataset.price;
            let index = e.currentTarget.dataset.index;
            let arr = this.data.selectedID;
            let arr2 = this.data.selectedPrice;
            let arr3 = this.data.selectedIndex;
            arr[2] = id;
            arr2[2] = parseFloat(price);
            arr3[2] = index;
            this.setData({
                selectedID:arr,
                selectedPrice:arr2,
                selectedIndex:arr3
            })
        },150)

    },
    //下一步
    doNext(){
        if(this.data.step == 3){
            if(this.data.selectedID[2] == -1){
                wx.showToast({
                    title:'请选择产品',
                    icon:'none'
                })
            }else{
                app.globalData.proPackage.id = {};
                app.globalData.proClean = this.data.cleanList[this.data.selectedIndex[0]];
                app.globalData.proConditioner = this.data.conditionerList[this.data.selectedIndex[1]];
                app.globalData.proTreatment = this.data.treatmentList[this.data.selectedIndex[2]];
                wx.navigateTo({
                    url: '/pages/information/information'
                })
            }
        }else{
            if(this.data.selectedID[this.data.step-1] == -1){
                wx.showToast({
                    title:'请选择产品',
                    icon:'none'
                })
            }else{
                let step = this.data.step + 1;
                this.setData({
                    step:step
                })
            }
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getData(1);
        this.getData(2);
        this.getData(3);
    },
    getData(type){
        wx.request({
            url:app.globalData.ajaxSrc+"product_list",
            data:{
                type:type,
                shop_id:app.globalData.store.id
            },
            success:res=>{
                const arr = ['cleanList','conditionerList','treatmentList'];
                let obj = {};
                obj[arr[type-1]] = res.data.data.list;
                this.setData(obj);
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