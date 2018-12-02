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
                        self.getPerson();
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
        userOpenID:'',
        userInfo: null,
        ajaxSrc:'http://hair.pc-online.cc/mobile/applet/',
        imgSrc:'http://hair.pc-online.cc/upload/',
        orderNum:'T2018112414571003',
        store:{
            address:"深圳市福田区购物广场6号wh",
            cover:"11/2018/1107/1541578800089.jpg",
            ctime:"1541574117",
            id:"1",
            latitude:"25.1354",
            longitude:"122.465656",
            status:"1",
            title:"福田COCO park 店s",
            url:"https://www.baidu.com/aaa"
        },
        selectDate:'2018-11-21',
        selectTime:'10:00',
        selectWeek:'周四',
        proPackage:{"id":"-1","recom":"0","english_name":"Hair® Basic package","china_name":"Hair® 基础套餐","apply":"中性至敏感性、干燥发质","price":"0.01","pro_one":{"id":"3","english_name":"Aesop® Calming shampoo","china_name":"伊索 舒缓洗发露","apply":"中性至敏感性、干燥发质","intro":"洋甘菊花和茴香果的舒缓配方加入鼠尾草叶，有效温和的洁净头发和头皮。","type":"1","price":"30.00","cover":"11/2018/1119/1542622302211.png","cover_two":"11/2018/1119/1542622310773.png","share_logo":"11/2018/1119/1542622294120.png","status":"1","ctime":"1542622391"},"pro_two":{"id":"2","english_name":"Aesop® Rose Hair & Scalp Moisturising Masque","china_name":"伊索 玫瑰滋润护发膜","apply":"中性至敏感性、干燥发质","intro":"深入润发护理有助头发恢复细软，带来活力光泽，同时舒缓干燥及有屑头皮。","type":"2","price":"30.00","cover":"11/2018/1119/1542621245385.png","cover_two":"11/2018/1119/1542621203801.png","share_logo":"11/2018/1119/1542621226629.png","status":"1","ctime":"1542621310"},"pro_three":{"id":"4","english_name":"Aesop® Parsley Seed Anti -Oxidant Serum","china_name":"伊索 香芹籽抗氧化精华","apply":"中性至敏感性、干燥发质","intro":"轻盈配方有效抗氧化剂软化皮肤，并蕴含具舒缓作用的芦荟，保湿头皮。","type":"3","price":"20.00","cover":"11/2018/1119/1542622530181.png","cover_two":"11/2018/1119/1542622537708.png","share_logo":"11/2018/1119/1542622533178.png","status":"1","ctime":"1542622762"},"ctime":"1542622824"},
        proClean:{"id":"-1","english_name":"Aesop® Calming shampoo","china_name":"伊索 舒缓洗发露","apply":"中性至敏感性、干燥发质","intro":"洋甘菊花和茴香果的舒缓配方加入鼠尾草叶，有效温和的洁净头发和头皮。","type":"1","price":"30.00","cover":"11/2018/1119/1542622302211.png","cover_two":"11/2018/1119/1542622310773.png","share_logo":"11/2018/1119/1542622294120.png","status":"1","ctime":"1542622391"},
        proConditioner:{"id":"-1","english_name":"Aesop® Rose Hair & Scalp Moisturising Masque","china_name":"伊索 玫瑰滋润护发膜","apply":"中性至敏感性、干燥发质","intro":"深入润发护理有助头发恢复细软，带来活力光泽，同时舒缓干燥及有屑头皮。","type":"2","price":"30.00","cover":"11/2018/1119/1542621245385.png","cover_two":"11/2018/1119/1542621203801.png","share_logo":"11/2018/1119/1542621226629.png","status":"1","ctime":"1542621310"},
        proTreatment:{"id":"-1","english_name":"Aesop® Parsley Seed Anti -Oxidant Serum","china_name":"伊索 香芹籽抗氧化精华","apply":"中性至敏感性、干燥发质","intro":"轻盈配方有效抗氧化剂软化皮肤，并蕴含具舒缓作用的芦荟，保湿头皮。","type":"3","price":"20.00","cover":"11/2018/1119/1542622530181.png","cover_two":"11/2018/1119/1542622537708.png","share_logo":"11/2018/1119/1542622533178.png","status":"1","ctime":"1542622762"},
        buyerInfo:{
            name:'',
            mobile:'',
            sex:''
        },
        personalPackage:{}
    },
    getPerson(){
        wx.request({
            url: this.globalData.ajaxSrc+'person_group',
            data: {openid:this.globalData.userOpenID},
            success:res=>{
                this.globalData.personalPackage = res.data.data;
            }
        })
    }
});

/*
 * 公众号
 hair@designbyho.com
 hohodiaozhale1

 小程序
 hair2@designbyho.com
 Hahadiaozhale1

 http://hair.pc-online.cc/main/manage
 hairadmin
 123456
 * */