<style scoped>

</style>

<template>
<view class="Detail-section Detail-questions pb8" id="params">
  <view class="between mt16 mb16" @tap="toMore">
    <view class="bold">产品参数</view>
    <view class="acenter f12 c-999" v-if="list.length > max">
      更多<image src="@/img/ar1.png" mode="widthFix" class="w10 ml4" />
    </view>
  </view>
  <view class="ques-item ques-item-sim borderB" v-for="(item, index) in ques" :key="index">
    <view class="l">{{item.name}}</view>
    <view class="r">{{item.value}}</view>
  </view>
</view>
</template>

<script type='es6'>
export default {
	name: 'app',
  props: {
    list: Array
  },
  computed: {
    ques () {
      return this.list.slice(0, this.max)
    }
  },
	data() {
		return {
		  max: 5
    }
	},
	methods: {
	  toMore () {
	    if (this.list.length > this.max) {
        this.$emit('params')
      }
    }
  }
}
</script>
