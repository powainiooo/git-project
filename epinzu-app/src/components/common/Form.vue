<style lang="stylus" type="text/stylus">
.c-form
  background-color #FFFFFF; padding 16px 12px; overflow hidden;
  textarea
    height 93px; font-size 12px; background-color #F5F5F5; padding 8px;
  .c-upload
    width 85px; height 85px; border 1PX dashed #D5D5D5; border-radius 4px; text-align center;
</style>

<template>
<view class="c-form">
  <view class="mb8">{{title}}</view>
  <view class="pr mb8">
    <textarea :placeholder="placeholder"
              placeholder-style="color: #999999;"
              :maxlength="maxLength"
              @input="inputChange" />
  </view>
  <view class="c-upload">
    <image src="@/img/add2.png" mode="widthFix" class="w24 mt22 mb8" />
    <view class="c-999 f12">上传照片</view>
  </view>
  <view class="mt8 f12 c-999" v-if="hint !== ''">{{hint}}</view>
</view>
</template>

<script type='es6'>
export default {
	name: 'app',
  props: {
	  title: {
	    type: String,
      default: ''
    },
    placeholder: {
	    type: String,
      default: ''
    },
    hint: {
	    type: String,
      default: ''
    },
    maxLength: {
	    type: Number,
      default: 200
    }
  },
	data() {
		return {
		  txt: ''
    }
	},
	methods: {
    inputChange (e) {
      this.txt = e.detail.value
    }
  }
}
</script>
