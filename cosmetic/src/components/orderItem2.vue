<style>
.c-cart-item { width: 100%; height: 234px; background-color: #ffffff; display: flex; align-items: center; margin-top: 20px;}
.c-cart-item-img { width: 200px; height: 200px; margin-left: 40px;}
.c-cart-item-infos { width: 480px; height: 200px; display: flex; flex-direction: column; justify-content: space-between; margin-left: 20px;}
.c-cart-item-title { font-size: 28px; color: #333333; margin-bottom: 20px;}
.c-cart-item-tag { display: flex; flex-wrap: wrap;}
.c-cart-item-tag li { color: #999999; font-size: 28px; margin: 0 10px 10px 0;}
.c-cart-item-bottom { display: flex; justify-content: space-between; margin-bottom: 10px;}
.c-cart-item-price { font-size: 36px; color: #323232; font-weight: bold;}
.c-cart-item-nums { font-size: 26px; color: #2A2A2A;}
</style>

<template>
<div class="c-cart-item">
   <img src="/static/images/index/img3.png" mode="aspectFit" class="c-cart-item-img"/>
   <div class="c-cart-item-infos">
      <div>
         <h3 class="c-cart-item-title">订单号：154154415454</h3>
         <div class="c-cart-item-bottom">
            <ul class="c-cart-item-tag">
               <li>已选规格：500ml</li>
            </ul>
            <div class="c-cart-item-nums">待支付</div>
         </div>
      </div>
      <div class="c-cart-item-bottom">
      <h3 class="c-cart-item-price">￥299.99</h3>
         <slot name="btns"></slot>
      </div>
   </div>
</div>
</template>

<script type='es6'>
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
         check: false
      }
   },
   methods: {
      change (e) {
         this.check = e.mp.detail
      }
   }
}
</script>
