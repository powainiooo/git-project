<style>
page { background-color: #F3F2F1; }
.container { padding: 300px 0 200px 0;}
.order-list { margin-top: 80px; }
.order-list .c-order-item { margin-bottom: 46px; }

.footer-btn { width: 100%; height: 200px; display: flex; position: fixed; left: 0; bottom: 0; z-index: 1000; box-shadow: 0 10px 20px 10px rgba(0, 0, 0, 0.05); }
.footer-btn button { flex: 1; background-color: #E6E3E1; height: 100%; box-sizing: border-box; font-size: 36px; color: #9D9C9C; line-height: 1; padding-top: 66px; border-radius: 0; }
.footer-btn button.active { color: #ffffff; background-color: var(--mainColor); }

.hint { font-size: 24px; color: #9B9A9A; text-align: center; margin: 50px; }
</style>

<template>
<div class="container">
   <c-header title="已购订单|Booked order" />
   <div class="order-list" v-if="listData.length > 0">
      <order-item v-for="item in listData" :key="id" :itemData="item" :type="type" />
   </div>
   <div class="hint-result" v-else>
      <img src="/static/images/goods/warn.png" mode="widthFix" style="width: 71rpx;" />
      <h3 class="en">No related content</h3>
      <h3>无相关内容！</h3>
   </div>
   <div class="hint" v-if="loadOver"></div>
   <div class="footer-btn">
      <button :class="{'active': type === 'catbox'}" @click="toggle('catbox')">已订购猫盒</button>
      <button :class="{'active': type === 'goods'}" @click="toggle('goods')">已订购产品</button>
   </div>
</div>
</template>

<script>
import cHeader from '@/components/header'
import cFooter from '@/components/footer'
import orderItem from '../modules/orderItem'
import { getAction } from '../../../utils/api'
import store from '../../../store'

export default {
   components: {
      cHeader,
      cFooter,
      orderItem
   },
   computed: {
      loadOver () {
         return this.total === this.listData.length
      },
      noMoreHint () {
         return this.loadOver
      }
   },
   data () {
      return {
         pageNo: 1,
         total: 0,
         type: 'goods',
         listData: []
      }
   },
   methods: {
      getData () {
         const url = this.type === 'goods' ? 'user_order' : 'group_order_list'
         getAction(url, {
            token: store.state.token,
            page: this.pageNo
         }).then(res => {
            // this.listData = this.listData.concat(res.data.list)
            // this.total = res.data.nums
            this.listData = res.data.list
         })
      },
      reset () {
         this.pageNo = 1
         this.listData = []
         this.getData()
      },
      toggle (type) {
         this.type = type
         this.reset()
      }
   },
   onReachBottom () {
      // if (this.loadOver) return
      // this.page += 1
      // this.getData()
   },
   onShow () {
      this.reset()
   },
   onLoad (options) {
      Object.assign(this.$data, this.$options.data())
      this.type = options.type || 'goods'
   }
}
</script>
