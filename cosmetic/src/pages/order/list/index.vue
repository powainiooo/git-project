<style>
page { background-color: rgb(248, 248, 248)}

.tabs { width: 100%; height: 94px; background-color: #ffffff; display: flex; justify-content: space-around;}
.tabs li { height: 100%; position: relative; font-size: 30px; color: #333333; display: flex; align-items: center;}
.tabs li.active:after { content: ''; width: 56px; height: 4px; background-color: #000000; border-radius: 2px; position: absolute; bottom: 12px; left: 50%; transform: translateX(-50%);}

</style>

<template>
<div>
   <ul class="tabs">
      <li v-for="item in tabsList"
          :class="{active: currentTab === item.key}"
          :key="item" @click="changeTab(item.key)">{{item.name}}</li>
   </ul>

   <c-order-item v-for="i in orderList" :key="id" :itemData="i" @refresh="refresh"/>
   <div class="load-over" v-if="isLoadAll">- 没有更多订单了 -</div>
</div>
</template>

<script>
import cOrderItem from '@/components/orderItem2'
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
         isLoadAll: false
      }
   },

   methods: {
      getData () {
         postAction('get_order_list', {
            page: this.page,
            status: this.currentTab
         }).then(res => {
            this.orderList = this.orderList.concat(res.data.list)
            this.totals = res.data.nums
            this.isLoadAll = this.totals === this.orderList.length
         })
      },
      changeTab (key) {
         this.currentTab = key
         this.page = 0
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
      this.refresh()
   },
   onLoad (options) {
      this.currentTab = options.status || '0'
      // let app = getApp()
   },
   onReachBottom () {
      if (!this.isLoadAll) {
         this.page += 1
         this.getData()
      }
   }
}
</script>
