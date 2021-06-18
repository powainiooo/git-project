<template>
  <view class="index">
    <text>{{ msg }}</text>
    <van-button type='primary' :loading='true' loading-text='ing'>Button</van-button>
  </view>
</template>

<script>
import './index.css'

export default {
  data () {
    return {
      msg: 'Hello world!'
    }
  }
}
</script>
