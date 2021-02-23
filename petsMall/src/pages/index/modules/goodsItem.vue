<style>
.c-index-goods-item { display: flex; justify-content: space-between;}
.c-index-goods-item .img { width: 278px; height: 220px; background: #E8E6E4; border-radius: 28px; position: relative; margin-right: 32px;}
.c-index-goods-item .img img { width: 278px; height: 278px; position: absolute; left: 0; bottom: 0;}
.c-index-goods-item .info { width: 350px; display: flex; flex-direction: column; justify-content: space-between;}
.c-index-goods-item .info .name { font-size: 30px; color: var(--textColor); text-shadow: var(--textShadow2);}
.c-index-goods-item .info .name .en { font-size: 34px; color: var(--textColor2); font-family: HelveThin; }
.c-index-goods-item .info .bottom { display: flex; align-items: center; justify-content: space-between;}
.c-index-goods-item .info .bottom .price { font-size: 66px; color: var(--textColor2); text-shadow: var(--textShadow2); font-family: HelveThin;}
.c-index-goods-item .info .bottom .price span { font-size: 20px;}
.c-index-goods-item .info .bottom .btn-round { width: 138px;}
</style>

<template>
<div class="c-index-goods-item">
   <div class="img">
      <img :src="itemData.cover"/>
   </div>
   <div class="info">
      <div class="name">
         <p class="en">{{itemData.english_name}}</p>
         <p>{{itemData.china_name}}</p>
      </div>
      <div class="bottom">
         <div class="price">{{itemData.price}}<span>元 / 月</span></div>
         <button class="btn-round" @click="toDetail">立即订购</button>
      </div>
   </div>
</div>
</template>

<script type='es6'>
export default {
  name: 'app',
   props: {
     itemData: Object
   },
  data () {
    return {
    }
  },
  methods: {
     toDetail () {
        if (this.itemData.pricelist) {
           mpvue.navigateTo({
              url: `/pages/catbox/detail/main?id=${this.itemData.id}`
           })
        } else {
           mpvue.navigateTo({
              url: `/pages/goods/detail/main?id=${this.itemData.id}`
           })
        }
     }
  }
}
</script>
