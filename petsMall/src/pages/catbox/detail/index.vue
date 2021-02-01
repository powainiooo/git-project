<style>
page { background-color: #F3F2F1; }
.container { padding: 300px 0 200px 0;}
.catbox-detail .c-goods-list { margin-top: -100px; position: relative; z-index: 2; }

</style>

<template>
<div class="container">
   <div>
      <c-header title="猫盒详情|Contents of the cat box" />
      <div class="catbox-detail">
         <img src="/static/images/img1.jpg" mode="widthFix" style="width: 100%;" />
         <c-goods-list title="滋益巅峰® 猫盒套餐" titleEn="Ziwipeak® Cat box" titleIcon="cat" />
         <c-goods-detail />
         <c-order-type />
      </div>
   </div>
   <c-footer btnName="我要订购|Order" />

   <c-order-type-modal />
</div>
</template>

<script>
import cHeader from '@/components/header'
import cFooter from '@/components/footer'
import cGoodsList from '@/components/goodsList'
import cGoodsDetail from '@/components/goodsDetail'
import cOrderType from './modules/orderType'
import cOrderTypeModal from '../modules/orderType'

export default {
   components: {
      cHeader,
      cFooter,
      cGoodsList,
      cGoodsDetail,
      cOrderType,
      cOrderTypeModal
   },

   data () {
      return {}
   },

   created () {
   }
}
</script>
