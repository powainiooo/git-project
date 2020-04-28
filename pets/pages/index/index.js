//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        motto: 'Hello World',
        userInfo: {},
        hasUserInfo: false,
        showBlur:false,
        headerSize:'large',
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        pageData:{},
        imgSrc:app.globalData.imgSrc,
        result:''
    },
    onLoad: function (option) {
        let result = option.result || 'index';
        this.setData({
            result:result
        });
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse){
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        }
        this.getData();
    },
    getData(){
        wx.request({
            url:app.globalData.ajaxSrc+"notice",
            success:res=>{
                this.setData({
                    pageData:res.data.data
                });
                app.globalData.ruleContent = res.data.data.rule;
            }
        })
    },
    getUserInfo: function(e) {
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
        wx.request({
            url: app.globalData.ajaxSrc + '/wxuser_add',
            data: {
                openid: app.globalData.userOpenID,
                country: e.detail.userInfo.country,
                province: e.detail.userInfo.province,
                city: e.detail.userInfo.city,
                gender: e.detail.userInfo.gender,
                nickName: e.detail.userInfo.nickName,
                avatarUrl: e.detail.userInfo.avatarUrl
            },
            success: res => {
                let url = '/pages/index/index';
                wx.reLaunch({
                    url: url
                })
            },
            fail(){
                wx.navigateTo({
                    url: '/pages/error/error'
                })
            }
        })
    },
    //模糊效果
    doBlur(){
        this.setData({
            showBlur:true
        })
    },
    //模糊效果
    hideBlur(){
        this.setData({
            showBlur:false
        })
    },
    //预约
    doOrder(){
        wx.navigateTo({
            url: '/pages/requires/requires'
        })
    },
    doScroll(e){
        let st = e.detail.scrollTop;
        this.setData({
            headerSize:st > 100 ? 'normal' : 'large'
        })
    }
});
