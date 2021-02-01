<style>
page { background-color: #F3F2F1; }
.container { padding: 300px 0 200px 0;}
</style>

<template>
<div class="container">
   <c-header title="确认订单|Order confirmation" />
   <div class="">
      <info-card edit />
      <goods-list title="滋益巅峰® 猫盒套餐" titleEn="Ziwipeak® Cat box" />
      <div class="hint-content">订单满138元免运费（偏远地区除外），不满138元则额外加收运费。</div>
      <div class="hint-content">所订购的猫盒套餐及推荐选购产品，每月将按以上产品清单及数量进行配送。</div>
   </div>
   <c-footer price="1740" btnName="结算|Settlement" />
</div>
</template>

<script>
import cHeader from '@/components/header'
import cFooter from '@/components/footer'
import infoCard from '../modules/infoCard'
import goodsList from '@/components/goodsList'

export default {
   components: {
      cHeader,
      cFooter,
      infoCard,
      goodsList
   },

   data () {
      return {}
   },

   created () {
   }
}
</script>
