<style scoped>

</style>

<template>
  <div class="container">
    <div class="hr20"></div>
    <div class="mt30 mb30">
      <c-search placeholder="输入内容" @search="getList"/>
    </div>

    <div class="blue-box" style="min-height: calc(100vh - 250rpx)" v-if="showResult">
      <h3>梦到{{keyword}}</h3>
      <div>
        <p v-for="item in record.list" :key="index" class="f30">{{item}}</p>
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
      record: {},
      keyword: '',
      showResult: false
    }
  },
  methods: {
    getList (e) {
      postAction('dream_query', {
        q: e
      }).then(res => {
        if (res.ret === 0) {
          if (res.data === null) {
            mpvue.showToast({
              title: '未查询到数据',
              icon: 'none'
            })
          } else {
            this.record = res.data
            this.keyword = e
            this.showResult = true
          }
        }
      })
    }
  },
  onShareAppMessage () {
    const pages = getCurrentPages()
    const view = pages[pages.length - 1]
    return {
      title: '周公解梦',
      path: `/${view.route}?id=${this.id}`
    }
  },
  onLoad (options) {
    this.id = options.id
  }
}
</script>
