<style lang="stylus" type="text/stylus">
.c-footer
  justify-content space-around;
  &-item
    width 36px; text-align center; position relative
    image
      width 24px; height 24px;
    .active
      display none
    view
      font-size 10px; color #333333;
    .dot-num
      position absolute; top 0px; right 0px; color #FFFFFF;
  &-active
    .normal
      display none
    .active
      display inline-block
    view
      color #FE322B
</style>

<template>
<view class="c-footer footer-container">
  <view class="c-footer-item" @tap="toggle('/pages/index/index')" :class="{'c-footer-active': current === 'home'}">
    <image src="@/img/footer/icon1.png" mode="widthFix" class="normal" />
    <image src="@/img/footer/icon1-active.png" mode="widthFix" class="active" />
    <view>首页</view>
  </view>
  <view class="c-footer-item" @tap="toggle2('/pages/message/index')" :class="{'c-footer-active': current === 'message'}">
    <image src="@/img/footer/icon2.png" mode="widthFix" class="normal" />
    <image src="@/img/footer/icon2-active.png" mode="widthFix" class="active" />
    <view>消息</view>
    <view class="dot-num" v-if="msg > 0">{{msg}}</view>
  </view>
  <view class="c-footer-item" @tap="toggle2('/pages/cart/index')" :class="{'c-footer-active': current === 'cart'}">
    <image src="@/img/footer/icon3.png" mode="widthFix" class="normal" />
    <image src="@/img/footer/icon3-active.png" mode="widthFix" class="active" />
    <view>购物车</view>
  </view>
  <view class="c-footer-item" @tap="toggle('/pages/mine/index')" :class="{'c-footer-active': current === 'mine'}">
    <image src="@/img/footer/icon4.png" mode="widthFix" class="normal" />
    <image src="@/img/footer/icon4-active.png" mode="widthFix" class="active" />
    <view>我的</view>
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
          this.msg = res.data.count
        }
      })
    }
  }
}
</script>
