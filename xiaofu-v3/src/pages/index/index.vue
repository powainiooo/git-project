<style scoped>
.index-container { margin: 260px 25px 50px 25px; display: flex; flex-wrap: wrap; justify-content: space-between; }
.item-small { width: 340px; margin-bottom: 20px; }
.item-large { width: 100%; margin-bottom: 20px; }
.index-container .item { animation: scaleIn .4s cubic-bezier(.14,.66,.57,1.26) both; }
.index-container .item:nth-child(1) { animation-delay: .3s; }
.index-container .item:nth-child(2) { animation-delay: .4s; }
.index-container .item:nth-child(3) { animation-delay: .5s; }
.index-container .item:nth-child(4) { animation-delay: .6s; }
.index-container .item:nth-child(5) { animation-delay: .7s; }
.index-container .item:nth-child(6) { animation-delay: .8s; }
.index-container .item:nth-child(7) { animation-delay: .9s; }
</style>

<template>
  <div v-if="showPage" style=" overflow-x: hidden;">
    <c-header
      ref="header"
      @close="handleClose"
      @skipDone="skipDone"
      @cityChange="cityChange" />

    <c-search
      ref="search"
      @change="changeStatus"
      @search="handleSearch" v-if="!showAd" />

    <c-ads ref="ad" :record="coverData" @load="doCount" v-if="coverData && showAd" />

    <template v-if="!showAd">
      <div class="index-container" v-if="isSearch">
        <div v-for="item in listData"
             :key="id"
             class="item-large">
          <c-ticket :record="item" size="large" />
        </div>
      </div>
      <div class="index-container" v-else>
        <div class="item item-small">
          <c-lees-star />
        </div>
        <div v-for="(item, index) in listData"
             :key="index"
             class="item"
             :class="{
               'item-small': item.type === 'normalTicket' || (item.type === 'collection' && index === 0),
               'item-large': item.type === 'recTicket' || (item.type === 'collection' && index !== 0)
             }">
          <c-collection :record="item" v-if="item.type === 'collection'" />
          <c-ticket :record="item" size="large" v-else-if="item.type === 'recTicket'" />
          <c-ticket :record="item" v-else-if="item.type === 'normalTicket'" />
        </div>
      </div>
    </template>

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
      showPage: true,
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
  methods: {
    doCount () {
      this.$refs.header.count()
    },
    skipDone () {
      this.$refs.header.showSkip = false
      this.$refs.header.showCity = true
      this.$refs.header.showMenuBtn = true
      // store.commit('SET_ADSTATE', false)
      this.$refs.ad.hide()
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
      if (this.keyword !== '' || this.date !== '') {
        this.$refs.search.reset()
        this.keyword = ''
        this.date = ''
        this.page = 1
        this.listData = []
        this.getData()
      }
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
    // this.showPage = false
    // this.$nextTick(() => {
    //   this.showPage = true
    // })
  },
  onLoad () {
    this.page = 1
    this.listData = []
    this.getData()
  }
}
</script>
