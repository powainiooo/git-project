<template>
  <view class="Chat">
    <view class="Chat-list">
      <item />
      <item />
      <item />
    </view>
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import './index.styl'
import item from './modules/item'

export default {
  name: 'Index',
  components: {
    item
  },
  data () {
    return {
    }
  },
  methods: {
  },
}
</script>
