<style scoped>

</style>

<template>
<scroll-view class="Message-page" :scroll-y="true" @ScrollToLower="reachBottom">
  <!-- 空提示 -->
  <view class="empty mt60" v-if="false">
    <image src="@/img/horn.png" mode="widthFix" class="img" />
    <view class="txt">还没有收到任何通知</view>
  </view>

  <!-- 列表 -->
  <view class="Message-list">
    <item/>
  </view>
</scroll-view>
</template>

<script type='es6'>
import item from './item'
export default {
	name: 'app',
  components: {
    item
  },
	data() {
		return {}
	},
	methods: {
    reachBottom (e) {
      console.log('reachBottom', e)
    }
  }
}
</script>
