// pages/myOrder/index.js
const appRequest = getApp().request;
const urlPath = getApp().globalData.www;
const imgUrl = getApp().globalData.url;
const api = require('../../utils/api.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        urlPath: urlPath,
        imgUrl: imgUrl,
        navIndex: 0,
        page: 1, //当前选中的数据的页数
        ajaxBool: false, //是否加载完成
        list: [], //当前选中的数据
        isCN: tt.getStorageSync('isCN') ? 1 : 0,
        title:'',
        listAll: { // 存储对应的数据
            21: {
                list: [],
                page: 1,
                ajaxBool: false
            },
            0: {
                list: [],
                page: 1,
                ajaxBool: false,
            },
            1: {
                list: [],
                page: 1,
                ajaxBool: false,
            },
            4: {
                list: [],
                page: 1,
                ajaxBool: false,
            },
            5: {
                list: [],
                page: 1,
                ajaxBool: false,
            },
            7: {
                list: [],
                page: 1,
                ajaxBool: false,
            },
        },
        fukuanBool: true,
        status: {
            1: '待付款',
            2: '退款申请中',
            3: '已退款',
            4: '待发货',
            5: '待确认收货',
            6: '已取消',
            7: '已完成',
            8: '申请换货',
            9: '已换货',
            10: '已退货',
            11: '退款申请驳回',
            12: '退货申请中',
            13: '退货申请驳回',
            14: '换货申请被驳回',
            15: '已删除',
            21: '待分享',
        },
    },
    //导航切换
    bindnav: function(e) {
        var num = e.currentTarget.dataset.num;
        var listAll = this.data.listAll;
        this.setData({
            navIndex: num,
            list: [],
            page: 1,
            ajaxBool: false
        })
        this.ajaxList()
    },
    //加载数据
    ajaxList: function() {
        /*if(this.data.ajaxBool) {
          tt.showToast({
            title: '已加载完数据',
            icon: 'none',
          })
        }*/
        var url = urlPath + 'api/hwsc/order_list'
        var page = this.data.page;
        var index = this.data.navIndex;
        var param = {
            page: page,
            status: index,
            isCN: tt.getStorageSync('isCN')
        }
        appRequest({
            url: url,
            data: param,
            success: res => {
                tt.hideLoading()
                var _list = res.data.data.list;
                var listAll = this.data.listAll;
                var bool = false;
                if (_list.length == 0) {
                    bool = true;
                    return false;
                }
                if (_list.length < 10) {
                    bool = true;
                }
                listAll[index].list = listAll[index].list.concat(_list);
                listAll[index].page = page + 1;
                listAll[index].ajaxBool = bool;
                this.setData({
                    listAll: listAll,
                    list: this.data.list.concat(_list),
                    page: page + 1,
                    ajaxBool: bool,
                    isCN: tt.getStorageSync('isCN')
                })
            },
        }, this.ajaxList)
        if (index == 21) {
            this.setSpellTime('list')
        }
    },

    //申请退款
    shenqingtuikuanTap: function(e) {
        var id = e.currentTarget.dataset.id;
        tt.showModal({
            title: '提示',
            content: '是否申请退款？',
            success: res => {
                if (res.confirm) {
                    tt.showLoading({
                        title: '正在申请退款',
                    })
                    var url = urlPath + 'api/hwsc/apply_tk'
                    appRequest({
                        url: url,
                        data: { id: id },
                        success: res => {
                            tt.showToast({
                                title: '申请退款成功',
                                icon: 'success'
                            })
                            this.setData({
                                navIndex: this.data.navIndex,
                                list: [],
                                page: 1,
                                ajaxBool: false,
                                fukuanBool: true
                            })
                            this.ajaxList()
                        },
                    })
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    },

    //取消订单
    bindCancel: function(e) {
        var id = e.currentTarget.dataset.id;
        tt.showModal({
            title: '提示',
            content: '是否取消订单？',
            success: res => {
                if (res.confirm) {
                    tt.showLoading({
                        title: '正在取消',
                    })
                    var url = urlPath + 'api/hwsc/order_cancle'
                    appRequest({
                        url: url,
                        data: { id: id },
                        success: res => {
                            tt.showToast({
                                title: '取消成功',
                                icon: 'success'
                            })
                            this.setData({
                                navIndex: this.data.navIndex,
                                list: [],
                                page: 1,
                                ajaxBool: false,
                                fukuanBool: true
                            })
                            this.ajaxList()
                        },
                    })
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    },
    // 支付
    pay: function(data,obj) {
        var that = this;
        tt.requestPayment({
            'timeStamp': data.timeStamp,
            'nonceStr': data.nonceStr,
            'package': data.package,
            'signType': data.signType,
            'paySign': data.paySign,
            'success': (res) => {
                tt.showToast({
                    title: '支付成功',
                    icon: 'success',
                    duration: 1500
                })
                this.setData({
                    navIndex: this.data.navIndex,
                    list: [],
                    page: 1,
                    ajaxBool: false,
                    fukuanBool: true
                })
                if(obj.id && obj.type == 4){
                    tt.redirectTo({
                      url: '../paySuccess/index?id='+obj.id,
                    })
                    return
                }
                this.ajaxList()
                console.log('支付成功', this.data.fukuanBool)
            },
            'fail': (res) => {
                tt.showModal({
                    title: '提示',
                    content: '支付失败，是否重新发起支付？',
                    success: (res) => {
                        if (res.confirm) {
                            //点击了确定，重新发起支付
                            that.pay(data,obj);
                        } else {
                            console.log('支付失败，是否重新发起支付？', this.data.fukuanBool)
                            this.setData({
                                fukuanBool: true
                            })
                        }
                    }
                })
            }
        })
    },
    //付款
    fukuan: function(e) {
        if (!this.data.fukuanBool) return false;
        this.setData({
            fukuanBool: false,
        }, () => {
            var id = e.currentTarget.dataset.oid;
            var obj = {
                id: id,
                type: e.currentTarget.dataset.type
            }
            var url = urlPath + 'api/hwsc/again_pay'
            appRequest({
                url: url,
                data: { id: id },
                success: res => {
                    var data = res.data.data;
                    this.pay(data,obj)
                },
                fail: res => {
                    this.setData({
                        fukuanBool: true
                    })
                }
            })
        })
    },
    //自动取消订单
    autoCancel: function(e) {
        var id = e.detail.id;
        var url = urlPath + 'api/hwsc/order_cancle'
        appRequest({
            url: url,
            data: { id: id },
            success: res => {
                this.setData({
                    navIndex: this.data.navIndex,
                    list: [],
                    page: 1,
                    ajaxBool: false,
                    fukuanBool: true
                })
                this.ajaxList()
            },
        })
    },

    //删除订单
    bindDel: function(e) {
        var id = e.currentTarget.dataset.id;
        tt.showModal({
            title: '提示',
            content: '是否删除订单？',
            success: res => {
                if (res.confirm) {
                    tt.showLoading({
                        title: '正在删除',
                    })
                    var url = urlPath + 'api/hwsc/del_order'
                    appRequest({
                        url: url,
                        data: { id: id },
                        success: res => {
                            tt.showToast({
                                title: '删除成功',
                                icon: 'success'
                            })
                            this.setData({
                                navIndex: this.data.navIndex,
                                list: [],
                                page: 1,
                                ajaxBool: false,
                                fukuanBool: true
                            })
                            this.ajaxList()
                        },
                    })
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })


    },
    //确认收货
    bindConfirm: function(e) {
        var id = e.currentTarget.dataset.id;
        tt.showModal({
            title: '提示',
            content: '是否确认收货？',
            success: res => {
                if (res.confirm) {
                    tt.showLoading({
                        title: '正在确认收货',
                    })
                    var url = urlPath + 'api/hwsc/order_confirm'
                    appRequest({
                        url: url,
                        data: { id: id },
                        success: res => {
                            tt.showToast({
                                title: '确认收货成功',
                                icon: 'success'
                            })
                            this.setData({
                                navIndex: this.data.navIndex,
                                list: [],
                                page: 1,
                                ajaxBool: false,
                                fukuanBool: true
                            })
                            this.ajaxList();
                        },
                    })
                    console.log('用户点击确定')
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })


    },
    // 拼单列表倒计时
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
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        if (options.type == 21){
            this.setData({
                navIndex: 21
            })
        }
        this.ajaxList()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {
        tt.showLoading({
            title: '正在加载',
        })
        this.ajaxList()
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function (res) {
        if (res.from === 'button') {
            //区分按钮分享
            if (res.target.id === "shareBtn") {
                return {
                    title: res.target.dataset.title,
                    imageUrl:res.target.dataset.url,
                    path: '/pages/pintuanShare/index?id=' + res.target.dataset.id,
                }
            }
        }
    }
})
