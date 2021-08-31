<template>
  <view class="Order-detail container">
    <view class="c-red mt16 mb16 ml12" v-if="order.status === 1">剩余支付时间{{order.remain_pay_time}}</view>
    <!-- 店铺信息 -->
    <view class="section">
      <view class="between borderB mb8" v-if="false">
        <view class="store-info mb10 mt10">
          <image :src="imgSrc + shop.shop_logo" />
          <text class="c-tag c-tag-yel" v-if="shop.shop_type === 1">个人</text>
          <text class="c-tag c-tag-red" v-if="shop.shop_type === 2">企业</text>
          <text>{{shop.shop_name}}</text>
        </view>
        <view class="w70">
          <button class="c-btn c-btn-border c-btn-24" @tap="contact">联系客服</button>
        </view>
      </view>
      <view class="acenter mb4 mt8">
        <image src="@/img/dot.png" mode="widthFix" class="w20 mr4" />
        <view class="mr8">{{address.name}}</view>
        <view>{{address.phone}}</view>
      </view>
      <view class="f12 c-999 ml20 mb8">{{address.province}}{{address.city}}{{address.address}}</view>
    </view>
    <!-- 产品信息 -->
    <view class="section" v-for="item in goods" :key="item.id">
      <view class="acenter mt8 mb8">
        <image src="@/img/icon-rent.png" mode="widthFix" class="w16 mr8" v-if="item.type === 1" />
        <image src="@/img/icon-buy.png" mode="widthFix" class="w16 mr8" v-if="item.type === 3" />
        <view class="ellipsis">{{item.goods_name}}</view>
      </view>
      <view class="flex pb8 borderB">
        <image :src="imgSrc + item.goods_cover" mode="aspectFill" class="pic" @tap="toDetail(item.goods_id)" />
        <view class="flex100" style="width: 4.2rem;">
          <view class="f12 c-999 mb4 ellipsis">规格：{{item.goods_attr}}</view>
          <view class="f12 c-999 mb4" v-if="item.type === 1">{{item.rent_day_min}}天起租</view>
          <view class="f12 mb4" v-if="item.type === 1" >租金：<text class="f10">￥</text>{{item.goods_price}}<text class="f10">/天</text> X {{item.buy_nums}}件</view>
          <view class="f12" v-if="item.type === 1" >押金：<text class="f10">￥</text>{{item.goods_deposit}} X {{item.buy_nums}}件</view>
          <view class="f12 mb4" v-else >售价：<text class="f10">￥</text>{{item.goods_price}}<text class="f10"></text> X {{item.buy_nums}}件</view>
        </view>
      </view>
      <view class="end mt8 mb8">
        <button class="c-btn c-btn-border2 c-btn-24 ml4" v-if="item.buttons.refund === 1" @tap="refund">申请退单</button>
        <button class="c-btn c-btn-border2 c-btn-24 ml4" v-if="item.buttons.cancel_refund === 1" @tap="cancel">取消退单</button>
      </view>
    </view>
    <!-- 订单信息 -->
    <view class="section">
      <view class="mt8 mb8 bold">{{bList1.title}}</view>
      <view class="h32 between" v-for="(item, index) in bList1.list" :key="index">
        <view class="acenter">
          <view class="f12 c-999 mr16">{{item.name}}:</view>
          <view class="f12" style="flex: 1 0 0">{{item.value}}</view>
        </view>
        <view class="c-red f12"
              v-if="item.key === 'order_no' || item.key === 'kd_no'"
              @tap="copy(item.value)">复制</view>
      </view>
    </view>
    <!-- 明细 -->
    <view class="section">
      <view class="h32 between f12" v-for="(item, index) in bList2.list" :key="index">
        <view>{{item.name}}</view>
        <view :style="{color: item.color || 'auto'}">{{item.value}}</view>
      </view>
    </view>
    <!-- 明细 -->
    <view class="footer-container">
      <view class="wp100 end mr12">
        <button class="c-btn c-btn-border2 c-btn-24 ml4" @tap="contact">联系客服</button>
        <button class="c-btn c-btn-border2 c-btn-24 ml4" v-if="buttons.cancel === 1" @tap="cancel">取消订单</button>
        <button class="c-btn c-btn-border2 c-btn-24 ml4" v-if="buttons.express === 1" @tap="express">查看物流</button>
        <button class="c-btn c-btn-border2 c-btn-24 ml4" v-if="buttons.refund === 1" @tap="refund">申请退单</button>
        <button class="c-btn c-btn-border c-btn-24 ml4" v-if="buttons.receive === 1" @tap="receive">确认收货</button>
        <button class="c-btn c-btn-border c-btn-24 ml4" v-if="buttons.pay === 1" @tap="pay">立即支付</button>
      </view>
    </view>
    <!-- 支付方式 -->
    <pay-way ref="payway" @confirm="payConfirm" />
    <!-- 取消原因 -->
    <cancel-way ref="cancelWay" @confirm="cancelConfirm" />
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import './index.styl'
import { getAction, postAction, toChatRoom } from '@/utils/api'
import PayWay from '../modules/PayWay'
import CancelWay from '../modules/CancelWay'

