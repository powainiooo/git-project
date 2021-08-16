<style scoped>

</style>

<template>
<scroll-view class="Message-page" :scroll-y="true" @ScrollToLower="reachBottom">
  <!-- 空提示 -->
  <view class="empty mt60" v-if="false">
    <image src="@/img/mes.png" mode="widthFix" class="img" />
    <view class="txt">您还没有聊天消息</view>
  </view>

  <!-- 列表 -->
  <view class="Message-list">
    <view class="item borderB">
      <image src="@/img/default.png" mode="aspectFill" class="img" />
      <view class="infos">
        <view class="between mb4">
          <view>在线客服1</view>
          <view class="f10 c-999">刚刚</view>
        </view>
        <view class="between">
          <view class="content">亲，打扰您了，看您在我们家买的宝贝收到买的宝贝收到</view>
          <view class="dot-num">2</view>
        </view>
      </view>
    </view>
  </view>
</scroll-view>
</template>

<script type='es6'>
import Taro from '@tarojs/taro'
import { wsUrl } from '@/config'

export default {
	name: 'app',
	data() {
		return {
		  isConnect: false
    }
	},
	methods: {
    reachBottom (e) {
      console.log('reachBottom', e)
    },
    connect () {
      if (this.isConnect) return
      Taro.connectSocket({
        url: wsUrl,
        success: () => {
          console.log('connect success')
          this.isConnect = true
        }
      })
      Taro.onSocketOpen(res => {
        console.log('onSocketOpen', res)
      })
      Taro.onSocketMessage(res => {
        console.log('onSocketMessage', res)
      })
      Taro.onSocketError(res => {
        console.log('onSocketError', res)
      })
      Taro.onSocketClose(res => {
        console.log('onSocketClose', res)
      })
    }
  }
}
</script>
