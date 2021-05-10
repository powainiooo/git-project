<style scoped>
.order-detail {
  margin-top: 100px;
}
.order-detail .swiper {
  height: 810px;
  overflow: visible;
}
.navs-dot {
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.navs-dot li {
  width: 14px;
  height: 14px;
  background-color: #DBDCDC;
  border-radius: 50%;
  margin: 0 7px;
}
.navs-dot li.active {
  background: linear-gradient(330deg, #5B85E6 0%, #6D9AF4 100%);
}
.order-detail .infos {
  height: 152px;
  margin: -36px 25px 34px 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 34px;
}
.order-detail .infos div {
  display: flex;
  align-items: center;
}
.order-detail .infos div img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #ffffff;
  margin-right: 20px;
}
.order-detail .infos div span {
  font-size: 20px;
  color: #9E9E9F;
  font-family: HelveL;
}
.order-detail .infos button {
  width: 174px;
}
</style>

<template>
<div>
  <c-header ref="header" @close="handleClose" />
  <div class="order-detail">
    <ul class="navs-dot">
      <li v-for="(i, index) in orderList" :key="i" :class="{'active': activeIndex === index}"></li>
    </ul>
    <swiper class="swiper" @change="swiperChange">
      <swiper-item v-for="(item, i) in orderList" :key="i">
        <order-item :record="item" :ticketName="record.ticket_name" />
      </swiper-item>
    </swiper>
    <div class="infos bBorder">
      <div>
        <img :src="record.logo" />
        <span>{{record.organizer_name}}</span>
      </div>
      <button class="btn"
              hover-class="hscale"
              hover-stay-time="10"
              @click="doCall">{{record.phone}}</button>
    </div>
    <comment :orderId="record.id" />
  </div>
</div>
</template>

<script>
import cHeader from '@/components/header/header'
import orderItem from './modules/orderItem'
import comment from './modules/comment'
import { postAction } from '@/utils/api'
export default {
  data () {
    return {
      orderList: [],
      activeIndex: 0,
      id: '',
      record: {}
    }
  },

  components: {
    cHeader,
    orderItem,
    comment
  },

  methods: {
    handleClose () {
      mpvue.navigateBack({
        delta: -1
      })
    },
    swiperChange (e) {
      console.log('swiperChange', e)
      this.activeIndex = e.mp.detail.current
    },
    getData () {
      postAction('/api/order/detail', {
        id: this.id
      }).then(res => {
        this.record = res.data
        this.orderList = res.data.list
      })
    },
    doCall () {
      mpvue.makePhoneCall({
        phoneNumber: this.record.phone
      })
    }
  },

  mounted () {
    this.$refs.header.setStatus('ticketBuy')
    this.$refs.header.originStatus = 'ticketBuy'
  },
  onLoad (options) {
    this.id = options.id
    this.getData()
    // let app = getApp()
  }
}
</script>
