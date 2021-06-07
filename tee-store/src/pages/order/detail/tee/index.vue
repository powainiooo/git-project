<style scoped>

</style>

<template>
<div class="page">
  <c-header />
  <div class="container2 ovh order-detail">
    <div class="header between">
      <div>
        <div class="f24">{{shop.shop_name}}</div>
        <div class="f20 c-9e">{{order.created_at}}</div>
      </div>
      <div class="flex">
        <button class="btn-circle btn-style1 mr20" @click="makephone"><img src="/static/images/phone.png" mode="widthFix" class="w26"></button>
        <button class="btn-circle btn-style1" @click="btnGuide"><img src="/static/images/icon-guide.png" mode="widthFix" class="w26"></button>
      </div>
    </div>
    <div class="status-frame">
      <ul class="steps mt20" v-if="showSteps" :class="{'mt80': order.status === 2}">
        <li :class="{'active': order.status === 2}">
          <p>已下单</p>
          <img src="/static/images/order/icon1.png" mode="aspectFit" class="img1" />
          <img src="/static/images/order/icon1-active.png" mode="aspectFit" class="img2" />
        </li>
        <li :class="{'active': order.status === 3}">
          <p>制作中</p>
          <img src="/static/images/order/icon2.png" mode="aspectFit" class="img1" />
          <img src="/static/images/order/icon2-active.png" mode="aspectFit" class="img2" />
        </li>
        <li :class="{'active': order.status === 4}">
          <p>待取餐</p>
          <img src="/static/images/order/icon3.png" mode="aspectFit" class="img1" />
          <img src="/static/images/order/icon3-active.png" mode="aspectFit" class="img2" />
        </li>
      </ul>
      <div class="mt20 auto" style="width: 400rpx;" v-if="order.status === 3"><c-timer ref="timer" /></div>
      <div class="mt20" v-if="order.status === 4">
        <c-codes :code="order.fetch_code" />
      </div>
      <div class="mt60" v-if="order.status === 7">
        <p class="f52 DinB tc">Finish</p>
        <p class="f52 tc">已完成</p>
      </div>
      <div class="order-num">{{order.order_no}}</div>
    </div>
    <div class="body">
      <div class="c-goods-item mb60" v-for="item in goods" :key="index">
        <div class="imgs"><img :src="imgSrc + item.goods_cover" mode="aspectFill" /></div>
        <div class="infos">
          <h3 class="title">{{item.goods_name}}</h3>
          <div class="intro">{{item.attrs}}</div>
          <div class="price"><span>{{item.goods_price}}</span>元</div>
          <div class="nums2">×{{item.buy_nums}}</div>
        </div>
      </div>
      <div class="borderB mb30 hr" style="margin-top: -20rpx; height: 1px;"></div>
      <div class="ml10 mr10">
        <div class="f24">备注</div>
        <div class="f20 lh150 c-c9">{{order.user_remark || '--'}}</div>
      </div>
      <div class="borderB mb10 hr mt30"></div>
      <div class="price tr mr10"><span>{{order.pay_amount}}</span>元</div>
      <div class="f20 c-c9 mr10 tr">共{{goodsNum}}件</div>
    </div>
  </div>
  <c-footer current="list" />
</div>
</template>

<script>
import cHeader from '@/components/header'
import cFooter from '@/components/footer'
import cTimer from '@/components/timer'
import cCodes from '@/components/codes'
import { getAction } from '@/utils/api'
export default {
  components: {
    cHeader,
    cFooter,
    cTimer,
    cCodes
  },
  computed: {
    showSteps () {
      if (this.order.status === 2 || this.order.status === 3 || this.order.status === 4) {
        return true
      }
      return false
    }
  },
  data () {
    return {
      imgSrc: mpvue.imgSrc,
      timer: '',
      id: '',
      shop: {},
      order: {},
      goods: [],
      address: {},
      goodsNum: 0
    }
  },

  methods: {
    getData () {
      getAction('/userapi/order/show', {
        id: this.id
      }).then(res => {
        if (res.code === 0) {
          this.shop = res.data.shop
          this.order = res.data.order
          res.data.goods.forEach(i => {
            i.attrs = i.goods_attr.join('、')
          })
          this.goods = res.data.goods
          this.address = res.data.address
          this.goodsNum = res.data.goods_nums
          if (this.order.status === 3) {
            this.$refs.timer.count(this.order.remain_make_time)
          }
        }
      })
    },
    makephone () {
      mpvue.makePhoneCall({
        phoneNumber: this.shop.phone
      })
    },
    btnGuide () {
      mpvue.openLocation({
        latitude: Number(this.shop.lat),
        longitude: Number(this.shop.lng)
      })
    }
  },

  onLoad (options) {
    Object.assign(this.$data, this.$options.data())
    this.id = options.id
    this.getData()
  }
}
</script>
