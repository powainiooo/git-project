<style scoped>

</style>

<template>
<div class="container ovh">
  <div class="infos-line">
    <button class="btn" @click="backIndex">{{currentDate}}</button>
<!--    <button class="btn-circle" @click="backIndex"><img src="@/assets/img/home.png" class="w28" /></button>-->
  </div>
  <div class="container2 container3 ovh order-detail" style="padding-top: 0;">
    <div class="header between">
      <div>
        <div class="f54 DinB" style="line-height: 27px;">{{record.fetch_code || '--'}}</div>
        <div class="f20 c-9e">{{record.created_at}}</div>
      </div>
      <div class="flex">
        <button class="btn btn-style4 mr20" @click="handleRefund" v-if="record.status !== -9 && record.status !== -1 && record.status !== 1">退款</button>
        <button class="btn btn-style1" @click.stop="makePhone">{{shop.phone}}</button>
      </div>
    </div>
    <div class="status-frame">
      <ul class="steps mt20" v-if="showSteps">
        <li :class="{'active': record.status === 2}">
          <p>已下单</p>
          <img src="@/assets/img/order/icon1.png" mode="aspectFit" class="img1" />
          <img src="@/assets/img/order/icon1-active.png" mode="aspectFit" class="img2" />
        </li>
        <li :class="{'active': record.status === 3}">
          <p>制作中</p>
          <img src="@/assets/img/order/icon2.png" mode="aspectFit" class="img1" />
          <img src="@/assets/img/order/icon2-active.png" mode="aspectFit" class="img2" />
        </li>
        <li :class="{'active': record.status === 4}">
          <p>待取餐</p>
          <img src="@/assets/img/order/icon3.png" mode="aspectFit" class="img1" />
          <img src="@/assets/img/order/icon3-active.png" mode="aspectFit" class="img2" />
        </li>
      </ul>
      <div class="mt20 tc" style="width: 400px;" v-if="record.status === 2">
        <button class="btn btn-style4 mr20" @click.stop="handleMake">开始制作</button>
      </div>
      <div class="mt20 auto tc" style="width: 53.333vw;" v-if="record.status === 3">
        <c-timer ref="timer" />
      </div>
      <div class="mt20 tc" v-if="record.status === 4">
        <button class="btn btn-style4 mr30" @click.stop="handleTag">补打标签</button>
<!--        <button class="btn btn-style1 mr30" @click.stop="handleGet">通知取餐</button>-->
        <button class="btn btn-style1" @click.stop="handleDone">完成订单</button>
      </div>
      <div class="mt60" v-if="record.status === 7">
        <p class="f52 DinB tc">Finish</p>
        <p class="f52 tc">已完成</p>
      </div>
      <div class="order-num">{{record.order_no}}</div>
    </div>
    <div class="body">
      <div class="c-goods-item mb60" v-for="(item, index) in goods" :key="index">
<!--        <div class="imgs"><img :src="imgSrc + item.goods_cover" mode="aspectFill" /></div>-->
        <div class="imgs">
          <van-image
            width="21.333vw"
            height="21.333vw"
            fit="cover"
            :src="imgSrc + item.goods_cover"
          />
        </div>
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
      <div class="f20 c-c9 mr10 tr">共{{goodsNums}}件</div>
    </div>
  </div>
</div>
</template>

<script type='es6'>
import cTimer from '@/components/timer'
import { getAction, postAction } from '@/utils'

export default {
  name: 'app',
  components: {
    cTimer
  },
  computed: {
    imgSrc () {
      return this.$store.state.imgSrc
    },
    showSteps () {
      if (this.record.status === 2 || this.record.status === 3 || this.record.status === 4) {
        return true
      }
      return false
    },
    currentDate () {
      return this.$store.state.currentDate
    }
  },
  data () {
    return {
      id: '',
      record: {},
      shop: {},
      goods: [],
      goodsNums: 0
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
    handleMake () {
      this.$Dialog.confirm({
        message: '是否确认开始制作？'
      }).then(() => {
        postAction('/shopapi/order/start/make', {
          id: this.record.id
        }).then(res => {
          if (res.code === 0) {
            this.$Toast.success(res.msg)
            this.getData()
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
            this.getData()
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
    makePhone () {
      this.$Dialog.confirm({
        message: `是否确认拨打${this.record.phone}？`
      }).then(() => {
        window.open(`tel:${this.record.phone}`)
      })
    },
    getData () {
      getAction('/shopapi/order/show', {
        id: this.id
      }).then(res => {
        if (res.code === 0) {
          this.record = res.data.order
          this.shop = res.data.shop
          this.goods = res.data.goods
          this.goodsNums = res.data.goods_nums
          if (this.record.status === 3) {
            this.$refs.timer.count(this.record.remain_make_time)
          }
        }
      })
    },
    backIndex () {
      this.$router.replace({
        name: 'Home'
      })
    }
  }
}
</script>
