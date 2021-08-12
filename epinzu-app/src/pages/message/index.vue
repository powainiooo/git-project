<template>
  <view class="Message">
    <view class="Message-tabs">
      <view class="item"
            :class="{'active': tabKey === 'service'}"
            @tap="toggle('service')">聊天<text class="dot-num" v-if="serviceNum > 0">{{serviceNum}}</text></view>
      <view class="item"
            :class="{'active': tabKey === 'notice'}"
            @tap="toggle('notice')">通知<text class="dot-num" v-if="noticeNum > 0">{{noticeNum}}</text></view>
    </view>
    <view class="hr8"></view>
    <!-- 店铺客服 列表 -->
    <service v-show="tabKey === 'service'" />
    <!-- 通知 列表 -->
    <notice ref="notice" v-show="tabKey === 'notice'" />

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
      tabKey: 'service',
      serviceNum: 0,
      noticeNum: 0
    }
  },
  methods: {
    toggle (key) {
      this.tabKey = key
      if (key === 'service') {

      } else if (key === 'notice') {
        this.$refs.notice.getListData()
      }
    }
  },
}
</script>
