<style scoped>
.banner { width: 100%; height: 400px; margin-top: 100px; }
.activity-page { margin: -400px 25px 50px 25px; position: relative; z-index: 5; }
.list-container { display: flex; flex-wrap: wrap; justify-content: space-between; }
.item-small { width: 340px; margin-bottom: 20px; }
.item-large { width: 100%; margin-bottom: 20px; }
.activity-page .line1 {
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 27px 0 25px;
}
.activity-page .line1 .infos {
  display: flex;
  align-items: center;
}
.activity-page .line1 .infos .logo {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #ffffff;
}
.activity-page .line1 .infos .logo img {
  width: 100%;
  height: 100%;
}
.activity-page .line1 .infos p {
  font-size: 32px;
  color: #ffffff;
  font-family: HelveB;
  margin-left: 12px;
}
.activity-page .rank ul {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}
.activity-page .rank ul li {
  width: 44px;
  height: 41px;
  margin: 0 3px;
}
.activity-page .rank ul li img {
  width: 100%;
  height: 100%;
}
.activity-page .rank p {
  font-size: 48px;
  line-height: 48px;
  font-family: HelveT;
  text-align: center;
  color: #ffffff;
}
.activity-page .line2 {
  margin: 0 37px 65px 25px;
  display: flex;
  justify-content: space-between;
}
.activity-page .line2 .address {
  width: 445px;
  box-sizing: border-box;
  border-radius: 16px;
  padding: 16px 24px 16px 56px;
  background-color: #ffffff;
  position: relative;
  font-size: 20px;
  color: #9E9E9F;
  line-height: 30px;
}
.activity-page .line2 .address img {
  width: 24px;
  height: 29px;
  position: absolute;
  top: 14px;
  left: 18px;
}
.activity-page .line2 .btn {
  width: 172px;
}
</style>

<template>
  <div>
    <c-header
      ref="header"
      @close="handleClose" />
    <img src="/static/images/img.jpg" class="banner" />
    <div class="activity-page">
      <div class="line1">
        <div class="infos">
          <div class="logo"><img :src="record.logo" v-if="record.logo"/></div>
          <p>{{record.organizer_name}}</p>
        </div>
        <div class="rank">
          <ul>
            <li v-for="i in 4" :key="i"><img src="/static/images/common/rank-star2.png" /></li>
          </ul>
          <p>{{record.star}}</p>
        </div>
      </div>
      <div class="line2">
        <div class="address"
             hover-class="hscale"
             hover-stay-time="10">
          <img src="/static/images/common/dot.png" />
          <span>{{record.address}}</span>
        </div>
        <button class="btn"
                @click="toComment"
                hover-class="hscale"
                hover-stay-time="10">查看评价</button>
      </div>
      <div class="list-container">
        <div v-for="(item, index) in list"
             :class="[index === 0 ? 'item-large' : 'item-small']">
          <c-ticket :record="item" size="large" v-if="index === 0" />
          <c-ticket :record="item" v-else />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cHeader from '@/components/header/header'
import cTicket from '@/pages/index/modules/ticket'
import { postAction } from '@/utils/api'
export default {
  data () {
    return {
      id: '',
      record: {},
      list: []
    }
  },

  components: {
    cHeader,
    cTicket
  },

  methods: {
    handleClose () {
      mpvue.navigateBack({
        delta: -1
      })
    },
    getData () {
      postAction('/api/merchant/detail', {
        id: this.id
      }).then(res => {
        if (res.code === 1) {
          this.record = res.data
          this.list = res.data.ticket_list
        }
      })
    },
    toComment () {
      mpvue.navigateTo({
        url: `/pages/comment/main?id=${this.record.id}`
      })
    }
  },
  mounted () {
    this.$refs.header.setStatus('onlyShare')
  },
  onLoad (options) {
    this.id = options.id || 3
    this.getData()
  }
}
</script>
