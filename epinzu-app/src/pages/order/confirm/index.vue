<template>
  <view class="Order-Confirm container">
    <!-- 地址 有 -->
    <view class="section" v-if="address" @tap="toAddr">
      <cell isLink>
        <view class="acenter bold" slot="title">
          <view class="mr16">{{address.rev_name}}</view>
          <view>{{address.rev_phone}}</view>
        </view>
        <view class="f12" slot="label">{{address.province}}{{address.city}}{{address.address}}</view>
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
          <view class="ellipsis">{{item.title}}</view>
        </view>
        <view class="goods-item-hor">
          <image :src="imgSrc + item.attrs.cover" mode="aspectFill" class="img" />
          <view class="infos">
            <view class="c-999 f12 mb4">规格：{{item.attrs.attr_name}}</view>
            <view class="c-999 f12 mb4" v-if="item.type === 1">{{item.attrs.rent_days}}天起租</view>
            <view class="f12 mb4 bold" v-if="item.type === 1">租金：<text class="f10">￥</text>{{item.attrs.price}}/天 X {{item.buy_nums}}件</view>
            <view class="f12 mb4 bold" v-if="item.type === 1">押金：<text class="f10">￥</text>{{item.attrs.deposit}} X {{item.buy_nums}}件</view>
            <view class="f12 mb4 bold" v-if="item.type === 3">售价：<text class="f10">￥</text>{{item.attrs.price}} X {{item.buy_nums}}件</view>
          </view>
        </view>
      </view>
<!--      <cell title="优惠券" :value="couponNums === 0 ? '无可用' : counponName" isLink style="padding: 0; margin-right: -8px;" class="mb16" />-->
      <view class="f12 between mb16" @tap="openCoupon">
        <view>优惠券</view>
        <view class="acenter">
          <text>{{couponNums === 0 ? '无可用' : counponName}}</text>
          <image src="@/img/ar1.png" mode="widthFix" class="w10 ml8" />
        </view>
      </view>
    </view>
    <!-- 备注 -->
    <view class="section">
      <view class="mt16 mb8 bold">填写备注</view>
      <view class="mb8">
        <input placeholder="选填" placeholder-style="color: #999999;" class="f12 c-333 wp100" v-model="remark" style="padding-left: 0;" />
      </view>
    </view>
    <!-- 价格信息 -->
    <view class="section">
      <view class="mt16 mb16 bold">本订单共{{goods.length}}件物品</view>
      <view class="between f12 mb8">
        <view>售价</view>
        <view><text class="f10">￥</text>{{count.sale_amount}}</view>
      </view>
      <view class="between f12 mb8">
        <view>租金</view>
        <view><text class="f10">￥</text>{{count.rent_amount}}<text class="f10">/天</text></view>
      </view>
      <view class="between f12 mb8">
        <view>物品押金</view>
        <view><text class="f10">￥</text>{{count.deposit_amount}}</view>
      </view>
      <view class="between f12 mb8">
        <view>运费</view>
        <view><text class="f10">￥</text>{{count.post_fee}}</view>
      </view>
      <view class="between f12 mb16">
        <view>优惠券抵扣</view>
        <view class="c-red"><text class="f10">-￥</text>{{count.coupon_fee}}</view>
      </view>
    </view>
    <!-- 支付方式 -->
    <view class="section">
      <view class="mt16 mb8 bold">支付方式</view>
      <view class="pay-item borderB" @tap="payway = 20">
        <view class="acenter">
          <image src="@/img/alipay.png" mode="widthFix" class="icon mr4" />
          <text>支付宝</text>
        </view>
        <image src="@/img/check2.png" mode="widthFix" class="icon" v-if="payway === 20" />
      </view>
<!--      <view class="pay-item" @tap="payway = 0">-->
<!--        <view class="acenter">-->
<!--          <image src="@/img/yue.png" mode="widthFix" class="icon mr4" />-->
<!--          <view>余额支付（<text class="f10">￥</text>{{yue}}）</view>-->
<!--        </view>-->
<!--        <image src="@/img/check2.png" mode="widthFix" class="icon" v-if="payway === 0" />-->
<!--      </view>-->
    </view>
    <!-- 协议 -->
    <view class="center">
      <image src="@/img/radio.png" mode="widthFix" class="w18" v-if="!protocolCheck" @tap="protocolCheck = true" />
      <image src="@/img/radio-check.png" mode="widthFix" class="w18" v-else @tap="protocolCheck = false" />
      <view class="ml8" @tap="toWeb">已同意《品租租赁服务协议》</view>
    </view>
    <!-- 底部操作栏 -->
    <view class="footer-container">
      <view class="between wp100">
        <view class="c-red ml12 bold">支付金额：<text class="f12">￥</text>{{count.pay_amount}}</view>
        <button class="c-btn mr12" @tap="handlePay">确定支付</button>
      </view>
    </view>
    <!-- 优惠券 -->
    <coupons ref="coupons"
             :list="coupons"
             @change="couponChange" />
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import './index.styl'
import coupons from './modules/coupons'
import Cell from '@/c/common/Cell'
import { postAction, getAction } from '@/utils/api'
import { baseUrl } from "@/config"

