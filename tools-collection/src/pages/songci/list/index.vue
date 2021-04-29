<style scoped>
.ts-list li { padding: 28px 0 44px 0; display: flex; }
.ts-list li .r { margin-left: 50px; }
.ts-list li .r h3 { font-size: 28px; color: #3D7FC7; margin-bottom: 12px; }
.ts-list li .r h3 span { font-size: 22px; color: #666666; margin-left: 50px; }
.ts-list li .r p { font-size: 26px; line-height: 45px; }
</style>

<template>
<div class="container">
  <div class="hr20"></div>
  <div class="mt30 mb30">
    <c-search placeholder="搜索宋词" @search="onSearch"/>
  </div>

  <ul class="ts-list borderT">
    <li class="borderB" v-for="item in list" :key="index" @click="toDetail(item)">
      <div class="r">
        <h3>《{{item.title}}》<span>{{item.author}} 〔宋代〕</span></h3>
        <rich-text :nodes="item.content"></rich-text>
      </div>
    </li>
  </ul>

  <operates :id="id" />
</div>
</template>

<script>
import operates from '@/components/operates'
import cSearch from '@/components/search'
import {postAction} from '../../../utils/api'
import store from '../../../store'

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
      postAction('song', {
        page: this.page,
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
    toDetail (record) {
      store.commit('SET_POETRY', record)
      mpvue.navigateTo({
        url: '/pages/songci/detail/main'
      })
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
  onLoad (options) {
    this.id = options.id
    this.getList()
  }
}
</script>
