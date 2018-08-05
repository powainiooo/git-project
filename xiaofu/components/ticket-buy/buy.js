// pages/ticket-buy/buy.js
const app = getApp();
Component({
  properties: {
    itemData: {
      type: Object,
      value: {},
      observer(newVal,oldVal,change){
        let list = newVal.anew,obj=list[0];
        for(let item of list){
          if(obj.price > item.price){
            obj = item;
          }
        }
        let arr = [];
        if(obj.max != ""){
          let max = parseInt(obj.max);
          for(let i=0;i<max;i++){
            arr.push(i+1)
          }
        }else{
          arr = [1,2,3,4,5,6,7,8,9,10];
        }
        this.setData({
          typeList:newVal.anew,
          numbersArr:arr,
          selectTicket:obj
        })
      }
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    numbersArr:[1,2,3,4,5,6,7,8,9,10],
    numberIndex:0,
    animDataTypeList:{},
    nameVal:'',
    phoneVal:'',
    addressVal:'',
    idnum:'',
    btnDisabled:false,
    typeList:[],
    selectTicket:{},
    showTypeList:false,
    ajaxSrc:app.globalData.ajaxSrc,
    imgSrc:app.globalData.imgSrc
  },
  methods:{
    numberChange: function(e) {
      this.setData({
        numberIndex: e.detail.value
      })
    },
    toggleTypeList(event){
      let isShow = event.target.dataset.show;
      let animation = wx.createAnimation({
        duration:300,
        timingFunction:'ease-in-out'
      });
      // this.animation = animation;

      let dis = isShow ? '160rpx' : -this.data.typeList.length*100+'rpx';
      animation.bottom(dis).step();
      let val = event.target.dataset.val == undefined ? -1 : event.target.dataset.val;
      let obj = val == -1 ? this.data.selectTicket : this.data.typeList[val];
      this.setData({
        animDataTypeList:animation.export(),
        selectTicket:obj,
        showTypeList:isShow
      })
    },
    checkValues(event){
      let data = this.data.itemData;
      let key = event.target.dataset.key;
      this.data[key] = event.detail.value;
      let btn = false;
      if(this.data.nameVal != '' && this.data.phoneVal != ''){
        if(data.info.is_post == '1'){
          if(this.data.addressVal != ''){
            btn = true;
          }
        }
        if(data.info.is_idnum == '1'){
          if(this.data.idnum != ''){
            btn = true;
          }
        }

      }
      this.setData({
        btnDisabled:btn
      })
    },
    doPay(){
      let self = this;
      if(self.data.btnDisabled){
        wx.request({
          url: self.data.ajaxSrc+'/create_order', //仅为示例，并非真实的接口地址
          data: {
            openid:app.globalData.userOpenID,
            tid:self.data.itemData.info.id,
            name:self.data.nameVal,
            mobile:self.data.phoneVal,
            address:self.data.addressVal,
            idnum:self.data.idnum,
            sele:self.data.selectTicket.select,
            nums:self.data.numbersArr[self.data.numberIndex]
          },
          success: function(res) {
            let jsapi = res.data.jsapiparam;
            let order_num = res.data.order_num;
            app.globalData.ticketOrderNum = order_num;
            app.globalData.ticketBuyNum = self.data.numbersArr[self.data.numberIndex];
            wx.requestPayment({
              'timeStamp': jsapi.timeStamp,
              'nonceStr': jsapi.nonceStr,
              'package': jsapi.package,
              'signType': jsapi.signType,
              'paySign': jsapi.paySign,
              'success':function(res){
                console.log('pay s');
                console.log(res);
                wx.request({
                    url:self.data.ajaxSrc+'/pay_success',
                    data:{
                      tid:self.data.itemData.info.id,
                      order_num:order_num
                    },
                    success:res=>{
                      console.log('pay s o');
                      console.log(res);
                      wx.navigateTo({
                        url: '/pages/result/result?page=ticketSuc'
                      })
                    }
                })
              },
              'fail':function(res){
                console.log('pay f');
                console.log(res);
              }
            })
          }
        })
      }
    },
    doClose(){
      wx.navigateTo({
        url: '/pages/index/index'
      })
    }
  }
});