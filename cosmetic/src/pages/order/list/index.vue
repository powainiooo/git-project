<style>
page { background-color: rgb(248, 248, 248)}

.tabs { width: 100%; height: 94px; background-color: #ffffff; display: flex; justify-content: space-around;}
.tabs li { height: 100%; position: relative; font-size: 30px; color: #333333; display: flex; align-items: center;}
.tabs li.active:after { content: ''; width: 56px; height: 4px; background-color: #000000; border-radius: 2px; position: absolute; bottom: 12px; left: 50%; transform: translateX(-50%);}

.hint-empty { width: 100%; height: 750px; background-color: #ffffff; margin: 20px 0 30px 0; display: flex; flex-direction: column; justify-content: center; align-items: center;}
.hint-empty img { width: 505px; height: 325px; margin-bottom: 30px;}
.hint-empty p { font-size: 32px; color: #A5A5A5; line-height: 1; margin-bottom: 60px;}
.hint-empty .btn-round { width: 344px; background-color: #000000;}
</style>

<template>
<div>
   <ul class="tabs">
      <li v-for="item in tabsList"
          :class="{active: currentTab === item.key}"
          :key="item" @click="changeTab(item.key)">{{item.name}}</li>
   </ul>
   <template v-if="orderList.length === 0">
   <div class="hint-empty">
      <img src="/static/images/shoppingCart/empty.png" />
      <p>您还没有相关的订单哦~</p>
      <a href="/pages/index/main" open-type="reLaunch" class="btn-round">去逛逛</a>
   </div>
   </template>

   <template v-else>
   <c-order-item v-for="i in orderList" :key="i.id" :itemData="i" @refresh="refresh"/>
   <div class="load-over" v-if="isLoadAll">- 没有更多订单了 -</div>
   </template>
</div>
</template>

<script>
import cOrderItem from './orderItem'
import { postAction } from '@/utils/api'

export default {
   components: { cOrderItem },
   data () {
      return {
         currentTab: '0',
         tabsList: [
            { name: '全部', key: '0' },
            { name: '待付款', key: '1' },
            { name: '待发货', key: '4' },
            { name: '待收货', key: '5' },
            { name: '已完成', key: '7' }
         ],
         page: 1,
         totals: 0,
         orderList: [],
         isLoadAll: false,
         isAjax: false
      }
   },

   methods: {
      getData () {
         if (this.isAjax) return false
         this.isAjax = true
         postAction('get_order_list', {
            page: this.page,
            status: this.currentTab
         }).then(res => {
            this.isAjax = false
            this.orderList = this.orderList.concat(res.data.list)
            this.totals = parseInt(res.data.nums)
            this.isLoadAll = this.totals === this.orderList.length
            console.log('this.isLoadAll', this.isLoadAll)
         })
      },
      changeTab (key) {
         this.currentTab = key
         this.page = 1
         this.orderList = []
         this.getData()
      },
      refresh () {
         this.page = 1
         this.orderList = []
         this.getData()
      }
   },
   onShow () {
      console.log('order list onshow')
      this.refresh()
   },
   onLoad (options) {
      // Object.assign(this.$data, this.$options.data())
      console.log('order list onload')
      this.currentTab = options.status || '0'
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
