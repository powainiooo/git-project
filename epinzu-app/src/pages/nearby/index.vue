<template>
  <view class="Nearby">
    <view class="pl12 pr12 pt4 pb4 borderB">
      <search placeholder="搜好物，上品租" />
    </view>
    <view class="goods-item-hor">
      <image src="@/img/default.png" mode="aspectFill" class="img" />
      <view class="infos">
        <view class="title mb4">无刷电钻充电式手钻小手枪钻锂电钻小手枪钻锂电钻</view>
        <view class="acenter mb4">
          <view class="c-red f10"><text class="f12">租金：</text>￥<text class="f12">88</text>/天</view>
          <view class="f10"><text class="f12">押金：</text>￥<text class="f12">88</text></view>
        </view>
        <view class="c-999 f12 mb22">距离5.8公里</view>
        <view class="between">
          <view class="acenter">
            <view class="c-tag c-tag-yel">个人</view>
            <view class="company">鹰视眼五金工具金工具</view>
            <image src="@/img/ar1.png" mode="widthFix" class="w10" />
          </view>
          <view class="c-999 f12">已租：9999+</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import './index.styl'
import search from '@/c/common/search'

export default {
  name: 'Nearby',
  components: {
    search
  },
  data () {
    return {
    }
  },
  methods: {
  },
}
</script>
