<style scoped>

</style>

<template>
<div class="container">
  <div class="hr20"></div>
  <div class="mt30 mb30">
    <c-search placeholder="输入宠物品种名称" @search="onSearch"/>
  </div>

  <div class="blue-box" v-for="item in list" :key="index" v-if="list.length > 0">
    <h3>{{item.name}}</h3>
    <div>
    <img :src="item.coverURL"  />
      <p><rich-text :nodes="item.feature" class="f30"></rich-text></p>
    </div>
  </div>
  <operates :id="id" />
</div>
</template>

<script>
import operates from '@/components/operates'
import cSearch from '@/components/search'
import {postAction} from '../../utils/api'

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
      showResult: false
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
      postAction('pet', {
        page: this.page,
        word: this.keyword
      }).then(res => {
        if (res.ret === 0) {
          this.list = this.list.concat(res.data)
          this.loadOver = res.data.length === 0
          this.showResult = true
          if (res.data.length === 0 && this.page === 1) {
            this.list = []
            mpvue.showToast({
              title: '未查询到数据',
              icon: 'none'
            })
          }
        }
      })
    }
  },
  onReachBottom () {

  },
  onShareAppMessage () {
    const pages = getCurrentPages()
    const view = pages[pages.length - 1]
    return {
      title: '宠物大全',
      path: `/${view.route}?id=${this.id}`
    }
  },
  onLoad (options) {
    this.id = options.id
  }
}
</script>
