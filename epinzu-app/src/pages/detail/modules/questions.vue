<style scoped>

</style>

<template>
<view class="Detail-section">
  <view class="between mt16 mb16" @tap="toList">
    <view class="bold">常见问题</view>
    <view class="acenter f12 c-999" v-if="list.length >= max">
      更多<image src="@/img/ar1.png" mode="widthFix" class="w10 ml4" />
    </view>
  </view>
  <view class="flex mb16"
        v-for="(item, index) in ques"
        :key="item.id"
        @tap="toDetail(item.url)">
    <image src="@/img/ques.png" mode="widthFix" class="w20 mr4" />
    <view>{{index + 1}}. {{item.title}}</view>
  </view>
</view>
</template>

<script type='es6'>
import Taro from '@tarojs/taro'
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
		  max: 2
    }
	},
	methods: {
    toList () {
      if (this.list.length >= this.max) {
        Taro.navigateTo({
          url: '/pages/question/index'
        })
      }
    },
    toDetail (url) {
      Taro.navigateTo({
        url: `/pages/webview/index?src=${url}&title=常见问题`
      })
    }
  }
}
</script>
