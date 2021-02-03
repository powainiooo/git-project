<style>
.c-goods-list {  margin: 42px 28px 32px 28px; box-shadow: 0 10px 20px 10px rgba(0, 0, 0, 0.05); border-radius: 15px; overflow: hidden; background-color: #ffffff; }
.c-goods-list-title { height: 170px; background-color: var(--mainColor); display: flex; flex-direction: column; justify-content: center; padding-left: 40px; background-repeat: no-repeat; background-position: right center; }
.c-goods-list-title p { font-size: 36px; line-height: 50px; color: #ffffff; text-shadow: var(--textShadow); }
.c-goods-list-title p.en { font-size: 40px; margin-bottom: 8px; font-family: HelveThin; }
.claw { background-image: url(data:image/png;base64,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); background-size: 220px; }
.cat { background-image: url(data:image/png;base64,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); background-size: 202px; }

.c-goods-item { margin: 0 38px; height: 194px; display: flex; align-items: center; }
.c-goods-item .imgs { width: 134px; height: 108px; background-color: #E8E6E4; border-radius: 15px; position: relative; margin-top: 28px; }
.c-goods-item .imgs img { width: 134px; height: 134px; position: absolute; left: 0; bottom: 0; }
.c-goods-item .c-goods-item-infos { width: 380px; margin-left: 32px; }
.c-goods-item .c-goods-item-infos p { font-size: 30px; color: var(--textColor); text-shadow: var(--textShadow); }
.c-goods-item .c-goods-item-infos p.en { font-size: 34px; color: var(--textColor2); font-family: HelveThin; }
.c-goods-item .c-goods-item-infos .tabs { display: flex; margin-top: 16px; }
.c-goods-item .c-goods-item-infos .tabs li { border: 1px solid var(--mainColor); padding: 5px 8px; color: #A6A5A5; font-size: 20px; margin-right: 8px; line-height: 1; }
.c-goods-item .nums { color: #A6A5A5; font-size: 20px; }
.c-goods-list-list .c-goods-item:last-child:after { height: 0;}

.c-goods-price { height: 180px; padding: 0 38px; display: flex; justify-content: space-between; align-items: center; }
.c-goods-price div p { font-size: 30px; color: var(--textColor); text-shadow: var(--textShadow); }
.c-goods-price div div { font-size: 20px; color: var(--textColor2); text-shadow: var(--textShadow); }
.c-goods-price div div.overline { color: #9C9A9B; position: relative; }
.c-goods-price div div.overline:after { content: ''; width: 160px; height: 1px; background-color: var(--mainColor); position: absolute; top: 50%; left: 0; }
.c-goods-price div div span { font-family: HelveThin; font-size: 66px; }
.c-goods-price .values { font-size: 66px; font-family: HelveThin; color: var(--textColor); text-shadow: var(--textShadow); }
.c-goods-price .values span { font-size: 22px; }

</style>

<template>
<div class="c-goods-list">
   <div class="c-goods-list-title" :class="[titleIcon]">
      <p class="en">{{titleEn}}</p>
      <p>{{title}}</p>
   </div>
   <ul class="c-goods-list-list borderB">
      <li class="c-goods-item borderB" v-for="item in list" :key="id">
         <div class="imgs" @click="openDetail"><img :src="item.small_img" /></div>
         <div class="c-goods-item-infos">
            <p class="en">{{item.english_name}}</p>
            <p>{{item.china_name}}</p>
            <ul class="tabs">
               <li>{{item.type_name}}</li>
            </ul>
         </div>
         <div class="nums">{{item.buy_num}}份/月</div>
      </li>
   </ul>
   <template v-if="recommendList.length > 0">
   <div class="c-goods-price">
      <div>
         <p>订购六个月</p>
         <div class="overline"><span>1920</span>元</div>
      </div>
      <div class="values">1230<span>元</span></div>
   </div>
   <div class="c-goods-list-title" style="border-radius: 0;">
      <p class="en">Recommend buy</p>
      <p>推荐选购</p>
   </div>
   <ul class="c-goods-list-list borderB">
      <li class="c-goods-item borderB">
         <div class="imgs" @click="openDetail"><img src="/static/images/img0.png" /></div>
         <div class="c-goods-item-infos">
            <p>滋益巅峰</p>
            <ul class="tabs">
               <li>鸡肉味</li>
               <li>鸡肉味</li>
            </ul>
         </div>
         <div class="nums">1份/月</div>
      </li>
   </ul>
   <div class="c-goods-price">
      <div>
         <p>订购六个月</p>
         <div><span>1920</span>元</div>
      </div>
      <div class="values">1230<span>元</span></div>
   </div>
   </template>

   <div class="c-goods-price" v-if="shipPrice !== 0">
      <div>
         <p>运费</p>
      </div>
      <div class="values">{{shipPrice}}<span>元</span></div>
   </div>
</div>
</template>

<script type='es6'>
import store from "../store"
export default {
   name: 'app',
   props: {
      title: String,
      titleEn: String,
      titleIcon: {
         type: String,
         default: 'claw'
      },
      list: Array,
      recommendList: {
         type: Array,
         default: () => []
      }
   },
   data () {
      return {
         shipPrice: 0
      }
   },
   methods: {
      openDetail () {
         store.commit('SET_GOODSDETAILSTATUS', true)
      }
   }
}
</script>
