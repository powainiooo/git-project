<style>
page { background-color: rgb(248, 248, 248)}

.address-none, .address-frame { margin: 30px 0 44px 0; height: 140px; position: relative; background-color: #ffffff; font-size: 30px; color: #2F2F2F; display: flex; align-items: center;}
.address-none img { width: 24px; height: 32px; margin: 0 24px 0 48px;}
.address-none:before, .address-frame:before { content: ''; width: 100%; height: 14px; background-color: rgb(242, 242, 242); position: absolute; bottom: -14px; left: 0; background-image: linear-gradient(-45deg,transparent 20%,#707070 20%,#707070 40%,transparent 40%,transparent 60%,#BEBEBE 60%,#BEBEBE 80%,transparent 80%); background-size: 46px 14px; background-repeat: repeat}

.address-frame { height: 200px;}
.address-frame img { width: 40px; height: 56px; margin: 0 44px 0 36px;}
.address-frame div { width: 520px;}
.address-frame div h3 { font-size: 28px; color: #333333; margin-bottom: 20px;}
.address-frame div h3 span { font-size: 30px; color: #999999; margin-left: 20px;}
.address-frame div p { font-size: 26px; color: #333333; line-height: 40px;}


.gift-hint { margin: 30px 0 1px 0; background-color: #ffffff; padding: 0 24px 0 30px; height: 108px; display: flex; justify-content: space-between; align-items: center;}
.gift-hint h3 { font-size: 32px; line-height: 1; color: #333333; display: flex; align-items: center;}
.gift-hint h3 .sw { margin-right: 20px; margin-top: 5px;}
.gift-hint p { font-size: 24px; color: #747474; line-height: 40px; display: flex; align-items: center;}
.gift-hint p img { width: 22px; height: 25px; margin-left: 10px;}

.coupon-hint { margin: 0 0 30px 0; background-color: #ffffff; padding: 0 30px; height: 108px; display: flex; justify-content: space-between; align-items: center; position: relative; }
.coupon-hint h3 { font-size: 32px; line-height: 1; color: #333333; display: flex; align-items: center;}
.coupon-hint h3 img { width: 54px; height: 40px; margin-right: 26px;}
.coupon-hint p { font-size: 34px; color: #ED2828; display: flex; align-items: center; padding-right: 30px;}
.coupon-hint p img { width: 48px; height: 48px; margin-left: 14px;}
.coupon-hint div { display: flex; align-items: center;}
.coupon-hint div input { width: 190px; height: 30px; padding: 12px 20px; border: 1px solid #CCCCCC; background: #F8F8F8; font-size: 30px;}
.coupon-hint div .btn-round { width: 180px; margin-left: 50px; }

.details { background-color: #ffffff; margin: 30px 0; overflow: hidden; padding: 70px 0 50px 0;}
.details ul { margin: 0 40px 60px 50px;}
.details ul li { display: flex; justify-content: space-between; font-size: 28px; color: #999999; margin-bottom: 20px;}
.details ul li span:first-child { color: #666666;}
.details div { font-size: 28px; color: #999999; text-align: right; margin-right: 30px;}
.details div span { font-size: 44px; color: #000000;}

.footer-btn { width: 100%; position: fixed; left: 0; bottom: 0; z-index: 1000;}
.footer-btn button { width: 100%; height: 120px; line-height: 120px; background-color: #3A3A3A; color: #ffffff; font-size: 40px; border-radius: 0; border: none;}

.coupon-success { width: 100%; height: 100vh; position: fixed; top: 0; left: 0; z-index: 10000; background-color: rgba(0, 0, 0, .75); display: flex; justify-content: center; align-items: center;}
.coupon-success .frame { width: 550px; height: 660px; background-color: #ffffff; border-radius: 8px; position: relative; display: flex; flex-direction: column; align-items: center;}
.coupon-success .frame img { width: 404px;}
.coupon-success .frame img.close { width: 44px; position: absolute; top: 10px; right: 14px;}
.coupon-success .frame h3 { color: #333333; font-size: 48px; margin:0 20px 110px 20px; text-align: center;}
.coupon-success .frame div { width: 100%; box-sizing: border-box; padding: 0 30px; display: flex; justify-content: space-between;}
.coupon-success .frame div button { width: 232px; }
.coupon-success .frame div button:last-child { background: #F7F7F7; border: 2px solid #636363; color: #636363; }
</style>

<template>
<div style="padding-bottom: 130rpx">
   <div class="address-none link-arrow" v-if="!hasAddress" @click="selectAddr">
      <img src="/static/images/order/address_icon@2x.png" />
      添加收货地址
   </div>
   <div class="address-frame link-arrow" v-else @click="selectAddr">
      <img src="/static/images/order/address_icon@2x.png" />
      <div>
         <h3>{{addressInfo.name}} <span>{{addressInfo.mobile}}</span></h3>
         <p>{{addressInfo.address}}{{addressInfo.house_num}}</p>
      </div>
   </div>
   <div class="details" v-if="hasAddress">
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

   <div class="gift-hint">
      <h3><van-switch :checked="giftCheck" @change="giftChange" size="28rpx" active-color="#333333" class="sw"/>使用积分抵扣</h3>
      <p v-if="giftCheck">本次使用了{{pageData.use_score}}积分抵扣{{pageData.dk_money / 100}}元 <img src="/static/images/order/jifen@2x.png" /></p>
   </div>

   <div class="coupon-hint link-arrow">
      <h3><img src="/static/images/order/icon-coupon.png" />优惠券</h3>
      <p v-if="pageData.yhq_total_count !== 0">
         <span @click="selectCoupon" v-if="pageData.yhq_user_id === 0">共{{pageData.yhq_total_count}}张，可以使用{{pageData.yhq_usable_count}}张</span>
         <span @click="selectCoupon" v-else>{{pageData.yhq_dk_desc}}</span>
      </p>
      <div v-else>
         <input v-model="couponKey" placeholder="输入兑换码" />
         <button class="btn-round" @click="getCoupon">点击领取</button>
      </div>
   </div>

   <div class="details">
      <ul>
         <li>
            <span>商品总价</span>
            <span>￥{{pageData.goods_money / 100}}</span>
         </li>
         <li>
            <span>运费</span>
            <span>￥{{pageData.kd_fee / 100}}</span>
         </li>
         <li v-if="giftCheck">
            <span>积分抵扣</span>
            <span>-￥{{pageData.dk_money / 100}}</span>
         </li>
         <li v-if="couponId != 0">
            <span>优惠券</span>
            <span>-￥{{pageData.yhq_dk_money / 100}}</span>
         </li>
<!--         <li>-->
<!--            <span>总金额</span>-->
<!--            <span>￥{{pageData.goods_money / 100}}</span>-->
<!--         </li>-->
         <li>
            <span>可得积分</span>
            <span>{{pageData.add_score}}</span>
         </li>
      </ul>
      <div>实际付款：<span>￥{{payPrice}}</span></div>
   </div>

   <div class="details">
      <ul>
         <li style="margin-bottom: 40px;">
            <span style="color: #333333">发票信息</span>
            <span style="color: #333333" @click="toInvoice">{{hasInvoice ? '修改' : '添加'}}发票信息</span>
         </li>
      </ul>
      <ul v-if="hasInvoice">
         <li>
            <span>发票类型</span>
            <span>{{invoiceInfo.fp_status === '1' ? '个人' : '公司'}}</span>
         </li>
         <li>
            <span>发票抬头</span>
            <span>{{invoiceInfo.fp_name}}</span>
         </li>
         <li>
            <span>税号</span>
            <span>{{invoiceInfo.fp_sh}}</span>
         </li>
         <li>
            <span>电子邮箱</span>
            <span>{{invoiceInfo.fp_email}}</span>
         </li>
      </ul>
   </div>

   <div class="footer-btn">
      <button v-if="hasAddress" @click="doPay">立即结算</button>
      <button v-else @click="selectAddr">请填写收货地址</button>
   </div>

   <!-- 领取成功 -->
   <div class="coupon-success" v-if="showCouponModal">
      <div class="frame">
         <img src="/static/images/coupon/zhengque@2x.png" mode="widthFix"/>
         <img src="/static/images/order/guangbi@2x.png" mode="widthFix" class="close"/>
         <h3>领取成功</h3>
         <div>
            <button class="btn-round" @click="selectCoupon">去使用</button>
            <button class="btn-round" @click="hideCoupon">再看看</button>
         </div>
      </div>
   </div>
</div>
</template>

<script>
import store from '../../../store'
import cOrderItem from '@/components/orderItem'
import { postAction } from '@/utils/api'

export default {
   components: { cOrderItem },
   data () {
      return {
         giftCheck: false,
         couponCheck: false,
         showCouponModal: false,
         ids: '',
         flag: '',
         goodsList: [],
         pageData: {},
         isAjax: false,
         orderId: '',
         orderNum: '',
         couponId: 0,
         couponKey: ''
      }
   },
   computed: {
      payPrice () {
         if (this.giftCheck) {
            return (parseFloat(this.pageData.order_money) / 100) - (parseFloat(this.pageData.dk_money) / 100)
         } else {
            return (parseFloat(this.pageData.order_money) / 100)
         }
      },
      hasAddress () {
         return store.state.addressInfo !== null
      },
      addressInfo () {
         return store.state.addressInfo
      },
      hasInvoice () {
         return store.state.invoiceInfo !== null
      },
      invoiceInfo () {
         return store.state.invoiceInfo
      }
      // pageData () {
      //    return store.state.beginBuyData
      // },
      // goodsList () {
      //    return store.state.beginBuyData.goods_list || []
      // }
   },
   methods: {
      giftChange (e) {
         this.giftCheck = e.mp.detail
      },
      getData () {
         postAction('begin_buy', {
            id: this.ids,
            gift_flag: this.flag,
            yhq_user_id: this.couponId
         }).then(res => {
            this.goodsList = res.data.goods_list
            this.pageData = res.data
            if (!Array.isArray(res.data.address)) {
               store.commit('SET_ADDRESS', res.data.address)
            }
         })
      },
      changeCoupon (status) {
         this.couponCheck = status
         this.getData()
      },
      selectAddr () {
         mpvue.navigateTo({
            url: '/pages/address/list/main'
         })
      },
      toInvoice () {
         mpvue.navigateTo({
            url: '/pages/invoice/main'
         })
      },
      selectCoupon () {
         mpvue.navigateTo({
            url: `/pages/coupon/list/main?id=${this.ids}&flag=${this.flag}&type=1&money=${this.pageData.goods_money}`
         })
      },
      doPay () {
         if (this.isAjax) return false
         this.isAjax = true
         if (this.orderId === '') {
            mpvue.showLoading({
               title: '创建订单',
               mask: true
            })
            const params = {
               address_id: this.addressInfo.id,
               userjf_flag: this.giftCheck ? '1' : '0'
            }
            params.fp_status = this.hasInvoice ? this.invoiceInfo.fp_status : '0'
            if (this.hasInvoice) {
               params.fp_name = this.invoiceInfo.fp_name
               params.fp_sh = this.invoiceInfo.fp_sh
               params.fp_email = this.invoiceInfo.fp_email
            }
            params.yhq_user_id = this.pageData.yhq_user_id
            postAction('creat_order', params).then(res => {
               mpvue.hideLoading()
               if (res.ret === 0) {
                  // const orderNum = res.data.order_num
                  this.orderId = res.data.id
                  this.orderNum = res.data.order_num
                  this.doPayment(res.data.id)
                  // if (res.data.is_reg === '1') {
                  //    this.orderId = res.data.id
                  //    this.orderNum = res.data.order_num
                  //    this.doPayment(res.data.id)
                  // } else if (res.data.is_reg === '0') {
                  //    this.isAjax = false
                  //    mpvue.navigateTo({
                  //       url: '/pages/register/main?source=buy'
                  //    })
                  // }
               } else {
                  this.$nextTick(() => {
                     mpvue.showToast({ title: res.msg, icon: 'none' })
                     this.isAjax = false
                  })
               }
            })
         } else {
            this.doPayment(this.orderId)
         }
      },
      doPayment (id) {
         mpvue.showLoading({
            title: '支付中',
            mask: true
         })
         postAction('pay', {
            id
         }).then(res => {
            mpvue.hideLoading()
            if (res.ret === 0) {
               if (res.data.need_pay === 0) {
                  mpvue.reLaunch({
                     url: `/pages/order/success/main?orderNum=${this.orderNum}`
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
                           url: `/pages/order/success/main?orderNum=${this.orderNum}`
                        })
                     },
                     fail: (err) => {
                        console.log('pay fail', err)
                        this.isAjax = false
                        wx.showToast({
                           title: '支付失败',
                           icon: 'none'
                        })
                        setTimeout(() => {
                           mpvue.reLaunch({
                              url: `/pages/order/list/main?status=1`
                           })
                        }, 1500)
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
      hideCoupon () {
         this.showCouponModal = false
         this.getData()
      },
      getCoupon () {
         if (this.isAjax) return
         this.isAjax = true
         postAction('get_yhq_by_keyname', {
            keyname: this.couponKey
         }).then(res => {
            this.isAjax = false
            if (res.ret === 0) {
               this.showCouponModal = true
               this.couponKey = ''
               // this.couponId = res.data.yhq_user_id
            }
         })
      }
   },

   onLoad (options) {
      Object.assign(this.$data, this.$options.data())
      console.log(options)
      this.ids = options.id || '647'
      this.flag = options.flag || '0'
      this.couponId = options.couponId || 0
      this.getData()
      // let app = getApp()
   }
}
</script>
