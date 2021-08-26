<style scoped>

</style>

<template>
<view class="Chat-emoji">
  <scroll-view :scrollY="true" class="Chat-emoji-scroll" catchMove>
    <view class="Chat-emoji-list">
      <view class="Chat-emoji-item"
            v-for="(data, key) in emojiData"
            :key="key"
            @tap="insertImg(key)">{{key}}</view>
    </view>
  </scroll-view>
  <view class="Chat-emoji-toolbar">
    <view class="btn" @tap="$emit('del')"><image src="@/img/del2.png" mode="widthFix" class="w24" /></view>
    <view class="btn btn-send"
          :class="{'btn-disabled': disabled}"
          @tap="send">发送</view>
  </view>
</view>
</template>

<script type='es6'>
import { emojiData } from '@/config'

export default {
	name: 'app',
  props: {
    disabled: {
      type: Boolean,
      default: true
    }
  },
	data() {
		return {
      emojiData
    }
	},
	methods: {
    insertImg (img) {
      this.$emit('insert', img)
    },
    send () {
      if (this.disabled) return
      this.$emit('send')
    }
  }
}
</script>
