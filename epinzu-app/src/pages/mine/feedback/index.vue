<template>
  <view class="Feedback">
    <view class="section2">
      <view class="mt16 mb16">问题反馈类型</view>
      <view class="flex wrap">
        <button class="c-btn c-btn-border c-btn-24 mr8 mb8 w74">功能异常</button>
        <button class="c-btn c-btn-border2 c-btn-24 mr8 mb8 w74">优化建议</button>
        <button class="c-btn c-btn-border2 c-btn-24 mr8 mb8 w74">其他反馈</button>
      </view>
      <view class="mb8">
        <textarea placeholder="说你想说，畅所欲言的反馈吧~"
                  placeholder-style="color: #999999;"
                  :maxlength="100"
                  @input="inputChange" />
      </view>
    </view>
    <view class="ml12 mr12 mt40">
      <button class="c-btn">提交</button>
    </view>
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import '../index.styl'

export default {
  name: 'Index',
  data () {
    return {
    }
  },
  methods: {
    inputChange (e) {}
  },
}
</script>
