<style>
.c-order-type { margin: 50px 42px 60px 42px; }
.c-order-type h3 { color: #CBBB9B; font-size: 40px; line-height: 60px; font-weight: bold }
.c-order-type h3.en { font-size: 34px; font-family: Helve; line-height: 40px; font-weight: normal; margin-bottom: 6px; }
.c-order-type p { color: #9B9A9A; font-size: 30px; line-height: 45px; }
.c-order-type ul { margin-top: 26px; display: flex; flex-wrap: wrap; }
.c-order-type ul li { width: 50%; height: 126px; display: flex; align-items: center; padding-left: 20px; box-sizing: border-box; position: relative; }
.c-order-type ul li:after { content: ''; width: 100%; height: 1px; background-color: #D1CECE; position: absolute; left: 0; bottom: 0; transform: scaleY(.5); }
.c-order-type ul li:nth-child(2n) { padding-left: 58px; }
.c-order-type ul li:nth-child(2n):before { content: ''; width: 1px; height: 100%; background-color: #D1CECE; position: absolute; left: 0; top: 0; transform: scaleX(.5); }
.c-order-type ul li:nth-last-child(1):after { height: 0; }
.c-order-type ul li:nth-last-child(2):after { height: 0; }
.c-order-type ul li .left { width: 140px; }
.c-order-type ul li .left p { font-size: 20px; line-height: 30px; color: var(--textColor); text-shadow: var(--textShadow); }
.c-order-type ul li .left div { font-size: 44px; line-height: 52px; font-family: HelveThin; color: #9C9A9B; text-shadow: var(--textShadow); position: relative; }
.c-order-type ul li .left div:after { content: ''; width: 90%; height: 2px; background-color: #D0BB98; position: absolute; top: 50%; left: 0; }
.c-order-type ul li .left div span { font-size: 18px; }
.c-order-type ul li .price { font-size: 44px; line-height: 52px; font-family: HelveThin; color: var(--textColor); text-shadow: var(--textShadow); }
.c-order-type ul li .price span { font-size: 18px; }
</style>

<template>
<div class="c-order-type">
   <h3>订购类型</h3>
   <h3 class="en">Order type</h3>
   <p>一次性付款，定时配送，不再担心缺量断粮。</p>
   <p>订单满138元免运费（偏远地区除外）</p>
   <ul>
      <li v-for="(item, index) in list" :key="index">
         <div class="left">
            <p>订购{{item.name}}</p>
            <div>{{item.old_price}}<span>元</span></div>
         </div>
         <div class="price">{{item.pay_price}}<span>元</span></div>
      </li>
   </ul>
</div>
</template>

<script type='es6'>
export default {
  name: 'app',
   props: {
     list: Array
   },
  data () {
    return {}
  },
  methods: {}
}
</script>
