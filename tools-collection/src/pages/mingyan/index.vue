<style scoped>
.mj-list li { padding: 40px 30px; }
.mj-list li h2 { font-size: 26px; color: #3D7FC7; margin-bottom: 30px; text-align: center; }
.mj-list li h3 { font-size: 20px; color: #FF3600; margin-bottom: 30px; text-align: right; margin-right: 65px; }
.mj-list li div { font-size: 20px; color: #000000; line-height: 40px; padding-left: 80px; position: relative; }
.mj-list li div:before { color: #FF3600; position: absolute; top: 0; left: 0; }
.mj-list li div.n1:before { content: '【释义】'; }
.mj-list li div.n2:before { content: '【延伸】'; }
</style>

<template>
<div class="container" @touchstart="tstart" @touchmove="tmove" @touchend="tend">
  <div class="hr20"></div>
  <div class="mt30 mb30">
    <c-search placeholder="搜索内容" @search="onSearch"/>
  </div>

  <div class="to-next">
    <a href="javascript:;" @click="getData">右划显示下一条</a>
  </div>

  <ul class="mj-list borderT">
    <li class="borderB" v-for="item in list" :key="index">
      <h2>【{{item.saying}}】</h2>
      <h3>——《{{item.source}}》</h3>
      <div class="n1">{{item.transl}}</div>
      <div class="n2">xxx</div>
    </li>
  </ul>

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
      list: [],
      keyword: '',
      page: 1,
      loadOver: false,
      sx: 0,
      ex: 0
    }
  },
  methods: {
    onSearch (e) {
      this.keyword = e
      this.page = 1
      this.list = []
      this.getList()
    },
    getList () {
      postAction('memo', {
        word: this.keyword
      }).then(res => {
        if (res.ret === 0) {
          this.list = res.data
          if (res.data.length === 0) {
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
      if (this.sx > this.ex && this.ex !== 0) {
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
  onLoad (options) {
    this.id = options.id
    this.getList()
  }
}
</script>
