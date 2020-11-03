// components/interaction/photo/photo.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
     peas: {
        type: Number,
        value: 0
     }
  },

  /**
   * 组件的初始数据
   */
  data: {
     isIOS: app.globalData.isIOS,
  },

  /**
   * 组件的方法列表
   */
  methods: {
     gotoList () {
     	if (app.globalData.settingData['scope.userLocation'] === true) {
	      wx.navigateTo({
		      url: '/pages/onscreen/list/list'
	      })
      } else {
	      wx.showModal({
		      title: '警告',
		      content: '请在菜单-设置中打开定位权限',
		      showCancel: false
	      })
      }
     },
     gotoRecharge () {
        if (this.data.isIOS) {
           wx.showModal({
              title: '提示',
              content: '由于相关规范，请联系线下神笔画画站点获取。'
           })
        } else {
           wx.navigateTo({
              url: '/pages/recharge/recharge'
           })
        }
     },
  }
})
