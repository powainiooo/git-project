<style scoped>
.c-cart { width: 100%; position: fixed; bottom: 0; left: 0; z-index: 1000; transition: bottom .5s cubic-bezier(.23,.78,.33,.97); background-color: #ffffff; }
.c-cart .c-footer { position: static; width: 100%;}
.c-cart-headers { background-color: var(--mainColor); height: 170px; border-radius: 15px 15px 0 0; display: flex; justify-content: space-between; align-items: center; padding: 0 66px; position: relative; z-index: 5; }
.c-cart-headers .title p { font-size: 36px; color: #ffffff; text-shadow: var(--textShadow); }
.c-cart-headers .title p.en { font-size: 40px; font-family: HelveThin; margin-bottom: 8px; }
.c-cart-headers img { width: 56px; height: 56px; }

.c-cart-list { width: 100%; height: 60vh; overflow-y: auto; position: relative; z-index: 5; }

</style>

<template>
<div class="c-cart" :style="{bottom: showCart ? 0 : '-100vh'}">
   <div class="mask-cover" @touchmove.stop="tmove" v-if="showCart" @click="hideCart"></div>
   <div class="c-cart-headers">
      <div class="title">
         <p class="en">Shopping cart</p>
         <p>购物车</p>
      </div>
      <img src="/static/images/header/close.png" @click="hideCart" />
   </div>
   <div class="c-cart-list">
      <carts-item v-for="item in list"
                  :key="id"
                  :record="item"
                  @del="handleDel"
                  @change="numsChange" />
   </div>
   <c-footer btnName="结算|Settlement" needAuth :price="allPrice" @btnFunc="toPage"  v-if="showCart" />
</div>
</template>

<script type='es6'>
import cFooter from '@/components/footer'
import cartsItem from './cartsItem'
import store from '../store'
import { getAction } from '../utils/api'

export default {
   name: 'app',
   props: {
      list: Array
   },
   components: {
      cFooter,
      cartsItem
   },
   computed: {
      showCart () {
         return store.state.showCart
      },
      allPrice () {
         const total = this.list.reduce((total, item) => {
            return total += Number(item.price) * Number(item.buy_num)
         }, 0)
         return parseFloat(total.toFixed(1))
      }
   },
   data () {
      return {
         isAjax: false
      }
   },
   methods: {
      tmove () {},
      hideCart () {
         store.commit('SET_CARTSTATUS', false)
      },
      toPage () {
         mpvue.navigateTo({
            url: '/pages/address/main?source=goods'
         })
      },
      handleDel (id) {
         if (this.isAjax) return
         this.isAjax = true
         getAction('del_shopping_cart', {
            token: store.state.token,
            cart_id: id
         }).then(res => {
            this.isAjax = false
            if (res.status === 0) {
               this.$emit('refresh')
            }
         })
      },
      numsChange (params) {
         console.log('numsChange', params)
         params.token = store.state.token
         getAction('update_shopping_nums', params).then(res => {
            if (res.status === 0) {
               this.$emit('refresh')
            }
         })
      }
   }
}
</script>
