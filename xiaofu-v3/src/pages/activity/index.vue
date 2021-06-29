<style scoped>
.banner { width: 100%; height: 400px; margin-top: 100px; position: relative; }
.banner:after { content: ''; width: 100%; height: 100%; position: absolute; top: 0; left: 0; background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%); }
.banner img { width: 100%; height: 100%; display: block; }
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
  overflow: hidden;
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
  min-width: 200px;
  height: 41px;
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
    <div class="banner">
      <img :src="cdnUrl + record.space_image" mode="aspectFill" v-if="record.space_image !== ''" />
    </div>
    <div class="activity-page">
      <div class="line1">
        <div class="infos">
          <div class="logo"><img :src="record.logo" v-if="record.logo" mode="aspectFill"/></div>
          <p>{{record.organizer_name}}</p>
        </div>
        <div class="rank" v-if="record.comment_flag !== 0">
          <ul>
            <li v-for="i in record.star" :key="i"><img src="/static/images/common/rank-star2.png" /></li>
          </ul>
          <p>{{record.star}}</p>
        </div>
      </div>
      <div class="line2">
        <div class="address"
             hover-class="hscale"
             hover-stay-time="10"
             @click="openAddr"
             v-if="record.type === 3">
          <img src="/static/images/common/dot.png" />
          <span>{{record.address}}</span>
        </div>
        <button class="btn"
                @click="makePhone"
                hover-class="hscale"
                hover-stay-time="10"
                v-else>{{record.phone}}</button>
        <button class="btn"
                @click="toComment"
                hover-class="hscale"
                hover-stay-time="10"
                v-if="record.comment_flag !== 0">查看评价</button>
      </div>
      <div class="list-container">
        <div v-for="(item, index) in list"
             :class="[index === 0 ? 'item-large' : 'item-small']">
          <c-ticket :record="item" size="large" v-if="index === 0" />
          <c-ticket :record="item" v-else />
        </div>
      </div>
      <div class="empty-hint" v-if="list.length === 0" style="margin-left: 30rpx; margin-top: 200rpx;">
        <p>Irrelevant Content</p>
        <div>无相关内容</div>
      </div>
    </div>
  </div>
</template>

<script>
import cHeader from '@/components/header/header'
import cTicket from '@/pages/index/modules/ticket'
import { postAction } from '@/utils/api'
import store from '../../store'
export default {
  data () {
    return {
      id: '',
      record: {},
      list: []
    }
  },
  computed: {
    cdnUrl () {
      return store.state.configData.uploaddata.cdnurl
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
        console.log('res', res)
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
    },
    openAddr () {
      mpvue.openLocation({
        latitude: Number(this.record.latitude),
        longitude: Number(this.record.longitude),
        scale: 15
      })
    },
    makePhone () {
      mpvue.makePhoneCall({
        phoneNumber: this.record.phone
      })
    }
  },
  mounted () {
    this.$refs.header.setStatus('onlyShare')
  },
  onLoad (options) {
    this.id = options.id || 13
    this.getData()
  }
}
</script>
