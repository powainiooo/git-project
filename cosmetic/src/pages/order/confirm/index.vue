<style>
page { background-color: rgb(248, 248, 248)}

.address-none, .address-frame { margin: 30px 0 44px 0; height: 140px; position: relative; background-color: #ffffff; font-size: 30px; color: #2F2F2F; display: flex; align-items: center;}
.address-none img { width: 24px; height: 32px; margin: 0 24px 0 48px;}
.address-none:before, .address-frame:before { content: ''; width: 100%; height: 14px; background-color: rgb(242, 242, 242); position: absolute; bottom: -14px; left: 0; background-image: linear-gradient(-45deg,transparent 20%,#707070 20%,#707070 40%,transparent 40%,transparent 60%,#BEBEBE 60%,#BEBEBE 80%,transparent 80%); background-size: 46px 14px; background-repeat: repeat}

.address-frame { height: 200px;}
.address-frame img { width: 40px; height: 56px; margin: 0 44px 0 36px;}
.address-frame div { width: 520px;}
.address-frame div h3 { font-size: 28px; color: #333333; margin-bottom: 20px;}
.address-frame div h3 span { font-size: 30px; color: #999999; margin-left: 20px;}
.address-frame div p { font-size: 26px; color: #333333; line-height: 40px;}


.gift-hint { margin: 30px 0; background-color: #ffffff; padding: 0 24px 0 30px; height: 108px; display: flex; justify-content: space-between; align-items: center;}
.gift-hint h3 { font-size: 32px; line-height: 1; color: #333333; display: flex; align-items: center;}
.gift-hint h3 .sw { margin-right: 20px; margin-top: 5px;}
.gift-hint p { font-size: 24px; color: #747474; line-height: 40px; display: flex; align-items: center;}
.gift-hint p img { width: 22px; height: 25px; margin-left: 10px;}

.details { background-color: #ffffff; margin: 30px 0; overflow: hidden; padding: 70px 0 50px 0;}
.details ul { margin: 0 40px 60px 50px;}
.details ul li { display: flex; justify-content: space-between; font-size: 28px; color: #999999; margin-bottom: 20px;}
.details ul li span:first-child { color: #666666;}
.details div { font-size: 28px; color: #999999; text-align: right; margin-right: 30px;}
.details div span { font-size: 44px; color: #000000;}

.footer-btn { width: 100%; position: fixed; left: 0; bottom: 0; z-index: 1000;}
.footer-btn button { width: 100%; height: 120px; line-height: 120px; background-color: #3A3A3A; color: #ffffff; font-size: 40px; border-radius: 0; border: none;}
</style>

<template>
<div style="padding-bottom: 130rpx">
   <div class="address-none link-arrow" v-if="!hasAddress">
      <img src="/static/images/order/address_icon@2x.png" />
      添加收货地址
   </div>
   <div class="address-frame link-arrow" v-else>
      <img src="/static/images/order/address_icon@2x.png" />
      <div>
         <h3>张三 <span>15885244565</span></h3>
         <p>广东省深圳市西丽区桃园街道某某某某社区某某某小区</p>
      </div>
   </div>

   <c-order-item />
   <c-order-item />

   <div class="gift-hint">
      <h3><van-switch :checked="giftCheck" @change="giftChange" size="28rpx" active-color="#333333" class="sw"/>使用积分抵扣</h3>
      <p>本次使用了60积分抵扣6元 <img src="/static/images/order/jifen@2x.png" /></p>
   </div>

   <div class="details">
      <ul>
         <li>
            <span>总价</span>
            <span>￥2100</span>
         </li>
         <li>
            <span>运费</span>
            <span>￥2100</span>
         </li>
         <li>
            <span>积分抵扣</span>
            <span>￥2100</span>
         </li>
         <li>
            <span>总金额</span>
            <span>￥2100</span>
         </li>
         <li>
            <span>可得积分</span>
            <span>￥2100</span>
         </li>
      </ul>
      <div>实际付款：<span>￥900</span></div>
   </div>

   <div class="footer-btn">
      <button>请填写收货地址</button>
   </div>
</div>
</template>

<script>
import cOrderItem from '@/components/orderItem'

export default {
   components: { cOrderItem },
   data () {
      return {
         giftCheck: true,
         hasAddress: true
      }
   },

   methods: {
      giftChange (e) {
         this.giftCheck = e.mp.detail
      }
   },

   created () {
      // let app = getApp()
   }
}
</script>
