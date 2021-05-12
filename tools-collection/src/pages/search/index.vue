<style scoped>
.title { font-size: 32px; color: #2C2C2C; }

.list { display: flex; margin: 0 -27px; flex-wrap: wrap; }
.list .tool-item { width: 110px; margin: 0 30px 40px 30px; }
.btn-close { width: 20px; position: absolute; top: -8px; right: -8px; }

.history-list { margin: 0 40px; display: flex; }
.history-item { font-size: 26px; margin-right: 24px; margin-bottom: 20px; }
</style>

<template>
  <div class="container">
    <div class="hr20"></div>
    <div class="mt20 mb80">
      <c-search placeholder="工具名称" @search="handleSearch" />
    </div>

    <template v-if="resultList.length === 0">
      <div class="between mb60 ml50 mr60" v-if="history.length > 0">
        <div class="title acenter">
          <img src="/static/images/clock.png" mode="widthFix" class="w32 mr15" />
          <span>搜索历史</span>
        </div>
        <img src="/static/images/trash.png" mode="widthFix" class="w24" @click="delAll" />
      </div>

      <div class="history-list" v-if="history.length > 0">
        <div v-for="item in history"
             :key="id"
             class="pr history-item">
          <div>{{item.word}}</div>
          <img src="/static/images/x.png" mode="widthFix" class="btn-close" @click="delById(item.id)" />
        </div>
      </div>

      <div class="title acenter mt90 mb60 ml50">
        <img src="/static/images/remen.png" mode="widthFix" class="w28 mr20" />
        <span>热门搜索</span>
      </div>

      <div class="tool-list">
        <a v-for="item in hotList"
           :key="id"
           :href="'/' + item.mini_page + '?id=' + item.id"
           class="tool-item">
          <img :src="imgSrc + item.imgpath" mode="aspectFill" />
          <div>{{item.name}}</div>
        </a>
      </div>
    </template>

    <template v-else>
      <div class="tool-list">
      <a v-for="item in resultList"
         :key="id"
         :href="'/' + item.mini_page + '?id=' + item.id"
         class="tool-item">
        <img :src="imgSrc + item.imgpath" mode="aspectFill" />
        <div>{{item.name}}</div>
      </a>
    </div>
    </template>

    <c-footer :current="2" />
  </div>
</template>

<script>
import cFooter from '@/components/footer1'
import cSearch from '@/components/search'
import { postAction } from '@/utils/api'
import { formatUrl } from '@/utils'
import config from '@/config'
const { imgSrc } = config

export default {
  components: {
    cFooter,
    cSearch
  },

  data () {
    return {
      imgSrc,
      history: [],
      hotList: [],
      resultList: []
    }
  },
  methods: {
    getData () {
      postAction('search_page').then(res => {
        if (res.ret === 0) {
          this.history = formatUrl(res.data.list)
          this.hotList = formatUrl(res.data.rs_list)
        }
      })
    },
    handleSearch (e) {
      if (e === '') {
        mpvue.showToast({
          title: '请输入关键字',
          icon: 'none'
        })
        return false
      }
      postAction('search_go', {
        word: e
      }).then(res => {
        if (res.ret === 0) {
          this.resultList = formatUrl(res.data.list)
          if (res.data.list.length === 0) {
            mpvue.showToast({
              title: '未查询到工具',
              icon: 'none'
            })
          }
        }
      })
    },
    delById (id) {
      this.del(id)
    },
    delAll () {
      const arr = []
      this.history.forEach(i => {
        arr.push(i.id)
      })
      this.del(arr.join('|'))
    },
    del (id) {
      postAction('del_history ', {
        id
      }).then(res => {
        if (res.ret === 0) {
          mpvue.showToast({
            title: '删除成功'
          })
          this.getData()
        }
      })
    }
  },
  onShow () {
    this.getData()
  }
}
</script>
