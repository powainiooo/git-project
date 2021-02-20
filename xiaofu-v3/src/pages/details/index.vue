<style scoped>

</style>

<template>
<div>
  <c-header
    ref="header"
    @close="handleClose" />
  <c-ticket-detail />
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
  },
  mounted () {
    this.$refs.header.setStatus('ticketDetail')
  },
  created () {
    // let app = getApp()
  }
}
</script>
