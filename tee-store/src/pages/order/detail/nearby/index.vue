<style scoped>

</style>

<template>
<div class="page">
  <c-header />
  <div class="container2 ovh order-detail">
    <div class="header between">
      <div class="f30">{{order.express_type === 0 ? '门店自提' : '邮寄'}}</div>
      <div class="flex">
        <button class="btn btn-style3 mr20" v-if="order.express_type === 1 && order.status === 2">待发货</button>
        <button class="btn-circle btn-style1 mr20" @click="makephone" v-if="order.express_type === 0">
          <img src="/static/images/phone.png" mode="widthFix" class="w26">
        </button>
        <button class="btn-circle btn-style1" @click="btnGuide" v-if="order.express_type === 0">
          <img src="/static/images/icon-guide.png" mode="widthFix" class="w26">
        </button>
        <button class="btn-circle btn-style1 mr20" @click="openPost" v-if="order.express_type === 1 && order.status === 5">
          <img src="/static/images/post.png" mode="widthFix" class="w34">
        </button>
        <button open-type="contact" class="btn-circle btn-style1" v-if="order.express_type === 1">
          <img src="/static/images/service.png" mode="widthFix" class="w26">
        </button>
      </div>
    </div>
    <div class="status-frame">
      <div class="mt80" v-if="order.express_type === 0 && order.status !== 7">
        <c-codes :code="order.fetch_code" />
      </div>
      <div class="mt20" v-if="order.express_type === 1 && order.status === 4">
        <c-codes :code="order.fetch_code" />
      </div>
      <div class="mt60" v-if="order.status === 7">
        <p class="f52 DinB tc">Finish</p>
        <p class="f52 tc">已完成</p>
      </div>
      <div class="form" v-if="order.express_type === 1 && order.status !== 7">
        <div class="form-line mb30">
          <div class="form-item">
            <input :value="address.name" disabled placeholder-style="font-size: 20rpx;" style="font-size: 30rpx;" />
          </div>
          <div class="form-item">
            <input :value="address.phone" disabled placeholder-style="font-size: 20rpx;" style="font-size: 36rpx;" />
          </div>
        </div>
        <div class="form-line mb30">
          <div class="form-item">
            <input :value="addrStr" disabled placeholder-style="font-size: 20rpx;" style="font-size: 24rpx;" />
          </div>
        </div>
        <div class="form-line">
          <div class="form-item">
            <input :value="address.address" disabled placeholder-style="font-size: 20rpx;" style="font-size: 24rpx;" />
          </div>
        </div>
      </div>
      <div class="order-num">{{order.order_no}}</div>
    </div>
    <div class="body">
      <div class="c-goods-item mb60" v-for="item in goods" :key="index">
        <div class="imgs"><img :src="imgSrc + item.goods_cover" mode="aspectFill" /></div>
        <div class="infos">
          <h3 class="title">{{item.goods_name}}</h3>
          <div class="intro mt10">
            <span class="c-tag" v-for="(cate, i2) in item.goods_attr" :key="i2">{{cate}}</span>
          </div>
          <div class="price"><span>{{item.goods_price}}</span>元</div>
          <div class="nums2">×{{item.buy_nums}}</div>
        </div>
      </div>
      <div class="borderB mb20 hr" style="margin-top: -20rpx; height: 1px;" v-if="order.express_type === 1"></div>
      <div class="between" v-if="order.express_type === 1">
        <div class="f24 ml10">邮费</div>
        <div class="price mr10"><span>{{order.post_fee}}</span>元</div>
      </div>
      <div class="borderB mb30 hr mt20"></div>
      <div class="ml10 mr10" v-if="order.user_remark && order.user_remark !== ''">
        <div class="f24">备注</div>
        <div class="f20 lh150 c-c9">{{order.user_remark || '--'}}</div>
      </div>
      <div class="borderB hr mt30" v-if="order.user_remark && order.user_remark !== ''"></div>
      <div class="price tr mr10"><span>{{order.pay_amount}}</span>元</div>
      <div class="f20 c-c9 mr10 tr">共{{goodsNum}}件</div>
    </div>
  </div>

  <c-post ref="post" />

</div>
</template>

<script>
import cHeader from '@/components/header'
import cCodes from '@/components/codes'
import cPost from './modules/post'
import { getAction } from '@/utils/api'
export default {
  components: {
    cHeader,
    cCodes,
    cPost
  },
  computed: {
    addrStr () {
      if (this.address === null) {
        return ''
      } else {
        return `${this.address.province} / ${this.address.city} / ${this.address.area}`
      }
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
    openPost () {
      this.$refs.post.show(this.id)
    },
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
    this.id = options.id || 22
    this.getData()
  }
}
</script>
