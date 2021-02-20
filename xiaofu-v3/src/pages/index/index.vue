<style scoped>
.index-container { margin: 260px 25px 50px 25px; display: flex; flex-wrap: wrap; justify-content: space-between; }
.item-small { width: 340px; margin-bottom: 20px; }
.item-large { width: 100%; margin-bottom: 20px; }
</style>

<template>
  <div>
    <c-header
      ref="header"
      @close="handleClose" />
    <c-search
      ref="search"
      @change="changeStatus"
      @search="handleSearch" />
    <div class="index-container">
      <div class="item-small">
        <c-lees-star />
      </div>
      <div class="item-small">
        <c-collection />
      </div>
      <div class="item-large">
        <c-ticket size="large" />
      </div>
      <div class="item-small">
        <c-ticket />
      </div>
      <div class="item-small">
        <c-ticket />
      </div>
    </div>

    <c-ticket-detail />
  </div>
</template>

<script>
import cHeader from '@/components/header/header'
import cSearch from './modules/search'
import cLeesStar from './modules/leesStar'
import cCollection from './modules/collection'
import cTicket from './modules/ticket'
import cTicketDetail from '@/components/ticketDetail/ticketDetail'
export default {
  data () {
    return {
      status: '',
      keyword: ''
    }
  },

  components: {
    cHeader,
    cSearch,
    cLeesStar,
    cCollection,
    cTicket,
    cTicketDetail
  },

  methods: {
    changeStatus (e) {
      console.log('changeStatus', e)
      this.status = e
      this.$refs.header.setStatus(e)
    },
    handleSearch (e) {
      this.keyword = e.keyword
      this.changeStatus('search')
    },
    handleClose (e) {
      console.log('handleClose', e, this.status)
      this.$refs.search.reset()
    }
  },

  created () {
    // let app = getApp()
  }
}
</script>
