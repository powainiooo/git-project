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

        this.setNums(obj);
        this.setData({
          typeList:newVal.anew,
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
      let val = event.target.dataset.val == undefined ? -1 : event.target.dataset.val;
      let obj = val == -1 ? this.data.selectTicket : this.data.typeList[val];
      if(obj.nums == 0) return;
      let isShow = event.target.dataset.show;
      let animation = wx.createAnimation({
        duration:300,
        timingFunction:'ease-in-out'
      });
      // this.animation = animation;

      let dis = isShow ? '160rpx' : -this.data.typeList.length*100+'rpx';
      animation.bottom(dis).step();
      this.setNums(obj);
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
      let btn = true;
      if(this.data.nameVal == ''){
        btn = false;
      }
      let myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
      if(!myreg.test(this.data.phoneVal)){
        btn = false
      }
      if(data.info.is_post == '1'){
        if(this.data.addressVal == ''){
          btn = false;
        }
      }
      if(data.info.is_idnum == '1'){
        var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if(!reg.test(this.data.idnum)){
          btn = false;
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
            nums:self.data.numbersArr[self.data.numberIndex],
            city:app.globalData.city
          },
          success: function(res) {
            let jsapi = res.data.jsapiparam;
            let order_num = res.data.order_num;
            let tid = res.data.tid;
            app.globalData.ticketOrderNum = order_num;
            app.globalData.ticketBuyNum = self.data.numbersArr[self.data.numberIndex];
            if(res.data.flag == 1){//福利票
              self.doBuySuccess(tid,order_num);
            }else{
              wx.requestPayment({
                'timeStamp': jsapi.timeStamp,
                'nonceStr': jsapi.nonceStr,
                'package': jsapi.package,
                'signType': jsapi.signType,
                'paySign': jsapi.paySign,
                'success':function(res){
                  wx.showToast({
                    title:'支付成功'
                  });
                  self.doBuySuccess(tid,order_num);
                },
                'fail':function(res){
                  wx.showToast({
                    title:'支付失败'
                  });
                }
              })
            }
          },
          fail(){
            wx.showModal({
              title:'购买失败，请重试',
              success(){
                self.doPay();
              }
            })
          }
        })
      }
    },
    doBuySuccess(tid,orderNum){
      let self = this;
      wx.request({
        url:self.data.ajaxSrc+'/pay_success',
        data:{
          tid:tid,
          order_num:orderNum
        },
        success:res=>{
          wx.navigateTo({
            url: '/pages/result/result?page=ticketSuc'
          })
        },
        fail(){
          wx.reLaunch({
            url: '/pages/error/error'
          })
        }
      })
    },
    setNums(obj){
      let arr = [];
      let nums = parseInt(obj.nums);
      if(obj.max != ""){
        let max = parseInt(obj.max);
        let val = max > nums ? nums : max;
        for(let i=0;i<val;i++){
          arr.push(i+1)
        }
      }else{
        if(nums < 10){
          for(let i=0;i<nums;i++){
            arr.push(i+1)
          }
        }else{
          arr = [1,2,3,4,5,6,7,8,9,10];
        }
      }
      this.setData({
        numbersArr:arr
      })
    }
  }
});