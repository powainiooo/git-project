<style scoped>
.index-container { margin: 260px 25px 50px 25px; display: flex; flex-wrap: wrap; justify-content: space-between; overflow: hidden; }
.item-small { width: 340px; margin-bottom: 20px; }
.item-large { width: 100%; margin-bottom: 20px; }
</style>

<template>
  <div>
    <c-header
      ref="header"
      @close="handleClose"
      @skipDone="skipDone"
      @cityChange="cityChange" />

    <c-search
      ref="search"
      @change="changeStatus"
      @search="handleSearch" />

    <c-ads :record="coverData" v-if="coverData && showAd" />

    <div class="index-container" v-if="isSearch">
      <div v-for="item in listData"
           :key="id"
           class="item-large">
        <c-ticket :record="item" size="large" />
      </div>
    </div>
    <div class="index-container" v-else>
      <div class="item-small">
        <c-lees-star />
      </div>
      <div v-for="(item, index) in listData"
           :key="index"
           :class="{
             'item-small': item.type === 'normalTicket' || (item.type === 'collection' && index === 0),
             'item-large': item.type === 'recTicket' || (item.type === 'collection' && index !== 0)
           }">
        <c-collection :record="item" v-if="item.type === 'collection'" />
        <c-ticket :record="item" size="large" v-else-if="item.type === 'recTicket'" />
        <c-ticket :record="item" v-else-if="item.type === 'normalTicket'" />
      </div>
    </div>
  </div>
</template>

<script>
import cHeader from '@/components/header/header'
import cSearch from './modules/search'
import cLeesStar from './modules/leesStar'
import cCollection from './modules/collection'
import cTicket from './modules/ticket'
import cAds from './modules/ads'
import { postAction } from '@/utils/api'
import store from '@/store'

export default {
  components: {
    cHeader,
    cSearch,
    cLeesStar,
    cCollection,
    cAds,
    cTicket
  },
  data () {
    return {
      status: '',
      date: '',
      keyword: '',
      page: 1,
      cityId: '',
      listData: [],
      loadOver: false
    }
  },
  computed: {
    isSearch () {
      return this.date !== '' || this.keyword !== ''
    },
    coverData () {
      return store.state.configData.coverdata
    },
    showAd () {
      return store.state.showAd
    }
  },
  watch: {
    coverData (val) {
      console.log('coverData', val)
      if (val.id) {
        this.$refs.header.count()
      }
    }
  },
  methods: {
    skipDone () {
      this.$refs.header.showSkip = false
      this.$refs.header.showCity = true
      this.$refs.header.showMenuBtn = true
      store.commit('SET_ADSTATE', false)
    },
    changeStatus (e) {
      console.log('changeStatus', e)
      this.status = e
      this.$refs.header.setStatus(e)
    },
    handleSearch (e) {
      this.keyword = e.keyword
      this.date = e.date
      this.page = 1
      this.listData = []
      this.getData()
      this.changeStatus('search')
    },
    handleClose (e) {
      console.log('handleClose', e, this.status)
      this.$refs.search.reset()
      this.keyword = ''
      this.date = ''
      this.page = 1
      this.listData = []
      this.getData()
    },
    getData () {
      let url = '/api/ticket/index'
      let params = {
        page: this.page,
        city_id: this.cityId
      }
      if (this.isSearch) {
        url = '/api/ticket/lists'
        params.date = this.date
        params.keyword = this.keyword
      }
      postAction(url, params).then(res => {
        this.loadOver = res.data.list.length === 0
        if (!this.loadOver) {
          this.listData = this.listData.concat(res.data.list)
        }
      })
    },
    cityChange (id) {
      this.page = 1
      this.cityId = id
      this.listData = []
      this.getData()
    }
  },
  onReachBottom () {
    if (this.loadOver) return
    this.page += 1
    this.getData()
  },
  onShow () {
    // let app = getApp()
    this.getData()
  }
}
</script>
