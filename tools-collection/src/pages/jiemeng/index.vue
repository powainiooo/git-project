<style scoped>

</style>

<template>
  <div class="container">
    <div class="hr20"></div>
    <div class="mt30 mb30">
      <c-search placeholder="输入内容" @search="onSearch"/>
    </div>

    <div class="blue-box">
      <h3>梦到桃子</h3>
      <div>
        <p>配对指数：80</p>
      </div>
    </div>
    <operates />
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
  onLoad () {
    this.getList()
  }
}
</script>
