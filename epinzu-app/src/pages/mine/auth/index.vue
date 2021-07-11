<template>
  <view class="Auth">
    <view class="banner"></view>
    <view class="section">
      <view class="mt16 mb16">上传身份证照片</view>
      <view class="between">
        <!-- 人像面 -->
        <view class="card">
          <view class="img center">
            <image src="@/img/card1.png" mode="widthFix" class="w56" />
          </view>
          <view class="f12 c-999 mt8 tc">点击上传 <text class="c-red">人像面</text></view>
        </view>
        <!-- 国徽面 -->
        <view class="card">
          <view class="img center">
<!--            <image src="@/img/card2.png" mode="widthFix" class="w56" />-->
            <image src="@/img/default.png" mode="aspectFill" class="pic" />
          </view>
          <view class="f12 c-999 mt8 tc">点击上传 <text class="c-red">国徽面</text></view>
        </view>
      </view>
      <view class="mt24 mb16">请核对相关信息</view>
      <view class="h52 between borderB">
        <view class="c-666"><text class="c-red mr4">*</text>姓名</view>
        <input placeholder="请输入姓名" placeholder-style="color: #999999;" class="c-333 tr f14" />
      </view>
      <view class="h52 between">
        <view class="c-666"><text class="c-red mr4">*</text>身份证</view>
        <input placeholder="请输入身份证件号" placeholder-style="color: #999999;" class="c-333 tr f14" />
      </view>
    </view>
    <view class="ml12 mr12 mt12">
      <view class="c-red f12">由于您的个人身份通过与公安网数据校验结果不一致，为保障个人身份真实性，请重新填写真实信息</view>
      <button class="c-btn mt40">提交认证</button>
    </view>
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import Cell from '@/c/common/Cell'
import '../index.styl'

export default {
  name: 'Setting',
  data () {
    return {
    }
  },
  methods: {
  },
}
</script>
