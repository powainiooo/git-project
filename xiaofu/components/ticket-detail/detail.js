// components/ticket-detail/detail.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isSimple:{
      type:Boolean,
      value:true
    },
    showInfos:{
      type:Boolean,
      value:false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    activityIndex:0,
    activityList:[{},{},{}],
    recommondList:[{},{},{}]
  },
  attached(){

  },
  /**
   * 组件的方法列表
   */
  methods: {
    activityChange(event){
      let index = event.detail.current;
      this.setData({
        activityIndex:index
      })
    },
    docall(e){
      let phone = e.target.dataset.phone;
      wx.makePhoneCall({
        phoneNumber: phone//仅为示例，并非真实的电话号码
      })
    }
  }
})
