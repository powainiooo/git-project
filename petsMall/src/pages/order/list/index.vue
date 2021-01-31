<style>
page { background-color: #F3F2F1; }
.container { padding: 300px 0 200px 0;}
.order-list { margin-top: 80px; }
.order-list .c-order-item { margin-bottom: 46px; }

.footer-btn { width: 100%; height: 200px; display: flex; position: fixed; left: 0; bottom: 0; z-index: 1000; box-shadow: 0 10px 20px 10px rgba(0, 0, 0, 0.05); }
.footer-btn button { flex: 1; background-color: #E6E3E1; height: 100%; box-sizing: border-box; font-size: 36px; color: #9D9C9C; line-height: 1; padding-top: 66px; border-radius: 0; }
.footer-btn button.active { color: #ffffff; background-color: var(--mainColor); }
</style>

<template>
<div class="container">
   <c-header title="已订购订单|Booked order" />
   <div class="order-list">
      <order-item />
      <order-item />
      <order-item />
   </div>

   <div class="footer-btn">
      <button>已订购猫盒</button>
      <button class="active">已订购产品</button>
   </div>
</div>
</template>

<script>
import cHeader from '@/components/header'
import cFooter from '@/components/footer'
import orderItem from '../modules/orderItem'

export default {
   components: {
      cHeader,
      cFooter,
      orderItem
   },

   data () {
      return {}
   },

   created () {
   }
}
</script>
