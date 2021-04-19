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
        <p v-for="item in record.list" :key="index">{{item}}</p>
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
          this.record = res.data
          this.keyword = e
          this.showResult = true
        }
      })
    }
  },
  onLoad () {
  }
}
</script>
