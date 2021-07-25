<style lang="stylus" type="text/stylus">

</style>

<template>
<view class="Refund-item section" @tap="toDetail">
  <view class="between mb8">
    <view class="acenter">
      <image :src="imgSrc + record.shop.logo" mode="aspectFill" class="avatar20 mr4" />
      <view class="c-tag c-tag-yel mr4" v-if="record.shop.type === 1">个人</view>
      <view class="c-tag c-tag-red mr4" v-if="record.shop.type === 2">企业</view>
      <view class="mr4">{{record.shop.name}}</view>
      <image src="@/img/ar1.png" mode="widthFix" class="w10" />
    </view>
    <view class="c-red f12">{{record.status_msg}}</view>
  </view>
  <view class="flex mb8 goods" v-for="item in record.goods" :key="item.id">
    <image :src="imgSrc + item.goods_cover" mode="aspectFill" class="img" />
    <view class="content">
      <view class="title">{{item.goods_name}}</view>
      <view class="f12 c-999 mb4">{{item.goods_attr}}</view>
      <view class="between f12" v-if="item.type === 1">
        <view>押金：￥{{item.goods_deposit}} x {{item.after_nums}}</view>
        <view>￥{{item.goods_deposit_count}}</view>
      </view>
      <view class="between f12" v-else>
        <view>售价：￥{{item.goods_price}} x {{item.after_nums}}</view>
        <view>￥{{item.goods_price * item.after_nums}}</view>
      </view>
    </view>
  </view>
  <view class="end borderB mt8 mb8 pb8 f12">
    <view>实付：￥{{record.pay_amount}}</view>
    <view class="c-red ml16" v-if="record.refund_amount != 0">退款金额：￥{{record.refund_amount}} </view>
  </view>
  <view class="end">
    <button class="c-btn c-btn-24 c-btn-border2 w72 ml4"
            v-for="item in record.buttons"
            :key="item.key"
            @tap.stop="btnFunc(item.key)">{{item.name}}</button>
<!--    <button class="c-btn c-btn-24 c-btn-border2 w72 ml4">撤销售后</button>-->
<!--    <button class="c-btn c-btn-24 c-btn-border2 w72 ml4">删除售后单</button>-->
<!--    <button class="c-btn c-btn-24 c-btn-border2 w72 ml4">售后详情</button>-->
<!--    <button class="c-btn c-btn-24 c-btn-border w72 ml4">发货</button>-->
<!--    <button class="c-btn c-btn-24 c-btn-border w72 ml4">确认收货</button>-->
  </view>
</view>
</template>

<script type='es6'>
import Taro from '@tarojs/taro'
import { postAction } from "@/utils/api"
export default {
	name: 'app',
  props: {
	  record: Object
  },
	data() {
		return {
		  imgSrc: Taro.imgSrc
    }
	},
	methods: {
    btnFunc (key) {
      if (key === 'del_after') {
        this.handleDel()
      } else if (key === 'deliver') {
        Taro.navigateTo({
          url: `/pages/refund/return?id=${this.record.id}`
        })
      } else if (key === 'detail') {
        this.toDetail()
      }
    },
    handleDel () {
      Taro.showModal({
        title: '提示',
        content: '是否确认删除售后单？',
        success: res => {
          if (res.confirm) {
            postAction('/userapi/after/destroy', {
              id: this.record.id
            }).then(res2 => {
              if (res2.code === 0) {
                Taro.showToast({
                  title: res2.msg
                })
                this.$emit('refresh')
              }
            })
          }
        }
      })
    },
    toDetail () {
      Taro.navigateTo({
        url: `/pages/refund/detail?id=${this.record.id}`
      })
    }
  }
}
</script>
