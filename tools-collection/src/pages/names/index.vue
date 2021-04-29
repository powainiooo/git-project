<style scoped>

</style>

<template>
  <div class="container">
    <div class="hr20"></div>
    <div class="mt30 mb30">
      <c-search placeholder="输入姓氏" @search="onSearch"/>
    </div>

    <div class="blue-box" v-for="item in list" :key="index">
      <h3>{{item.xing}}姓</h3>
      <div>
        <rich-text :nodes="item.content"></rich-text>
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
      postAction('surname', {
        page: this.page,
        xing: this.keyword
      }).then(res => {
        if (res.ret === 0) {
          this.list = this.list.concat(res.data)
          this.loadOver = res.data.length === 0
          this.showResult = true
          if (res.data.length === 0) {
            mpvue.showToast({
              title: '未查询到数据',
              icon: 'none'
            })
          }
        }
      })
    }
  },
  onLoad (options) {
    this.id = options.id
    this.getList()
  }
}
</script>
