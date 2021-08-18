<style scoped>

</style>

<template>
<view class="Chat-item">
  <!-- 时间 -->
  <view class="Chat-item-date">下午9:39</view>
  <!-- 消息 -->
  <view class="Chat-item-container clearfix Chat-custom">
    <!-- 头像 -->
    <view class="Chat-item-head">
      <image src="@/img/avatar.png" mode="aspectFill" />
    </view>
    <!-- 内容区 -->
    <view class="Chat-item-content clearfix">
      <view class="Chat-item-wrapper">
        <view class="Chat-item-message">
          <!-- 状态 -->
          <view class="Chat-item-status" v-if="false">已读1</view>
          <view class="Chat-item-box">
            <!-- 文本消息 -->
            <view>有15cm长的吗有15cm长的吗有15cm长的吗有15cm长的吗有15cm长的吗有15cm长的吗？</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</view>
</template>

<script type='es6'>
export default {
	name: 'app',
	data() {
		return {}
	},
	methods: {}
}
</script>
