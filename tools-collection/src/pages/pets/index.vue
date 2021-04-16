<style scoped>

</style>

<template>
<div class="container">
  <div class="hr20"></div>
  <div class="mt30 mb30">
    <c-search placeholder="输入宠物品种名称" @search="onSearch"/>
  </div>

  <div class="blue-box" v-for="item in list" :key="index">
    <h3>{{item.name}}</h3>
    <div>
      <p><rich-text :nodes="item.feature"></rich-text></p>
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
  created () {
  }
}
</script>
