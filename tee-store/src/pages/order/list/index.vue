<style scoped>
.order-list { width: 100%; height: calc(100vh - 370px); background-color: #ffffff; box-sizing: border-box; }
.list-item { margin-bottom: 35px; }
</style>

<template>
<div class="page">
  <c-header menus />
  <div class="container2 pt20" style="padding-bottom: 0;">
    <div class="c-tabs">
      <ul class="c-tabs-btns">
        <li v-for="tab in tabs"
            :key="key"
            :class="{'active': currentKey === tab.key}"
            @click="tabChange(tab.key, index)">{{tab.title}}</li>
      </ul>
      <div class="c-tabs-frame">
        <div class="c-tabs-content"
             :style="{
          width: (tabs.length * 100) + '%',
          'margin-left': (index * -100) + '%'
        }">
          <div class="c-tab-pane">
            <scroll-view scroll-y class="order-list" :lower-threshold="100" @scrolltolower="touchBottom">
              <div class="list-item" v-for="item in tee.list" :key="id">
                <item :record="item" />
              </div>
            </scroll-view>
          </div>
          <div class="c-tab-pane">
            <scroll-view scroll-y class="order-list" :lower-threshold="100" @scrolltolower="touchBottom">
              <div class="list-item" v-for="item in nearby.list" :key="id">
                <item2 :record="item" />
              </div>
            </scroll-view>
          </div>
        </div>
      </div>
    </div>
  </div>
  <c-footer current="list" />
</div>
</template>

<script>
import cHeader from '@/components/header'
import cFooter from '@/components/footer'
import item from './modules/item'
import item2 from './modules/item2'
import { getAction } from '@/utils/api'

export default {
  components: {
    cHeader,
    cFooter,
    item,
    item2
  },
  data () {
    return {
      tabs: [
        { title: '茶饮订单', key: 'tee' },
        { title: '周边订单', key: 'nearby' }
      ],
      currentKey: 'tee',
      index: 0,
      tab: 'tee',
      tee: {
        page: 1,
        type: 1,
        total: 0,
        list: []
      },
      nearby: {
        page: 1,
        type: 2,
        total: 0,
        list: []
      }
    }
  },

  methods: {
    tabChange (key, index) {
      this.currentKey = key
      this.index = index
      this.tab = key
    },
    touchBottom () {
      const d = this[this.currentKey]
      if (d.total > d.list.length) {
        this.getData(this.currentKey)
      }
    },
    getData (key) {
      getAction('/userapi/order/index/data', {
        type: this[key].type,
        page: this[key].page,
        limit: 20
      }).then(res => {
        if (res.code === 0) {
          this[key].list = this[key].list.concat(res.data)
          this[key].total = res.count
        }
      })
    }
  },

  onLoad () {
    Object.assign(this.$data, this.$options.data())
    this.getData('tee')
    this.getData('nearby')
  }
}
</script>
