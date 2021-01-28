<style>
.c-list-item { width: 278px; height: 474px; padding-top: 58px; box-sizing: border-box; }
.c-list-item .imgs { width: 278px; height: 220px; background-color: #E8E6E4; border-radius: 28px; margin-bottom: 10px; position: relative; }
.c-list-item .imgs img { width: 278px; height: 278px; display: block; position: absolute; left: 0; bottom: 0; }
.c-list-item .en { font-size: 26px; color: var(--textColor2); text-shadow: var(--textShadow); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-family: HelveThin; line-height: 32px; margin-bottom: 5px; }
.c-list-item .cn { font-size: 22px; color: var(--textColor2); text-shadow: var(--textShadow); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; line-height: 32px; margin-bottom: 5px; }
.c-list-item .price { font-size: 54px; color: var(--textColor2); text-shadow: var(--textShadow); font-family: HelveThin; }
.c-list-item .price span { font-size: 22px; }
</style>

<template>
<div class="c-list-item" @click="toDetail">
   <div class="imgs"><img :src="itemData.cover" /></div>
   <div class="en">{{itemData.english_name}}</div>
   <div class="cn">{{itemData.china_name}}</div>
   <div class="price">{{itemData.price}}<span>元</span></div>
</div>
</template>

<script type='es6'>
export default {
  name: 'app',
   props: {
     itemData: Object
   },
  data () {
    return {}
  },
  methods: {
     toDetail () {
        mpvue.navigateTo({
           url: `/pages/goods/detail/main?id=${this.itemData.id}`
        })
     }
  }
}
</script>
