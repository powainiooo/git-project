<style scoped>

</style>

<template>
<view class="item-box"
      :class="{'item-box-show': showDel}"
      @touchstart="ts"
      @touchend="te">
  <view class="item borderB" @tap="toDetail">
    <view class="infos">
      <view class="between mb4">
        <view class="bold">{{record.title}}</view>
        <view class="f10 c-999">{{record.created_at}}</view>
      </view>
      <view class="between">
        <view class="acenter">
          <view class="content">{{record.content}}</view>
          <image src="@/img/ar1.png" mode="widthFix" class="w10 ml5" />
        </view>
        <view class="dot-num dot-num-small" v-if="record.isread === 1"></view>
      </view>
    </view>
  </view>
  <view class="btn-del">删除</view>
</view>
</template>

<script type='es6'>
import Taro from "@tarojs/taro"
export default {
	name: 'app',
  props: {
	  record: Object
  },
	data() {
		return {
		  showDel: false,
      sx: 0
    }
	},
	methods: {
    ts (e) {
      console.log('ts', e)
      this.sx = e.changedTouches[0].clientX
    },
    te (e) {
      const ex = e.changedTouches[0].clientX
      if (this.sx > ex + 50) {
        this.showDel = true
      }
      if (ex > this.sx + 50) {
        this.showDel = false
      }
    },
    toDetail () {
      this.record.isread = 2
      Taro.navigateTo({
        url: `/pages/message/detail?id=${this.record.id}`
      })
    }
  }
}
</script>
