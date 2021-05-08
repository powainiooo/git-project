// pages/my/index.js
const api = require('../../utils/api.js');
//获取应用实例
const app = getApp();
var www = app.globalData.www;
var imgUrl = app.globalData.url;
var canIUseGetUserProfile=app.globalData.canIUseGetUserProfile;
Page({

  /**
   * 页面的初始数据
   */
  data: {
	  www,
	  imgUrl,
    data:{},
    spellList:[],
    isShowAll:false,
	  showContact: false, // 是否显示联系客服弹窗
	  showCompany: false, // 是否显示代购店铺弹窗
	  lxinfo:{},//客服信息,
	  setting:{},//客服信息,
	  companyList: [],
	  lastCompanyList: [],
    code: '',
    phone: '',
    session_key: '',
    canIUseGetUserProfile: canIUseGetUserProfile,
  },

  getUserTap: function (e) {
    var that = this;
    api.getUser(that);
  },
  getUserProfile:function(e){
    console.log(1);
    var that = this;
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res);
        var UserInfo = res.userInfo;
        
        that.saveuserinfo(UserInfo)
      }
    })
  },
  saveuserinfo:function(UserInfo){
    console.log(123,UserInfo);
    var that = this;
    //api.getUser(that);
    api.reqUser(UserInfo, that,1);
  },

  // 语言切换
  SwitchLag: function (e) {
    var Lag = e.currentTarget.dataset.lag;
    /*this.setData({
      isCN: Lag
    });*/
    wx.setStorageSync('isCN', 1);
    //wx.setStorageSync('isCN', Lag);
    wx.reLaunch({
      url: '/pages/my/index'
    })
  },
  // 我参与的拼单列表倒计时
  setSpellTime: function(e) {
      let that = this
      this.data[e].forEach((item, index) => {
          var newTime = parseInt(item.remain_time)
          if (newTime <= 0) {
              return;
          }
          newTime--
          let formatSpellTime = that.getFormat(newTime);
          let arr = that.data[e]
          let list = e
          arr[index].remain_time = newTime
          arr[index].lastTime = formatSpellTime
          that.setData({
              [list]: arr
          })
      })
      setTimeout(() => this.setSpellTime(e), 1000);
  },

  showAll: function(){
      this.setData({
          isShowAll: !this.data.isShowAll
      })
  },
  /**
   * 格式化时间
   */
  getFormat: function(leftTime) {
      var leftSecond = parseInt(leftTime);
      var Day = Math.floor(leftSecond / (60 * 60 * 24)); //天数
      var Hour = Math.floor((leftSecond - Day * 24 * 60 * 60) / 3600); //小时
      var Minute = Math.floor((leftSecond - Day * 24 * 60 * 60 - Hour * 3600) / 60); //分钟
      var Second = Math.floor(leftSecond - Day * 24 * 60 * 60 - Hour * 3600 - Minute * 60); //秒数
      if (Hour >= 0 && Minute >= 0 && Second >= 0) {
          var dd = Day < 10 ? '0' + Day : Day
          var hh = Hour < 10 ? '0' + Hour : Hour
          var mm = Minute < 10 ? '0' + Minute : Minute
          var ss = Second < 10 ? '0' + Second : Second
          return hh+':'+mm+':'+ss;
      }else{
          return '00:00:00';
      }
  },

  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function () {
  },

	// 打开客服
	openContact () {
		this.setData({
			showContact: true
		})
	},
	// 关闭客服
	closeContact () {
		this.setData({
			showContact: false
		})
	},
	// 打开代购店铺
	openCompany () {
		this.setData({
			showCompany: true
		})
	},
	// 关闭代购店铺
	changeStore (e) {
		const { mid } = e.currentTarget.dataset
		app.setMid(mid)
		wx.redirectTo({
			url: '/pages/index/index'
		})
	},
  /**
   * 弹窗取消按钮点击事件
   */
  onCancel: function () {
    this.hideModal();
  },
  /**
   * 弹窗确认按钮点击事件
   */
  onConfirm: function () {
    let phone = this.data.phone || this.data.data.phone
    let link = { method: 'bind_yhq', canshu: '?mid=7&code=' + this.data.code + '&phone=' + phone };
    let huidiao = (ret) => {
      if (ret.ret == 0){
        wx.navigateTo({
          url: '../myCoupon/index',
        })
        this.hideModal();
      }else{
        wx.showToast({
          title: ret.msg,
          icon: 'none',
          duration: 2000
        })
      }
    }
    api.post(this,link,{},huidiao)
  },
  getUser(){
    if (this.data.data.phone) return
    app.getLogin()
  },

  inputChange(code) {
    this.setData({
      code: code.detail.value
    })
  },

  getPhoneNumber: function(e){
     //用户取消手机授权直接返回
    if (e.detail.iv == undefined && e.detail.encryptedData == undefined) {
      return;
    }
    let session_key = wx.getStorageSync("session_key");
    e.detail.iv = e.detail.iv.replace(/\+/g,'%2B')
    e.detail.encryptedData = e.detail.encryptedData.replace(/\+/g,'%2B')
    session_key = session_key.replace(/\+/g,'%2B')
    let link = { method: 'get_phone', canshu: '&mid=7&iv=' + e.detail.iv + '&encryptedData=' + e.detail.encryptedData + '&session_key=' + session_key};
    let huidiao = (ret) => {
      if (ret.ret == 0) {
        this.setData({
          phone: ret.phone
        })
      } else {
        wx.showToast({
          title: ret.msg,
          icon: 'none',
          duration: 2000
        })
      }
    }
    api.post(this,link, {} , huidiao)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(this.data.canIUseGetUserProfile)
    if (wx.getUserProfile) {
      console.log("可以使用")
      this.setData({
        canIUseGetUserProfile: true
      })
    }
    console.log(this.data.canIUseGetUserProfile)
    let link = { method: 'my_index', canshu: '' };
    let logic = (ret) => {
      this.setData({
        data: ret,
	      lxinfo: ret.lxinfo,
	      setting: ret.setting
      })
    }
    api.post(this, link, {}, logic);
    this.getCompany()
  },
	getCompany () {
		const link = { method: 'more_company', canshu:''};
		api.post(this, link, {}, (res) => {
			console.log('res', res)
			this.setData({
				companyList: res.all_mid,
				lastCompanyList: res.last_mid
			})
		});
	},
	phoneCall () {
  	   wx.makePhoneCall({
	      phoneNumber: this.data.setting.phone
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
    if (wx.getStorageSync('userInfo')) {
      this.setData({
        hasLogin: 1
      })
    } else {
      this.setData({
        hasLogin: 0
      })
    }
    let www = { method: 'cart_nums', canshu: '' };
    let huidiao = (ret) => {
      this.setData({
        nums: ret.nums,
        isCN: wx.getStorageSync('isCN')
      })
    }
    // api.post(this, www, {}, huidiao);

  },
  loginTap: function () {
    if (wx.getStorageSync('userInfo') == '') {
      this.setData({
        isShowGetUser: true
      })
    } else {
      this.setData({
        isShowGetUser: false
      })
    }
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
