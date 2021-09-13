<style lang="stylus" type="text/stylus">
.c-footer
  justify-content space-around;
  &-item
    width 36px; text-align center; position relative
    image
      width 24px; height 24px;
    .active
      display none
    view.name
      font-size 10px; color #333333;
    .dot-num
      height 18px; min-width 18px; position absolute; top -4px; right 0px; color #FFFFFF; border 1px solid #FFFFFF;
  &-active
    .normal
      display none
    .active
      display inline-block
    view.name
      color #FE322B
</style>

<template>
<view class="c-footer footer-container">
  <view class="c-footer-item" @tap="toggle('/pages/index/index')" :class="{'c-footer-active': current === 'home'}">
    <image src="@/img/footer/icon1.png" mode="widthFix" class="normal" />
    <image src="@/img/footer/icon1-active.png" mode="widthFix" class="active" />
    <view class="name">首页</view>
  </view>
  <view class="c-footer-item" @tap="toggle2('/pages/message/index')" :class="{'c-footer-active': current === 'message'}">
    <image src="@/img/footer/icon2.png" mode="widthFix" class="normal" />
    <image src="@/img/footer/icon2-active.png" mode="widthFix" class="active" />
    <view class="name">消息</view>
    <view class="dot-num" v-if="msg > 0">{{msg}}</view>
  </view>
  <view class="c-footer-item" @tap="toggle2('/pages/cart/index')" :class="{'c-footer-active': current === 'cart'}">
    <image src="@/img/footer/icon3.png" mode="widthFix" class="normal" />
    <image src="@/img/footer/icon3-active.png" mode="widthFix" class="active" />
    <view class="name">购物车</view>
  </view>
  <view class="c-footer-item" @tap="toggle('/pages/mine/index')" :class="{'c-footer-active': current === 'mine'}">
    <image src="@/img/footer/icon4.png" mode="widthFix" class="normal" />
    <image src="@/img/footer/icon4-active.png" mode="widthFix" class="active" />
    <view class="name">我的</view>
  </view>
</view>
</template>

<script type='es6'>
import Taro from '@tarojs/taro'
import { intercept, getAction } from '@/utils/api'

export default {
	name: 'app',
  props: {
	  current: {
	    type: String,
      default: 'home'
    }
  },
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    }
  },
	data() {
		return {
		  msg: 0
    }
	},
  watch: {
    isLogin () {
      this.getCount()
    }
  },
  mounted() {
	  if (this.isLogin) {
      this.getCount()
    }
  },
  methods: {
    toggle (url) {
      Taro.redirectTo({
        url
      })
    },
    toggle2 (url) {
      intercept(() => {
        Taro.redirectTo({
          url
        })
      })
    },
    getCount () {
      getAction('/userapi/sysmsg/count').then(res => {
        if (res.code === 0) {
          this.msg = res.data.count || 0
        }
      })
    }
  }
}
</script>
