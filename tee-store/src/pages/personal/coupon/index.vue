<style scoped>
.list-container { height: calc(100vh - 224px); overflow-x: hidden; overflow-y: auto; position: relative; }
.list-container .item { width: 634px; margin: 40px auto; }
.coupon-bg { width: 100%; height: calc(100vh - 224px); position: absolute; left: 0; bottom: 0; z-index: 0; background-color: #ffffff; }
.coupon-bg .coupon-img { width: 400px; opacity: .2; }
</style>

<template>
<div class="page">
  <c-header />
  <div class="container2 pt20 pr" style="padding-bottom: 0;">
    <div class="coupon-bg center"><img src="/static/images/index/coupon.png" mode="widthFix" class="coupon-img" /></div>
    <tabs :current="current" @change="tabChange" v-if="showTabs">
      <tab-pane :name="1" title="未使用"></tab-pane>
      <tab-pane :name="2" title="已使用"></tab-pane>
    </tabs>
    <scroll-view scroll-y class="list-container" @scrolltolower="reachBottom">
      <div class="item slide-col slideUp" v-for="item in list" :key="id">
        <item :record="item" min @tap="handleTap" />
      </div>
      <div class="empty-hint" v-if="list.length === 0">
        <p>Irrelevant content</p>
        <div>无相关内容</div>
      </div>
    </scroll-view>
  </div>
</div>
</template>

<script>
import cHeader from '@/components/header'
import tabs from '@/components/Tabs/tabs'
import tabPane from '@/components/Tabs/tabPane'
import item from '@/pages/coupon/modules/item'
import { getAction } from '@/utils/api'
import store from '@/store'

export default {
  components: {
    cHeader,
    tabs,
    tabPane,
    item
  },
  computed: {
    storeInfo () {
      return store.state.storeInfo
    }
  },
  data () {
    return {
      current: 0,
      status: 1,
      page: 1,
      total: 0,
      list: [],
      showTabs: true
    }
  },

  methods: {
    reachBottom () {
      if (this.total > this.list.length) {
        this.getData1()
      }
    },
    tabChange (e) {
      this.status = e
      this.page = 1
      this.list = []
      this.getData()
    },
    getData () {
      getAction('/userapi/user/coupon/index/data', {
        page: this.page,
        limit: 20,
        status: this.status
      }).then(res => {
        if (res.code === 0) {
          this.list = this.list.concat(res.data)
          this.total = res.count
        }
      })
    },
    handleTap (record) {
      if (record.type === 1) {
        mpvue.switchTab({
          url: '/pages/stores/main'
        })
      } else {
        mpvue.switchTab({
          url: '/pages/nearby/list/main'
        })
      }
    }
  },
  onLoad (options) {
    console.log('coupon onLoad', this.current)
    Object.assign(this.$data, this.$options.data())
    if (options.status === 'used') {
      console.log('coupon onLoad1')
      this.current = 1
      this.status = 2
    } else {
      console.log('coupon onLoad2')
      this.current = 0
      this.status = 1
      this.showTabs = false
      this.$nextTick(() => {
        this.showTabs = true
      })
    }
    this.getData()
  }
}
</script>
