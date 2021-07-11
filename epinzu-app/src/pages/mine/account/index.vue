<template>
  <view class="Setting">
    <view class="section2" style="padding-right: 0">
      <Cell title="账号ID" value="1889160" color="#999999" class="pr12" />
      <Cell title="手机绑定" value="15271001997" color="#999999" isLink />
    </view>
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import Cell from '@/c/common/Cell'

export default {
  name: 'Setting',
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
