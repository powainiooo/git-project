<template>
  <view class="Setting">
    <view class="bg-fff h52 between">
      <input placeholder="请输入取件码" v-model="code" class="ml12 f14" />
    </view>
    <view class="f12 c-999 mt8 ml12">提示：让商家提供6位数字的取件码，请确认货物完好，再确认提交</view>

    <view class="footer-container">
      <view class="wp100 pl12 pr12">
        <button class="c-btn" @tap="handleSubmit">提交申请</button>
      </view>
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
      id: '',
      code: '',
      isAjax: false
    }
  },
  methods: {
    handleSubmit () {
      if (this.isAjax) return
      if (this.code === '') {
        Taro.showToast({
          title: '请输入取件码'
        })
        return
      }
      this.isAjax = true
      postAction('/userapi/after/fetch', {
        id: this.id,
        code: this.code
      }).then(res => {
        if (res.code === 0) {
          Taro.showToast({
            title: res.msg
          })
          Taro.navigateBack({
            delta: 1
          })
        } else {
          this.isAjax = false
        }
      })
    }
  },
  onLoad (options) {
    this.id = options.id
  }
}
</script>
