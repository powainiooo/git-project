<template>
  <view class="Order-Confirm container">
    <!-- 地址 有 -->
    <view class="section" v-if="address" @tap="toAddr">
      <cell isLink>
        <view class="acenter" slot="title">
          <view class="mr16">哆啦A梦</view>
          <view>157****1997</view>
        </view>
        <view class="f12" slot="label">广东省深圳市宝安区新桥街道</view>
      </cell>
    </view>
    <!-- 地址 无 -->
    <view class="section" v-if="!address" @tap="toAddr">
      <view class="tc mb8 mt8"><image src="@/img/addr.png" mode="widthFix" class="w32" /></view>
      <view class="tc mb8 f12 c-999">您还没有收货地址，请点击添加</view>
    </view>
    <!-- 商品列表 -->
    <view class="section pt8">
      <view class="borderB mt8 mb8 pb8" v-for="item in goods" :key="item.id">
        <view class="acenter mb8">
          <image src="@/img/icon-rent.png" mode="widthFix" class="w16 mr8" v-if="item.type === 1" />
          <image src="@/img/icon-buy.png" mode="widthFix" class="w16 mr8" v-if="item.type === 3" />
          <view class="f12">{{item.title}}</view>
        </view>
        <view class="goods-item-hor">
          <image :src="imgSrc + item.attrs.cover" mode="aspectFill" class="img" />
          <view class="infos">
            <view class="c-999 f12 mb4">规格：{{item.attrs.attr_name}}</view>
            <view class="c-999 f12 mb4">{{item.attrs.rent_days}}天起租</view>
            <view class="f12 mb4" v-if="item.type === 1">租金：<text class="f10">￥</text>{{item.attrs.price}}/天 X {{item.buy_nums}}件</view>
            <view class="f12 mb4" v-if="item.type === 1">押金：<text class="f10">￥</text>{{item.attrs.deposit}} X {{item.buy_nums}}件</view>
            <view class="f12 mb4" v-if="item.type === 3">售价：<text class="f10">￥</text>{{item.attrs.price}} X {{item.buy_nums}}件</view>
          </view>
        </view>
      </view>
      <view class="borderB mt8 mb8 pb8">
        <view class="acenter mb8">
          <image src="@/img/icon-buy.png" mode="widthFix" class="w16 mr8" />
          <view class="f12">无刷电钻充电式手钻</view>
        </view>
        <view class="goods-item-hor">
          <image src="@/img/default.png" mode="aspectFill" class="img" />
          <view class="infos">
            <view class="c-999 f12 mb4">规格：红色，标准</view>
            <view class="c-999 f12 mb4">七天起租</view>
            <view class="f12 mb4">租金：<text class="f10">￥</text>88/天 X 1件</view>
            <view class="f12 mb4">押金：<text class="f10">￥</text>88 X 1件</view>
          </view>
        </view>
      </view>
      <cell title="优惠券" :value="couponNums === 0 ? '无可用' : ''" isLink style="padding: 0; margin-right: -8px;" class="mb16" @tap="openCoupon" />
    </view>
    <!-- 备注 -->
    <view class="section">
      <view class="mt16 mb8">填写备注</view>
      <view class="">
        <input placeholder="选填" class="f12 c-999" v-model="remark" style="padding-left: 0;" />
      </view>
    </view>
    <!-- 价格信息 -->
    <view class="section">
      <view class="mt16 mb16">本订单共{{goods.length}}件物品</view>
      <view class="between f12 mb8">
        <view>售价</view>
        <view><text class="f10">￥</text>{{count.sale_amount}}</view>
      </view>
      <view class="between f12 mb8">
        <view>租金</view>
        <view><text class="f10">￥</text>{{count.rent_amount}}</view>
      </view>
      <view class="between f12 mb8">
        <view>物品押金</view>
        <view><text class="f10">￥</text>{{count.deposit_amount}}</view>
      </view>
      <view class="between f12 mb16">
        <view>运费</view>
        <view><text class="f10">￥</text>{{count.post_fee}}</view>
      </view>
      <view class="between f12 mb8">
        <view>优惠券</view>
      </view>
      <view class="between f12 mb16">
        <view>优惠券抵扣</view>
        <view class="c-red"><text class="f10">-￥</text>{{count.coupon_fee}}</view>
      </view>
    </view>
    <!-- 支付方式 -->
    <view class="section">
      <view class="mt16 mb8">支付方式</view>
      <view class="pay-item borderB" @tap="payway = 'alipay'">
        <view class="acenter">
          <image src="@/img/alipay.png" mode="widthFix" class="icon mr4" />
          <text>支付宝</text>
        </view>
        <image src="@/img/check2.png" mode="widthFix" class="icon" v-if="payway === 'alipay'" />
      </view>
      <view class="pay-item" @tap="payway = 'yue'">
        <view class="acenter">
          <image src="@/img/yue.png" mode="widthFix" class="icon mr4" />
          <view>余额支付（<text class="f10">￥</text>18）</view>
        </view>
        <image src="@/img/check2.png" mode="widthFix" class="icon" v-if="payway === 'yue'" />
      </view>
    </view>
    <!-- 协议 -->
    <view class="center">
      <image src="@/img/radio.png" mode="widthFix" class="w18" v-if="!protocolCheck" @tap="protocolCheck = true" />
      <image src="@/img/radio-check.png" mode="widthFix" class="w18" v-else @tap="protocolCheck = false" />
      <view class="ml8">已同意《品租租赁服务协议》</view>
    </view>
    <!-- 底部操作栏 -->
    <view class="footer-container">
      <view class="between wp100">
        <view class="c-red ml12">支付金额：<text class="f12">￥</text>{{count.pay_amount}}</view>
        <button class="c-btn mr12">确定支付</button>
      </view>
    </view>
    <!-- 优惠券 -->
    <coupons ref="coupons" />
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import './index.styl'
import coupons from './modules/coupons'
import Cell from '@/c/common/Cell'
import { postAction } from '@/utils/api'

export default {
  name: 'Index',
  components: {
    Cell,
    coupons
  },
  data () {
    return {
      imgSrc: Taro.imgSrc,
      protocolCheck: false,
      couponId: '',
      addrId: '',
      address: {},
      count: {},
      coupons: [],
      couponNums: 0,
      goods: [],
      remark: '',
      from: 1,
      payway: 'alipay'
    }
  },
  methods: {
    openCoupon () {
      this.$refs.coupons.show()
    },
    getData () {
      Taro.showLoading({
        title: '加载中'
      })
      const goods = this.$store.state.orderGoods
      postAction('/userapi/order/confirm', {
        goods,
        user_coupon_id: this.couponId,
        address_id: this.addrId
      }).then(res => {
        Taro.hideLoading()
        if (res.code === 0) {
          this.address = res.data.address
          this.count = res.data.count
          this.coupons = res.data.coupons
          this.goods = res.data.goods
          this.couponNums = res.data.coupons_valid_nums
        }
      })
    },
    toAddr () {
      Taro.navigateTo({
        url: '/pages/address/index'
      })
    }
  },
  onLoad (options) {
    this.from = options.from || 1
    this.getData()
  }
}
</script>
