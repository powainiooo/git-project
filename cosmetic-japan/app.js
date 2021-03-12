//app.js
App({
  onLaunch: function () {
    /*if (!this.getLoginKey()) {
      console.log('app no login');
      this.getLogin();
      return false;
    }*/

    this.globalData.mid = wx.getStorageSync('MID')

    const updateManager = wx.getUpdateManager();
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      if (res.hasUpdate) {
        wx.showModal({
          title: '新版本提示',
          content: '小程序发现新版本，即将更新！',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              updateManager.onUpdateReady(function () {
                wx.showModal({
                  title: '更新提示',
                  content: '新版本更新完成，是否重启应用？',
                  success: function (res) {
                    if (res.confirm) {
                      // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                      updateManager.applyUpdate();
                    }
                  }
                })
              })
            }
          }
        })
      }
    })
  },

  getLoginKey: function() {
    var login_key = this.globalData.login_key;
    if(!login_key) {
      login_key = wx.getStorageSync('key');
      this.globalData.login_key = login_key;
    }
    return login_key;
  },

  // 登录
  getLogin: function (callback = function () {}) {
    var that = this;
    wx.login({
      success: function (res) {
        var code = res.code;
        wx.request({
          url: that.globalData.www + '/wechat/main/login?code=' + code,
          data: { mid: that.globalData.mid},
          dataType: 'json',
          method: 'POST',
          header: {
            "content-type": "application/x-www-form-urlencoded"
          },
          success: function (ret) {
            var data = ret.data;
            if (data.ret == 0) {
              that.globalData.login_key = data.data.login_key;
              wx.setStorageSync("key", data.data.login_key);
              wx.setStorageSync("session_key", data.data.session_key);
              callback();
              console.log('login success');

            } else {
              wx.showToast({
                title: '登录失败！',
                icon: 'loading',
                duration: 1200
              });
              console.log('login failure');
            }
          },
          fail: function (res) {
            console.log(res)
          },
          complete: function (res) {
            wx.hideLoading();
          },
        })
      },
      fail: function (res) {
        console.log(res)
      },
      complete: function (res) {
        wx.hideLoading();
      },
    })
  },

  globalData: {
    // www: 'https://hwscdev.vsapp.cn/',
    // url: 'https://hwscdev.vsapp.cn/upload/',
    www: 'https://dgpt.vsapp.cn',
    url: 'https://dgpt.vsapp.cn',
    login_key:'',
    mid:0
  },
	setMid (mid) {
  	   this.globalData.mid = mid
		wx.setStorageSync("MID", mid);
	},

  request(obj = {}, call = ()=>{}) {
    if (obj.url == undefined || obj.url.trim() == '' ) {
      wx.showToast({
        title: '服务器接口地址为空',
        icon: 'none',
        duration: 2000
      })
      return false;
    }

    obj.success = obj.success || function () { };
    obj.fail = obj.fail || function () { };
    obj.complete = obj.complete || function () { };
    //增加login_key参数
    var urlArr = obj.url.split('?')
    if (urlArr.length > 1) {
      obj.url = urlArr[0] + '?login_key=' + wx.getStorageSync('key') + '&' + urlArr[1]
    } else {
      obj.url = urlArr[0] + '?login_key=' + wx.getStorageSync('key');
    }
    obj.data = obj.data || {}
    obj.data.mid = getApp().globalData.mid;
    wx.request({
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      url: obj.url,
      data: obj.data,
      dataType: obj.dataType || 'json',
      method: obj.method || 'POST',
      success: ret => {
        var data = ret.data;
        if (data.ret == 0) {
          obj.success(ret)
        } else if (data.ret == -1) {
          wx.showToast({
            title: data.msg,
            icon: 'none',
            duration: 2000
          })
          obj.fail(ret)
        } else {
          wx.showToast({
            title: data.msg,
            icon: 'none',
            duration: 2000
          })
        }

      },
      fail: res => {
        obj.fail(res, obj.url)
      },
      complete: res => {
        obj.complete();
      },
    })
  },
	shareCallback () { // 分享时候调用
		var login_key = this.getLoginKey();
		wx.request({
			url: this.globalData.www + '/api/index/add_visit_log/2?login_key=' + login_key,
			method: 'POST',
			header: {
				"content-type": "application/x-www-form-urlencoded"
			},
			success: function (ret) {
				console.log('shareCallback suc', ret)
			},
			fail: function (res) {
				console.log(res)
			}
		})
	}
})
// wx654a6f041b744138 wx86652a69c028edb1
