<template>
  <view class="Refund">
    <!-- 标签栏 -->
    <Tabs :list="tabs" @change="tabChange" :border="true" :fixed="true" />
    <!-- 空提示 -->
    <view class="empty mt165" v-if="!loading && dataSource.length === 0">
      <image src="@/img/order.png" mode="widthFix" class="img" />
      <view class="txt">您还没有相关的订单</view>
    </view>
    <!-- 列表 -->
    <view class="list mt48">
      <item v-for="item in dataSource"
            :key="item.id"
            :record="item"
            @refresh="resetLoad" />
    </view>
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import './index.styl'
import Tabs from '@/c/common/Tabs'
import item from './modules/item'
import { pageMixin } from "@/mixins/pages"

export default {
  name: 'Index',
  mixins: [pageMixin],
  components: {
    Tabs,
    item
  },
  computed: {
    tabs () {
      return [
        { key: 0, label: '全部' },
        { key: 1, label: `待处理（${this.nums}）` }
      ]
    }
  },
  data () {
    return {
      disableMixinCreated: true,
      nums: 0,
      queryParams: {
        list_type: 0
      },
      url: {
        list: '/userapi/after/index'
      }
    }
  },
  methods: {
    tabChange (e) {
      this.queryParams.list_type = e
      this.resetLoad()
    },
    afterGetList () {
      this.nums = this.listDataAll.total
    }
  },
  onShow () {
    this.resetLoad()
  },
  onPullDownRefresh () {
    this.resetLoad()
  }
}
</script>
