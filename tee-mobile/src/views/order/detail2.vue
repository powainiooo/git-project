<style scoped>

</style>

<template>
<div class="container ovh">
  <div class="infos-line">
    <button class="btn">{{storeData.shop_name}}</button>
    <button class="btn-circle"><img src="@/assets/img/home.png" class="w28" /></button>
  </div>
  <div class="container2 container3 ovh order-detail" style="padding-top: 0;">
    <div class="header between">
      <div>
        <div class="f54 DinB" style="line-height: 27px;">{{record.fetch_code || '--'}}</div>
        <div class="f20 c-9e">{{record.created_at}}</div>
      </div>
      <div class="flex">
        <button class="btn btn-style4 mr20" @click="handleRefund">退款</button>
        <button class="btn btn-style1">{{record.phone}}</button>
      </div>
    </div>
    <div class="status-frame">
      <div class="tc mt100" v-if="record.status === 4">
        <button class="btn btn-style1" @click="handleDone">确认提货</button>
      </div>
      <div class="mt60" v-if="record.status === 7">
        <p class="f52 DinB tc">Finish</p>
        <p class="f52 tc">已完成</p>
      </div>
      <div class="order-num">0016659884321</div>
    </div>
    <div class="body">
      <div class="c-goods-item mb60" v-for="(item, index) in record.goods" :key="index">
        <div class="imgs"><img src="@/assets/img/img2.png" mode="aspectFill" /></div>
        <div class="infos">
          <h3 class="title">{{item.goods_name}}</h3>
          <div class="intro">{{item.goods_attr.join('、')}}</div>
          <div class="price"><span>{{item.goods_price}}</span>元</div>
          <div class="nums2">×{{item.buy_nums}}</div>
        </div>
      </div>
      <div class="borderB mb30 hr" style="margin-top: -20px; height: 1px;"></div>
      <div class="ml10 mr10">
        <div class="f24">备注</div>
        <div class="f20 lh150 c-c9">{{record.user_remark || '--'}}</div>
      </div>
      <div class="borderB mb10 hr mt30"></div>
      <div class="price tr mr10"><span>{{record.pay_amount}}</span>元</div>
      <div class="f20 c-c9 mr10 tr">共{{record.goods.length}}件</div>
    </div>
  </div>
</div>
</template>

<script type='es6'>
import { getAction, postAction } from '@/utils'
export default {
  name: 'app',
  computed: {
    storeData () {
      return this.$store.state.globalData.store
    }
  },
  data () {
    return {
      id: '',
      record: {}
    }
  },
  mounted () {
    this.id = this.$route.query.id
    this.getData()
  },
  methods: {
    handleRefund () {
      this.$Dialog.confirm({
        message: '是否确认退款？'
      }).then(() => {
        postAction('/shopapi/order/refund', {
          id: this.record.id
        }).then(res => {
          if (res.code === 0) {
            this.$Toast.success(res.msg)
            this.getData()
          }
        })
      })
    },
    handleDone () {
      this.$Dialog.confirm({
        message: '是否确认完成订单？'
      }).then(() => {
        postAction('/shopapi/order/done', {
          id: this.record.id
        }).then(res => {
          if (res.code === 0) {
            this.$Toast.success(res.msg)
            this.getData()
          }
        })
      })
    },
    getData () {
      getAction('xxxx', {
        id: this.id
      }).then(res => {
        if (res.code === 0) {
          this.record = res.data
          if (this.record.status === 3) {
            this.$refs.timer.count(this.record.remain_make_time)
          }
        }
      })
    }
  }
}
</script>
