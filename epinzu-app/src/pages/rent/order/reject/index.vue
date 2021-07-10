<template>
  <view class="Rent container">
    <view class="section2 h52 between">
      <view class="acenter">
        <view class="c-666 mr16">拒绝原因</view>
        <view class="c-999">请选择拒绝原因</view>
      </view>
      <image src="@/img/ar2.png" mode="widthFix" class="w10" />
    </view>
    <Form title="拒绝说明"
          placeholder="请填写拒绝说明" />
    <!-- 底部按钮 -->
    <view class="footer-container">
      <view class="wp100 pl12 pr12 between">
        <button class="c-btn mr8">拒绝账单</button>
        <button class="c-btn c-btn-border2">取消并返回</button>
      </view>
    </view>
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import '../../index.styl'
import Form from '@/c/common/Form'

export default {
  name: 'Index',
  components: {
    Form
  },
  data () {
    return {
    }
  },
  methods: {
  },
}
</script>
