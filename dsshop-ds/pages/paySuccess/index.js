// pages/spellList/index.js
import common from '../../utils/common'
const api = require('../../utils/api.js');
const www = getApp().globalData.www;
const imgUrl = getApp().globalData.url;
Page({
    data: {
        www: www,
        imgUrl: imgUrl,
        page:1,
        order_data:{},
        isShowRule: false, // 规则弹窗
        isShowPds:false,//拼单成功弹窗
        ruleData: '', // 规则文案
        id: 0, // 商品详情
        isToDeatil: false, // 是否从订单详情跳转
        hd_id: 0 // 活动id
    },

    onLoad: function(options) {
        if (options) {
            let link = { method: 'pay_success', canshu: '&id='+options.id };
            let logic = (ret) => {
                if (ret.remain_nums>0) {
                    for(let i = 0;i<ret.remain_nums;i++){
                        let obj = {headimg:''};
                        ret.group_buy_user.push(obj);
                    }
                    this.setData({
                        order_data:ret,
                        id:options.id,
                        hd_id: options.hd_id
                    })
                    this.setPayTime();
                }else{
                    this.setData({
                        order_data:ret,
                        id:options.id,
                        isShowPds:true,
                        hd_id: options.hd_id
                    })
                }

            }
            api.postGroupBuy(this, link, {}, logic);
            if (options.isToDeatil) { // 是否从订单详情进入
                this.setData({
                    isToDeatil: true
                })
            }
        }
        this.getList();
        // 动态改变标题名
        if (options.title) {
            tt.setNavigationBarTitle({
                title: options.title
            })
        }
    },
    //获取拼团商品
    getList() {
        let link = { method: 'activity_list', canshu: '&page=1&recommend=0' };
        let logic = (ret) => {
          if(ret.list && ret.list.length > 0){
            for(let i = 0; i<ret.list.length; i++){
              ret.list[i].tg_price = (ret.list[i].tg_price/100).toFixed(2)
            }
            this.setData({
                group_buy_list:ret.list
            })
          }
        }
        api.postGroupBuy(this, link, {}, logic);
    },
    // 是否显示规则弹窗
    isShowRule(e) {
        if (e.currentTarget.dataset.show) {
            this.getRule()
        }
        this.setData({
            isShowRule: !this.data.isShowRule
        })
    },
    //关闭拼单成功弹窗
    closePtSuccessDialogTap(){
        this.setData({
            isShowPds: !this.data.isShowPds
        })
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function(res) {
        return {
            title: '【仅剩' + this.data.order_data.remain_nums + '个名额】' + this.data.order_data.order_title,
            imageUrl: this.data.imageUrl + this.data.order_data.goods_cover,
            path: '/pages/pintuanShare/index?id=' + this.data.id,
        }
    },
    // 获取规则文案
    getRule() {
        let link = { method: 'group_buy_rule'};
        let logic = (ret) => {
          if(ret){
            this.setData({
                ruleData: ret,
            })
          }else{

          }
        }
        api.postGroupBuy(this, link, {}, logic);
    },

    //倒计时
    setPayTime: function() {
        let _data = this.data.order_data;
        var newTime = parseInt(_data.remain_time)
        if (newTime <= 0) {
            return;
         }
        newTime--
        _data.remain_time = newTime;
        _data.lastTime = this.getFormat(newTime);
        this.setData({
            order_data:_data
        });
        setTimeout(() => this.setPayTime(), 1000);
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
})
