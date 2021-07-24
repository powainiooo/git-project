<template>
  <view class="Rent container">
    <picker mode="selector" :range="list" rangeKey="title" @change="onChange">
      <view class="section2 h52 between">
        <view class="acenter">
          <view class="c-666 mr16">拒绝原因</view>
          <view class="c-999" v-if="refuse_reason === ''">请选择拒绝原因</view>
          <view class="c-666" v-else>{{refuse_txt}}</view>
        </view>
        <image src="@/img/ar2.png" mode="widthFix" class="w10" />
      </view>
    </picker>
    <Form ref="form"
          title="拒绝说明"
          placeholder="请填写拒绝说明" />
    <!-- 底部按钮 -->
    <view class="footer-container">
      <view class="wp100 pl12 pr12 between">
        <button class="c-btn mr8" @tap="handleSubmit">拒绝账单</button>
        <button class="c-btn c-btn-border2" @tap="goBack">取消并返回</button>
      </view>
    </view>
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import '../../index.styl'
import Form from '@/c/common/Form'
import { getAction, postAction } from "@/utils/api"

export default {
  name: 'Index',
  components: {
    Form
  },
  data () {
    return {
      id: '',
      isAjax: false,
      list: [],
      refuse_reason: '',
      refuse_txt: ''
    }
  },
  methods: {
    handleSubmit () {
      if (this.isAjax) return
      this.isAjax = true
      const params = this.$refs.form.getParams()
      params.id = this.id
      params.refuse_reason = this.refuse_reason
      postAction('/userapi/rent/back/bill/refuse', params).then(res => {
        if (res.code === 0) {
          Taro.showToast({
            title: res.msg
          })
          this.goBack()
        } else {
          this.isAjax = false
        }
      })
    },
    goBack () {
      Taro.navigateBack({
        delta: 1
      })
    },
    getReason () {
      getAction('/userapi/rent/back/refuse/reasons').then(res => {
        if (res.code === 0) {
          this.list = res.data
        }
      })
    },
    onChange (e) {
      const item = this.list[e.detail.value]
      this.refuse_reason = item.refuse_reason
      this.refuse_txt = item.title
    }
  },
  onLoad (options) {
    this.id = options.id
    this.getReason()
  }
}
</script>
