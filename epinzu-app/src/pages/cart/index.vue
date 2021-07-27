<template>
  <view class="Cart mt8">
    <!-- 空提示 -->
    <view class="empty mt24 mb32" v-if="!loading && cartData.length === 0">
      <image src="@/img/cart2.png" mode="widthFix" class="img" />
      <view class="txt">购物车空空如也~</view>
      <view class="center">
        <button class="c-btn" @tap="toIndex">去逛逛</button>
      </view>
    </view>
    <!-- 购物车 -->
    <view class="list ml12 mr12 ">
      <view class="list-item"
            v-for="item in cartData"
            :key="item.shop_id">
        <cart-item :record="item"
                   :shopId="selectedShop"
                   @refresh="getCartData"
                   @change="cartChange" />
      </view>
    </view>
    <!-- 猜你喜欢 -->
    <guess-like :list="dataSource" />

    <!-- 底部统计 -->
    <view class="Cart-footer between" v-if="selectedShop !== 0">
      <view class="ml12">
        <view class="c-FF0 f12">售价：<text class="f10">￥</text>{{selectedData.buy}}</view>
        <view class="c-FF0 f12">租金：<text class="f10">￥</text>{{selectedData.rent}}<text class="f10">/天</text></view>
        <view class="f12">押金：<text class="f10">￥</text>{{selectedData.deposit}}</view>
      </view>
      <button class="c-btn mr12" @tap="toConfirm">去结算（{{selectedData.goods.length}}件）</button>
    </view>

    <!-- 底部导航 -->
    <c-footer current="cart" />
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import './index.styl'
import cFooter from '@/c/common/footer'
import cartItem from './modules/cartItem'
import GuessLike from '@/c/common/GuessLike'
import { pageMixin } from '@/mixins/pages'
import { getAction } from '@/utils/api'

export default {
  name: 'Cart',
  mixins: [pageMixin],
  components: {
    cFooter,
    cartItem,
    GuessLike
  },
  data () {
    return {
      loading: false,
      cartData: [],
      selectedShop: 0,
      selectedData: {},
      url: {
        cart: '/userapi/shopping/index',
        list: '/userapi/goods/shopping/recommend'
      }
    }
  },
  methods: {
    getCartData () {
      this.loading = true
      getAction(this.url.cart).then(res => {
        this.loading = false
        if (res.code === 0) {
          this.cartData = res.data
        }
      })
    },
    cartChange (data) {
      console.log('cartChange', data)
      this.selectedShop = data.shopId
      this.selectedData = data
    },
    toConfirm () {
      this.$store.commit('SET_ORDERGOODS', this.selectedData.goods)
      Taro.navigateTo({
        url: '/pages/order/confirm/index?from=2'
      })
    },
    toIndex () {
      Taro.redirectTo({
        url: '/pages/index/index'
      })
    }
  },
  onLoad (options) {
    this.getCartData()
  }
}
</script>
