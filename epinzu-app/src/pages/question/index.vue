<template>
  <view class="Question">
    <view class="ml12">
      <cell title="1. 有什么支付方式可以选择？" isLink />
      <cell title="1. 有什么支付方式可以选择？" isLink />
      <cell title="1. 有什么支付方式可以选择？" isLink />
      <cell title="1. 有什么支付方式可以选择？" isLink />
    </view>
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import './index.styl'
import Cell from '@/c/common/Cell'

export default {
  name: 'Question',
  components: {
    Cell
  },
  data () {
    return {
    }
  },
  methods: {
  },
}
</script>
