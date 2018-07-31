// components/ticket-detail/detail.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    itemData:{
      type:Object,
      value:{}
    },
    isSimple:{
      type:Boolean,
      value:true
    },
    showInfos:{
      type:Boolean,
      value:false,
      observer(newVal, oldVal, changedPath){
        let animation = wx.createAnimation({
          duration:1000,
          timingFunction:'cubic-bezier(.22,.62,.4,1.16)'
        });
        let opacity = newVal ? 1 : 0;
        animation.opacity(opacity).step();
        this.setData({
          detailAniData:animation.export()
        });
      }
    },
    showBuyInfos:{
      type:Boolean,
      value:false
    },
    extraClass:{
      type:String,
      value:''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    activityIndex:0,
    activityList:[{},{},{}],
    recommondList:[{},{},{}],
    detailAniData:{},
    ajaxSrc:app.globalData.ajaxSrc,
    imgSrc:app.globalData.imgSrc
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
