//app.js
App({
    onLaunch: function () {
        // 展示本地存储能力
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)

        // 登录
        let self = this;
        wx.login({
            success: res => {
                wx.request({
                    url: self.globalData.ajaxSrc+'get_weixin',
                    data: {
                        code: res.code
                    },
                    header: {
                        'content-type': 'json'
                    },
                    success: function (res) {
                        self.globalData.userOpenID = res.data.openid;
                        // 查看是否授权
                        wx.getSetting({
                            success: function(res){
                                console.log(res);
                                if (res.authSetting['scope.userInfo']) {
                                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                                    wx.getUserInfo({
                                        success: function(res) {
                                            self.globalData.userInfo = res.userInfo;

                                            if (self.userInfoReadyCallback) {
                                                self.userInfoReadyCallback(res)
                                            }

                                            wx.request({
                                                url:self.globalData.ajaxSrc+'wxuser_add',
                                                data:{
                                                    openid:self.globalData.userOpenID,
                                                    country:res.userInfo.country,
                                                    province:res.userInfo.province,
                                                    city:res.userInfo.city,
                                                    gender:res.userInfo.gender,
                                                    nickName:res.userInfo.nickName,
                                                    avatarUrl:res.userInfo.avatarUrl
                                                },
                                                header: {
                                                    'content-type': 'json'
                                                },
                                                success:res=>{
                                                    console.log('add user success!');
                                                }
                                            })
                                        },
                                        fail(err){
                                            wx.navigateTo({
                                                url: '/pages/index/index?result=auth'
                                            })
                                        }
                                    })
                                }else{
                                    console.log('1')
                                    wx.navigateTo({
                                        url: '/pages/index/index?result=auth'
                                    })
                                }
                            }
                        })
                    }
                })
            }
        });
    },
    globalData: {
        userInfo: null,
        ajaxSrc:'http://hair.pc-online.cc/mobile/applet/',
        imgSrc:'http://hair.pc-online.cc/upload/',
        storeId:1,
        selectDate:'',
        selectTime:'',
        gid:0,
        one_id:0,
        two_id:0,
        three_id:0,
        buyerInfo:{
            name:'',
            mobile:'',
            sex:''
        }
    }
});

/*
 * 公众号
 hair@designbyho.com
 hohodiaozhale1

 小程序
 hair2@designbyho.com
 Hahadiaozhale1
 * */