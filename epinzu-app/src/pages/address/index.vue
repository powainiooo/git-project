<template>
  <view class="Address">
    <view class="Address-item between borderB">
      <view class="mt8">
        <view class="mb8 f12 acenter"><text class="c-tag c-tag-red mr4">默认</text>哆啦A梦 157****1997</view>
        <view class="mb8 f12 c-666">广东省 深圳市 宝安区 新桥街道 高盛大厦1712</view>
      </view>
      <image src="@/img/edit.png" mode="widthFix" class="w24 mr12" />
    </view>
    <view class="Address-item between borderB">
      <view class="mt8">
        <view class="mb8 f12 acenter">哆啦A梦 157****1997</view>
        <view class="mb8 f12 c-666">广东省 深圳市 宝安区 新桥街道 高盛大厦1712</view>
      </view>
      <image src="@/img/edit.png" mode="widthFix" class="w24 mr12" />
    </view>
    <view class="Address-item between borderB">
      <view class="mt8">
        <view class="mb8 f12 acenter">哆啦A梦 157****1997</view>
        <view class="mb8 f12 c-666">广东省 深圳市 宝安区 新桥街道 高盛大厦1712</view>
      </view>
      <image src="@/img/edit.png" mode="widthFix" class="w24 mr12" />
    </view>

    <view class="empty-txt">已经全部加载完毕</view>
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import './index.styl'

export default {
  name: 'Index',
  data () {
    return {
    }
  },
  methods: {
  },
}
</script>