export default {
  name: 'Index',
  components: {
    Cell,
    coupons
  },
  computed: {
    orderGoods () {
      return this.$store.state.orderGoods
    }
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
      counponName: '有可用',
      goods: [],
      remark: '',
      from: 1,
      payway: 20,
      yue: 0
    }
  },
  methods: {
    openCoupon () {
      if (this.couponNums > 0) {
        this.$refs.coupons.show()
      }
    },
    couponChange (data) {
      this.couponId = data.id
      this.counponName = data.title
      this.getData()
    },
    getData () {
      Taro.showLoading({
        title: '加载中'
      })
      postAction('/userapi/order/confirm', {
        goods: this.orderGoods,
        user_coupon_id: this.couponId,
        address_id: this.addrId
      }).then(res => {
        Taro.hideLoading()
        if (res.code === 0) {
          this.address = res.data.address
          if (this.address) {
            this.addrId = this.address.id
          }
          this.count = res.data.count
          this.coupons = res.data.coupons
          this.goods = res.data.goods
          this.couponNums = res.data.coupons_valid_nums
        }
      })
    },
    getYue () {
      getAction('/userapi/user/money').then(res => {
        if (res.code === 0) {
          this.yue = res.data
        }
      })
    },
    toAddr () {
      Taro.navigateTo({
        url: '/pages/address/index?from=order'
      })
    },
    handlePay () {
      if (this.address === null) {
        Taro.showToast({
          title: '请添加送货地址'
        })
        return
      }
      if (!this.protocolCheck) {
        Taro.showModal({
          title: '提示',
          content: '请了解相关协议\n《品租租赁服务协议》',
          success: res => {
            if (res.confirm) {
              this.protocolCheck = true
            }
          }
        })
        return
      }
      // if (this.yue < this.count.pay_amount) {
      //   Taro.showToast({
      //     title: '余额不足'
      //   })
      //   return
      // }
      Taro.showLoading({
        title: '支付中'
      })
      postAction('/userapi/order/create', {
        goods: this.orderGoods,
        user_coupon_id: this.couponId,
        address_id: this.addrId,
        from: this.from,
        beizhu: this.remark
      }).then(res1 => {
        if (res1.code === 0) {
          postAction('/userapi/order/pay', {
            order_no: res1.data.order_no,
            pay_type: this.payway
          }).then(res2 => {
            Taro.hideLoading()
            if (this.payway === 20) {
              this.paybyAli(res2)
            } else if (this.payway === 0) {
              this.paybyYue(res2)
            }
          })
        } else {
          Taro.hideLoading()
        }
      })
    },
    paybyAli (res) {
      if (res.code === 0) {
        Taro.tradePay({
          tradeNO: res.data.trade_no,
          success: res3 => {
            console.log('pay success', res3)
            if (res3.resultCode === '9000') {
              Taro.reLaunch({
                url: `/pages/result/index?result=suc`
              })
            } else {
              Taro.reLaunch({
                url: `/pages/result/index?result=fail`
              })
            }
          },
          fail (err) {
            console.log('pay fail', err)
            Taro.reLaunch({
              url: `/pages/result/index?result=fail`
            })
          }
        })
      }
    },
    paybyYue (res) {
      if (res.code === 0) {
        Taro.reLaunch({
          url: `/pages/result/index?result=suc`
        })
      } else {
        Taro.reLaunch({
          url: `/pages/result/index?result=fail`
        })
      }
    },
    toWeb () {
      Taro.navigateTo({
        url: `/pages/webview/index?src=${baseUrl}/apph5/single/zlfwxy`
      })
    }
  },
  onShow () {
    this.addrId = this.$store.state.addrData.id || ''
    this.getData()
    this.getYue()
  },
  onLoad (options) {
    this.from = options.from || 1
    this.$store.commit('SET_ADDRDATA', {})
  }
}
</script>
