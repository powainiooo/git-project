<style scoped>

</style>

<template>
<view class="item-box borderB"
      :class="{'item-box-show': showDel}"
      @touchstart="ts"
      @touchend="te"
      @tap="toDetail">
  <view class="item borderB">
    <view class="goods-item-hor">
      <image :src="imgSrc + record.cover" mode="aspectFill" class="img" />
      <view class="infos">
        <view class="title mb4">{{record.title}}</view>
        <view class="c-red f10" v-if="record.type === 1"><text class="f12">租金：</text>￥<text class="f12">{{record.price_min}}</text>/天</view>
        <view class="f10" v-if="record.type === 1"><text class="f12">押金：</text>￥<text class="f12">{{record.deposit_min}}</text></view>
        <view class="c-red f10" v-if="record.type === 3"><text class="f12">售价：</text>￥<text class="f12">{{record.price_min}}</text></view>
        <view class="acenter mt22" @tap.stop="toStore">
          <view class="c-tag c-tag-yel" v-if="record.shop_type === 1">个人</view>
          <view class="c-tag c-tag-red" v-if="record.shop_type === 2">企业</view>
          <view class="company">{{record.shop_name}}</view>
          <image src="@/img/ar1.png" mode="widthFix" class="w10" />
        </view>
      </view>
    </view>
  </view>
  <view class="btn-del">删除</view>
</view>
</template>

<script type='es6'>
import Taro from '@tarojs/taro'
export default {
  name: 'app',
  props: {
    record: Object
  },
  data() {
    return {
      imgSrc: Taro.imgSrc,
      showDel: false,
      sx: 0
    }
  },
  methods: {
    ts (e) {
      console.log('ts', e)
      this.sx = e.changedTouches[0].clientX
    },
    te (e) {
      const ex = e.changedTouches[0].clientX
      if (this.sx > ex + 50) {
        this.showDel = true
      }
      if (ex > this.sx + 50) {
        this.showDel = false
      }
    },
    toStore () {
      Taro.navigateTo({
        url: `/pages/store/index?id=${this.record.shop_id}`
      })
    },
    toDetail () {
      Taro.navigateTo({
        url: `/pages/detail/index?id=${this.record.goods_id}`
      })
    }
  }
}
</script>
