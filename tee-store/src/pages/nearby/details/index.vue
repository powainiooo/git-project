<style scoped>
.nearby-container { min-height: calc(100vh - 260px); margin-top: 0; overflow: hidden; }
.details-content { margin: 20px 34px; }
.details-content img { width: 100%; display: block; }
</style>

<template>
<div class="page">
  <c-header />
  <div class="container" style="padding-bottom: 0;">
    <!-- 地址信息 -->
    <addr-info ref="top" :showBtn="false" showCart showShare showService :record="addrData" @refresh="getCart" />

    <div class="container2 nearby-container">
      <div class="nearby-goods-detail">
        <img :src="imgSrc + goods.cover" mode="aspectFill" class="bg" />
        <div class="between">
          <div class="title">{{goods.title}}</div>
          <div class="prices">
            <p>{{goods.price}}元</p>
            <div class="acenter">
              <img src="/static/images/jfh.png" mode="widthFix" />
              <div><span>{{goods.sell_price}}</span>元</div>
            </div>
          </div>
        </div>
        <div class="flex mt30 ml35">
          <div class="c-tag" v-for="item in tags" :key="index">{{item}}</div>
        </div>
      </div>
      <div class="details-content">
        <div class="borderB mb40 hr"></div>
        <div>
          <img v-for="item in contents" :src="imgSrc + item" mode="widthFix" />
        </div>
      </div>
    </div>

    <div class="footer-btns">
      <div class="r">
        <button class="style1" @click="openDetail('buy')">立即购买</button>
      </div>
      <div class="r">
        <button @click="openDetail('cart')">加入购物车</button>
      </div>
    </div>

    <c-details ref="details" :record="record" @confirm="handleConfirm" />
  </div>
</div>
</template>

<script>
import cHeader from '@/components/header'
import addrInfo from '@/components/addrInfo'
import cDetails from './modules/details'
import { getAction, postAction } from '@/utils/api'
import store from '../../../store'
export default {
  components: {
    cHeader,
    addrInfo,
    cDetails
  },
  computed: {
    addrData () {
      return {
        imgSrc: mpvue.imgSrc,
        cartNum: this.cartNum,
        cartType: 2,
        shopId: 0
      }
    }
  },
  data () {
    return {
      imgSrc: mpvue.imgSrc,
      id: '',
      record: {},
      goods: {},
      contents: [],
      attrs: [],
      tags: [],
      cartNum: 0,
      btnType: '',
      isAjax: false
    }
  },

  methods: {
    openDetail (type) {
      this.btnType = type
      this.$refs.details.show()
    },
    getData () {
      getAction('/userapi/nearby/show', {
        id: this.id
      }).then(res => {
        if (res.code === 0) {
          this.record = res.data
          this.goods = res.data.goods
          this.contents = res.data.detail.content
          this.attrs = res.data.attrs
          this.tags = res.data.detail.tags
        }
      })
    },
    handleConfirm (goods) {
      if (this.btnType === 'buy') {
        store.commit('SET_NEARBYGOODS', goods)
        this.$refs.details.hide()
        mpvue.navigateTo({
          url: '/pages/order/confirm2/main?type=buy'
        })
      } else if (this.btnType === 'cart') {
        this.addCart(goods)
      }
    },
    getCart () {
      getAction('/userapi/shopping/card/count', {
        type: 2,
        shop_id: 0
      }).then(res => {
        if (res.code === 0) {
          this.cartNum = res.data.count
        }
      })
    },
    addCart (goods) {
      if (this.isAjax) return
      this.isAjax = true
      postAction('/userapi/shopping/card/store', {
        type: 2,
        goods
      }).then(res => {
        this.isAjax = false
        if (res.code === 0) {
          mpvue.showToast({
            title: '添加成功'
          })
          this.getCart()
          this.$refs.details.hide()
        }
      })
    }
  },
  onShow () {
    this.$refs.top.hideCarts()
  },
  onLoad (options) {
    Object.assign(this.$data, this.$options.data())
    this.id = options.id
    this.getData()
    this.getCart()
  }
}
</script>
