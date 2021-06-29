<style scoped>

</style>

<template>
<view class="item-box"
      :class="{'item-box-show': showDel}"
      @touchstart="ts"
      @touchend="te">
  <view class="item borderB">
    <view class="infos">
      <view class="between mb4">
        <view>在线客服1</view>
        <view class="f10 c-999">刚刚</view>
      </view>
      <view class="between">
        <view class="acenter">
          <view class="content">亲，打扰您了，看您在我们家买的宝贝收到买的宝贝收到</view>
          <image src="@/img/ar1.png" mode="widthFix" class="w10 ml5" />
        </view>
        <view class="dot-num dot-num-small"></view>
      </view>
    </view>
  </view>
  <view class="btn-del">删除</view>
</view>
</template>

<script type='es6'>
export default {
	name: 'app',
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
    }
  }
}
</script>
