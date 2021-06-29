<template>
  <view class="Message">
    <view class="Message-tabs">
      <view class="item active">店铺客服<text class="dot-num">0</text></view>
      <view class="item">通知<text class="dot-num">0</text></view>
    </view>
    <view class="hr8"></view>
    <!-- 店铺客服 列表 -->
<!--    <service />-->
    <!-- 通知 列表 -->
    <notice />

    <!-- 底部导航 -->
    <c-footer current="home" />
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import './index.styl'
import cFooter from '@/c/common/footer'
import service from './modules/service'
import notice from './modules/notice'

export default {
  name: 'Index',
  components: {
    cFooter,
    service,
    notice
  },
  data () {
    return {
    }
  },
  methods: {
  },
}
</script>
