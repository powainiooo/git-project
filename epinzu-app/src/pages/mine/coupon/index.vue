<template>
  <view class="Coupon">
    <!-- 标签栏 -->
    <Tabs :list="tabs" :border="true" @change="tabChange" />
    <!-- 列表 -->
    <item v-for="item in dataSource"
          :key="item.id"
          :record="item"
          :status="queryParams.status" />
    <!-- 空提示 -->
    <view class="empty mt125" v-if="!loading && dataSource.length === 0">
      <image src="@/img/coupon.png" mode="widthFix" class="img" />
      <view class="txt">没有可用的优惠券</view>
    </view>
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import '../index.styl'
import Tabs from '@/c/common/Tabs'
import item from './modules/item'
import { pageMixin } from '@/mixins/pages'
import { getAction } from "@/utils/api"

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
        { key: 1, label: `未使用（${this.notuse}）` },
        { key: 2, label: `已使用（${this.used}）` },
        { key: 3, label: `已失效（${this.invalid}）` }
      ]
    }
  },
  data () {
    return {
      disableMixinCreated: true,
      notuse: 0,
      used: 0,
      invalid: 0,
      queryParams: {
        status: 1
      },
      url: {
        list: '/userapi/coupon/index'
      }
    }
  },
  methods: {
    tabChange (e) {
      this.queryParams.status = e
      this.resetLoad()
    },
    getCounts () {
      getAction('/userapi/coupon/counts').then(res => {
        if (res.code === 0) {
          this.notuse = res.data.valid
          this.used = res.data.used
          this.invalid = res.data.expired
        }
      })
    }
  },
  onShow () {
    this.resetLoad()
  },
  onLoad () {
    this.getCounts()
  }
}
</script>