export default {
  name: 'Index',
  components: {
    PayWay,
    CancelWay
  },
  data () {
    return {
      imgSrc: Taro.imgSrc,
      orderId: '',
      order: {},
      goods: [],
      shop: {},
      address: {},
      bList1: {},
      bList2: {},
      buttons: {}
    }
  },
  methods: {
    getData () {
      getAction('/userapi/order/detail', {
        order_id: this.orderId
      }).then(res => {
        if (res.code === 0) {
          this.order = res.data.order
          this.goods = res.data.goods
          this.shop = res.data.shop
          this.address = res.data.address
          this.bList1 = res.data.bottom_list1
          this.bList2 = res.data.bottom_list2
          this.buttons = res.data.buttons
        }
      })
    },
    copy (txt) {
      Taro.setClipboardData({
        data: txt,
        success (res) {
          console.log('copy succees', res)
          Taro.showToast({
            title: '复制成功'
          })
        }
      })
    },
    contact () {
      toChatRoom(this.shop.shop_id)
    },
    cancel () {
      this.$refs.cancelWay.show()
    },
    cancelConfirm (txt) {
      postAction('/userapi/order/cancel', {
        order_id: this.order.id,
        cancel_reason: txt
      }).then(res => {
        if (res.code === 0) {
          this.getData()
        }
      })
    },
    express () {
      Taro.navigateTo({
        url: `/pages/order/post/index?id=${this.order.id}`
      })
    },
    refund () {
      Taro.navigateTo({
        url: `/pages/refund/type?id=${this.orderId}`
      })
    },
    toDetail (id) {
      Taro.navigateTo({
        url: `/pages/detail/index?id=${id}`
      })
    },
    receive () {
      Taro.showModal({
        title: '提示',
        content: '是否确认收货？',
        success: res => {
          if (res.confirm) {
            Taro.showLoading({
              title: '请求中'
            })
            postAction('/userapi/order/receive', {
              order_id: this.orderId
            }).then(res2 => {
              Taro.hideLoading()
              if (res2.code === 0) {
                this.getData()
              }
            })
          }
        }
      })
    },
    pay () {
      this.$refs.payway.show()
    },
    payConfirm (payway) {
      Taro.showLoading({
        title: '支付中'
      })
      const order = this.bList1.list.find(i => i.key === 'order_no')
      postAction('/userapi/order/pay', {
        order_no: order.value,
        pay_type: payway
      }).then(res2 => {
        Taro.hideLoading()
        if (res2.code === 0) {
          if (payway === 20) {
            this.paybyAli(res2)
          } else if (payway === 0) {
            this.paybyYue(res2)
          }
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
  },
  onShow () {
    this.getData()
  },
  onLoad (options) {
    this.orderId = options.id
  }
}
</script>
