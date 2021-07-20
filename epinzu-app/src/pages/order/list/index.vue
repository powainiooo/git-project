<template>
  <view class="Order-list">
    <Tabs :value="tabKey" :list="tabs" :border="true" @change="tabChange" />
    <!-- 空提示 -->
    <view class="empty mt125" v-if="!loading && dataSource.length === 0">
      <image src="@/img/order.png" mode="widthFix" class="img" />
      <view class="txt">您还没有相关的订单</view>
    </view>
    <!-- 列表 -->
    <view class="ml12 mr12 mt8 mb8">
      <item v-for="item in dataSource"
            :key="item.id"
            :record="item" />
    </view>
    <!-- 支付方式 -->
    <pay-way />
    <!-- 取消原因 -->
    <cancel-way />
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import './index.styl'
import Tabs from "@/c/common/Tabs"
import {
  ORDER_WAIT,
  ORDER_SEND,
  ORDER_GET,
  ORDER_GETED
} from '@/config'
import item from './modules/item'
import PayWay from '../modules/PayWay'
import CancelWay from '../modules/CancelWay'
import { pageMixin } from '@/mixins/pages'

export default {
  name: 'Index',
  components: {
    Tabs,
    item,
    PayWay,
    CancelWay
  },
  mixins: [pageMixin],
  data () {
    return {
      tabs: [
        { key: 0, label: '全部' },
        { key: ORDER_WAIT, label: '待付款' },
        { key: ORDER_SEND, label: '待发货' },
        { key: ORDER_GET, label: '待收货' },
        { key: ORDER_GETED, label: '已签收' }
      ],
      tabKey: '',
    }
  },
  methods: {
    tabChange (e) {
      this.tabKey = e
    }
  },
}
</script>
