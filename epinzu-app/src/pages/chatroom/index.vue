<template>
  <view class="Chat">
    <view class="Chat-list">
      <item />
      <item />
      <item />
      <item />
      <item />
      <item />
      <item />
    </view>

    <view class="footer-container" style="background-color: #F5F6F7">
      <view class="acenter Chat-footer">
        <image src="@/img/voice.png" mode="widthFix" class="w24 mr8" />
        <input />
        <image src="@/img/face.png" mode="widthFix" class="w24 mr8" />
        <image src="@/img/add3.png" mode="widthFix" class="w24" />
      </view>
    </view>
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import './index.styl'
import item from './modules/item'

export default {
  name: 'Index',
  components: {
    item
  },
  data () {
    return {
    }
  },
  methods: {
  },
}
</script>
