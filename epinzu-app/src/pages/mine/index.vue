<template>
  <view class="Mine container">
    <!-- 用户信息 -->
    <view class="pr">
      <image src="@/img/bg.png" mode="widthFix" class="wp100" />
      <view class="person" :style="{'top': tH + 'px'}" @tap="login">
        <image :src="imgSrc + record.avatar" mode="aspectFill" v-if="record.avatar" @tap="toPage('/pages/mine/setting/index')" />
        <image src="@/img/avatar.png" mode="aspectFill" v-else @tap="toPage('/pages/mine/setting/index')" />
        <view>
          <view class="c-fff bold" v-if="!isLogin">登录/注册</view>
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
          <view class="f18 mb4 bold">{{record.money || 0}}</view>
          <view>余额</view>
        </view>
        <view @tap="toPage('/pages/mine/attention/index')" v-if="false">
          <view class="f18 mb4 bold">{{record.attention_nums || 0}}</view>
          <view>我的关注</view>
        </view>
        <view @tap="toPage('/pages/mine/collection/index')">
          <view class="f18 mb4 bold">{{record.collection_nums || 0}}</view>
          <view>我的收藏</view>
        </view>
        <view @tap="toPage('/pages/mine/coupon/index')">
          <view class="f18 mb4 bold">{{record.coupon_nums || 0}}</view>
          <view>优惠券</view>
        </view>
      </view>
      <!-- 我的订单 -->
      <view class="section">
        <view class="mt16 mb16 between">
          <view class="bold">我的订单</view>
          <view class="acenter" @tap="toPage('/pages/order/list/index')">
            <text class="f12 c-999">全部订单</text>
            <image src="@/img/ar1.png" mode="widthFix" class="w10 ml4" />
          </view>
        </view>
        <view class="Mine-order-nav">
          <view class="mb16" @tap="toPage('/pages/order/list/index?key=1')">
            <view class="pr mb4">
              <image src="@/img/mine/icon1.png" mode="widthFix" class="w24" />
              <view class="dot-num" v-if="record.wait_pay_nums">{{record.wait_pay_nums}}</view>
            </view>
            <view>待付款</view>
          </view>
          <view class="mb16" @tap="toPage('/pages/order/list/index?key=2')">
            <view class="pr mb4">
              <image src="@/img/mine/icon2.png" mode="widthFix" class="w24" />
              <view class="dot-num" v-if="record.wait_deliver_nums">{{record.wait_deliver_nums}}</view>
            </view>
            <view>待发货</view>
          </view>
          <view class="mb16" @tap="toPage('/pages/order/list/index?key=3')">
            <view class="pr mb4">
              <image src="@/img/mine/icon3.png" mode="widthFix" class="w24" />
              <view class="dot-num" v-if="record.wait_receive_nums">{{record.wait_receive_nums}}</view>
            </view>
            <view>待收货</view>
          </view>
          <view class="mb16" @tap="toPage('/pages/order/list/index?key=4')">
            <view class="pr mb4">
              <image src="@/img/mine/icon5.png" mode="widthFix" class="w24" />
              <view class="dot-num" v-if="record.signed_nums">{{record.signed_nums}}</view>
            </view>
            <view>已签收</view>
          </view>
          <view class="mb16" @tap="toPage('/pages/rent/index')">
            <view class="pr mb4">
              <image src="@/img/mine/icon6.png" mode="widthFix" class="w24" />
              <view class="dot-num" v-if="record.rent_wait_confirm_nums">{{record.rent_wait_confirm_nums}}</view>
            </view>
            <view>租到的物品</view>
          </view>
          <view class="mb16" @tap="toPage('/pages/refund/index')">
            <view class="pr mb4">
              <image src="@/img/mine/icon4.png" mode="widthFix" class="w24" />
              <view class="dot-num" v-if="record.after_nums">{{record.after_nums}}</view>
            </view>
            <view>退货售后</view>
          </view>
        </view>
      </view>
      <!-- 导航 -->
      <view class="section" style="padding-right: 0">
        <Cell title="收货地址" isLink @tap="toPage('/pages/address/index')" />
        <Cell title="常见问题" isLink @tap="toPageNone('/pages/question/index?source=common')" />
        <view class="borderB" @tap="visible = true">
          <Cell title="联系客服" isLink />
        </view>
        <Cell title="意见反馈" isLink @tap="toPage('/pages/mine/feedback/index')" v-if="isLogin" />
        <Cell title="设置" isLink @tap="toPage('/pages/mine/setting/index')" />
      </view>
    </view>
    <!-- 底部导航 -->
    <c-footer current="mine" />

    <!--  联系方式  -->
    <c-popup :show.sync="visible" round>
      <view class="tc center borderB h50 bold">联系方式</view>
      <view class="tc center borderB h50 c-red" @tap="phoneCall">400-9606683</view>
      <view class="tc center borderB h50" @tap="toChatroom">在线客服</view>
      <view class="tc center h50" @tap="visible = false">取消</view>
    </c-popup>
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import './index.styl'
import Cell from '@/c/common/Cell'
import cFooter from '@/c/common/footer'
import cPopup from '@/c/common/Popup'
import { intercept } from '@/utils/api'

export default {
  name: 'Index',
  components: {
    Cell,
    cFooter,
    cPopup
  },
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    },
    record () {
      return this.$store.state.userInfo
    }
  },
  data () {
    return {
      imgSrc: Taro.imgSrc,
      tH: 0,
      contacts: ['400-9606683', '在线客服'],
      visible: false
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
    toPageNone (url) {
      Taro.navigateTo({
        url
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
    },
    toChatroom (e) {
      this.visible = false
      Taro.navigateTo({
        url: `/pages/chatroom/index?account=${this.record.services[0].account}&title=品租客服`
      })
    }
  },
  onShow () {
    if (this.isLogin) {
      this.$store.dispatch('getUserInfo')
    }
  }
}
</script>
