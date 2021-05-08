// pages/detail/index.js
const api = require('../../utils/api.js');
import common from '../../utils/common'
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
        www: www,
        imgUrl: imgUrl,
        bannerNum: 1,
        Select: false,
        Canshu: false,
        ScHb: false, //海报显示&&隐藏
        // defa: false,
        yixuan: [], //选择的规格的名称
        attrid: [], //选择的规格id
        ids: [], //选择的规格下标
        returnData: {},
        hbImg: null,
        sl: 1,
        nums: 0,
        isShowPt: false, //是否显示拼团弹窗
        isShowToPt: false, //是否显示去拼单弹窗
	    showContact: false, //是否显示联系客服弹窗
        selectIndex: '',//参与别人拼单的下标
        joinUserList:[],//参与者数组
	    lxinfo:{},//客服信息
        options: {},
        slideBox: 0,
        videoBox: 1,
        spellList: [],
        spellOption: {
            vertical: true, // 是否纵向滑动
            interval: 4000, // 多久滑动一次
            autoPlay: true, // 是否自动滑动
            duration: 500, // 滑动时长
            circular: true // 滑动衔接
        },
        spellListMove: [],
        currentIndex: 0,
        spellSelect: false, // 是否发起拼团
        gbc_id:'',
        _gbc_id:'',//对gbc_id做暂存
        jf_status:'0',
        yhq_status:'0',
	    score:0,
	    rate:0,
	    bgList:[],
        fxs_id: '',
        can_submit:true,
        canIUseGetUserProfile:canIUseGetUserProfile
    },

    bannerTap: function(e) {
        var curImg = e.currentTarget.dataset.src;
        var banner = [];
        for (let i = 0; i < this.data.goods_info.banner.length; i++) {
            banner[i] = this.data.imgUrl + this.data.goods_info.banner[i];
        }
        wx.previewImage({
            current: curImg, // 当前显示图片的http链接
            urls: banner // 需要预览的图片http链接列表
        })
    },

    getUserTap: function(e) {
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

    maskTap: function() {
        this.setData({
            Select: false,
            Canshu: false
        })
    },

    //显示或关闭拼团列表弹窗
    PtDialogTap:function(e){
        this.setData({
          isShowPt: e.target.dataset.status == 'show'?true:false
        })
    },

    //关闭去拼单弹窗
    closeToPtDialogTap:function(){
        this.setData({
            selectIndex:'',
            isShowPt:false,
            isShowToPt: false
        })
    },

    // 生成海报
    shengchengTap: function() {
    	wx.showLoading({
	      title: '正在生成中'
      })
        var attrid = this.data.attrid;
        var attr = '|' + attrid.join('|') + '|';
        console.log(attr);
        let link = { method: 'creat_hb', canshu: '' };
        let data = { id: this.data.goods_info.id, attr: attr };
        let logic = (ret) => {
            this.setData({
                hbImg: ret,
                ScHb: true
            })
				wx.hideLoading()
            wx.downloadFile({
                url: www + ret, //仅为示例，并非真实的资源
                success: function(res) {
                    wx.saveImageToPhotosAlbum({
                        filePath: res.tempFilePath,
                        success(res) {
                            wx.showToast({
                                title: '保存成功！',
                                icon: 'success',
                                duration: 1000
                            })
                        }
                    })
                }
            })
        }
        api.post(this, link, data, logic);
    },

    // 关闭海报弹窗
    ScHbXTap: function() {
        this.setData({
            ScHb: false
        })
    },

    //阻止冒泡
    handleTap2: function() {},

    // 滚动数
    sourceChange: function(e) {
        var current = e.detail.current;
        this.setData({
            bannerNum: current + 1
        })
    },

    playTap: function(e) {
        this.setData({
            slideBox: 1,
            videoBox: 0
        });
        var videoContext = wx.createVideoContext('goodsVideo');
        videoContext.play();
    },

    videoPause: function() {
        this.setData({
            slideBox: 0,
            videoBox: 1
        });
    },

    videoEnded: function() {
        this.setData({
            slideBox: 0,
            videoBox: 1
        });
    },

    //加入购物车
    addCartTap: function() {
      if (wx.getStorageSync('userInfo') == '') {
        this.setData({
          isShowGetUser: true,
        })
        return false;
      } else {
        this.setData({
          isShowGetUser: false
        })
      }
        if (JSON.stringify(this.data.yixuan) == '[]') {
            common.showToast('请选择产品规格!')
            return false
        }
        this.addcar();
        this.setData({
            Select: false
        })
    },

    //加入购物车方法
    addcar: function() {
        let idx = this.data.idx;
        let goods_info = this.data.goods_info;
        let attrid = this.data.attrid;
        let attr = attrid.join('|');
        let sl = this.data.sl;
        let link = { method: 'cart_add', canshu: '' };
        let data = { id: goods_info.id, attr_id: attr, buy_num: sl };
        let logic = (ret) => {
            wx.showToast({
                title: '加入购物车成功',
                icon: 'none'
            })
            this.setData({
                nums: Number(this.data.nums) + 1
            })
        }
        api.post(this, link, data, logic);
    },

    // 立即购买
    ljShop: function() {


        if (wx.getStorageSync('userInfo') == '') {
          this.setData({
            isShowGetUser: true,
          })
          return false;
        } else {
          this.setData({
            isShowGetUser: false
          })
        }
        if (JSON.stringify(this.data.yixuan) == '[]') {
            common.showToast('请选择产品规格!')
            return false
        }

        if(this.data.can_submit==false){
            return;
        }
        this.setData({
            can_submit: false,
          })

        let idx = this.data.idx;
        let goods_info = this.data.goods_info;
        let attrid = this.data.attrid;
        var attr = '|' + attrid.join('|') + '|';
        let sl = this.data.sl;
        let link = this.data.spellSelect ? { method: 'create_groupbuy', canshu: '' } : { method: 'cache_order', canshu: '' };
        var options = this.data.options
        var activity_type = options.activity_type
        var id = goods_info.id
        let data = { id: id, type: 1, attr: attr, buy_num: sl, activity_type: activity_type, hd_id: options.hd_id };
        let logic = (ret) => {
            wx.navigateTo({
                url: '../orderAccount/index',
            })
        }
        if (this.data.spellSelect) {
            // 发起拼单
            delete data.type
            delete data.id
            delete data.activity_type
        }
        //参与别人的拼单
        if (this.data.selectIndex !== '') {
            link = { method: 'join_groupbuy', canshu: '' };
            data.gbc_id = this.data.spellListMove[this.data.selectIndex].gbc_id;
        }
        //通过分享进入参与别人的拼单
        if (this.data.gbc_id !== '') {
            link = { method: 'join_groupbuy', canshu: '' };
            data.gbc_id = this.data.gbc_id;
        }
        api.post(this, link, data, logic);
    },

    //关闭选择
    isCloseTap: function() {
        this.setData({
            Select: false,
            Canshu: false,
            selectIndex: '',
            gbc_id:''
        })
    },

    // 选择规格
    SelcetTap: function(e) {
        this.setData({
            isShowToPt:false,
            Select: true,
            spellSelect: e.currentTarget.dataset.spell?true:false,
            gbc_id:!!this.data._gbc_id?this.data._gbc_id:''
        })
    },

    // 查看参数
    CanshuTap: function() {
        this.setData({
            Canshu: true
        })
    },

    //数量加减
    slTap: function(e) {
        console.log(e)
        var t = e.currentTarget.dataset.t;
        if (t == 0) {
            if (this.data.sl > 1) {
                this.setData({
                    sl: this.data.sl - 1
                })
            }
        } else {
            this.setData({
                sl: this.data.sl + 1
            })
        }
    },

    //规格选择
    selectGGTap: function(e) {
        var index = e.currentTarget.dataset.index;
        var idx = e.currentTarget.dataset.idx;
        var ids = this.data.ids;
        var all_attrs = this.data.all_attrs;
        if (all_attrs[index].sub[idx].bool == 0) {
            return false;
        }
        ids[index] = idx;
        var yixuan = this.data.yixuan;
        var attrid = this.data.attrid;
	    if (JSON.stringify(yixuan) == '[]') {
		    yixuan.push(all_attrs[index].sub[idx].name);
		    attrid.push(all_attrs[index].sub[idx].id);
	    } else {
		    yixuan[index] = all_attrs[index].sub[idx].name;
		    attrid[index] = all_attrs[index].sub[idx].id;
	    }
        // 请求接口，返回选择规格参数
        var attr = '|' + attrid.join('|') + '|';
        let link = { method: 'get_kucun_info', canshu: '' };
        let data = { id: this.data.goods_info.id, attr: attr };
        let logic = (ret) => {
            // console.log(ret)
	        ret.price = Number(ret.price) / 100
            this.setData({
                returnData: ret,
            })
        }
        api.post(this, link, data, logic);

        this.setData({
            ids: ids,
            sl: 1,
            yixuan: yixuan
        })
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

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log(11,options);
	    if (options.mid) {
		    app.setMid(options.mid)
	    }
	    if (options.fxs_id && options.mid) {
		    app.setFxsId(options.fxs_id,options.mid)
	    }
        console.log(11, options)
        if (!app.getLoginKey()) {
            console.log('detail page no login');
            app.getLogin(
                () => {
                    this.getdata(options)
                }
            );
            return;
        }else{
            this.getdata(options)
        }

    },
    getdata(options){
        console.log('options',options);
	    // options.id = '220'
        if (!!options && !!options.id) {
            if (options.activity_type) {
                var activity_type = options.activity_type
                var hd_id = options.hd_id
            } else {
                var activity_type = 0
                var hd_id = 0
                options.activity_type = 0
                options.hd_id = 0
            }
            if(options.fxs_id && options.mid){
                app.setFxsId(options.fxs_id,options.mid)
            }
            let link = { method: 'goods_detail', canshu: '&id=' + options.id + '&activity_type=' + activity_type + '&hd_id=' + hd_id, };
            let logic = (ret) => {

              console.log('bbbbbb');
                //console.log(ret)
                if (wx.getStorageSync('isCN')) {
                    var goods_desc = ret.goods_info.goods_desc;
                } else {
                  var goods_desc = ret.goods_info.goods_desc;
                }
                var newContent = goods_desc.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi, (match, capture) => {
                    var url = this.data.www;
                    var newStr = '<img src="' + url + capture + '" style="width:100%;height:auto"/>';
                    return newStr;
                });
                var goods_info = ret.goods_info;
                var banner = goods_info.goods_img.split("|").reduce((x, y) => {
                    return y !== '' ? x.concat(y) : x;
                }, [])
                goods_info.banner = banner;
                var ids = [];
                let dfIds = ret.default_gz.attr
	            dfIds = dfIds.substr(1, dfIds.length - 2)
                var attrid = dfIds.split('|');
                console.log('ids',attrid);
                var returnData = {};
                returnData.price = ret.default_gz.price / 100;
                returnData.price_kd = goods_info.price_kd;
                returnData.cover = goods_info.cover;
                returnData.ms_price = goods_info.hd_price
                returnData.xsg_price = goods_info.hd_price
                returnData.price_shui = ret.default_gz.price_shui
	            returnData.num = ret.default_gz.num;
                this.setData({
                    returnData: returnData,
                    all_attrs: ret.all_attrs,
                    goods_info: goods_info,
                    goods_desc: newContent,
                    yhq: ret.can_lqyhq,
                    yixuan: ret.default_gz.attr_name.split('+'),
                    attrid: attrid,
                    ids: attrid,
	                lxinfo: ret.lxinfo,
                    isCN: wx.getStorageSync('isCN'),
                    options: options,
                    fxs_id: ret.fxs_id,
                  bgList: ret.goods_info.bq_list,
	                score: ret.ave_pf,
	                rate: ret.praise_rate,
	                nums: ret.cart_nums
                })
                if (options.activity_type == 2) {
                    var start_time = this.timestampToTime(parseInt(goods_info.start_time))
                    var end_time = this.timestampToTime(parseInt(goods_info.end_time))
                    this.setData({
                        'goods_info.start_time': start_time,
                        'goods_info.end_time': end_time
                    })
                }

                if (options.activity_type == 1) {
                    this.setCountDown() //秒杀时间倒计时
                }
                if (options.activity_type == 4) {
                    // this.setCountDown() //拼单时间倒计时
                    this.setSpellTime(this.data.goods_info.groupbuy_remain_time)
                }
            }
            api.post(this, link, {}, logic);

            //分享拼单，参与别人拼团进入
            if (options.type && options.type=="fromShare") {
                this.setData({
                    fromType:'share',
                    gbc_id:options.gbc_id,
                    _gbc_id:options.gbc_id,//暂存gbc_id
                    nickname:options.nickname
                });
            }
        }
    },
    timestampToTime: function(timestamp) {
        var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var D = this.change(date.getDate()) + ' ';
        var h = this.change(date.getHours()) + ':';
        var m = this.change(date.getMinutes()) + ':';
        var s = this.change(date.getSeconds());
        // return Y + M + D + h + m + s;
        return Y + M + D
    },
    change: function(t) {
        if (t < 10) {
            return "0" + t;
        } else {
            return t;
        }
    },
    setCountDown: function() {
        let that = this
        let time = 1000
        var remain_time = that.data.goods_info.end_time
        var getTime = Date.parse(new Date()) //当前时间戳
            // console.log(remain_time, getTime)
        var newTime = parseInt(remain_time) - getTime / 1000
            // console.log(newTime)
        if (newTime <= 1) {
            var dd = `00`
            var hh = `00`
            var mm = `00`
            var ss = `00`
            return;
        }
        let formatTime = that.getFormat(newTime);
        // console.log(formatTime)
        // v.time -= time;
        var dd = `${formatTime.dd}`
        var hh = `${formatTime.hh}`
        var mm = `${formatTime.mm}`
        var ss = `${formatTime.ss}`
        that.setData({
            'goods_info.dd': dd,
            'goods_info.hh': hh,
            'goods_info.mm': mm,
            'goods_info.ss': ss
        })
        setTimeout(this.setCountDown, time);
    },
    // 拼单活动结束时间倒计时
    setSpellTime: function(e) {
        let that = this
        var newTime = parseInt(e)
        if (newTime <= 0) {
            return;
        }
        newTime--
        let formatSpellTime = that.getFormat(newTime);
        that.setData({
            'goods_info.spellTime.dd': formatSpellTime.dd,
            'goods_info.spellTime.hh': formatSpellTime.hh,
            'goods_info.spellTime.mm': formatSpellTime.mm,
            'goods_info.spellTime.ss': formatSpellTime.ss
        })
        setTimeout(() => { that.setSpellTime(newTime) }, 1000);
    },
    // 拼单参与者列表倒计时
    setUserSpellTime: function(e) {
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
        setTimeout(() => this.setUserSpellTime(e), 1000);
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
            // console.log(Hour, Minute, Second)
            var dd = Day < 10 ? '0' + Day : Day
            var hh = Hour < 10 ? '0' + Hour : Hour
            var mm = Minute < 10 ? '0' + Minute : Minute
            var ss = Second < 10 ? '0' + Second : Second
            return {
                dd,
                ss,
                mm,
                hh
            };
            // that.setData({
            //   h: Hour < 10 ? '0' + Hour : Hour,
            //   m: Minute < 10 ? '0' + Minute : Minute,
            //   s: Second < 10 ? '0' + Second : Second,
            // })
        }
    },
    changeCurrentIndex() {
        if (this.data.currentIndex > this.data.spellListMove.length - 3) {
            this.setData({
                currentIndex: 0
            })
            return
        }
        this.setData({
            currentIndex: this.data.currentIndex + 2
        })
    },
    stopTouchMove() {
        return false;
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
	    if (!this.data.isShowGetUser) {
		    if (wx.getStorageSync('userInfo') == '') {
			    this.setData({
				    isShowGetUser: false
			    })
		    } else {
			    this.setData({
				    isShowGetUser: false
			    })
		    }
	    }

        let www = { method: 'cart_nums', canshu: '' };
        let huidiao = (ret) => {
            this.setData({
                nums: ret.nums,
                isCN: wx.getStorageSync('isCN')
            })
        }
        this.setData({
            can_submit: true
        })
        // api.post(this, www, {}, huidiao);
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

    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {
	    app.shareCallback()
        var id = this.data.goods_info.id;
        var fxs_id = this.data.fxs_id;
        var title=this.data.goods_info.goods_name;
        var activity_type = this.data.goods_info.activity_type;
        var hd_id = this.data.goods_info.hd_id;
        if(hd_id>0){
          id = hd_id;
        }
        return {
          title: title,
          imageUrl: www + this.data.goods_info.cover,
          path: '/pages/detail/index?id=' + id + '&fxs_id=' + fxs_id + '&activity_type=' + activity_type + '&hd_id=' + hd_id + '&mid=' + app.globalData.mid
        }
    }
})
