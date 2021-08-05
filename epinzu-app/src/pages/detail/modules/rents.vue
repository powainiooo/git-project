<style scoped>

</style>

<template>
<view class="Detail-section">
  <view class="mt16 mb16 bold">租赁流程</view>
  <image :src="baseUrl + '/static/web/img/step1.png'" mode="widthFix" class="wp100" />
  <view class="hr mt16"></view>
  <view class="mt16 mb16 bold">租赁示例</view>
  <image :src="baseUrl + '/static/web/img/step2.png'" mode="widthFix" class="wp100" />
</view>
</template>

<script type='es6'>
import { baseUrl } from "@/config"

export default {
	name: 'app',
	data() {
		return {
      baseUrl
    }
	},
	methods: {}
}
</script>
