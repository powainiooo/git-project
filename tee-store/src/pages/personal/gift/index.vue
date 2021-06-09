<style scoped>
.list-container { height: calc(100vh - 224px); overflow-x: hidden; overflow-y: auto; position: relative; }
.list-container .item { width: 634px; margin: 40px auto; }
.coupon-bg { width: 100%; height: calc(100vh - 224px); position: absolute; left: 0; bottom: 0; z-index: 0; background-color: #ffffff; }
.coupon-bg .coupon-img { width: 376px; opacity: .2; }
</style>

<template>
<div class="page">
  <c-header />
  <div class="container2 pt20 pr" style="padding-bottom: 0;">
    <div class="coupon-bg center"><img src="/static/images/index/gift.png" mode="widthFix" class="coupon-img" /></div>
    <tabs :current="current" @change="tabChange">
      <tab-pane :name="1" title="未使用">
        <scroll-view scroll-y class="list-container" @scrolltolower="reachBottom">
          <div class="item" v-for="i in page1.list" :key="id">
            <item :record="item" extraClass="coupon-item-min" />
          </div>
        </scroll-view>
      </tab-pane>
      <tab-pane :name="2" title="已使用">
        <scroll-view scroll-y class="list-container" @scrolltolower="reachBottom">
          <div class="item" v-for="i in page2.list" :key="id">
            <item :record="item" extraClass="coupon-item-min" />
          </div>
        </scroll-view>
      </tab-pane>
    </tabs>
  </div>
</div>
</template>

<script>
import cHeader from '@/components/header'
import cFooter from '@/components/footer'
import tabs from '@/components/Tabs/tabs'
import tabPane from '@/components/Tabs/tabPane'
import item from '@/pages/coupon/modules/item'
import { getAction } from '@/utils/api'

export default {
  components: {
    cHeader,
    cFooter,
    tabs,
    tabPane,
    item
  },
  data () {
    return {
      current: 0,
      status: 1,
      page1: {
        page: 1,
        total: 0,
        list: []
      },
      page2: {
        page: 1,
        total: 0,
        list: []
      }
    }
  },

  methods: {
    reachBottom () {
      if (this.status === 1) {
        if (this.page1.total > this.page1.list.length) {
          this.getData1()
        }
      } else if (this.status === 2) {
        if (this.page2.total > this.page2.list.length) {
          this.getData2()
        }
      }
    },
    tabChange (e) {
      this.status = e
    },
    getData1 () {
      getAction('/userapi/user/prize/index/data', {
        page: this.page1.page,
        limit: 20,
        status: 1
      }).then(res => {
        if (res.code === 0) {
          this.page1.list = this.page1.list.concat(this.page1.list)
          this.page1.total = res.count
        }
      })
    },
    getData2 () {
      getAction('/userapi/user/prize/index/data', {
        page: this.page2.page,
        limit: 20,
        status: 2
      }).then(res => {
        if (res.code === 0) {
          this.page2.list = this.page2.list.concat(this.page2.list)
          this.page2.total = res.count
        }
      })
    }
  },
  onLoad (options) {
    Object.assign(this.$data, this.$options.data())
    this.getData1()
    this.getData2()
    if (options.status === 'used') {
      this.current = 1
    }
  }
}
</script>
