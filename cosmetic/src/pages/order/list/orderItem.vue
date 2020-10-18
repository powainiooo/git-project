<style>
.c-cart-item { width: 100%; height: 234px; background-color: #ffffff; display: flex; align-items: center; margin-top: 20px;}
.c-cart-item-img { width: 200px; height: 200px; margin-left: 40px;}
.c-cart-item-infos { width: 470px; height: 200px; display: flex; flex-direction: column; justify-content: space-between; margin-left: 20px;}
.c-cart-item-title { font-size: 28px; color: #333333; margin-bottom: 20px;}
.c-cart-item-tag { display: flex; flex-wrap: wrap;}
.c-cart-item-tag li { color: #999999; font-size: 28px; margin: 0 10px 10px 0;}
.c-cart-item-bottom { display: flex; justify-content: space-between; margin-bottom: 10px;}
.c-cart-item-price { font-size: 36px; color: #323232; font-weight: bold;}
.c-cart-item-nums { font-size: 26px; color: #2A2A2A;}
.btn1, .btn2 { width: 136px; height: 56px; margin: 0; padding: 0; line-height: 56px; border-radius: 4px; font-size: 24px;}
.btn1 { border: 1px solid #636363; color: #636363; margin-right: 14px; background-color: #ffffff;}
.btn2 { border: 1px solid #3A3A3A; background-color: #3A3A3A; color: #ffffff;}
</style>

<template>
<div class="c-cart-item" @click="toDetail">
   <img :src="imgSrc + itemData.cover" mode="aspectFill" class="c-cart-item-img"/>
   <div class="c-cart-item-infos">
      <div>
         <h3 class="c-cart-item-title">订单号：{{itemData.order_num}}</h3>
         <div class="c-cart-item-bottom">
            <ul class="c-cart-item-tag">
               <li>共{{itemData.total_nums}}件商品</li>
            </ul>
            <div class="c-cart-item-nums" v-if="itemData.status === '1'">待付款</div>
            <div class="c-cart-item-nums" v-else-if="itemData.status === '4'">待发货</div>
            <div class="c-cart-item-nums" v-else-if="itemData.status === '5'">待收货</div>
            <div class="c-cart-item-nums" v-else-if="itemData.status === '7'">已完成</div>
         </div>
      </div>
      <div class="c-cart-item-bottom">
         <h3 class="c-cart-item-price">￥{{itemData.order_amount / 100}}</h3>
         <div style="display: flex;">
            <button class="btn1" v-if="itemData.status === '1'" @click.stop="doCancel">取 消</button>
            <button class="btn2" v-if="itemData.status === '1'" @click.stop="doPay">支 付</button>
            <button class="btn1" v-if="itemData.status === '5'" @click.stop="check">查看物流</button>
            <button class="btn2" v-if="itemData.status === '5'" @click.stop="confirm">确认收货</button>
         </div>
      </div>
   </div>
</div>
</template>

<script type='es6'>
import { postAction } from '@/utils/api'
export default {
   name: 'app',
   props: {
      itemData: {
         type: Object,
         default: () => {}
      }
   },
   data () {
      return {
         imgSrc: mpvue.imgSrc
      }
   },
   methods: {
      doCancel () {
         mpvue.showModal({
            title: '提示',
            content: '是否确定取消订单？',
            success: (res) => {
               if (res.confirm) {
                  postAction('cancel_order', {
                     order_id: this.itemData.id
                  }).then(res => {
                     if (res.ret === 0) {
                        mpvue.showToast({title: '取消成功'})
                        this.$emit('refresh')
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
            id: this.itemData.id
         }).then(res => {
            console.log('hideLoading')
            mpvue.hideLoading()
            if (res.ret === 0) {
               // mpvue.showToast({ title: '支付测试', icon: 'none' })
               if (res.data.need_pay === 0) {
                  mpvue.reLaunch({
                     url: `/pages/order/success/main?orderNum=${this.itemData.order_num}`
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
                           url: `/pages/order/success/main?orderNum=${this.itemData.order_num}`
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
            url: `/pages/logistics/main?id=${this.itemData.id}`
         })
      },
      confirm () {
         mpvue.showModal({
            title: '提示',
            content: '是否确认收货？',
            success: (res) => {
               if (res.confirm) {
                  postAction('receive_done', {
                     order_id: this.itemData.id
                  }).then(res => {
                     if (res.ret === 0) {
                        mpvue.showToast({title: '操作成功'})
                        this.$emit('refresh')
                     }
                  })
               }
            }
         })
      },
      toDetail () {
         mpvue.navigateTo({
            url: `/pages/order/detail/main?id=${this.itemData.id}`
         })
      }
   }
}
</script>
