// pages/orderAccount/index.js
const api = require('../../utils/api.js');
//获取应用实例
const app = getApp();
var www = app.globalData.www;
var imgUrl = app.globalData.url;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    www:www,
    imgUrl:imgUrl,
    getAddress:false,
    isfp:false,
    adds:[],
    fp:{},
    isAddsNull:false,
    isPayStatus:true,
    select:-1,
    isYHQ:false,
    bz:'',
    isKJ:false,
    index: 0,
    real_name: '',
    card_number:'',
    yqxText:null,
    coupon_id: 0,
    jf_status:0,
    yhq_status:0,
	  cardImg1: '',
	  cardImg2: '',
  },

  // 打开优惠券弹窗
  openyhqTap:function(){
    if (JSON.stringify(this.data.data.u_yhq) != '[]'){
      this.setData({
        isYHQ: true
      })
    }
  },

  // 关闭优惠券
  isCloseTap:function(){
    var index = this.data.select;
    var data = this.data.data;
    var idxText;
    var yqxText
    if (index>-1) {
      idxText = data.u_yhq[index];
      yqxText = '满' + idxText.condition + '减' + idxText.miane;

    } else {
      yqxText = '不使用优惠券'
    }
    this.setData({
      yqxText: yqxText,
      isYHQ: false
    })
  },

  // 选择优惠券
  selectYHQ:function(e){
    var index = e.currentTarget.dataset.index;
    if (index>-1) {
      let coupon_id = this.data.data.u_yhq[index].id
      console.log(index, 'u_yhq', this.data.data.u_yhq[index].id)
      this.setData({
        select: index,
        coupon_id: coupon_id
      })
    } else {

      this.setData({
        select: index,
      })
    }

  },

  // 使用积分
  switchChange:function(e){
    var data = this.data.data;
    this.setData({
      isjifen: e.detail.value,
    })
    var total = this.data.data.total;
    if (this.data.isjifen){
      data.yfPay = total - data.dk_money;
      this.setData({
        data:data
      })
    }else{
      data.yfPay = total;
      this.setData({
        data: data
      })
    }
  },

  //选择收货地址
  selectAddsTap:function(){
    var that = this;
    wx.chooseAddress({
      success: (res) => {
        that.setData({
          adds: res,
          getAddress: true,
          isAddsNull:false,
        })
      },fail(res){
        console.log('fail')
      }
    })
  },

  // 我要开发票
  openFpTap:function(){
    var that = this;
    wx.chooseInvoiceTitle({
      success: (res) => {
        that.setData({
          isfp:true,
          fp: res
        })
      }, fail(res) {
        console.log('fail')
      }
    })
  },

  // 订单备注
  bz:function(e){
    var bz = e.detail.value;
    this.setData({
      bz: bz
    })
  },

  // 真实姓名
  real_name: function (e) {
    var real_name = e.detail.value;
    this.setData({
      real_name: real_name
    })
  },

  // 身份证号
  card_number: function (e) {
    var card_number = e.detail.value;
    this.setData({
      card_number: card_number
    })
  },

	// 选择图片
	selectImg (e) {
  	   const _this = this
  	   wx.chooseImage({
	      count: 1,
	      success: (res) => {
	      	console.log('chooseImage', res)
		      var login_key = app.getLoginKey()
		      const mid = app.globalData.mid
		      wx.showLoading({
			      title: '正在上传'
		      })
		      wx.uploadFile({
			      url: `${www}/api/index/uploadImage?login_key=${login_key}&mid=${mid}`, //仅为示例，非真实的接口地址
			      filePath: res.tempFilePaths[0],
			      name: 'file',
			      success (res2){
			      	wx.hideLoading()
				      const data = JSON.parse(res2.data)
				      const key = e.currentTarget.dataset.key
				      _this.setData({
					      [key]: data.data
				      })
			      }
		      })
	      }
      })
	},

  payTap:function(){
    let bz = this.data.bz;
    let real_name = this.data.real_name;
    let card_number = this.data.card_number;
    if (JSON.stringify(this.data.adds) == "{}") {
      wx.showToast({
        title: '请选择收货地址',
        icon: 'none'
      })
      return false;
    }
    if (real_name == "" && this.data.data.hw_flag != 2) {
      wx.showToast({
        title: '请输入真实姓名',
        icon: 'none'
      })
      return false;
    }
    if (card_number.length != 18 && this.data.data.hw_flag != 2) {
      wx.showToast({
        title: '请输入18位的身份证号',
        icon: 'none'
      })
      return false;
    }
    if (this.data.cardImg1 == '' && this.data.data.hw_flag != 2) {
      wx.showToast({
        title: '请上传人像面图片',
        icon: 'none'
      })
      return false;
    }
    if (this.data.cardImg2 == '' && this.data.data.hw_flag != 2) {
      wx.showToast({
        title: '请上传国徽面图片',
        icon: 'none'
      })
      return false;
    }
    if (this.data.isPayStatus){
      this.setData({
        isPayStatus:false
      })
      let fp_status = 0;
      let fp = this.data.fp;
      console.log('fp',fp);
      let fp_name = '', fp_gs_name = '', fp_sh = '';
      let fp_companyAddress='';
      let fp_telephone='';
      let fp_bankName='';
      let fp_bankAccount='';
      if (JSON.stringify(fp) == '{}') {
        fp_status = 0;
        fp_name = '';
        fp_gs_name = '';
        fp_sh = '';
      } else if (fp.type == 0) {
        fp_status = 2;
        fp_name = fp.title;
        fp_gs_name = fp.title;
        fp_sh = fp.taxNumber;
        fp_companyAddress=fp.companyAddress;
        fp_telephone=fp.telephone;
        fp_bankName=fp.bankName;
        fp_bankAccount=fp.bankAccount;
      } else if (fp.type == 1){
        fp_status = 1;
        fp_name = fp.title;
        fp_gs_name = fp.title;
        fp_sh = fp.taxNumber;
        fp_companyAddress='';
        fp_telephone='';
        fp_bankName='';
        fp_bankAccount='';
      }
      let flag = this.data.isjifen ? "1" : "0";
      let adds = this.data.adds;
      if(this.data.isKJ){
        // var data = { province: adds.provinceName, city: adds.cityName, area: adds.countyName, address: adds.detailInfo, mobile: adds.telNumber, name: adds.userName,bz: bz, real_name: real_name, card_number: card_number,isKJ:1};
        var data = { bz: bz, real_name: real_name, card_number: card_number, isKJ: 1}
      }else{
        // let coupon_id = JSON.stringify(this.data.data.u_yhq) == '[]' ? 0 : [this.data.select].coupon_id;//优惠券
        let coupon_id = this.data.coupon_id
        var data = { province: adds.provinceName, city: adds.cityName, area: adds.countyName, address: adds.detailInfo, mobile: adds.telNumber, flag: flag, name: adds.userName, fp_status: fp_status, fp_name: fp_name, fp_gs_name: fp_gs_name, fp_sh: fp_sh, bz: bz, real_name: real_name, card_number: card_number, image_1: this.data.cardImg1, image_2: this.data.cardImg2, coupon_id: coupon_id, isKJ: 0,fp_companyAddress:fp_companyAddress,fp_telephone:fp_telephone,fp_bankName:fp_bankName,fp_bankAccount:fp_bankAccount};
      }
      let link = { method: 'pay', canshu: '' };
      let logic = (ret) => {
      	if (ret.ret == 1003) {
		      wx.redirectTo({
			      url: '../paySuccess/index',
		      })
	      } else {
		      api.wxPay(ret);
	      }
      }
      api.post(this, link, data, logic);
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options && !!options.kj_uid){
      let link = { method: 'kj_order', canshu: '&id=' + options.kj_uid };
      let logic = (ret) => {
        console.log(ret)
        var data = ret;
        var adds = {};
        data.yfPay = (Number(data.all_goods_price) + Number(data.kd_fei) + Number(data.shui_fei)) / 100;
        data.total = (Number(data.all_goods_price) + Number(data.kd_fei) + Number(data.shui_fei)) / 100;
        var address = ret.address;
        if (ret.address && JSON.stringify(ret.address) != '[]') {
          adds.provinceName = address.province;
          adds.cityName = address.city;
          adds.countyName = address.area;
          adds.detailInfo = address.address;
          adds.userName = address.name;
          adds.telNumber = address.mobile;
          var getAddress = true
        } else {
          this.setData({
            isAddsNull: true
          })
          var getAddress = false
        }
        this.setData({
          data: data,
          adds: adds,
          list: ret.list,
          isKJ:true,
          getAddress: getAddress
        })
      }
      api.post(this, link, {}, logic);
      // this.getSetting();
    }else{
      let link = { method: 'order', canshu: '' };
      let logic = (ret) => {
        console.log(66,ret)


        var data = ret;
        console.log(7777, data.jf_status)
        var adds = {};
        data.yfPay = (Number(data.all_goods_price) + Number(data.kd_fei) + Number(data.shui_fei)) / 100;
        data.total = (Number(data.all_goods_price) + Number(data.kd_fei) + Number(data.shui_fei)) / 100;
        var address = ret.address;
        if (ret.address && JSON.stringify(ret.address) != '[]') {
          adds.provinceName = address.province;
          adds.cityName = address.city;
          adds.countyName = address.area;
          adds.detailInfo = address.address;
          adds.userName = address.name;
          adds.telNumber = address.mobile;
        } else {
          this.setData({
            isAddsNull: true
          })
        }
        this.setData({
          jf_status: data.jf_status,
          yhq_status: data.yhq_status
        })
        var idxText = JSON.stringify(data.u_yhq) == '[]'?0:data.u_yhq[0];
        if (idxText != 0) {
          var yqxText = '不使用优惠券';
        } else {
          var yqxText = '暂无优惠券';
        }

        this.setData({
          yqxText: yqxText,
          isYHQ: false
        })
        this.setData({
          data: data,
          adds: adds,
          list: ret.list,
          isKJ:false,
          selectAddsTap:'selectAddsTap'
        })
      }
      api.post(this, link, {}, logic);
      this.getSetting();
    }
  },

  getSetting:function(){
    wx.getSetting({
      success: (res) => {
      	console.log('getSetting', res)
        if (res.authSetting['scope.address']) {
          this.setData({
            getAddress: true
          })
        } else {
          this.setData({
            getAddress: false
          })
        }
        if (res.authSetting['scope.invoiceTitle']) {
          this.setData({
            isfp: true
          })
        } else {
          this.setData({
            isfp: false
          })
        }
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
