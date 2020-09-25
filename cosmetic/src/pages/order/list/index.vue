<style>
page { background-color: rgb(248, 248, 248)}

.tabs { width: 100%; height: 94px; background-color: #ffffff; display: flex; justify-content: space-around;}
.tabs li { height: 100%; position: relative; font-size: 30px; color: #333333; display: flex; align-items: center;}
.tabs li.active:after { content: ''; width: 56px; height: 4px; background-color: #000000; border-radius: 2px; position: absolute; bottom: 12px; left: 50%; transform: translateX(-50%);}

.btn1, .btn2 { width: 136px; height: 56px; margin: 0; padding: 0; line-height: 56px; border-radius: 4px; font-size: 24px;}
.btn1 { border: 1px solid #636363; color: #636363; margin-right: 14px; background-color: #ffffff;}
.btn2 { border: 1px solid #3A3A3A; background-color: #3A3A3A; color: #ffffff;}
</style>

<template>
<div>
   <ul class="tabs">
      <li v-for="item in tabsList" :class="{active: currentTab === item.key}" :key="item">{{item.name}}</li>
   </ul>

   <c-order-item>
      <temmplate slot="btns">
         <button class="btn1">取 消</button>
         <button class="btn2">支 付</button>
      </temmplate>
   </c-order-item>
   <c-order-item />
</div>
</template>

<script>
import cOrderItem from '@/components/orderItem2'

export default {
   components: { cOrderItem },
   data () {
      return {
         currentTab: '1',
         tabsList: [
            { name: '全部', key: '1' },
            { name: '待付款', key: '2' },
            { name: '待发货', key: '3' },
            { name: '待收货', key: '4' },
            { name: '已完成', key: '5' }
         ]
      }
   },

   methods: {
   },

   created () {
      // let app = getApp()
   }
}
</script>
