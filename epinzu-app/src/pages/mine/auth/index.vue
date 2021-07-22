<template>
  <view class="Auth">
    <view class="banner"></view>
    <view class="section">
      <view class="mt16 mb16">上传身份证照片</view>
      <view class="between">
        <!-- 人像面 -->
        <view class="card" @tap="selectImg('idcard_front')">
          <view class="img center">
            <image :src="imgSrc + record.idcard_front" mode="aspectFill" class="pic" v-if="record.idcard_front" />
            <image src="@/img/card1.png" mode="widthFix" class="w56" v-else />
          </view>
          <view class="f12 c-999 mt8 tc">点击上传 <text class="c-red">人像面</text></view>
        </view>
        <!-- 国徽面 -->
        <view class="card" @tap="selectImg('idcard_back')">
          <view class="img center">
            <image :src="imgSrc + record.idcard_back" mode="aspectFill" class="pic" v-if="record.idcard_back" />
            <image src="@/img/card2.png" mode="widthFix" class="w56" v-else />
          </view>
          <view class="f12 c-999 mt8 tc">点击上传 <text class="c-red">国徽面</text></view>
        </view>
      </view>
      <view class="mt24 mb16">请核对相关信息</view>
      <view class="h52 between borderB">
        <view class="c-666"><text class="c-red mr4">*</text>姓名</view>
        <input v-model="record.name"
               placeholder="请输入姓名"
               placeholder-style="color: #999999;"
               class="c-333 tr f14" />
      </view>
      <view class="h52 between">
        <view class="c-666"><text class="c-red mr4">*</text>身份证</view>
        <input v-model="record.idno"
               placeholder="请输入身份证件号"
               placeholder-style="color: #999999;"
               class="c-333 tr f14" />
      </view>
    </view>
    <view class="ml12 mr12 mt12">
      <view class="c-red f12" v-if="record.status === -1">{{record.refuse}}</view>
      <button class="c-btn mt40" :disabled="record.status !== -1" @tap="handleSubmit">提交认证</button>
    </view>
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import '../index.styl'
import { getAction, upload, postAction } from '@/utils/api'
import { promisify } from '@/utils'

const chooseImage = promisify(Taro.chooseImage)

export default {
  name: 'Setting',
  data () {
    return {
      imgSrc: Taro.imgSrc,
      record: {
        name: '',
        idno: '',
        idcard_front: '',
        idcard_back: '',
        expired: '',
      },
      isAjax: false
    }
  },
  methods: {
    getData () {
      getAction('/userapi/my/user/smrz').then(res => {
        if (res.code === 0) {
          this.record = res.data
        }
      })
    },
    selectImg (key) {
      chooseImage({
        count: 1
      }).then(res1 => {
        console.log('chooseImage', res1)
        upload(res1.tempFilePaths[0]).then(res2 => {
          const res3 = JSON.parse(res2)
          if (res3.code === 0) {
            this.record[key] = res3.data.url
          } else {
            Taro.showToast({
              title: res3.msg
            })
          }
        })
      })
    },
    handleSubmit () {
      if (this.isAjax) return
      this.isAjax = true
      postAction('/userapi/my/user/smrz', {
        name: this.record.name,
        idno: this.record.idno,
        idcard_front: this.record.idcard_front,
        idcard_back: this.record.idcard_back,
        expired: this.record.expired
      }).then(res => {
        if (res.code === 0) {
          Taro.showToast({
            title: res.msg
          })
          Taro.navigateBack({
            delta: 1
          })
        }
      })
    }
  },
  onLoad () {
    this.getData()
  }
}
</script>
