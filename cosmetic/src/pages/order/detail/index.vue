<style>
page { background-color: rgb(248, 248, 248)}

.address-frame { margin: 0 0 44px 0; min-height: 200px; position: relative; background-color: #ffffff; font-size: 30px; color: #2F2F2F; display: flex; align-items: center;}
.address-frame img { width: 40px; height: 56px; margin: 0 44px 0 36px;}
.address-frame div { width: 520px;}
.address-frame div h3 { font-size: 28px; color: #333333; margin-bottom: 20px;}
.address-frame div h3 span { font-size: 30px; color: #999999; margin-left: 20px;}
.address-frame div p { font-size: 26px; color: #333333; line-height: 40px;}

.order-info-frame { margin-top: 30px; margin-bottom: 0; border-bottom: 1px solid #C7C7C7; padding: 10px 0;}
.order-info-frame img { width: 47px; height: 63px; margin: 0 32px 0 36px;}
.order-info-frame div h3 { color: #2F2F2F;}
.order-info-frame div h3:last-child { margin-bottom: 0;}
.order-info-frame div h3 span { color: #666666;}

.details { background-color: #ffffff; margin: 30px 0; overflow: hidden; padding: 70px 0 50px 0;}
.details ul { margin: 0 40px 60px 50px;}
.details ul li { display: flex; justify-content: space-between; font-size: 28px; color: #999999; margin-bottom: 20px;}
.details ul li span:first-child { color: #666666;}
.details div { font-size: 28px; color: #999999; text-align: right; margin-right: 30px;}
.details div span { font-size: 44px; color: #000000;}

.foot-btns { width: 100%; height: 100px; display: flex; position: fixed; left: 0; bottom: 0; z-index: 1000;}
.foot-btns button { height: 100%; line-height: 100px; flex: 1; font-size: 30px; color: #ffffff; background-color: #5f5f5f; border-radius: 0; border: none}
.foot-btns button:last-child { background-color: #393939;}

.preview-container { margin: 40px; position: relative;}
.preview-container::before { content: '祝福卡预览'; font-size: 32px; color: #333333; position: absolute; top: 22px; right: 30px;}
.preview-container>img { width: 670px; height: 380px; margin-bottom: 30px;}
.preview-container .form-item { padding: 30px; background-color: #ffffff; border: 1px solid #E9E9E9; font-size: 30px; color: #747474; line-height: 50px; margin-bottom: 30px; border-radius: 6px;}
.preview-container .form-item span { color: #353535; margin-right: 40px;}
</style>

<template>
<div style="padding-bottom: 130rpx">
   <div class="address-frame order-info-frame">
      <img src="/static/images/order/dingdan@2x.png" />
      <div>
         <h3>订单编号 <span>{{orderInfo.order_num}}</span></h3>
         <h3>订单状态 <span>{{orderStatusStr}}</span></h3>
         <h3>创建时间 <span>{{timeStr}}</span></h3>
         <h3 v-if="orderInfo.paid_time !== '0'">支付时间 <span>{{payTime}}</span></h3>
      </div>
   </div>
   <div class="address-frame">
      <img src="/static/images/order/address_icon@2x.png" />
      <div>
         <h3>{{addressInfo.rev_name}} <span>{{addressInfo.rev_mobile}}</span></h3>
         <p>{{addressInfo.rev_province}}{{addressInfo.rev_city}}{{addressInfo.rev_area}}{{addressInfo.rev_address}}</p>
      </div>
   </div>
   <div class="details">
      <ul style="margin-bottom: 0;">
         <li>
            <span>真实姓名</span>
            <span>{{addressInfo.card_name}}</span>
         </li>
         <li>
            <span>身份证号</span>
            <span>{{addressInfo.card_num}}</span>
         </li>
      </ul>
   </div>

   <c-order-item v-for="i in goodsList" :key="cart_id" :itemData="i" />

   <div class="details">
      <ul>
         <li>
            <span>商品总价</span>
            <span>￥{{orderInfo.goods_amount / 100}}</span>
         </li>
         <li>
            <span>运费</span>
            <span>￥{{orderInfo.spyf / 100}}</span>
         </li>
         <li v-if="giftCheck">
            <span>积分抵扣</span>
            <span>-￥{{orderInfo.dk_amount / 100}}</span>
         </li>
         <li v-if="giftCheck">
            <span>抵扣积分数</span>
            <span>{{orderInfo.dk_num}}</span>
         </li>
         <li v-if="orderInfo.yhq_user_id !== 0">
            <span>优惠券</span>
            <span>-￥{{orderInfo.yhq_dk_money / 100}}</span>
         </li>
         <li>
            <span>可得积分</span>
            <span>{{orderInfo.dqjf}}</span>
         </li>
      </ul>
      <div>实际付款：<span>￥{{orderInfo.order_amount / 100}}</span></div>
   </div>

   <div class="details" v-if="orderInfo.fp_status !== '0'">
      <ul>
         <li style="margin-bottom: 40px;">
            <span style="color: #333333">发票信息</span>
         </li>
         <li>
            <span>发票类型</span>
            <span>{{orderInfo.fp_status === '1' ? '个人' : '公司'}}</span>
         </li>
         <li>
            <span>发票抬头</span>
            <span>{{orderInfo.fp_name}}</span>
         </li>
         <li>
            <span>税号</span>
            <span>{{orderInfo.fp_sh}}</span>
         </li>
         <li>
            <span>电子邮箱</span>
            <span>{{orderInfo.fp_email}}</span>
         </li>
      </ul>
   </div>

   <div class="preview-container" v-if="orderInfo.gift_flag === '1'">
      <img :src="imgSrc + orderInfo.wish_bg" />
      <div class="form-item"><span>To:</span>{{orderInfo.to || ''}}</div>
      <div class="form-item" style="padding-bottom: 60rpx;"><span>Message:</span>
         {{orderInfo.message || ''}}
      </div>
      <div class="form-item"><span>From:</span>{{orderInfo.from || ''}}</div>
   </div>

   <div class="foot-btns">
      <button v-if="orderInfo.status === '1'" @click.stop="doCancel">取 消</button>
      <button v-if="orderInfo.status === '1'" @click.stop="doPay">支 付</button>
      <button v-if="orderInfo.status === '5'" @click.stop="check">查看物流</button>
      <button v-if="orderInfo.status === '5'" @click.stop="confirm">确认收货</button>
   </div>
</div>
</template>

<script>
import cOrderItem from '@/components/orderItem'
import { postAction } from '@/utils/api'
import { formatTime } from '@/utils'

export default {
   components: { cOrderItem },
   data () {
      return {
         imgSrc: mpvue.imgSrc,
         tabsList: [
            { name: '全部', key: '0' },
            { name: '待付款', key: '1' },
            { name: '待发货', key: '4' },
            { name: '待收货', key: '5' },
            { name: '已完成', key: '7' }
         ],
         giftCheck: false,
         orderStatusStr: '',
         orderInfo: {},
         addressInfo: {},
         invoiceInfo: {},
         goodsList: [],
         timeStr: '',
         payTime: ''
      }
   },
   methods: {
      getData (id) {
         postAction('order_info', {
            id
         }).then(res => {
            if (res.ret === 0) {
               this.orderInfo = res.data.order
               this.addressInfo = res.data.address
               this.goodsList = res.data.goods_list
               this.timeStr = formatTime(new Date(parseInt(res.data.order.order_time) * 1000))
               this.payTime = formatTime(new Date(parseInt(res.data.order.paid_time) * 1000))
               const item = this.tabsList.find(i => i.key === this.orderInfo.status)
               this.orderStatusStr = item.name
               this.giftCheck = res.data.userjf_flag === 1
            }
         })
      },
      doCancel () {
         mpvue.showModal({
            title: '提示',
            content: '是否确定取消订单？',
            success: (res) => {
               if (res.confirm) {
                  postAction('cancel_order', {
                     order_id: this.orderInfo.id
                  }).then(res => {
                     if (res.ret === 0) {
                        mpvue.showToast({title: '取消成功'})
                        setTimeout(() => {
                           mpvue.navigateBack({
                              delta: 1
                           })
                        }, 1500)
                     }
                  })
               }
            }
         })
      },
      doPay () {
         mpvue.showLoading({
            title: '支付中',
            mask: true
         })
         postAction('pay', {
            id: this.orderInfo.id
         }).then(res => {
            mpvue.hideLoading()
            if (res.ret === 0) {
               if (res.data.need_pay === 0) {
                  mpvue.reLaunch({
                     url: `/pages/order/success/main?orderNum=${this.orderInfo.order_num}`
                  })
               } else if (res.data.need_pay === 1) {
                  const jsapi = res.data
                  wx.requestPayment({
                     'timeStamp': jsapi.timeStamp,
                     'nonceStr': jsapi.nonceStr,
                     'package': jsapi.package,
                     'signType': jsapi.signType,
                     'paySign': jsapi.paySign,
                     success: (res) => {
                        console.log(res)
                        mpvue.reLaunch({
                           url: `/pages/order/success/main?orderNum=${this.orderInfo.order_num}`
                        })
                     },
                     'fail': function (err) {
                        console.log('pay fail', err)
                        wx.showToast({
                           title: '支付失败',
                           icon: 'none'
                        })
                     }
                  })
               }
            } else {
               this.$nextTick(() => {
                  mpvue.showToast({ title: res.msg, icon: 'none' })
                  this.isAjax = false
               })
            }
         })
      },
      check () {
         mpvue.navigateTo({
            url: `/pages/logistics/main?id=${this.orderInfo.id}`
         })
      },
      confirm () {
         mpvue.showModal({
            title: '提示',
            content: '是否确认收货？',
            success: (res) => {
               if (res.confirm) {
                  postAction('receive_done', {
                     order_id: this.orderInfo.id
                  }).then(res => {
                     if (res.ret === 0) {
                        mpvue.showToast({title: '操作成功'})
                        this.getData(this.orderInfo.id)
                     }
                  })
               }
            }
         })
      }
   },

   onLoad (options) {
      Object.assign(this.$data, this.$options.data())
      const id = options.id || ''
      this.getData(id)
      // let app = getApp()
   }
}
</script>
