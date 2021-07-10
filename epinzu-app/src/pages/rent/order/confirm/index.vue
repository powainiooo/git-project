<template>
  <view class="Rent container">
    <!-- 订单信息 -->
    <view class="bg-fff pl12 mb8">
      <view class="h52 between borderB">
        <view>已支付押金</view>
        <view class="mr12"><text class="f12">￥</text>100</view>
      </view>
      <view class="h52 between borderB">
        <view>每日租金</view>
        <view class="mr12"><text class="f12">￥</text>2</view>
      </view>
      <view class="h52 between borderB">
        <view>起租天数</view>
        <view class="mr12">7天</view>
      </view>
      <view class="h52 between borderB">
        <view>实际租赁天数</view>
        <view class="mr12">5天</view>
      </view>
      <view class="h52 between borderB">
        <view>
          <view>每日租金</view>
          <view class="f12 c-999">系统结算应该支付的租金</view>
        </view>
        <view class="mr12"><text class="f12">￥</text>14</view>
      </view>
      <view class="h52 between borderB">
        <view>
          <view>应退押金</view>
          <view class="f12 c-999">系统结算应该退还的押金</view>
        </view>
        <view class="mr12"><text class="f12">￥</text>10</view>
      </view>
      <view class="h52 between borderB">
        <view>
          <view>实际退还金额</view>
          <view class="f12 c-999">退还金额到余额账户中</view>
        </view>
        <view class="mr12 c-red"><text class="f12">￥</text>76</view>
      </view>
    </view>
    <!-- 结算说明 -->
    <view class="bg-fff mbb pl12 pr12 ovh mb8">
      <view class="mt8 mb8">结算说明</view>
      <view class="hint-box f12 c-999 mb8">物品损坏严重，已无法二次租售</view>
      <view class="img-list">
        <view class="img-item">
          <image src="@/img/default.png" mode="widthFix" class="aspectFill" />
        </view>
        <view class="img-item">
          <image src="@/img/default.png" mode="widthFix" class="aspectFill" />
        </view>
        <view class="img-item">
          <image src="@/img/default.png" mode="widthFix" class="aspectFill" />
        </view>
      </view>
    </view>
    <!-- 协商记录 -->
    <view class="bg-fff pl12">
      <Cell title="协商记录" isLink />
    </view>
    <!-- 申请平台介入 -->
    <view class="tc mt24 f12 c-999">申请平台介入</view>
    <!-- 底部按钮 -->
    <view class="footer-container">
      <view class="wp100 pl12 pr12 between">
        <button class="c-btn mr8">确认账单</button>
        <button class="c-btn c-btn-border2">拒绝账单</button>
      </view>
    </view>
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import '../../index.styl'
import Cell from '@/c/common/Cell'

export default {
  name: 'Index',
  components: {
    Cell
  },
  data () {
    return {
    }
  },
  methods: {
  },
}
</script>
