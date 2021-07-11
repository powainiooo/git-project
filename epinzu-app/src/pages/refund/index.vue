<template>
  <view class="Refund">
    <!-- 标签栏 -->
    <Tabs :list="tabs" />
    <!-- 列表 -->
    <view class="list">
      <item />
    </view>
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import './index.styl'
import Tabs from '@/c/common/Tabs'
import item from './modules/item'

export default {
  name: 'Index',
  components: {
    Tabs,
    item
  },
  computed: {
    tabs () {
      return [
        { key: 'all', label: '全部' },
        { key: 'sale', label: `待处理（${this.nums}）` }
      ]
    }
  },
  data () {
    return {
      nums: 0
    }
  },
  methods: {
  },
}
</script>
