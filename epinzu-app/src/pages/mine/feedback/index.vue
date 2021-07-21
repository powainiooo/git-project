<template>
  <view class="Feedback">
    <view class="section2">
      <view class="mt16 mb16">问题反馈类型</view>
      <view class="flex wrap">
        <button class="c-btn c-btn-border c-btn-24 mr8 mb8 w74"
                :class="{
                  'c-btn-border': item.value === type,
                  'c-btn-border2': item.value !== type
                }"
                v-for="item in list"
                :key="item.value"
                @tap="type = item.value">{{item.label}}</button>
      </view>
      <view class="mb8">
        <textarea placeholder="说你想说，畅所欲言的反馈吧~"
                  placeholder-style="color: #999999;"
                  :maxlength="100"
                  @input="inputChange" />
      </view>
    </view>
    <view class="ml12 mr12 mt40">
      <button class="c-btn" @tap="handleSubmit">提交</button>
    </view>
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import '../index.styl'
import { postAction } from "@/utils/api"

export default {
  name: 'Index',
  data () {
    return {
      list: [
        { value: 1, label: '功能异常' },
        { value: 2, label: '优化建议' },
        { value: 3, label: '其它反馈' }
      ],
      type: 1,
      content: '',
      isAjax: false
    }
  },
  methods: {
    inputChange (e) {
      console.log('inputChange', e)
      this.content = e.detail.value
    },
    handleSubmit () {
      if (this.isAjax) return
      this.isAjax = true
      postAction('/userapi/feedback', {
        type: this.type,
        content: this.content,
      }).then(res => {
        if (res.code === 0) {
          Taro.showToast({
            title: res.msg
          })
          setTimeout(() => {
            Taro.navigateBack({
              delta: 1
            })
          }, 500)
        } else {
          this.isAjax = false
        }
      })
    }
  },
}
</script>
