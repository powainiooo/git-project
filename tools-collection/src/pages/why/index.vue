<style scoped>
.why-list li { padding: 40px 30px;  }
.why-list li h3 { font-size: 26px; color: #3D7FC7; margin-bottom: 30px; }
.why-list li div { font-size: 20px; color: #282828; line-height: 44px; }
.why-list li div span { color: #FF3600; }
</style>

<template>
  <div class="container">
    <div class="hr20"></div>
    <div class="mt30 mb30">
      <c-search placeholder="搜索内容" @search="onSearch"/>
    </div>

    <ul class="why-list borderT">
      <li class="borderB" v-for="item in list" :key="index">
        <h3>【{{item.title}}】</h3>
        <div><span>【解答】</span>{{item.content}}</div>
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
      loadOver: false
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
      postAction('wiki', {
        page: this.page,
        num: 10,
        word: this.keyword
      }).then(res => {
        if (res.ret === 0) {
          this.list = this.list.concat(res.data)
          this.loadOver = res.data.length === 0
        }
      })
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
