<template>
  <view class="Mine container">
    <!-- 用户信息 -->
    <view class="pr">
      <image src="@/img/bg.png" mode="widthFix" class="wp100" />
      <view class="person" :style="{'top': tH + 'px'}" @tap="login">
        <image src="@/img/avatar.png" mode="aspectFill" />
        <view>
          <view class="c-fff" v-if="!isLogin">登录/注册</view>
          <view class="c-fff" v-else>{{record.nickname}}</view>
          <view class="c-tag c-tag-yel" v-if="record.srrz_status === 1">已认证</view>
          <view class="c-tag c-tag-brown" v-else-if="record.srrz_status === 0">未认证</view>
        </view>
      </view>
    </view>
    <view class="Mine-navs">
      <!-- 数量信息 -->
      <view class="section Mine-nums-nav">
        <view @tap="toPage('/pages/mine/yue/index')">
          <view class="f18 mb4">{{record.money || 0}}</view>
          <view>余额</view>
        </view>
        <view @tap="toPage('/pages/mine/attention/index')">
          <view class="f18 mb4">{{record.attention_nums || 0}}</view>
          <view>我的关注</view>
        </view>
        <view @tap="toPage('/pages/mine/collection/index')">
          <view class="f18 mb4">{{record.collection_nums || 0}}</view>
          <view>我的收藏</view>
        </view>
        <view @tap="toPage('/pages/mine/coupon/index')">
          <view class="f18 mb4">{{record.coupon_nums || 0}}</view>
          <view>优惠券</view>
        </view>
      </view>
      <!-- 我的订单 -->
      <view class="section">
        <view class="mt16 mb16 between">
          <view>我的订单</view>
          <view class="acenter" @tap="toPage()">
            <text class="f12 c-999">全部订单</text>
            <image src="@/img/ar1.png" mode="widthFix" class="w10 ml4" />
          </view>
        </view>
        <view class="Mine-order-nav">
          <view class="mb16" @tap="toPage()">
            <view class="pr mb4">
              <image src="@/img/mine/icon1.png" mode="widthFix" class="w24" />
              <view class="dot-num" v-if="record.wait_pay_nums">{{record.wait_pay_nums}}</view>
            </view>
            <view>待付款</view>
          </view>
          <view class="mb16" @tap="toPage()">
            <view class="pr mb4">
              <image src="@/img/mine/icon2.png" mode="widthFix" class="w24" />
              <view class="dot-num" v-if="record.wait_deliver_nums">{{record.wait_deliver_nums}}</view>
            </view>
            <view>待发货</view>
          </view>
          <view class="mb16" @tap="toPage()">
            <view class="pr mb4">
              <image src="@/img/mine/icon3.png" mode="widthFix" class="w24" />
              <view class="dot-num" v-if="record.wait_receive_nums">{{record.wait_receive_nums}}</view>
            </view>
            <view>待收货</view>
          </view>
          <view class="mb16" @tap="toPage()">
            <view class="pr mb4">
              <image src="@/img/mine/icon4.png" mode="widthFix" class="w24" />
              <view class="dot-num" v-if="record.signed_nums">{{record.signed_nums}}</view>
            </view>
            <view>已签收</view>
          </view>
          <view class="mb16" @tap="toPage()">
            <view class="pr mb4">
              <image src="@/img/mine/icon5.png" mode="widthFix" class="w24" />
              <view class="dot-num" v-if="record.rent_wait_confirm_nums">{{record.rent_wait_confirm_nums}}</view>
            </view>
            <view>租到的物品</view>
          </view>
          <view class="mb16" @tap="toPage()">
            <view class="pr mb4">
              <image src="@/img/mine/icon6.png" mode="widthFix" class="w24" />
              <view class="dot-num" v-if="record.after_nums">{{record.after_nums}}</view>
            </view>
            <view>退货售后</view>
          </view>
        </view>
      </view>
      <!-- 导航 -->
      <view class="section" style="padding-right: 0">
        <Cell title="收货地址" isLink @tap="toPage()" />
        <Cell title="常见问题" isLink @tap="toPage()" />
        <view @tap="phoneCall">
          <Cell title="联系客服">
            <text class="c-red mr8" slot="value">400-9606683</text>
          </Cell>
        </view>
        <Cell title="意见反馈" isLink @tap="toPage()" v-if="isLogin" />
        <Cell title="设置" isLink @tap="toPage()" />
      </view>
    </view>
    <!-- 底部导航 -->
    <c-footer current="mine" />

  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import './index.styl'
import Cell from '@/c/common/Cell'
import cFooter from '@/c/common/footer'
import { getAction, intercept } from '@/utils/api'

export default {
  name: 'Index',
  components: {
    Cell,
    cFooter
  },
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    }
  },
  data () {
    return {
      tH: 0,
      record: {}
    }
  },
  mounted() {
    Taro.getSystemInfo({
      success: res => {
        console.log('getSystemInfo', res)
        this.tH = res.statusBarHeight + res.titleBarHeight
      }
    })
  },
  methods: {
    // 获取用户信息
    getData () {
      getAction('/userapi/my').then(res => {
        if (res.code === 0) {
          this.record = res.data
        }
      })
    },
    // 登录
    login () {
      intercept()
    },
    // 跳转
    toPage (url) {
      intercept(() => {
        Taro.navigateTo({
          url
        })
      })
    },
    // 打电话
    phoneCall () {
      console.log('phoneCall')
      Taro.makePhoneCall({
        phoneNumber: '400-9606683',
        success (res) {
          console.log('makePhoneCall suc', res)
        },
        fail (err) {
          console.log('makePhoneCall fail', err)
        }
      })
    }
  },
  onShow () {
    if (this.isLogin) {
      this.getData()
    }
  }
}
</script>
