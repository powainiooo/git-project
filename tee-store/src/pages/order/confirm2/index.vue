<style scoped>

</style>

<template>
<div class="page">
  <c-header />
  <div class="container2 ovh pt20 order-confirm">

    <div class="c-tabs">
      <ul class="c-tabs-btns">
        <li v-for="tab in tabs"
            :key="key"
            :class="{'active': currentKey === tab.key}"
            @click="tabChange(tab.key, index)">{{tab.title}}</li>
      </ul>
      <div class="c-tabs-frame">
        <div class="c-tabs-content"
             :style="{
          width: (tabs.length * 100) + '%',
          'margin-left': (index * -100) + '%'
        }">
          <div class="c-tab-pane">
            <div class="bg-fff top-line">
              <div class="form-line mb30">
                <div class="form-item">
                  <input placeholder="收件姓名" v-model="addrData.name" :disabled="hasAddr" placeholder-style="font-size: 20rpx;" style="font-size: 30rpx;" />
                </div>
                <div class="form-item">
                  <input placeholder="联系电话" v-model="addrData.phone" :disabled="hasAddr" placeholder-style="font-size: 20rpx;" style="font-size: 36rpx;" />
                </div>
              </div>
              <div class="form-line mb30">
                <div class="form-item">
                  <picker mode="region" @change="addrChange">
                    <input placeholder="选择 省份 / 市级 / 区" disabled v-model="addrStr" placeholder-style="font-size: 20rpx;" style="font-size: 24rpx;" />
                  </picker>
                  <img src="/static/images/arrow3.png" class="arrow3" mode="widthFix" placeholder-style="font-size: 20rpx;" style="font-size: 24rpx;" />
                </div>
              </div>
              <div class="form-line">
                <div class="form-item">
                  <input placeholder="详细收件地址" v-model="addrData.address" :disabled="hasAddr" />
                </div>
              </div>

              <div class="center mt30" v-if="hasAddr">
                <button class="btn btn-style1" style="margin: 0;">更换地址</button>
              </div>
            </div>
          </div>
          <div class="c-tab-pane">
            <div class="bg-fff top-line">
              <div class="addr-info" style="margin-left: 0; margin-right: 0;">
                <div class="between">
                  <button class="btn" style="width: auto; margin-left: 0; margin-top: 0;" @click="selectStore">
                    <span>{{storeInfo.shop_name}}</span>
                    <img src="/static/images/arrow1.png" mode="widthFix" class="w10 ml20" />
                  </button>
                  <div class="dis">距离你{{storeInfo.distance}}km</div>
                </div>
              </div>
              <div class="flex">
                <div style="flex: 1;">
                  <p class="form-title ml15">联系电话</p>
                  <div class="form-line">
                    <div class="form-item">
                      <input v-model="formData.phone" class="large" />
                    </div>
                  </div>
                </div>
                <button class="btn btn-style1">自动填写</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="frame">
      <div class="c-goods-item mb60" v-for="item in goods" :key="id">
        <div class="imgs"><img :src="imgSrc + item.goods_cover" mode="aspectFill" /></div>
        <div class="infos">
          <h3 class="title">{{item.goods_name}}</h3>
          <div class="intro">
            <span class="c-tag" v-for="(attr, i2) in item.attr_names" :key="i2">{{attr}}</span>
          </div>
          <div class="price"><span>{{item.goods_price}}</span>元</div>
          <div class="nums2">×{{item.buy_nums}}</div>
        </div>
      </div>

      <div class="borderB mb30" style="margin-top: -20rpx; height: 1px;"></div>

      <template v-if="tab === 'post'">
      <div class="mt30 mb30 between">
        <p class="f24 ml30">邮费</p>
        <div><span class="f54 DinB">{{record.post_fee}}</span>元</div>
      </div>

      <div class="borderB mb30 hr"></div>
      </template>

      <div class="reduce-item mb30" v-if="coupons.length > 0" @click="selectCoupon">
        <img src="/static/images/bg2.png" mode="widthFix" class="bg" />
        <div class="between reduce-item-box">
          <p class="f24 ml30">优惠券</p>
          <div class="price" v-if="formData.couponId !== 0"><span>-{{record.coupon_fee}}</span>元</div>
        </div>
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
        <button @click="handleConfirm">支付</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import cHeader from '@/components/header'
