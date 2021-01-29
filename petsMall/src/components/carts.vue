<style>
.c-cart { width: 100%; position: fixed; bottom: 0; left: 0; z-index: 1000; transition: bottom .5s cubic-bezier(.23,.78,.33,.97); }
.c-cart .c-footer { position: static; width: 100%;}
.c-cart-headers { background-color: var(--mainColor); height: 170px; border-radius: 15px 15px 0 0; display: flex; justify-content: space-between; align-items: center; padding: 0 66px; }
.c-cart-headers .title p { font-size: 36px; color: #ffffff; text-shadow: var(--textShadow); }
.c-cart-headers .title p.en { font-size: 40px; font-family: HelveThin; margin-bottom: 8px; }
.c-cart-headers img { width: 56px; height: 56px; }

.c-cart-list { width: 100%; height: 60vh; overflow-y: auto; background-color: #ffffff; }
.c-cart-item { margin: 0 42px; height: 184px; display: flex; align-items: center; }
.c-cart-item .btn-del { width: 40px; height: 100%; display: flex; align-items: center; }
.c-cart-item .btn-del img { width: 20px; height: 20px; }
.c-cart-item .imgs { width: 134px; height: 108px; background-color: #E8E6E4; border-radius: 15px; position: relative; margin-top: 28px; }
.c-cart-item .imgs img { width: 134px; height: 134px; position: absolute; left: 0; bottom: 0; }
.c-cart-item .c-cart-item-infos { width: 400px; margin-left: 32px; }
.c-cart-item .c-cart-item-infos p { font-size: 30px; color: var(--textColor); text-shadow: var(--textShadow); }
.c-cart-item .c-cart-item-infos p.en { font-size: 34px; color: var(--textColor2); }
.c-cart-item .c-cart-item-infos .tabs { display: flex; margin-top: 16px; }
.c-cart-item .c-cart-item-infos .tabs li { border: 1px solid var(--mainColor); padding: 5px 8px; color: #A6A5A5; font-size: 20px; margin-right: 8px; line-height: 1; }
.c-cart-item .nums { width: 48px; height: 48px; background-color: var(--mainColor); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 22px; color: #ffffff; font-family: Helve; }
</style>

<template>
<div class="c-cart" :style="{bottom: showCart ? 0 : '-100vh'}">
   <div class="c-cart-headers">
      <div class="title">
         <p class="en">Shopping cart</p>
         <p>购物车</p>
      </div>
      <img src="/static/images/header/close.png" @click="hideCart" />
   </div>
   <div class="c-cart-list">
      <div class="c-cart-item borderB" v-for="item in 6">
         <div class="btn-del"><img src="/static/images/header/close2.png" /></div>
         <div class="imgs"><img src="/static/images/img0.png" /></div>
         <div class="c-cart-item-infos">
            <p class="en">Ziwipeak® Cat food</p>
            <p>滋益巅峰</p>
            <ul class="tabs">
               <li>鸡肉味</li>
               <li>鸡肉味</li>
            </ul>
         </div>
         <div class="nums">9</div>
      </div>
   </div>
   <c-footer btnName="结算|Settlement" price="1740" />
</div>
</template>

<script type='es6'>
import cFooter from '@/components/footer'
import store from '../store'
export default {
   name: 'app',
   components: {
      cFooter
   },
   computed: {
      showCart () {
         return store.state.showCart
      }
   },
   data () {
      return {}
   },
   methods: {
      hideCart () {
         store.commit('SET_CARTSTATUS', false)
      }
   }
}
</script>
