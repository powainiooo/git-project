// pages/select/select.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stepArr:['Clean\n清洁','Conditioner\n润发','Treatment\n调理'],
    step:1,
    selectedID:[-1,-1,-1],
    cleanList:[{id:1},{id:2}],
    conditionerList:[{id:1},{id:2}],
    treatmentList:[{id:1},{id:2}]
  },
  //选择清洁
  doSelectClean(e){
    let id = e.currentTarget.dataset.id;
    let arr = this.data.selectedID;
    arr[0] = id;
    this.setData({
      selectedID:arr
    })
  },
  //选择润发
  doSelectConditioner(e){
    let id = e.currentTarget.dataset.id;
    let arr = this.data.selectedID;
    arr[1] = id;
    this.setData({
      selectedID:arr
    })
  },
  //选择调理
  doSelectTreatment(e){
    let id = e.currentTarget.dataset.id;
    let arr = this.data.selectedID;
    arr[2] = id;
    this.setData({
      selectedID:arr
    })
  },
  //下一步
  doNext(){
    if(this.data.step == 3){
      if(this.data.selectedID[2] == -1){
        wx.showToast({
          title:'请选择套餐',
          icon:'none'
        })
      }else{

      }
    }else{
      if(this.data.selectedID[this.data.step-1] == -1){
        wx.showToast({
          title:'请选择套餐',
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