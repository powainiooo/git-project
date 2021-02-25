<style scoped>
.order-detail {
  margin-top: 150px;
}
</style>

<template>
<div>
  <c-header ref="header" />
  <div class="order-detail">
    <swiper style="height: 850rpx">
      <swiper-item>
        <order-item />
      </swiper-item>
    </swiper>
  </div>
</div>
</template>

<script>
import cHeader from '@/components/header/header'
import orderItem from './modules/orderItem'
export default {
  data () {
    return {
    }
  },

  components: {
    cHeader,
    orderItem
  },

  methods: {
  },

  mounted () {
    this.$refs.header.setStatus('ticketBuy')
    this.$refs.header.originStatus = 'ticketBuy'
  },
  created () {
    // let app = getApp()
  }
}
</script>
