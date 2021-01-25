<style>
page { background-color: rgb(248, 248, 248)}

.tabs { width: 100%; height: 94px; background-color: #ffffff; display: flex; justify-content: space-around;}
.tabs li { height: 100%; position: relative; font-size: 30px; color: #333333; display: flex; align-items: center;}
.tabs li.active:after { content: ''; width: 56px; height: 4px; background-color: #000000; border-radius: 2px; position: absolute; bottom: 12px; left: 50%; transform: translateX(-50%);}

.list-container { margin-top: 50px; padding-bottom: 140px;}
.list-container .hint { font-size: 24px; color: #999999; text-align: center; margin: 60px 0 30px 0;}
.list-container .c-coupon-item { margin: 0 30px 24px 30px;}

.hint-empty { width: 100%; height: 750px; background-color: #ffffff; margin: 20px 0 30px 0; display: flex; flex-direction: column; justify-content: center; align-items: center;}
.hint-empty img { width: 505px; height: 325px; margin-bottom: 30px;}
.hint-empty p { font-size: 32px; color: #A5A5A5; line-height: 1; margin-bottom: 60px;}
.hint-empty .btn-round { width: 344px; background-color: #000000;}

.get-frame { width: 100%; min-height: calc(100vh - 94px); background-color: #000000; position: relative; overflow: hidden;}
.get-frame .frame-bg { width: 610px; display: block; margin: 130px auto;}
.get-frame .forms { position: absolute; top: 130px; left: 70px; right: 70px; display: flex; flex-direction: column; align-items: center;}
.get-frame .forms div { margin-top: 130px; margin-bottom: 30px;}
.get-frame .forms div p { font-size: 26px; color: #666666; text-align: center; line-height: 46px;}
.get-frame .forms input { width: 420px; height: 90px; background-color: #ffffff; border-radius: 8px; text-align: center; font-size: 30px; color: #000000; margin-bottom: 46px;}
.get-frame .forms .btn-round { width: 220px;}

.coupon-success { width: 100%; height: 100vh; position: fixed; top: 0; left: 0; z-index: 10000; background-color: rgba(0, 0, 0, .75); display: flex; justify-content: center; align-items: center;}
.coupon-success .frame { width: 550px; height: 660px; background-color: #ffffff; border-radius: 8px; position: relative; display: flex; flex-direction: column; align-items: center;}
.coupon-success .frame img { width: 404px;}
.coupon-success .frame h3 { color: #333333; font-size: 48px; margin-bottom: 110px; }
.coupon-success .frame button { width: 286px; background-color: #1B1B1B; }

.footer-btn { width: 100%; position: fixed; left: 0; bottom: 0; z-index: 1000;}
.footer-btn button { width: 100%; height: 120px; line-height: 120px; background-color: #3A3A3A; color: #ffffff; font-size: 40px; border-radius: 0; border: none;}

</style>

<template>
<div>
   <ul class="tabs">
      <li v-for="item in tabsList"
          :class="{active: currentTab === item.key}"
          :key="item" @click="changeTab(item.key)">{{item.name}}</li>
   </ul>
   <div class="get-frame" v-if="currentTab === '0'">
      <img src="/static/images/coupon/frame.png" mode="widthFix" class="frame-bg" />
      <div class="forms">
         <div class="hint">
            <p>输入关键词</p>
            <p>领取你的优惠券</p>
         </div>
         <input v-model="keyword" placeholder="输入兑换码"/>
         <button class="btn-round" @click="getCoupon">确定</button>
      </div>
   </div>
   <div v-else>
      <template v-if="couponList.length === 0">
      <div class="hint-empty">
         <img src="/static/images/shoppingCart/empty.png" />
      </div>
      </template>
      <template v-else>
      <div class="list-container">
         <coupon-item v-for="i in couponList" :key="id" :itemData="i" :type="currentTab" @handleUse="handleUse"/>
         <template v-if="couponList2.length > 0">
         <div class="hint">以下此订单暂不可用</div>
         <coupon-item v-for="i in couponList2" :key="id" :itemData="i" type="4" @handleUse="toIndex"/>
         </template>
      </div>
      </template>
   </div>

   <div class="footer-btn" v-if="currentTab === '1'">
      <button @click="goBack">不使用优惠券直接购买</button>
   </div>

   <!-- 领取成功 -->
   <div class="coupon-success" v-if="showCouponModal" @click="showCouponModal = false">
      <div class="frame">
         <img src="/static/images/coupon/zhengque@2x.png" mode="widthFix"/>
         <h3>领取成功</h3>
         <button class="btn-round" @click="toIndex">去使用</button>
      </div>
   </div>
</div>
</template>

<script>
import couponItem from './couponItem'
import { postAction } from '@/utils/api'
import { formatDate } from '@/utils/index'

export default {
   components: { couponItem },
   data () {
      return {
         currentTab: '0',
         tabsList: [
            { name: '可领取', key: '0' },
            { name: '未使用', key: '1' },
            { name: '已使用', key: '2' },
            { name: '已过期', key: '3' }
         ],
         showCouponModal: false,
         page: 1,
         couponList: [],
         couponList2: [],
         isAjax: false,
         orderId: -1,
         orderFlag: -1,
         goodsMoney: -1,
         keyword: ''
      }
   },

   methods: {
      getData () {
         if (this.isAjax) return false
         this.isAjax = true
         const params = {
            type: this.currentTab
         }
         if (this.currentTab === '1' && this.goodsMoney !== -1) {
            params.goods_money = this.goodsMoney
         }
         postAction('yhq_list', params).then(res => {
            this.isAjax = false
            this.couponList = res.data.list_1.map(i => {
               i.percentStr = Number(i.percent) / 10
               i.conditionStr = Number(i.condition) / 100
               i.endTime = formatDate(new Date(Number(i.yx_time) * 1000), 'yyyy.MM.dd HH:mm')
               return i
            })
            if (res.data.list_2) {
               this.couponList2 = res.data.list_2.map(i => {
                  i.percentStr = Number(i.percent)
                  i.conditionStr = Number(i.condition) / 100
                  i.endTime = formatDate(new Date(Number(i.yx_time) * 1000), 'yyyy.MM.dd HH:mm')
                  return i
               })
            }
         })
      },
      changeTab (key) {
         this.currentTab = key
         this.refresh()
      },
      refresh () {
         this.couponList = []
         if (this.currentTab !== '0') {
            this.getData()
         }
      },
      handleUse (data) {
         if (this.orderId === -1) {
            mpvue.redirectTo({
               url: '/pages/index/main'
            })
         } else {
            mpvue.redirectTo({
               url: `/pages/order/confirm/main?id=${this.orderId}&flag=${this.orderFlag}&couponId=${data.id}`
            })
         }
      },
      toIndex () {
         mpvue.redirectTo({
            url: '/pages/index/main'
         })
      },
      goBack () {
         mpvue.redirectTo({
            url: `/pages/order/confirm/main?id=${this.orderId}&flag=${this.orderFlag}&couponId=0`
         })
      },
      getCoupon () {
         if (this.isAjax) return
         this.isAjax = true
         postAction('get_yhq_by_keyname', {
            keyname: this.keyword
         }).then(res => {
            this.isAjax = false
            if (res.ret === 0) {
               this.showCouponModal = true
               this.couponKey = ''
            }
         })
      }
   },
   onShow () {
      console.log('order list onshow')
      this.refresh()
   },
   onLoad (options) {
      // Object.assign(this.$data, this.$options.data())
      console.log('order list onload')
      this.currentTab = options.type || '0'
      this.orderId = options.id || -1
      this.orderFlag = options.flag || -1
      this.goodsMoney = options.money || -1
      // let app = getApp()
   },
   onReachBottom () {
      console.log('order list onReachBottom')
      if (!this.isLoadAll) {
         this.page += 1
         this.getData()
      }
   }
}
</script>
