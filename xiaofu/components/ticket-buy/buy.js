// pages/ticket-buy/buy.js
const app = getApp();
Component({
  properties: {
    itemData: {
      type: Object,
      value: {},
      observer(newVal,oldVal,change){
        if(newVal.anew){
          let list = newVal.anew,obj = {},min = 10000;
          for(let item of list){
            if (parseInt(item.price) < min && item.is_over == 0){
              min = parseInt(item.price);
              obj = item;
            }
          }

          this.setNums(obj);
          this.setData({
            typeList:newVal.anew,
            typeBottom:-newVal.anew.length*100+'rpx',
            selectTicket:obj
          })
        }

      }
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    numbersArr:[1,2,3,4,5,6,7,8,9,10],
    numberIndex:0,
    idTypeArr:['身份证','护照'],
    idTypeIndex:-1,
    nameVal:'',
    phoneVal:'',
    addressVal:'',
    idnum:'',
    btnDisabled:false,
    typeList:[],
    selectTicket:{},
    showTypeList:false,
    ajaxSrc:app.globalData.ajaxSrc,
    imgSrc:app.globalData.imgSrc,
    typeBottom:0
  },
  methods:{
    numberChange: function(e) {
      this.setData({
        numberIndex: e.detail.value
      })
    },
    idTypeChange: function(e) {
      this.setData({
        idTypeIndex: e.detail.value
      });
      this.checkValues();
    },
    toggleTypeList(event){
      let over = event.target.dataset.over;
      if(over == 1) return;
      let val = event.target.dataset.val == undefined ? -1 : event.target.dataset.val;
      let obj = val == -1 ? this.data.selectTicket : this.data.typeList[val];
      let isShow = event.target.dataset.show;
      this.setNums(obj);
      let params = {};
      params.typeBottom = isShow ? '160rpx' : -this.data.typeList.length*100+'rpx';
      params.showTypeList = isShow;
      if(!isShow && obj.is_over == 1)return;
      params.selectTicket = obj;
      this.setData(params)
    },
    checkValues(event){
      let data = this.data.itemData;
      if(event){
        let key = event.target.dataset.key;
        this.data[key] = event.detail.value;
      }

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
        if(this.data.idTypeIndex == -1){
          btn = false;
        }else if(this.data.idTypeIndex == 0){
          var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
          if(!reg.test(this.data.idnum)){
            btn = false;
          }
        }else if(this.data.idTypeIndex == 1){
          let reg = /^[a-zA-Z0-9]{5,17}$/;
          if(this.data.idnum == ''){
            btn = false;
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
        self.data.btnDisabled = false;
        wx.showNavigationBarLoading();
        wx.request({
          url: self.data.ajaxSrc+'/create_order', //仅为示例，并非真实的接口地址
          data: {
            openid:app.globalData.userOpenID,
            tid:self.data.itemData.info.id,
            name:self.data.nameVal,
            mobile:self.data.phoneVal,
            address:self.data.addressVal,
            idnum:self.data.idnum,
            idnum_type:parseInt(this.data.idTypeIndex) + 1,
            sele:self.data.selectTicket.select,
            nums:self.data.numbersArr[self.data.numberIndex],
            city:app.globalData.city
          },
          success: function(res) {
            if(res.data.status != 0){
              wx.showToast({
                image:'../../res/images/warn.png',
                title:res.data.msg
              });
            }else{
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
                    console.log(res);
                    wx.showToast({
                      title:'支付成功'
                    });
                    self.doBuySuccess(tid,order_num);
                  },
                  'fail':function(res){
                    wx.showToast({
                      image:'../../res/images/warn.png',
                      title:'支付失败'
                    });
                    wx.hideNavigationBarLoading();
                    self.data.btnDisabled = true;
                  }
                })
              }
            }

          },
          fail(){
            wx.showModal({
              title:'购买失败，请重试',
              success(){
                self.data.btnDisabled = true;
                self.doPay();
              }
            });
            wx.hideNavigationBarLoading();
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
          });
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