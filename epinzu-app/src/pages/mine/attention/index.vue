<template>
  <view class="Attention">
    <item />
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import item from './modules/item'
import '../index.styl'

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
