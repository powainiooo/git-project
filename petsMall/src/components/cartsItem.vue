<style scoped>
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
.c-cart-item .nums { width: 48px; height: 48px; background-color: var(--mainColor); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 22px; color: #ffffff; }
</style>

<template>
<div class="c-cart-item borderB">
   <div class="btn-del" @click="handleDel(record.id)"><img src="/static/images/header/close2.png" /></div>
   <div class="imgs"><img :src="record.small_img" /></div>
   <div class="c-cart-item-infos">
      <p class="en">{{record.englist_name}}</p>
      <p>{{record.china_name}}</p>
      <ul class="tabs">
         <li>{{record.type_name}}</li>
      </ul>
   </div>
   <picker :range="numsList" @change="numsChange">
      <div class="nums">{{record.buy_num}}</div>
   </picker>
</div>
</template>

<script type='es6'>
export default {
  name: 'app',
   props: {
      record: Object
   },
   computed: {
      numsList () {
         let arr = []
         const nums = Number(this.record.nums) || 20
         const buyNum = nums > 20 ? 20 : nums
         for (let i = 0; i < buyNum; i++){
            arr.push(i + 1)
         }
         return arr
      }
   },
  data () {
    return {}
  },
  methods: {
     handleDel (id) {
        this.$emit('del', id)
     },
     numsChange (e) {
        this.$emit('change', {
           cart_id: this.record.id,
           nums: this.numsList[e.mp.detail.value]
        })
     }
  }
}
</script>
