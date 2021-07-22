<template>
  <view class="Setting">
    <view class="section2" style="padding-right: 0">
      <Cell title="账号ID" :value="record.uid" color="#999999" class="pr12" />
      <Cell title="手机绑定" :value="record.phone" color="#999999" isLink @tap="toPage('/pages/bindPhone/index?func=update')" />
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
  computed: {
    record () {
      return this.$store.state.userInfo
    }
  },
  data () {
    return {
    }
  },
  methods: {
    toPage (url) {
      Taro.navigateTo({
        url
      })
    }
  },
}
</script>
