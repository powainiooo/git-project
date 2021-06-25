<style scoped>

</style>

<template>
<div class="page">
  <c-header :storeLogo="storeInfo.shop_logo" />
  <div class="mt100">
    <addr-info :record="addrData" :showBtn="false" showLocation @tap="toGuide" />
  </div>
  <div class="container2 ovh order-confirm" style="margin-top: 0;">
    <div class="bg-fff top-line">
      <div class="flex">
        <div style="flex: 1;">
          <p class="form-title ml15">联系电话</p>
          <div class="form-line">
            <div class="form-item">
              <input type="number" v-model="formData.phone" class="large" />
            </div>
          </div>
        </div>
        <button class="btn btn-style1" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">自动填写</button>
      </div>
    </div>

    <div class="frame">
      <div class="c-goods-item mb60" v-for="item in goods" :key="goods_id">
        <div class="imgs"><img :src="imgSrc + item.goods_cover" mode="aspectFill" /></div>
        <div class="infos">
          <h3 class="title">{{item.goods_name}}</h3>
          <div class="intro">{{item.attrs}}</div>
          <div class="price"><span>{{item.goods_price}}</span>元</div>
          <div class="nums2">×{{item.buy_nums}}</div>
        </div>
      </div>

      <div class="borderB mb30" style="margin-top: -20rpx; height: 1px;"></div>

      <div class="mt30 mb30 between">
        <p class="f24 ml30">打包带走</p>
        <div class="acenter">
          <p class="c-c9 f20">将提前为您打包好</p>
          <button class="btn-radio" @click="togglePack">
            <img src="/static/images/radio.png" mode="widthFix" class="w30" v-if="formData.pack === 0" />
            <img src="/static/images/radio-checked.png" mode="widthFix" class="w30" v-else />
          </button>
        </div>
      </div>

      <div class="reduce-item mb30" v-if="coupons.length > 0" @click="selectCoupon">
        <img src="/static/images/bg2.png" mode="widthFix" class="bg" />
        <div class="between reduce-item-box">
          <p class="f24 ml30">优惠券</p>
          <div class="price" v-if="formData.couponId !== 0"><span>-{{record.coupon_fee}}</span>元</div>
        </div>
        <img src="/static/images/arrow4.png" mode="widthFix" class="ar" />
      </div>

      <picker :range="scores" @change="scoreChange">
        <div class="reduce-item mb30" v-if="scores.length > 0" >
          <img src="/static/images/bg2.png" mode="widthFix" class="bg" />
          <div class="between reduce-item-box">
            <div class="ml30">
              <p class="f24">使用积分</p>
              <p class="f20 c-c9">{{record.score_rate}}积分=1元，单次最多可用{{record.score_use_top}}积分</p>
            </div>
            <div class="price" v-if="formData.score !== ''"><span>-{{record.score_fee}}</span>元</div>
          </div>
          <img src="/static/images/arrow4.png" mode="widthFix" class="ar" />
        </div>
      </picker>

      <div class="ml30 mb10">备注</div>
      <c-textarea @change="remarkChange" />
    </div>

    <div class="footer-btns">
      <div class="l center">
        <div class="price"><span>{{record.pay_amount}}</span>元</div>
      </div>
      <div class="r">
        <button @click="beforePay">支付</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import cHeader from '@/components/header'
import addrInfo from '@/components/addrInfo'
import cTextarea from '@/components/cTextarea'
import { postAction, payment } from '@/utils/api'
import store from '@/store'

export default {
  components: {
    cHeader,
    addrInfo,
    cTextarea
  },
  computed: {
    storeInfo () {
      return store.state.storeInfo
    },
    addrData () {
      return {
        name: this.storeInfo.shop_name,
        onlyName: true,
        dis: this.storeInfo.distance
      }
    }
  },
  data () {
    return {
      imgSrc: mpvue.imgSrc,
      formData: {
        couponId: 0,
        score: '',
        phone: '',
        pack: 0,
        user_remark: ''
      },
      goods: [],
      shopData: {},
      coupons: [],
      scores: [],
      record: {}
    }
  },

  methods: {
    remarkChange (e) {
      this.formData.user_remark = e
    },
    getPhoneNumber (e) {
      postAction('/userapi/wechat/parse/data', {
        encryptedData: e.mp.detail.encryptedData,
        iv: e.mp.detail.iv,
        cloudID: e.mp.detail.cloudID
      }).then(res => {
        if (res.code === 0) {
          this.formData.phone = res.data
        }
      })
    },
    togglePack () {
      this.formData.pack = this.formData.pack === 0 ? 1 : 0
      this.getData()
    },
    getData () {
      postAction('/userapi/goods/order/confirm/page/data', {
        shop_id: this.storeInfo.shop_id,
        coupon_id: this.formData.couponId,
        score: this.formData.score,
        lng: this.storeInfo.lng,
        lat: this.storeInfo.lat
      }).then(res => {
        if (res.code === 0) {
          this.record = res.data
          res.data.goods.forEach(i => {
            i.attrs = i.attr_names.join('、')
          })
          this.goods = res.data.goods
          this.shopData = res.data.shop
          this.scores = res.data.score_list
          this.coupons = res.data.coupon_list
          store.commit('SET_COUPON', res.data.coupon_list)
        }
      })
    },
    beforePay () {
      if (this.formData.phone === '') {
        mpvue.showToast({
          icon: 'none',
          title: '请输入手机号！'
        })
        return false
      }
      if (Number(this.storeInfo.distance) > 1) {
        mpvue.showModal({
          title: '提示',
          content: '门店距离过远，是否确认点餐？',
          success: res => {
            if (res.confirm) {
              this.handlePay()
            } else if (res.cancel) {
              mpvue.redirectTo({
                url: '/pages/stores/main'
              })
            }
          }
        })
      } else {
        this.handlePay()
      }
    },
    handlePay () {
      mpvue.showLoading({
        title: '支付中'
      })
      postAction('/userapi/goods/order/create', {
        shop_id: this.storeInfo.shop_id,
        coupon_id: this.formData.couponId,
        score: this.formData.score,
        phone: this.formData.phone,
        pack: this.formData.pack,
        user_remark: this.formData.user_remark
      }).then(res => {
        if (res.code === 0) {
          const orderNo = res.data.order_no
          const orderId = res.data.id
          payment(orderNo, orderId, 'tee')
        }
      })
    },
    selectCoupon () {
      mpvue.navigateTo({
        url: '/pages/coupon/main'
      })
    },
    scoreChange (e) {
      this.formData.score = this.scores[e.mp.detail.value]
      this.getData()
    },
    toGuide () {
      mpvue.openLocation({
        latitude: Number(this.storeInfo.lat),
        longitude: Number(this.storeInfo.lng),
        success (res) {
          console.log('openLocation success', res)
        },
        fail (res) {
          console.log('openLocation fail', res)
        }
      })
    }
  },

  onShow () {
    console.log('onshow', store.state)
    this.formData.couponId = store.state.couponId
    this.getData()
    setTimeout(() => {
      mpvue.showToast({
        title: `请确认下单门店为${this.storeInfo.shop_name}`,
        icon: 'none'
      })
    }, 1000)
  },
  onLoad () {
    Object.assign(this.$data, this.$options.data())
    console.log('order onLoad')
    store.commit('SET_COUPONID', 0)
  }
}
</script>
