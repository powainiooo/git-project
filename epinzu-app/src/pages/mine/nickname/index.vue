<template>
  <view class="Setting">
    <view class="bg-fff h52 between">
      <input v-model="name" confirm-type="done" maxlength="10" @confirm="handleSubmit" class="ml12 f14" />
      <image src="@/img/close.png" mode="widthFix" class="w20 mr12" @tap="name = ''" />
    </view>
    <view class="f12 c-999 mt8 ml12">支持1到10个字，可由中英文、数字、“-”，“_”组成</view>
    <view class="ml12 mr12 mt40">
      <button class="c-btn"
              :class="{'c-btn-disabled': name === ''}"
              @tap="handleSubmit">保存</button>
    </view>
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import { postAction } from '@/utils/api'

export default {
  name: 'Setting',
  data () {
    return {
      name: '',
      isAjax: false
    }
  },
  methods: {
    handleSubmit () {
      if (this.isAjax) return
      if (this.name === '') {
        return
      }
      this.isAjax = true
      postAction('/userapi/user/edit/nickname', {
        nickname: this.name
      }).then(res => {
        if (res.code === 0) {
          Taro.showToast({
            title: res.msg
          })
          Taro.navigateBack({
            delta: 1
          })
          this.$store.dispatch('getUserInfo')
        } else {
          this.isAjax = false
        }
      })
    }
  },
  onLoad (options) {
    this.name = options.name
  }
}
</script>
