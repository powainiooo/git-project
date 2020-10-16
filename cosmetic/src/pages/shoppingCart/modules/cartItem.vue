<style>
.c-cart-item { width: 100%; height: 234px; background-color: #ffffff; display: flex; align-items: center; margin-top: 20px;}
.c-cart-item-cb { margin: 0 26px 0 44px;}
.c-cart-item-img { width: 200px; height: 200px;}
.c-cart-item-infos { width: 420px; height: 200px; display: flex; flex-direction: column; justify-content: space-between; margin-left: 20px;}
.c-cart-item-title { font-size: 32px; color: #262626; margin-bottom: 10px;}
.c-cart-item-tag { display: flex; flex-wrap: wrap;}
.c-cart-item-tag li { padding: 4px 14px; background-color: #F9F9F9; color: #CBCBCB; font-size: 22px; border-radius: 5px; margin: 0 10px 10px 0;}
.c-cart-item-bottom { display: flex; justify-content: space-between; margin-bottom: 10px;}
.c-cart-item-price { font-size: 36px; color: #323232; font-weight: bold;}

.c-cart-item-nums { width: 170px; height: 46px; border: 1px solid #D1D1D1; border-radius: 5px; display: flex; margin-right: 20px;}
.c-cart-item-nums li { height: 100%; display: flex; justify-content: center; align-items: center; color: #D1D1D1}
.c-cart-item-nums-btn { width: 50px; font-size: 40px;}
.c-cart-item-nums-val { width: 70px; font-size: 28px; border-left: 1px solid #D1D1D1; border-right: 1px solid #D1D1D1;}
</style>

<template>
<div class="c-cart-item" @click="doSelect">
   <van-checkbox shape="square" :name="itemData.id" checked-color="#333333" icon-size="26rpx" class="c-cart-item-cb"  @click.stop="tap"/>
   <img :src="imgSrc + itemData.cover" mode="aspectFit" class="c-cart-item-img"/>
   <div class="c-cart-item-infos">
      <div>
         <h3 class="c-cart-item-title">{{itemData.goods_name}}</h3>
         <ul class="c-cart-item-tag">
            <li>{{itemData.attr_name}}</li>
         </ul>
      </div>
      <div class="c-cart-item-bottom">
         <h3 class="c-cart-item-price">￥{{itemData.price / 100}}</h3>
         <ul class="c-cart-item-nums">
            <li class="c-cart-item-nums-btn" @click.stop="changeNum('reduce')">-</li>
            <li class="c-cart-item-nums-val">{{buyNum}}</li>
            <li class="c-cart-item-nums-btn" @click.stop="changeNum('add')">+</li>
         </ul>
      </div>
   </div>
</div>
</template>

<script type='es6'>
import { postAction } from '@/utils/api'
export default {
   name: 'app',
   props: {
      itemData: {
         type: Object,
         default: () => {}
      },
      buyNum: String
   },
   data () {
      return {
         imgSrc: mpvue.imgSrc,
         check: false
      }
   },
   methods: {
      changeNum (op) {
         postAction('cart_nums_update', {
            id: this.itemData.id,
            op
         }).then(res => {
            if (res.ret === 0) {
               this.$emit('update:buyNum', res.data)
            }
         })
      },
      doSelect () {
         this.$emit('select', this.itemData.id)
      },
      tap () {}
   }
}
</script>
