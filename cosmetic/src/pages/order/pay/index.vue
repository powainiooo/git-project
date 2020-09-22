<style>
page { background-color: rgb(248, 248, 248)}

.address-frame { margin: 0 0 44px 0; height: 200px; position: relative; background-color: #ffffff; font-size: 30px; color: #2F2F2F; display: flex; align-items: center;}
.address-frame img { width: 40px; height: 56px; margin: 0 44px 0 36px;}
.address-frame div { width: 520px;}
.address-frame div h3 { font-size: 28px; color: #333333; margin-bottom: 20px;}
.address-frame div h3 span { font-size: 30px; color: #999999; margin-left: 20px;}
.address-frame div p { font-size: 26px; color: #333333; line-height: 40px;}

.order-info-frame { margin-top: 30px; margin-bottom: 0; border-bottom: 1px solid #C7C7C7;}
.order-info-frame img { width: 47px; height: 63px; margin: 0 32px 0 36px;}
.order-info-frame div h3 { color: #2F2F2F;}
.order-info-frame div h3:last-child { margin-bottom: 0;}
.order-info-frame div h3 span { color: #666666;}

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
   <div class="address-frame order-info-frame">
      <img src="/static/images/order/dingdan@2x.png" />
      <div>
         <h3>订单编号 <span>ABVC4564457454544</span></h3>
         <h3>创建时间 <span>2017-02-20 13:5454</span></h3>
      </div>
   </div>
   <div class="address-frame link-arrow">
      <img src="/static/images/order/address_icon@2x.png" />
      <div>
         <h3>张三 <span>15885244565</span></h3>
         <p>广东省深圳市西丽区桃园街道某某某某社区某某某小区</p>
      </div>
   </div>

   <c-order-item />
   <c-order-item />

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
   </div>

   <div class="details">
      <ul>
         <li style="margin-bottom: 40px;">
            <span style="color: #333333">发票信息</span>
            <span style="color: #333333">添加发票信息</span>
         </li>
         <li>
            <span>发票类型</span>
            <span>￥2100</span>
         </li>
         <li>
            <span>发票抬头</span>
            <span>￥2100</span>
         </li>
         <li>
            <span>税号</span>
            <span>￥2100</span>
         </li>
         <li>
            <span>电子邮箱</span>
            <span>￥2100</span>
         </li>
      </ul>
   </div>

   <div class="footer-btn">
      <button>确认支付</button>
   </div>
</div>
</template>

<script>
import cOrderItem from '@/components/orderItem'

export default {
   components: { cOrderItem },
   data () {
      return {
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
