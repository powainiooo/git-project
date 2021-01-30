<style>
page { background-color: #F3F2F1; }
.container { padding: 300px 0 200px 0;}
.catbox-detail .c-goods-list { margin-top: -100px; position: relative; z-index: 2; }
.order-type { margin: 50px 42px 60px 42px; }
.order-type h3 { color: #CBBB9B; font-size: 40px; line-height: 60px; }
.order-type h3.en { font-size: 34px; font-family: Helve; line-height: 40px; margin-top: 8px; }
.order-type p { color: #9B9A9A; font-size: 30px; line-height: 45px; }
.order-type ul { margin-top: 26px; display: flex; flex-wrap: wrap; }
.order-type ul li { width: 50%; height: 126px; display: flex; align-items: center; padding-left: 20px; box-sizing: border-box; }
.order-type ul li:nth-child(2n) { padding-left: 58px; }
.order-type ul li .left { width: 140px; }
.order-type ul li .left p { font-size: 20px; line-height: 30px; color: var(--textColor); text-shadow: var(--textShadow); }
.order-type ul li .left div { font-size: 44px; line-height: 52px; font-family: HelveThin; color: #9C9A9B; text-shadow: var(--textShadow); position: relative; }
.order-type ul li .left div:after { content: ''; width: 90%; height: 1px; background-color: #D0BB98; position: absolute; top: 50%; left: 0; }
.order-type ul li .left div span { font-size: 18px; }
.order-type ul li .price { font-size: 44px; line-height: 52px; font-family: HelveThin; color: var(--textColor); text-shadow: var(--textShadow); }
.order-type ul li .price span { font-size: 18px; }
</style>

<template>
<div class="container">
   <c-header title="猫盒详情|Contents of the cat box" />
   <div class="catbox-detail">
      <img src="/static/images/img1.jpg" mode="widthFix" style="width: 100%;" />
      <c-goods-list title="滋益巅峰® 猫盒套餐" titleEn="Ziwipeak® Cat box" titleIcon="cat" />

      <div class="order-type">
         <h3>订购类型</h3>
         <h3 class="en">Order type</h3>
         <p>一次性付款，定时配送，不再担心缺量断粮。</p>
         <p>订单满138元免运费（偏远地区除外）</p>
         <ul>
            <li class="borderB borderR">
               <div class="left">
                  <p>订购一个月</p>
                  <div>1290<span>元</span></div>
               </div>
               <div class="price">1290<span>元</span></div>
            </li>
            <li class="borderB">
               <div class="left">
                  <p>订购一个月</p>
                  <div>1290<span>元</span></div>
               </div>
               <div class="price">1290<span>元</span></div>
            </li>
            <li class="borderT borderR">
               <div class="left">
                  <p>订购一个月</p>
                  <div>1290<span>元</span></div>
               </div>
               <div class="price">1290<span>元</span></div>
            </li>
            <li class="borderT">
               <div class="left">
                  <p>订购一个月</p>
                  <div>1290<span>元</span></div>
               </div>
               <div class="price">1290<span>元</span></div>
            </li>
         </ul>
      </div>
   </div>
   <c-footer btnName="我要订购|Order" />
</div>
</template>

<script>
import cHeader from '@/components/header'
import cFooter from '@/components/footer'
import cGoodsList from '@/components/goodsList'

export default {
   components: {
      cHeader,
      cFooter,
      cGoodsList
   },

   data () {
      return {}
   },

   created () {
   }
}
</script>
