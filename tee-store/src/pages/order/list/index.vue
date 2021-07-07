<style scoped>
.order-list { width: 100%; height: calc(100vh - 370px); background-color: #ffffff; box-sizing: border-box; position: relative; z-index: 10; }
.list-item { margin-bottom: 35px; }
</style>

<template>
<div class="page">
  <c-header menus />
  <div class="container2 pt20" style="padding-bottom: 0;">

    <tabs @change="tabChange" v-if="showTab">
      <tab-pane :name="1" title="茶饮订单"></tab-pane>
      <tab-pane :name="2" title="积分兑换订单"></tab-pane>
    </tabs>
    <scroll-view scroll-y class="order-list" :lower-threshold="100" @scrolltolower="touchBottom">
      <div class="list-item slide-col slideUp" v-for="item in list" :key="id">
        <item :record="item" v-if="type === 1" @refresh="refresh"/>
        <item2 :record="item" v-else-if="type === 2" @post="openPost"/>
      </div>
      <div class="empty-hint" v-if="list.length === 0 && !isAjax">
        <p>Irrelevant content</p>
        <div>无相关内容</div>
      </div>
    </scroll-view>
  </div>
  <c-footer current="list" />

  <c-post ref="post" />
</div>
</template>

<script>
import Vue from 'vue'
import cHeader from '@/components/header'
import cFooter from '@/components/footer'
import tabs from '@/components/Tabs/tabs'
import tabPane from '@/components/Tabs/tabPane'
import item from './modules/item'
import item2 from './modules/item2'
import cPost from '../detail/nearby/modules/post'
import { getAction } from '@/utils/api'

export default {
  components: {
    cHeader,
    cFooter,
    tabs,
    tabPane,
    item,
    item2,
    cPost
  },
  data () {
    return {
      showTab: true,
      tabs: [
        { title: '茶饮订单', key: '1' },
        { title: '周边订单', key: '2' }
      ],
      current: 0,
      type: 1,
      page: 1,
      total: 0,
      list: [],
      isAjax: false
    }
  },

  methods: {
    tabChange (e) {
      this.type = e
      this.page = 1
      this.list = []
      this.getData()
    },
    touchBottom () {
      if (this.total > this.list.length) {
        this.getData(this.currentKey)
      }
    },
    getData () {
      this.isAjax = true
      getAction('/userapi/order/index/data', {
        type: this.type,
        page: this.page,
        limit: 20
      }).then(res => {
        this.isAjax = false
        if (res.code === 0) {
          this.list = this.list.concat(res.data)
          this.total = res.count
        }
      })
    },
    refresh (id) {
      getAction('/userapi/order/index/data', {
        type: this.type,
        page: this.page,
        limit: 20
      }).then(res => {
        if (res.code === 0) {
          res.data.forEach((item, index) => {
            if (item.id === id) {
              console.log('item', item)
              Vue.set(this.list, index, item)
            }
          })
        }
      })
    },
    openPost (id) {
      this.$refs.post.show(id)
    }
  },

  onLoad () {
    Object.assign(this.$data, this.$options.data())
    this.showTab = false
    this.$nextTick(() => {
      this.showTab = true
    })
    this.getData()
  }
}
</script>
