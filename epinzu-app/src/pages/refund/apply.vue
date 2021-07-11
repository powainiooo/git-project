<template>
  <view class="Refund container">
    <view class="section2">
      <view class="borderB pb8 mt8">
        <view class="flex mb8 goods">
          <image src="@/img/radio-check.png" mode="widthFix" class="w16 mr8 mt34" />
          <image src="@/img/default.png" mode="aspectFill" class="img" />
          <view class="content">
            <view class="title">鹰视安充电式单手电链锯手持小型家用无线锂电户外伐木果园修电锯</view>
            <view class="f12 c-999 mb4">基础款68000H2电1充</view>
            <view class="between f12">
              <view>押金：￥208 x 2</view>
              <view>￥416</view>
            </view>
          </view>
        </view>
        <view class="end mt8">
          <text class="f12 c-666">申请数量</text>
          <Stepper :value="1" />
        </view>
      </view>
    </view>
    <view class="section2">
      <view class="h52 between">
        <view class="acenter">
          <view class="c-666 mr16">申请类型</view>
          <view>我要退货退款</view>
        </view>
        <image src="@/img/ar1.png" mode="widthFix" class="w10" />
      </view>
      <view class="h52 between">
        <view class="acenter">
          <view class="c-666 mr16">申请原因</view>
          <view class="c-999">请选择申请原因</view>
        </view>
        <image src="@/img/ar1.png" mode="widthFix" class="w10" />
      </view>
    </view>
    <view class="section2" style="margin-bottom: 0;">
      <view class="mt16 mb16">退款金额</view>
      <view class="f18 mb8">￥416</view>
    </view>
    <view class="h32 acenter pl12 c-999" style="background-color: #FAFBFA">最多可退￥416</view>
    <view class="mt8 mb8">
      <Form title="申请说明" placeholder="请你详细填写申请说明" />
    </view>
    <view class="section2">
      <view class="h52 between">
        <view class="acenter">
          <view class="c-666 mr16">联系电话</view>
          <view>15271001997</view>
        </view>
      </view>
    </view>

    <view class="footer-container">
      <view class="wp100 pl12 pr12">
        <button class="c-btn">15271001997</button>
      </view>
    </view>
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import './index.styl'
import Stepper from '@/c/common/Stepper'
import Form from '@/c/common/Form'

export default {
  name: 'Index',
  components: {
    Stepper,
    Form
  },
  data () {
    return {
      nums: 0
    }
  },
  methods: {
  },
}
</script>
