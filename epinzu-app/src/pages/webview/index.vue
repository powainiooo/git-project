<template>
  <view class="index">
    <web-view :src="src" />
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import './index.styl'

export default {
  name: 'Index',
  data () {
    return {
      src: ''
    }
  },
  methods: {
  },
  onLoad (options) {
    this.src = options.src
    Taro.setNavigationBarTitle({
      title: options.title
    })
  }
}
</script>
