<style lang="stylus" type="text/stylus">
.c-form
   background-color #FFFFFF; padding 16px 12px; overflow hidden;
   textarea
      height 93px; font-size 12px; background-color #F5F5F5; padding 8px;
   .c-upload
      width 85px; height 85px; border 1PX dashed #D5D5D5; border-radius 4px; text-align center;
   &-imgs
      display flex; flex-wrap wrap;
      .img
         width 85px; height 85px; border-radius 4px; margin-right 8px; margin-bottom 8px;
</style>

<template>
<view class="c-form">
   <view class="mb8">{{title}}</view>
   <view class="pr mb8">
    <textarea :value='txt'
              :placeholder="placeholder"
              placeholder-style="color: #999999;"
              :maxlength="maxLength"
              @input="inputChange" />
   </view>
   <view class="c-form-imgs">
      <image v-for="src in imgs" :key="src" :src="imgSrc + src" mode="aspectFill" class="img" />
      <view class="c-upload" v-if="imgs.length < maxImg" @tap="selectImg">
         <image src="@/img/add2.png" mode="widthFix" class="w24 mt22 mb8" />
         <view class="c-999 f12">上传照片</view>
      </view>
   </view>
   <view class="mt8 f12 c-999" v-if="hint !== ''">{{hint}}</view>
</view>
</template>

<script type='es6'>
import Taro from '@tarojs/taro'
import { promisify } from '@/utils'
import { upload } from '@/utils/api'

const chooseImage = promisify(Taro.chooseImage)
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
		},
		maxImg: {
			type: Number,
			default: 3
		}
	},
	data() {
		return {
			imgSrc: Taro.imgSrc,
			txt: '',
			imgs: []
		}
	},
	methods: {
		inputChange (e) {
			this.txt = e.detail.value
		},
		selectImg () {
			chooseImage({
				count: 1
			}).then(res1 => {
				console.log('chooseImage', res1)
				upload(res1.tempFilePaths.join(',')).then(res2 => {
					const res3 = JSON.parse(res2)
					console.log(res3)
					if (res3.code === 0) {
						this.imgs.push(res3.data.url)
					}
				})
			})
		},
		getParams () {
			return {
				content: this.txt,
				images: this.imgs
			}
		},
		setValues (data) {
			this.txt = data.content
			this.imgs = data.images
      }
	}
}
</script>
