// pages/feedback/feedback.js
const {userSuggest} = require('../../utils/api.js')
const { $Message } = require('../../components/iview/base/index')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    txt:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  inputChange(e) {
    this.data.txt = e.detail.value
  },
  doSubmit() {
    userSuggest({
      content: this.data.txt
    }).then(res => {
      if(res.code === 0){
        $Message({
          content: '反馈成功！',
          type: 'success'
        });
        setTimeout(() => {
          wx.navigateTo({
            url: '/pages/personal/personal'
          })
        },2000)
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
	onShareAppMessage () {
		return {
			title: '神笔画画',
			path: `/pages/index/index`
		}
	}
})
