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
  <c-share ref="share" @done="getPoster" />
</div>
</template>

<script>
import cHeader from '@/components/header/header'
import cTicketDetail from '@/components/ticketDetail/ticketDetail'
import cShare from '@/components/ticketDetail/share'
import { postAction } from '@/utils/api'

export default {
  data () {
    return {
      id: '',
      hasData: false,
      detailData: {},
      source: '',
      postSrc: ''
    }
  },

  components: {
    cHeader,
    cTicketDetail,
    cShare
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
            this.footPrint()
            this.$refs.header.showStarBtn = res.data.star_flag === 1

            this.$refs.share.initPoster(res.data)
          })
        }
      })
    },
    footPrint () {
      let type = 2
      let element = this.detailData.music_type
      if (this.source === 'ad') {
        type = 1
        element = 1
      }
      postAction('/api/statistics/record', {
        type,
        element
      }).then(res => {
        console.log(res)
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
    this.id = options.id || options.scene
    this.source = options.source || 'ticket'
    this.getData()
  },
  onShareAppMessage () {
    return {
      title: this.detailData.name,
      imageUrl: this.postSrc,
      path: `pages/details/main?id=${this.id}`
    }
  }
}
</script>
