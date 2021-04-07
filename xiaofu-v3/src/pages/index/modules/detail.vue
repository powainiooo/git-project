<style scoped>
.c-detail { width: 100%; position: fixed; top: 100px; bottom: 0; left: 0; background-color: #ffffff; z-index: 500; overflow-y: auto; transform: scale(.3); animation: detailIn .6s cubic-bezier(.26,.82,.31,.94) both; }
@keyframes detailIn {
  0% { transform: scale(.1); opacity: 0; }
  99% { transform: scale(1.3); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
}
</style>

<template>
<div class="c-detail" v-if="visible" @animationend="animationend">
  <div v-if="detailData.id && animationDone">
    <c-ticket-detail ref="detail"
                     @toggle="detailChange"
                     :record="detailData" />
  </div>
</div>
</template>

<script type='es6'>
import { postAction } from '@/utils/api'
import cTicketDetail from '@/components/ticketDetail/ticketDetail'
export default {
  name: 'app',
  components: {
    cTicketDetail
  },
  data () {
    return {
      visible: false,
      showDetail: false,
      animationDone: false,
      detailData: {}
    }
  },
  methods: {
    show () {
      this.visible = true
      postAction('/api/ticket/detail', {
        id: 15
      }).then(res => {
        if (res.code === 1) {
          this.detailData = res.data
        }
      })
    },
    animationend () {
      this.animationDone = true
    }
  }
}
</script>
