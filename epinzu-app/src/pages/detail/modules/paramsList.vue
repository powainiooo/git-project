<template>
<Popup :show.sync="visible" round :closeable="true">
  <view class="Detail-buys Detail-questions">
    <view class="tc mt16 mb24">商品参数</view>
    <view class="ques-item borderB" v-for="(item, index) in list" :key="index">
      <view class="l">{{item.name}}</view>
      <view class="r">{{item.value}}</view>
    </view>
  </view>
</Popup>
</template>

<script type='es6'>
import Popup from '@/c/common/Popup'
export default {
	name: 'paramsList',
  props: {
	  list: Array
  },
  components: {
    Popup,
  },
	data() {
		return {
      visible: false
    }
	},
	methods: {
	  show () {
	    this.visible = true
    }
  }
}
</script>
