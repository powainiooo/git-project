<style scoped>
.story-content { margin: 30px; }
.story-content h2 { font-size: 40px; color: #000000; margin-bottom: 20px; text-align: center; }
.story-content div { font-size: 30px; line-height: 50px; }
</style>

<template>
  <div class="container" @touchstart="tstart" @touchmove="tmove" @touchend="tend">
    <div class="hr20"></div>
    <div class="mt30 mb30">
      <c-search ref="search" placeholder="搜索内容" @search="onSearch"/>
    </div>

    <ul class="tabs3 mb60">
      <li :class="{'active': tabKey === 1}" @click="toggle(1)">成语</li>
      <li :class="{'active': tabKey === 2}" @click="toggle(2)">睡前</li>
      <li :class="{'active': tabKey === 3}" @click="toggle(3)">童话</li>
      <li :class="{'active': tabKey === 4}" @click="toggle(4)">寓言</li>
    </ul>

    <div class="story-content" v-for="item in list" :key="index">
      <h2>{{item.title}}</h2>
      <div><rich-text :nodes="item.content"></rich-text></div>
    </div>

    <operates :id="id" />
  </div>
</template>

<script>
import operates from '@/components/operates'
import cSearch from '@/components/search'
import {postAction} from '@/utils/api'

export default {
  components: {
    operates,
    cSearch
  },
  data () {
    return {
      id: '',
      tabKey: 1,
      list: [],
      keyword: '',
      page: 1,
      loadOver: false,
      sx: 0,
      ex: 0
    }
  },
  methods: {
    toggle (key) {
      this.tabKey = key
      this.list = []
      this.page = 1
      this.keyword = this.$refs.search.keyword
      this.getList()
    },
    onSearch (e) {
      this.keyword = e
      this.page = 1
      this.list = []
      this.getList()
    },
    getList () {
      postAction('story', {
        page: this.page,
        type: this.tabKey,
        num: 10,
        word: this.keyword
      }).then(res => {
        if (res.ret === 0) {
          this.list = this.list.concat(res.data)
          this.loadOver = res.data.length === 0
          if (res.data.length === 0 && this.page === 1) {
            mpvue.showToast({
              title: '未查询到数据',
              icon: 'none'
            })
          }
        }
      })
    },
    tstart (e) {
      this.sx = e.clientX
    },
    tmove (e) {
      this.ex = e.clientX
    },
    tend (e) {
      if (this.sx > this.ex + 100 && this.ex !== 0) {
        this.getList()
      }
      this.ex = 0
    }
  },
  onReachBottom () {
    if (!this.loadOver) {
      this.page += 1
      this.getList()
    }
  },
  onShow () {
    this.keyword = ''
    this.page = 1
    this.list = []
  },
  onShareAppMessage () {
    const pages = getCurrentPages()
    const view = pages[pages.length - 1]
    return {
      title: '故事大全',
      path: `/${view.route}?id=${this.id}`
    }
  },
  onLoad (options) {
    this.id = options.id
    this.getList()
  }
}
</script>
