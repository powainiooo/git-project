<style scoped>
.container { margin-top: 100px; }
</style>

<template>
<div>
  <c-header
    ref="header"
    @close="handleClose" />
  <div class="container">
    <c-ticket-detail v-if="hasData"
                     ref="detail"
                     @toggle="detailChange"
                     :record="detailData" />
  </div>
</div>
</template>

<script>
import cHeader from '@/components/header/header'
import cTicketDetail from '@/components/ticketDetail/ticketDetail'
import { postAction } from '@/utils/api'

export default {
  data () {
    return {
      id: '',
      hasData: false,
      detailData: {}
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
    },
    getData () {
      postAction('/api/ticket/detail', {
        id: this.id
      }).then(res => {
        if (res.code === 1) {
          this.detailData = res.data
          this.$nextTick(() => {
            this.hasData = true
          })
        }
      })
    }
  },
  mounted () {
    this.$refs.header.setStatus('ticketDetail')
    this.$refs.header.originStatus = 'ticketDetail'
  },
  onLoad (options) {
    Object.assign(this.$data, this.$options.data())
    // let app = getApp()
    this.id = options.id || 15
    this.getData()
  }
}
</script>
