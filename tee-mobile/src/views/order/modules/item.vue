<style scoped>
.order-item { padding: 30px 32px 0 32px; position: relative; }
.order-item .sd { width: 100%; position: absolute; left: 0; bottom: 0; }
.order-box { background-color: #F9F9F9; box-shadow: 0px 3px 30px 0px rgba(0, 0, 0, 0.1); border-radius: 35px 35px 0px 0px; overflow: hidden; position: relative; }
.order-box .header { height: 94px; padding: 0 34px; background-color: #EDECEB; margin-bottom: 20px; }
.order-box .header .nums { font-size: 54px; font-family: DinB; }
.order-box .body { margin: 0 34px; }
.order-box .body .line1 { padding-bottom: 16px; margin-bottom: 18px; }
.order-box .body .line1 h3 { font-size: 24px; font-weight: normal; line-height: 24px; margin-bottom: 6px; }
.order-box .body .line1 p { font-size: 20px; color: #C9C9C9; line-height: 26px; }
.order-box .footer { height: 110px; background-color: #ffffff; }
.order-box .footer .time { transform: scale(.8) }
.order-box .cover { width: 100%; height: 100%; background-color: rgba(255, 255, 255, 0.85); position: absolute; top: 0; left: 0; display: flex; justify-content: flex-end; }
.order-box .cover span { width: 220px; height: 220px; display: block; background-color: #E8D1B9; border-radius: 0 0 0 50%; position: absolute; top: -110px; right: -110px; font-size: 20px; color: #ffffff; padding-top: 140px; padding-left: 26px; }
</style>

<template>
<div class="order-item">
  <div class="order-box" @click="toDetail">
    <div class="header between">
      <span class="nums">{{record.fetch_code || '--'}}</span>
      <div class="acenter">
        <button class="btn btn-style4 mr20" @click.stop="handleRefund" v-if="record.status !== -9 && record.status !== -1 && record.status !== 1">退款</button>
        <button class="btn btn-style1" @click.stop="makePhone">{{record.phone}}</button>
      </div>
    </div>
    <div class="body">
      <div class="line1 borderB between" v-for="(item, index) in record.goods" :key="index">
        <div>
          <h3>{{item.goods_name}}</h3>
          <p>{{item.goods_attr.join('、')}}</p>
        </div>
        <div class="f24">×{{item.buy_nums}}</div>
      </div>
      <div class="line1 borderB" v-if="record.user_remark">
        <h3 class="c-main">备注</h3>
        <p>{{record.user_remark || '--'}}</p>
      </div>
      <div class="line1" v-if="record.pack === 1">
        <h3 class="c-main">需提前打包</h3>
      </div>
    </div>
    <div class="footer center borderT" v-if="showFooter">
      <button class="btn btn-style1" v-if="record.status === 2" @click.stop="handleMake">开始制作</button>
      <template v-if="record.status === 4">
      <button class="btn btn-style4 mr30" @click.stop="handleTag">补打标签</button>
<!--      <button class="btn btn-style1 mr30" @click.stop="handleGet">通知取餐</button>-->
      <button class="btn btn-style1" @click.stop="handleDone">完成订单</button>
      </template>
      <div class="time" v-if="record.status === 3">
        <timer ref="timer" size="small" @done="$emit('refresh')" />
      </div>
    </div>

    <div class="cover" v-if="record.status === 7"><span>已完成</span></div>
    <div class="cover" v-if="record.status === -9"><span>已退款</span></div>
  </div>
  <img src="@/assets/img/sd1.png" class="sd" />
</div>
</template>

<script type='es6'>
import timer from '@/components/timer'
import { postAction } from '@/utils'

export default {
  name: 'app',
  props: {
    record: Object
  },
  components: {
    timer
  },
  computed: {
    showFooter () {
      if (this.record.status === 2 || this.record.status === 3 || this.record.status === 4) {
        return true
      }
      return false
    }
  },
  data () {
    return {
    }
  },
  mounted () {
    if (this.record.status === 3) {
      this.$refs.timer.count(this.record.remain_make_time)
    }
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
            this.$emit('refresh')
          }
        })
      })
    },
    handleMake () {
      this.$Dialog.confirm({
        message: '是否确认开始制作？'
      }).then(() => {
        postAction('/shopapi/order/start/make', {
          id: this.record.id
        }).then(res => {
          if (res.code === 0) {
            this.$Toast.success(res.msg)
            this.$emit('refresh')
          }
        })
      })
    },
    handleTag () {
      this.$Dialog.confirm({
        message: '是否补打标签？'
      }).then(() => {
        postAction('/shopapi/order/print', {
          id: this.record.id
        }).then(res => {
          if (res.code === 0) {
            this.$Toast.success(res.msg)
            this.$emit('refresh')
          }
        })
      })
    },
    handleGet () {
      this.$Dialog.confirm({
        message: '是否通知取餐？'
      }).then(() => {
        postAction('/shopapi/order/notice/fetch', {
          id: this.record.id
        }).then(res => {
          if (res.code === 0) {
            this.$Toast.success(res.msg)
            this.$emit('refresh')
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
            this.$emit('refresh')
          }
        })
      })
    },
    makePhone () {
      this.$Dialog.confirm({
        message: `是否确认拨打${this.record.phone}？`
      }).then(() => {
        window.open(`tel:${this.record.phone}`)
      })
    },
    toDetail () {
      this.$router.push({
        name: 'Order-detail1',
        query: {
          id: this.record.id
        }
      })
    }
  }
}
</script>
