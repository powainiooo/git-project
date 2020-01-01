<style scoped>
@import "../../assets/css/animate.min.css";
.z-cart { width: 1470px; height: 100vh; position: fixed; top: 0; right: -30px; background-color: #000000; z-index: 1500; display: flex;}
.z-cart .btn-close { width: 100px; height: 100px; font-size: 90px; position: absolute; top: 0; left: -100px;}
.cart-frame { width: 800px; border-right: 1px solid #acacac; margin: 60px 0; position: relative;}
.cart-frame h3 { font-size: 80px; color: #ffffff; font-family: TTHBold; margin-left: 50px; margin-bottom: 50px;}
.cart-frame .total { width: 700px; border-top: 1px solid #ffd400; display: flex; justify-content: space-between; align-items: center; padding-top: 10px; position: absolute; left: 50px; bottom: 50px;}
.cart-frame .total div { font-size: 16px; font-family: TTHBold; color: #ffd400;}
.cart-frame .total div span { font-size: 36px; font-family: TTHBold;}
.personal-frame { margin: 90px 0 0 40px; position: relative;}
.personal-frame h3 { font-size: 48px; color: #ffffff; font-family: TTHBold; margin-bottom: 68px;}
.personal-frame .btn1 { position: absolute; bottom: 125px; left: 0;}
.z-cart.slideInRight { animation: slideInRight 0.4s cubic-bezier(.26,.72,.81,1.13)}
.z-cart.slideOutRight { animation: slideOutRight 0.4s ease-out}
</style>

<template>
<transition enter-active-class="slideInRight" leave-active-class="slideOutRight">
<div class="z-cart" v-if="show">
   <a href="javascript:;" class="btn1 btn-close" @click="doClose"><Icon type="ios-close" /></a>
   <div class="cart-frame">
      <h3>Cart</h3>
      <cart-item type="cart" class="mb20 ml50"></cart-item>
      <cart-item type="cart" class="mb20 ml50"></cart-item>
      <div class="total">
         <div>Total</div>
         <div class="price">RMB<span>13,998</span></div>
      </div>
   </div>
   <div class="personal-frame">
      <h3>Personal information</h3>
      <div class="mb15"><input type="text" class="z-input" placeholder="Name" style="width: 330px"/></div>
      <div class="mb15"><input type="text" class="z-input" placeholder="Mobile Phone" style="width: 330px"/></div>
      <div class="mb15">
         <Select class="z-select" style="width:200px; margin-right: 20px;">
            <Option value="1">Arizona</Option>
         </Select>
         <Select class="z-select" style="width:200px; margin-right: 20px;">
            <Option value="1">Chandler</Option>
         </Select>
      </div>
      <div class="mb15"><input type="text" class="z-input" placeholder="Address" style="width: 330px"/></div>
      <a href="#" class="btn1">Confirm & Pay</a>
   </div>
</div>
</transition>
</template>

<script type='es6'>
import cartItem from '@/components/cartItem.vue'
export default {
   name: 'app',
   components: { cartItem },
   props: ['show'],
   data () {
      return {}
   },
   methods: {
      doClose () {
         this.$emit('update:show', false)
      }
   }
}
</script>
