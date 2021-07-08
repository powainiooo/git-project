<template>
  <view class="Rent">
    <Tabs :list="tabs" :border="true" @change="tabChange" />
    <view class="mb8">
      <item />
    </view>
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import './index.styl'
import Tabs from '@/c/common/Tabs'
import item from './modules/item'
import {
  RENT_RENT,
  RENT_BACKING,
  RENT_BACKED,
  RENT_BREAK
} from '@/config'

export default {
  name: 'Index',
  components: {
    Tabs,
    item
  },
  data () {
    return {
      tabs: [
        { key: RENT_RENT, label: '租用中' },
        { key: RENT_BACKING, label: '归还中' },
        { key: RENT_BACKED, label: '已归还' },
        { key: RENT_BREAK, label: '已租断' }
      ],
    }
  },
  methods: {
    tabChange (e) {}
  },
}
</script>
