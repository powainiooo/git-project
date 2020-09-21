<style>
page { background-color: rgb(248, 248, 248)}
.type-tab { width: 100%; height: 220px; background-color: #ffffff; display: flex; justify-content: space-around; align-items: center; margin-bottom: 30px;}
.type-tab li div { width: 90px; height: 90px; border-radius: 50%; border: 1px solid #666666; margin-bottom: 14px;}
.type-tab li.active div { border-color: #333333; background-color: #333333;}
.type-tab li div img { width: 100%; height: 100%; }
.type-tab li p { font-size: 26px; color: #666666; text-align: center;}
.type-tab li.active p { color: #333333;}

.second-tabs { padding: 0 30px; height: 88px; position: relative; display: flex;}
.second-tabs:after { content: ''; width: 100%; height: 1px; background-color: #E8E8E8; position: absolute; bottom: 0; left: 0; transform: scaleY(.5);}
.second-tabs li { height: 100%; position: relative; font-size: 26px; color: #666666; margin-right: 50px; display: flex; align-items: center;}
.second-tabs li:last-child { margin-right: 0;}
.second-tabs li.active { color: #3A3A3A;}
.second-tabs li.active:after { content: ''; width: 100%; height: 5px; background-color: #3A3A3A; position: absolute; bottom: 0; left: 0;}
</style>

<template>
<div style="padding-bottom: 130rpx">
   <ul class="type-tab">
      <li v-for="(item, index) in typeList" :key="index" :class="{active: firstType === item.key}">
         <div><img :src="item.src + (firstType === item.key ? '-active' : '') + '.png'" mode="aspectFit"/></div>
         <p>{{item.name}}</p>
      </li>
   </ul>
   <div style="background-color: #ffffff; overflow: hidden;">
      <ul class="second-tabs">
         <li v-for="(item, index) in secondList" :key="index" :class="{active: secondType === item.id}">{{item.cname}}</li>
      </ul>

      <div class="goods-list">
         <c-goods-item v-for="i in 5" :key="i"/>
      </div>
   </div>

   <div class="load-over">- 没有更多商品 -</div>

   <c-footer-nav active="goods"/>
</div>
</template>

<script>
import cGoodsItem from '@/components/goodsItem'
import cFooterNav from '@/components/footerNav'

export default {
   components: { cGoodsItem, cFooterNav },
   data () {
      return {
         firstType: '1',
         typeList: [
            { name: '护 肤', src: '/static/images/goods/icon1', key: '1' },
            { name: '彩 妆', src: '/static/images/goods/icon2', key: '2' },
            { name: '美妆工具', src: '/static/images/goods/icon3', key: '3' },
            { name: '套 装', src: '/static/images/goods/icon4', key: '4' }
         ],
         secondType: '1',
         secondList: [
            { cname: '面膜', id: '1' },
            { cname: '卸妆', id: '2' },
            { cname: '精华', id: '3' }
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
