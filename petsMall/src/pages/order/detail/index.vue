<style>
page { background-color: #F3F2F1; }
.container { padding: 300px 0 200px 0;}
.details-container .c-info-card { margin: 0; border-radius: 0; padding: 30px 66px 10px 66px; box-shadow: none; }
.status { height: 246px; display: flex; justify-content: center; align-items: center; }
.status .success { width: 74px; height: 70px; margin-right: 20px; }
.status .box { width: 58px; height: 59px; margin-right: 20px; }
.status .clock { width: 70px; height: 70px; margin-right: 20px; }
.status span { font-size: 100px; color: #D1CECE; }
.status .btn-round { width: 345px; }
.btn-call { width: 138px; background-color: #ffffff; color: var(--textColor2); position: absolute; top: 50px; right: 66px; }
</style>

<template>
<div class="container">
   <c-header title="订单详情|Order details" titleColor="#E8E6E4" />
   <div class="details-container">
      <c-info-card :itemData="formData" />
      <div class="status" v-if="detailData.status === '7'">
         <img src="/static/images/order/success.png" class="success" />
         <span>已完成</span>
      </div>
      <div class="status" v-else-if="detailData.status === '7'">
         <img src="/static/images/order/box.png" class="box" />
         <button class="btn-round">{{detailData.post_str}}</button>
      </div>
      <div class="status" v-else-if="detailData.status === '4'">
         <img src="/static/images/order/clock.png" class="clock" />
         <span>待发货</span>
      </div>
      <div style="position: relative; margin-top: -42rpx;">
         <button class="btn-round btn-call">退款&联系</button>
         <c-goods-list title="购物清单" titleEn="Shopping list" :list="goodsList" />
      </div>
   </div>
</div>
</template>

<script>
import cHeader from '@/components/header'
import cGoodsList from '@/components/goodsList'
import cInfoCard from '../modules/infoCard'
import { getAction } from '@/utils/api'
import { formatDate } from '@/utils'
import store from '@/store'

export default {
   components: {
      cHeader,
      cInfoCard,
      cGoodsList
   },

   data () {
      return {
         orderNum: '',
         detailData: {},
         formData: {},
         goodsList: []
      }
   },
   methods: {
      getData () {
         getAction('order_desc', {
            token: store.state.token,
            order_num: this.orderNum
         }).then(res => {
            this.detailData = res.data
            this.formData = {
               name: res.data.name,
               mobile: res.data.mobile,
               province: res.data.province,
               city: res.data.city,
               area: res.data.area,
               address: res.data.address,
               orderNum: res.data.order_num,
               orderTime: formatDate(new Date(res.data.order_time * 1000), 'yyyy/MM/dd HH:mm')
            }
            this.goodsList = res.data.desc_list
         })
      }
   },
   onLoad (options) {
      this.orderNum = options.orderNum || 'T2021020321351020'
      this.getData()
   }
}
</script>
