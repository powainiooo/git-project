<template>
  <view class="Rent container">
    <!-- 状态信息 -->
    <view class="mt16 mb16 ml12 c-red" v-if="statusMsg">{{statusMsg}}</view>
    <!-- 店铺信息 -->
    <view class="section">
      <view class="between borderB">
        <view class="store-info mb10 mt10">
          <image :src="imgSrc + shop.shop_logo" />
          <text class="c-tag c-tag-yel" v-if="shop.shop_type === 1">个人</text>
          <text class="c-tag c-tag-red" v-if="shop.shop_type === 2">企业</text>
          <text class="bold">{{shop.shop_name}}</text>
        </view>
        <view class="w70">
          <button class="c-btn c-btn-border c-btn-24" @tap="contact">联系商家</button>
        </view>
      </view>
      <view class="mt8 acenter" v-if="status === 2">
        <view class="w60 f12 c-999">归还方式：</view>
        <view class="f12">快递</view>
      </view>
      <view class="mt8 acenter">
        <view class="w60 f12 c-999">联系人：</view>
        <view class="f12">{{address.name}} {{address.phone}}</view>
      </view>
      <view class="mt8 between mb8">
        <view class="flex flex100">
          <view class="w60 f12 c-999">商家地址：</view>
          <view class="f12" style="flex: 1 0 0;">{{address.province}}{{address.city}}{{address.address}}</view>
        </view>
        <image src="@/img/dot.png" mode="widthFix" class="w20 ml18" @tap="location" />
      </view>
    </view>
    <!-- 产品信息 -->
    <view class="section">
      <view class="goods-item-hor mt8 mb8">
        <image :src="imgSrc + goods.goods_cover" mode="aspectFill" class="img" @tap="toDetail(goods.goods_id)" />
        <view class="infos">
          <view class="title ellipsis mnb4">{{goods.goods_name}}</view>
          <view class="c-999 f12 mb4 ellipsis">{{goods.goods_attr}}</view>
          <view class="f12 mb4">租金：<text class="f10">￥</text>{{goods.goods_rent_count}}/天 X {{goods.buy_nums}}件</view>
          <view class="f12 mb4">押金：<text class="f10">￥</text>{{goods.goods_deposit_count}} X {{goods.buy_nums}}件</view>
        </view>
      </view>
    </view>
    <!-- 租赁信息 -->
    <view class="section">
      <view class="mt8 mb8 bold">{{bList.title}}</view>
      <view class="h32 between f12" v-for="(item, index) in bList.list" :key="index">
        <view class="acenter">
          <view class="w68 c-999">{{item.name}}:</view>
          <view :class="{'c-red': item.color === 'red'}">{{item.value}}</view>
        </view>
        <view class="c-red" v-if="false">复制</view>
      </view>
    </view>
    <!-- 提示 -->
    <view class="f10 c-999 ml20 mt8">提示：当可退押金为0时，该物品的所有权就属于你了，因此无须归还</view>
    <!-- 底部按钮 -->
    <view class="footer-container" v-if="showBottomBtn">
      <view class="wp100 end pr20">
        <button class="w74 c-btn c-btn-border c-btn-24 ml4" v-if="buttons.back === 1" @tap.stop="returnBack">归还物品</button>
        <button class="w74 c-btn c-btn-border2 c-btn-24 ml4" v-if="buttons.express === 1" @tap.stop="express">查看物流</button>
        <button class="w74 c-btn c-btn-border c-btn-24 ml4" v-if="buttons.account_confirm === 1" @tap.stop="confirm">确认账单</button>
        <button class="w74 c-btn c-btn-border2 c-btn-24 ml4" v-if="buttons.append_proof === 1" @tap.stop="proof">补充凭证</button>
        <button class="w74 c-btn c-btn-border c-btn-24 ml4" v-if="buttons.cancel_ptjr === 1" @tap.stop="cancel">撤销介入</button>
        <button class="w74 c-btn c-btn-border2 c-btn-24 ml4" v-if="buttons.account_view === 1" @tap.stop="toBill">账单详情</button>
      </view>
    </view>
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import './index.styl'
import {
  RENT_RENT,
  RENT_BACKING,
  RENT_BACKED,
  RENT_BREAK
} from '@/config'
import { getAction, postAction } from '@/utils/api'

export default {
  name: 'Index',
  computed: {
    showBottomBtn () {
      for (const key in this.buttons) {
        if (this.buttons[key] === 1) {
          return true
        }
      }
      return false
    }
  },
  data () {
    return {
      RENT_RENT,
      RENT_BACKING,
      RENT_BACKED,
      RENT_BREAK,
      imgSrc: Taro.imgSrc,
      id: '',
      status: '',
      statusMsg: '',
      goods: {},
      shop: {},
      address: {},
      bList: {},
      buttons: {},
      url: {
        detail: '',
        detail1: '/userapi/rent/show',
        detail2: '/userapi/rent/back/show'
      }
    }
  },
  methods: {
    getData () {
      Taro.showLoading({
        title: '加载中'
      })
      getAction(this.url.detail, {
        id: this.id
      }).then(res => {
        Taro.hideLoading()
        if (res.code === 0) {
          Taro.setNavigationBarTitle({
            title: res.data.title
          })
          this.statusMsg = res.data.status_msg
          this.goods = res.data.goods
          this.shop = res.data.shop
          this.address = res.data.address
          this.bList = res.data.bottom_list
          this.buttons = res.data.buttons
        }
      })
    },
    contact () {
      Taro.showToast({
        title: '跳聊天界面'
      })
    },
    returnBack () {
      Taro.navigateTo({
        url: `/pages/rent/return?id=${this.id}`
      })
    },
    express () {
      Taro.navigateTo({
        url: `/pages/order/post2/index?id=${this.id}`
      })
    },
    confirm () {
      Taro.navigateTo({
        url: `/pages/rent/order/confirm/index?id=${this.id}`
      })
    },
    proof () {
      Taro.navigateTo({
        url: `/pages/refund/proof?id=${this.id}&from=rent`
      })
    },
    toBill () {
      Taro.navigateTo({
        url: `/pages/rent/order/bill/index?id=${this.id}`
      })
    },
    toDetail (id) {
      Taro.navigateTo({
        url: `/pages/detail/index?id=${id}`
      })
    },
    cancel () {
      Taro.showModal({
        title: '提示',
        content: '是否确认撤销介入？',
        success: res => {
          if (res.confirm) {
            postAction('/userapi/rent/back/ptjr/cancel', {
              id: this.id
            }).then(res => {
              if (res.code === 0) {
                Taro.showToast({
                  title: res.msg
                })
                this.getData()
              }
            })
          }
        }
      })
    },
    location () {
      Taro.openLocation({
        name: this.address.name,
        address: `${this.address.province}${this.address.city}${this.address.address}`,
        latitude: Number(this.address.lat),
        longitude: Number(this.address.lng),
        success (res) {
          console.log('openLocation', res)
        }
      })
    },
  },
  onShow () {
    this.getData()
  },
  onLoad (options) {
    this.status = Number(options.status)
    if (this.status === 1 || this.status === 4) {
      this.url.detail = this.url.detail1
    }
    if (this.status === 2 || this.status === 3) {
      this.url.detail = this.url.detail2
    }
    this.id = options.id
  }
}
</script>
