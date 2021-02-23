<style>
.title { margin: 38px 45px 80px 45px;}
.title p { font-size: 40px; color: #CBBB9B; margin-bottom: 10px; }
.title div { font-size: 32px; color: #CBBB9B; font-family: Helve; }

.goods-list { margin: 0 45px; }
.goods-list .c-index-goods-item { margin-bottom: 60px; }

.hr { margin: 120px 45px 50px 45px; height: 1px; background-color: #D1CECE; transform: scaleY(.5); }

.index-container {
   padding-bottom: 70px;
}
</style>

<template>
<div class="container index-container">
   <c-header menu />
   <c-nav :list="typeList" />
   <div class="title">
      <p>推荐猫盒</p>
      <div>Recommend cat box</div>
   </div>
   <div class="goods-list">
      <c-goods-item v-for="item in catBoxList" :itemData="item" :key="id" />
   </div>
   <div class="hr"></div>
   <div class="title">
      <p>推荐产品</p>
      <div>Recommend products</div>
   </div>
   <div class="goods-list">
      <c-goods-item v-for="item in goodsList" :itemData="item" :key="id" />
   </div>
</div>
</template>

<script>
import cHeader from '@/components/header'
import cNav from './modules/nav'
import cGoodsItem from './modules/goodsItem'
import { getAction } from '../../utils/api'

export default {
   components: {
      cHeader,
      cNav,
      cGoodsItem
   },
   data () {
      return {
         typeList: [],
         catBoxList: [],
         goodsList: []
      }
   },
   created () {
      getAction('type_list').then(res => {
         this.typeList = res.data
      })
   },
   onShow () {
      this.getGoods()
   },
   methods: {
      getGoods () {
         getAction('index_recommend').then(res => {
            this.goodsList = res.data.product_list
            this.catBoxList = res.data.group_list
         })
      }
   }
}
</script>
