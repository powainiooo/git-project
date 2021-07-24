<template>
  <view class="Rent">
    <Tabs :list="tabs" :border="true" @change="tabChange" />
    <!-- 空提示 -->
    <view class="empty mt125" v-if="!loading && dataSource.length === 0">
      <image src="@/img/order.png" mode="widthFix" class="img" />
      <view class="txt">您还没有相关的订单</view>
    </view>
    <view class="mb8">
      <item v-for="item in dataSource"
            :key="item.id"
            :status="queryParams.status"
            :record="item" />
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
import { pageMixin } from '@/mixins/pages'

export default {
  name: 'Index',
  components: {
    Tabs,
    item
  },
  mixins: [pageMixin],
  data () {
    return {
      disableMixinCreated: true,
      tabs: [
        { key: RENT_RENT, label: '租用中' },
        { key: RENT_BACKING, label: '归还中' },
        { key: RENT_BACKED, label: '已归还' },
        { key: RENT_BREAK, label: '已租断' }
      ],
      queryParams: {
        status: RENT_RENT
      },
      url: {
        list: '/userapi/rent/index'
      },
    }
  },
  methods: {
    tabChange (e) {
      this.queryParams.status = e
      this.resetLoad()
    },
  },
  onShow () {
    this.resetLoad()
  }
}
</script>
