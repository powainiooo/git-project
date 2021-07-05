<style lang="stylus" type="text/stylus">
.c-rate
  display flex; align-items center;
  &-item
    width 10px; margin-right 4px;
    image
      width 100%
</style>

<template>
<view class="c-rate">
  <view class="c-rate-item" v-for="i in count" :key="i">
    <image src="@/img/icon-star4.png" mode="widthFix" v-if="i <= value" />
    <image src="@/img/icon-star3.png" mode="widthFix" v-else />
  </view>
</view>
</template>

<script type='es6'>
export default {
	name: 'app',
  props: {
	  count: {
	    type: Number,
      default: 5
    },
    value: {
      type: Number,
      default: 0
    }
  },
	data() {
		return {}
	},
	methods: {}
}
</script>
