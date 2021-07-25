<template>
  <view class="Rent container">
    <Form title="凭证说明"
          ref="form"
          placeholder="请你详细填写申请理由"
          hint="提示：请上传真实凭证图片，最多3张"
          class="mt2" />
    <!-- 底部按钮 -->
    <view class="footer-container">
      <view class="wp100 pl12 pr12">
        <button class="c-btn" @tap="handleSubmit">确认提交</button>
      </view>
    </view>
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import './index.styl'
import Form from '@/c/common/Form'
import { postAction } from "@/utils/api"

export default {
  name: 'Index',
  components: {
    Form
  },
  data () {
    return {
      id: '',
      from: '',
      isAjax: false
    }
  },
  methods: {
    handleSubmit () {
      if (this.isAjax) return
      this.isAjax = true
      const params = this.$refs.form.getParams()
      params.id = this.id
      const url = '/userapi/after/ptjr/proof'
      postAction(url, params).then(res => {
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
    this.from = options.from || 'rent'
  }
}
</script>