import tabs from '@/components/Tabs/tabs'
import tabPane from '@/components/Tabs/tabPane'
import cTextarea from '@/components/cTextarea'
import { getAction, postAction, payment } from '@/utils/api'
import { checkAddr } from '@/utils'
import store from '@/store'
export default {
  components: {
    cHeader,
    tabs,
    tabPane,
    cTextarea
  },
  computed: {
    addrStr () {
      if (this.addrData.province === '' || this.addrData.city === '' || this.addrData.area === '') {
        return ''
      } else {
        return `${this.addrData.province} / ${this.addrData.city} / ${this.addrData.area}`
      }
    },
    storeInfo () {
      return store.state.storeInfo
    }
  },
  data () {
    return {
      imgSrc: mpvue.imgSrc,
      tabs: [
        { title: '邮寄', key: 'post' },
        { title: '门店自提', key: 'store' }
      ],
      currentKey: 'post',
      index: 0,
      tab: 'post',
      type: '',
      formData: {
        address_id: '',
        coupon_id: 0,
        score: '',
        express_type: 1,
        shop_id: 0,
        lng: '',
        lat: '',
        goods: {},
        user_remark: '',
        phone: '',
        from: 0
      },
      addrData: {
        name: '',
        phone: '',
        province: '',
        city: '',
        area: '',
        address: '',
        status: 1
      },
      hasAddr: true,
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
    tabChange (key, index) {
      if (key === 'store') {
        if (this.formData.shop_id === 0) {
          mpvue.navigateTo({
            url: '/pages/stores/main?from=' + this.formData.from
          })
          return false
        }
      }
      this.currentKey = key
      this.index = index
      this.tab = key
      if (key === 'post') {
        this.formData.express_type = 1
      } else if (key === 'store') {
        this.formData.express_type = 0
      }
      this.getData()
    },
    selectStore () {
      mpvue.navigateTo({
        url: '/pages/stores/main?from=' + this.formData.from
      })
    },
    getAddr () {
      getAction('/userapi/user/address/show/default', {}, false).then(res => {
        if (res.code === 0) {
          this.addrData = res.data
          this.formData.address_id = res.data.id
          this.hasAddr = true
        } else {
          this.hasAddr = false
        }
      })
    },
    getData () {
      const params = {
        coupon_id: this.formData.coupon_id,
        score: this.formData.score,
        express_type: this.formData.express_type,
        shop_id: this.formData.shop_id,
        lng: this.formData.lng,
        lat: this.formData.lat,
        from: this.formData.from
      }
      if (params.from === 1) {
        params.goods = this.formData.goods
      }
      postAction('/userapi/nearby/order/confirm/page/data', params).then(res => {
        if (res.code === 0) {
          this.record = res.data
          this.goods = res.data.goods
          this.shopData = res.data.shop
          this.scores = res.data.score_list
          this.coupons = res.data.coupon_list
          store.commit('SET_COUPON', res.data.coupon_list)
        }
      })
    },
    getCarts () {
      getAction('/userapi/shopping/card/index/data', {
        shop_id: 0,
        type: 2
      }).then(res => {
        if (res.code === 0) {
          const goods = []
          for (const item of res.data) {
            goods.push({
              nearby_id: item.goods_id,
              buy_nums: item.buy_nums,
              attrs: item.attr_ids.split('|')
            })
          }
          this.formData.goods = goods
          this.getData()
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
    addrChange (e) {
      this.addrData.province = e.mp.detail.value[0]
      this.addrData.city = e.mp.detail.value[1]
      this.addrData.area = e.mp.detail.value[2]
    },
    newAddr () {
      if (checkAddr(this.addrData)) {
        postAction('/userapi/user/address/store', this.addrData).then(res => {
          this.isAjax = false
          if (res.code === 0) {
            this.formData.address_id = res.data.address_id
            this.handlePay()
          }
        })
      }
    },
    handleConfirm () {
      if (this.hasAddr) {
        this.handlePay()
      } else {
        this.newAddr()
      }
    },
    handlePay () {
      mpvue.showLoading({
        title: '支付中'
      })
      const params = {
        coupon_id: this.formData.coupon_id,
        score: this.formData.score,
        express_type: this.formData.express_type,
        user_remark: this.formData.user_remark,
        from: this.formData.from
      }
      if (params.express_type === 1) {
        params.address_id = this.formData.address_id
        params.shop_id = 0
      } else if (params.express_type === 0) {
        params.shop_id = this.formData.shop_id
        params.phone = this.formData.phone
      }
      if (params.from === 1) {
        params.goods = this.formData.goods
      }
      postAction('/userapi/nearby/order/create', params).then(res => {
        if (res.code === 0) {
          const orderNo = res.data.order_no
          const orderId = res.data.id
          payment(orderNo, orderId, 'nearby')
        }
      })
    }
  },
  onShow () {
    if (this.storeInfo.shop_id) {
      this.formData.shop_id = this.storeInfo.shop_id
      this.formData.lng = this.storeInfo.lng
      this.formData.lat = this.storeInfo.lat
      this.tabChange('store', 1)
      this.getData()
    }
  },
  onLoad (options) {
    console.log('order onLoad')
    Object.assign(this.$data, this.$options.data())
    this.type = options.type
    this.getAddr()
    if (this.type === 'buy') {
      this.formData.goods = store.state.nearbyGoods
      this.formData.from = 1
      this.getData()
    } else if (this.type === 'cart') {
      this.formData.from = 0
      this.getCarts()
    }
    store.commit('SET_STOREINFO', {})
  }
}
</script>
