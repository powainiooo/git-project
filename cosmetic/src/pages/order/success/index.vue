<style>
h3.title { font-size: 28px; color: #656565; text-align: center; margin: 40px 0 30px 0;}

.banner { width: 100%; height: 534px; background-color: #333333; position: relative; text-align: center;}
.banner img { width: 77px; height: 81px; margin: 180px 0 10px 0;}
.banner p { font-size: 32px; color: #ffffff;}

.card { width: 700px; margin: -120px auto 0 auto; position: relative; z-index: 2;}
.card img { width: 100%; height: 323px;}
.card .price { width: 616px; height: 156px; display: flex; justify-content: center; align-items: center; position: absolute; top: 0; left: 42px; font-size: 50px; color: #333333; border-bottom: 1px dashed #E7E7E7;}
.card ul { width: 600px; position: absolute; top: 206px; left: 50px;}
.card ul li { display: flex; justify-content: space-between; font-size: 22px; color: #666666; line-height: 1; margin-bottom: 26px;}

.btns { width: 586px; margin: 100px auto;}
.btns .btn-round { height: 90px; font-size: 34px; border: 1px solid #333333; color: #333333; background-color: transparent;}
</style>

<template>
<div>
   <div class="banner">
      <img src="/static/images/order/success.png" />
      <p>支付成功</p>
   </div>

   <div class="card">
      <img src="/static/images/order/frame.png" />
      <div class="price">￥{{price}}</div>
      <ul>
         <li>
            <span>订单编号</span>
            <span>{{orderNum}}</span>
         </li>
         <li>
            <span>下单时间</span>
            <span>{{timeStr}}</span>
         </li>
      </ul>
   </div>

   <div class="btns">
      <a class="btn-round">返回商家</a>
   </div>

   <div style="background-color: #ffffff; overflow: hidden;">
      <h3 class="title">猜你喜欢</h3>
      <div class="goods-list">
         <c-goods-item v-for="i in goodsList" :key="id" :itemData="i"/>
      </div>
   </div>

</div>
</template>

<script>
import cGoodsItem from '@/components/goodsItem'
import { postAction } from '@/utils/api'
import { formatTime } from '@/utils'

export default {
   components: { cGoodsItem },
   data () {
      return {
         orderNum: '',
         price: 0,
         timeStr: '',
         goodsList: []
      }
   },

   methods: {
      getData () {
         postAction('show_pay_status', {
            order_num: this.orderNum
         }).then(res => {
            if (res.ret === 0) {
               this.price = parseInt(res.data.order_info.order_amount) / 100
               this.timeStr = formatTime(new Date(res.data.order_info.order_time))
               this.goodsList = res.data.xg_goods_list
            }
         })
      }
   },

   onLoad (options) {
      this.orderNum = options.orderNum
      this.getData()
      // let app = getApp()
   }
}
</script>
