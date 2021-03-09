<style>
page { background-color: #F3F2F1; }
.container { padding: 300px 0 200px 0;}
.details-container .c-info-card { margin: 0; border-radius: 0; padding: 30px 66px 10px 66px; box-shadow: none; }
.status { height: 246px; display: flex; justify-content: center; align-items: center; }
.status .success { width: 74px; height: 70px; margin-right: 20px; }
.status .box { width: 58px; height: 59px; margin-right: 20px; }
.status .clock { width: 70px; height: 70px; margin-right: 20px; }
.status span { font-size: 100px; color: #D1CECE; }
.status .btn-round { width: 345px; font-size: 24px; }
.btn-call { width: 152px; background-color: #ffffff; color: var(--textColor2); position: absolute; top: 50px; right: 66px; }
</style>

<template>
<div class="container">
   <c-header title="订单详情|Order details" titleColor="#E8E6E4" />
   <div class="details-container">
      <c-info-card :itemData="formData" v-if="source === 'catbox'" />
      <date-mark :list="dates"/>
      <div class="status" v-if="detailData.status === '7'">
         <img src="/static/images/order/success.png" class="success" />
         <span>{{statusHash[detailData.status]}}</span>
      </div>
      <div class="status" v-else-if="detailData.status === '5'">
         <img src="/static/images/order/box.png" class="box" />
         <button class="btn-round"
                 hover-class="hscale"
                 hover-stay-time="10"
                 @click="copyPost">{{detailData.post_str}}</button>
      </div>
      <div class="status" v-else-if="detailData.status === '4'">
         <img src="/static/images/order/clock.png" class="clock" />
         <span>{{statusHash[detailData.status]}}</span>
      </div>
      <div class="status" v-else>
         <span>{{statusHash[detailData.status]}}</span>
      </div>

      <div style="position: relative; margin-top: -42rpx;">
         <button class="btn-round btn-call" @click="$refs.refund.show = true">退款&联系</button>
         <c-goods-list
            :source="source"
            :title="title"
            :titleEn="titleEn"
            :list="goodsList"
            :recommendList="recList"
            onlyList />
      </div>
   </div>

   <refund-tips ref="refund" />
</div>
</template>

<script>
import cHeader from '@/components/header'
import cGoodsList from '@/components/goodsList'
import cInfoCard from '../modules/infoCard'
import dateMark from '../modules/dateMark'
import refundTips from '../modules/refundTips'
import { getAction } from '@/utils/api'
import { formatDate } from '@/utils'
import store from '@/store'

export default {
   components: {
      cHeader,
      cInfoCard,
      cGoodsList,
      dateMark,
      refundTips
   },

   data () {
      return {
         source: '',
         orderNum: '',
         title: '',
         titleEn: '',
         detailData: {},
         formData: {},
         goodsList: [],
         dates: [],
         statusHash: {
            '1': '', // 待付款
            '2': '', // 申请退款
            '3': '', // 已退款
            '4': '待发货',
            '5': '已发货',
            '6': '', // 已取消
            '7': '已完成'
         }
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
      },
      getCatboxData () {
         getAction('group_order_desc', {
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
               day: res.data.day,
               orderNum: res.data.order_num,
               orderTime: formatDate(new Date(res.data.order_time * 1000), 'yyyy/MM/dd HH:mm')
            }
            this.goodsList = res.data.product_list
            this.recList = res.data.recom_list
            this.dates = res.data.months
            this.title = res.data.title
            this.titleEn = res.data.english_name
         })
      },
      copyPost () {
         mpvue.setClipboardData({
            data: this.detailData.post_str,
            success (res) {
               console.log('setClipboardData', res)
            }
         })
      }
   },
   onLoad (options) {
      Object.assign(this.$data, this.$options.data())
      this.orderNum = options.orderNum || '202102261001'
      this.source = options.source || 'catbox'
      if (this.source === 'goods') {
         this.title = '购物清单'
         this.titleEn = 'Shopping list'
         this.getData()
      } else {
         this.getCatboxData()
      }
   }
}
</script>
