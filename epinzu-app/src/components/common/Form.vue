<style lang="stylus" type="text/stylus">
.c-form
  background-color #FFFFFF; padding 16px 12px; overflow hidden;
  .txt
    background-color #F5F5F5; padding-bottom 8px;
    textarea
      height 93px; font-size 12px; background-color #F5F5F5; padding 8px;
  .c-upload
    width 85px; height 85px; border 1PX dashed #D5D5D5; border-radius 4px; text-align center;
  &-imgs
    display flex; flex-wrap wrap;
    .img
      width 85px; height 85px; border-radius 4px; margin-right 8px; margin-bottom 8px; overflow hidden; position relative;
    .pic
      width 100%; height 100%;
    .close
      width 16px; position absolute; top 0; right 0;
</style>

<template>
<view class="c-form">
  <view class="mb8">{{title}}</view>
  <view class="pr mb8 txt">
    <textarea :value='txt'
              :placeholder="placeholder"
              placeholder-style="color: #999999;"
              :maxlength="maxLength"
              @input="inputChange" />
  </view>
  <view class="c-form-imgs">
    <view class="img" v-for="(src, index) in imgs" :key="src">
      <image :src="imgSrc + src" mode="aspectFill" class="pic" />
      <image src="@/img/close2.png" mode="widthFix" class="close" @tap="del(index)" />
    </view>
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
        count: this.maxImg
      }).then(res => {
        console.log('chooseImage', res)
        for (const path of res.tempFilePaths) {
          this.uploadImg(path)
        }
      })
    },
    uploadImg (path) {
      upload(path).then(res => {
        const res2 = JSON.parse(res)
        if (res2.code === 0) {
          this.imgs.push(res2.data.url)
        }
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
    },
    del (index) {
      this.imgs.splice(index, 1)
    }
  }
}
</script>
