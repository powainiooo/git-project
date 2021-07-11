<template>
  <view class="Post">
    <!-- 订单信息 -->
    <view class="section2">
      <view class="borderB pb8 mt8">
        <view class="acenter">
          <image src="@/img/post.png" mode="widthFix" class="w24 mr8" />
          <text class="c-red">中通快递</text>
        </view>
        <view class="ml32 between">
          <view>快递单号：78150234699202</view>
          <button class="c-btn c-btn-border2 c-btn-20 w46">复制</button>
        </view>
      </view>
      <view class="borderB pb8 mt8">
        <view class="acenter">
          <image src="@/img/dot.png" mode="widthFix" class="w24 mr8" />
          <text class="c-666">订单编号：78150234699202</text>
        </view>
        <view class="ml32 flex">
          <view>收货地址：</view>
          <view style="flex: 1 0 0">广东省深圳市宝安区中心路10号A座1701品租工作室  </view>
        </view>
      </view>
    </view>
    <!-- 物流信息 -->
    <view class="section2 list">
      <view class="item">
        <view class="dot">
          <image src="@/img/dot2.png" mode="widthFix" class="w14" />
        </view>
        <view class="content">
          <view>快件离开【福建营销部】发往【泉州中转部】</view>
          <view class="f12">2020-11-13 00:12:34</view>
        </view>
      </view>
      <view class="item">
        <view class="dot">
          <image src="@/img/dot3.png" mode="widthFix" class="w10" />
        </view>
        <view class="content">
          <view>快件离开【福建营销部】发往【泉州中转部】</view>
          <view class="f12">2020-11-13 00:12:34</view>
        </view>
      </view>
    </view>
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
