<style scoped>
.c-ticket-infos .banner {
  width: 100%;
  height: 800px;
  transition: height .5s cubic-bezier(.3,.79,.41,.91);
  animation: moveUp .7s cubic-bezier(.3,.79,.41,.91) both;
}
.c-ticket-infos .banner-hide {
  height: 0;
}
.c-ticket-infos .line1 {
  height: 106px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 25px;
}
.c-ticket-infos .line1-move {
  animation: moveUp .7s cubic-bezier(.3,.79,.41,.91) .2s both;
}
.c-ticket-infos .line1 .l {
  width: 590px;
}
.c-ticket-infos .line1 img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}
.c-ticket-infos .line2 {
  display: flex;
  align-items: center;
  height: 80px;
  margin: 0 25px;
}
.c-ticket-infos .line2-move {
  animation: moveUp .7s cubic-bezier(.3,.79,.41,.91) .4s both;
}
.c-ticket-infos .line2:before {
  content: '';
  width: 2px;
  height: 52px;
  transform: scaleX(.5);
  background-color: #DBDCDC;
  position: absolute;
  top: 14px;
  left: 198px;
}
.c-ticket-infos .line2 .times {
  display: flex;
  margin-right: 7px;
}
.c-ticket-infos .line2 .times li {
  width: 27px;
  height: 40px;
  background: linear-gradient(319deg, #5B85E6 0%, #6D9AF4 100%);
  border-radius: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  line-height: 20px;
  color: #ffffff;
  font-family: HelveL;
  margin-right: 4px;
}
.c-ticket-infos .line2 .times li:nth-child(3) {
  width: auto;
  background: transparent;
  color: #C8C9CA;
}
.c-ticket-infos .line2 span {
  font-size: 20px;
  color: #9E9E9F;
  font-family: HelveL;
}
.c-ticket-infos .line2 img {
  width: 24px;
  height: 29px;
  margin: 0 14px 0 40px;
}
.c-ticket-infos .line2 div.addr {
  width: 400px;
  line-height: 26px;
}
</style>

<template>
<div class="c-ticket-infos">
  <img :src="record.cover_image" mode="aspectFill" class="banner" :class="{'banner-hide': page === 'buy'}" v-if="showBanner && record" />
  <div class="line1 bBorder" :class="{'line1-move': move}">
    <div class="l">
      <tk-info :record="infoData" :endDate="infoData2" :showEndDate="showEndDate" :ellipsis="ellipsis" />
    </div>
    <img :src="record.logo" mode="aspectFill" v-if="record" />
  </div>
  <div class="line2 bBorder" :class="{'line2-move': move}">
    <ul class="times">
      <li v-for="i in timeStr" :key="i">{{i}}</li>
    </ul>
    <span>open</span>
    <img src="/static/images/common/dot.png" />
    <div class="addr"
         hover-class="hscale"
         hover-stay-time="10"
         @click="openAddr"><span>{{record.address}}</span></div>
  </div>
</div>
</template>

<script type='es6'>
import tkInfo from '@/components/tkInfo'
export default {
  name: 'app',
  props: {
    record: {
      type: Object,
      default: () => {}
    },
    page: String,
    nameKey: {
      type: String,
      default: 'name'
    },
    showBanner: {
      type: Boolean,
      default: true
    },
    move: {
      type: Boolean,
      default: false
    },
    ellipsis: {
      type: Boolean,
      default: true
    }
  },
  components: {
    tkInfo
  },
  computed: {
    infoData () {
      let date = ['', '']
      let name = ''
      let host = ''
      if (this.record) {
        date = this.record.start_date.split('-')
        name = this.record[this.nameKey]
        host = this.record.organizer ? this.record.organizer.name : this.record.organizer_name
      }
      return {
        month: date[1],
        day: date[2],
        name,
        host
      }
    },
    showEndDate () {
      return this.record.start_date !== this.record.end_date
    },
    infoData2 () {
      let date = ['', '']
      if (this.record.end_date && this.showEndDate) {
        date = this.record.end_date.split('-')
      }
      return {
        month: date[1],
        day: date[2]
      }
    },
    timeStr () {
      const time = this.record.start_time ? this.record.start_time.split(':') : ['', '']
      return `${time[0]}:${time[1]}`
    }
  },
  data () {
    return {}
  },
  methods: {
    openAddr () {
      console.log('openAddr')
      mpvue.openLocation({
        latitude: Number(this.record.latitude),
        longitude: Number(this.record.longitude),
        scale: 15
      })
    }
  }
}
</script>
