<style scoped>
.title { font-size: 32px; color: #2C2C2C; }

.pos-list { display: flex; flex-wrap: wrap; margin: 0 50px; }
.pos-list li { border-radius: 16px; background-color: #F2F2F2; margin: 0 20px 20px 0; font-size: 30px; color: #656565; padding: 0 24px; height: 54px; display: flex; align-items: center; }
</style>

<template>
  <div class="container">
    <div class="hr20"></div>
    <div class="mt120">
      <c-search ref="search" placeholder="关键词搜索例如：银行、超市" @search="onSearch" />
    </div>

    <div class="title acenter mt90 mb60 ml50">
      <img src="/static/images/remen.png" mode="widthFix" class="w28 mr20" />
      <span>热门搜索</span>
    </div>
    <ul class="pos-list">
      <li v-for="i in list" :key="index" @click="select(i)">{{i}}</li>
    </ul>

    <operates :id="id" />
  </div>
</template>

<script>
import operates from '@/components/operates'
import cSearch from '@/components/search'
import {postAction} from '../../utils/api'
import QQMapWX from '../../utils/qqmap-wx-jssdk.min.js'
import store from '../../store'
import config from '@/config'
const { mapKey } = config
const qMap = new QQMapWX({
  key: mapKey
})
export default {
  components: {
    operates,
    cSearch
  },

  data () {
    return {
      id: '',
      list: []
    }
  },
  methods: {
    getData () {
      postAction('find_surroundings').then(res => {
        if (res.ret === 0) {
          this.list = res.data
        }
      })
    },
    onSearch (e) {
      console.log('e', e)
      mpvue.getLocation({
        success (res) {
          console.log(res)
          qMap.search({
            keyword: e,
            location: `${res.latitude},${res.longitude}`,
            success (res2) {
              console.log('res2', res2)
              store.commit('SET_MAP', res2.data)
              mpvue.navigateTo({
                url: '/pages/map/main'
              })
            }
          })
        }
      })
    },
    select (keyword) {
      this.$refs.search.keyword = keyword
      this.onSearch(keyword)
    }
  },
  onShareAppMessage () {
    const pages = getCurrentPages()
    const view = pages[pages.length - 1]
    return {
      title: '查找周边场所',
      path: `/${view.route}?id=${this.id}`
    }
  },
  onLoad (options) {
    this.id = options.id
    this.getData()
  }
}
</script>
