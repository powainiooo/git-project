<template>
  <view class="container ml12 mr12 mt8">
    <view class="mb8 between">
      <view class="bold">{{record.title}}</view>
      <view class="f10 c-999">{{record.created_at}}</view>
    </view>
    <view class="f12 c-999">{{record.content}}</view>
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import './index.styl'
import { getAction, postAction } from "@/utils/api"

export default {
  name: 'Index',
  data () {
    return {
      id: '',
      record: {}
    }
  },
  methods: {
    getData () {
      getAction(`/userapi/sysmsg/detail/${this.id}`).then(res => {
        if (res.code === 0) {
          this.record = res.data
          if (res.data.isread === 1) {
            this.read()
          }
        }
      })
    },
    read () {
      postAction(`/userapi/sysmsg/read/${this.id}`).then(res => {
        if (res.code === 0) {
          console.log('设置已读成功')
        }
      })
    }
  },
  onLoad (options) {
    this.id = options.id
    this.getData()
  }
}
</script>
