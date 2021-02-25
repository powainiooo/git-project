<style scoped>

</style>

<template>
<div>
  <c-header
    ref="header"
    @close="handleClose" />
  <c-ticket-detail ref="detail" @toggle="detailChange" />
</div>
</template>

<script>
import cHeader from '@/components/header/header'
import cTicketDetail from '@/components/ticketDetail/ticketDetail'
export default {
  data () {
    return {
    }
  },

  components: {
    cHeader,
    cTicketDetail
  },

  methods: {
    detailChange (page) {
      console.log('detailChange', page)
      if (page === 'buy') {
        this.$refs.header.setStatus('ticketBuy')
      }
    },
    handleClose () {
      this.$refs.detail.backDetail()
      this.$refs.header.setStatus('ticketDetail')
    }
  },
  mounted () {
    this.$refs.header.setStatus('ticketDetail')
    this.$refs.header.originStatus = 'ticketDetail'
  },
  created () {
    // let app = getApp()
  }
}
</script>
