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
          <view class="Chat-item-status" v-if="false">已读</view>
          <view class="Chat-item-box">
            <!-- 文本消息 -->
            <view v-if="true">有15cm长的吗有15cm长的吗有15cm长的吗有15cm长的吗有15cm长的吗有15cm长的吗？</view>
            <!-- 产品消息 -->
            <view class="Chat-item-goods" v-if="false">
              <image src="@/img/default.png" mode="aspectFill" />
              <view>无刷锂电角磨机无线打磨机多功能切割机抛光机充电磨光机</view>
              <view class="c-red mt4"><text class="f10">￥</text>85</view>
            </view>
            <!-- 问题消息 -->
            <view class="Chat-item-problem" v-if="false">
              <view class="pb8 borderB">亲，很高兴为你服务，请问你要咨询什么问题呢？</view>
              <view class="item borderB">哪里发货？</view>
              <view class="item borderB">哪里发货？</view>
              <view class="mt8 f12 c-999">此消息由机器人发送</view>
            </view>
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
