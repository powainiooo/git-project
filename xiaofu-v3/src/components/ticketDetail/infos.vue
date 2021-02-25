<style scoped>
.c-ticket-infos .banner {
  width: 100%;
  height: 800px;
  transition: height .5s cubic-bezier(.3,.79,.41,.91);
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
.c-ticket-infos .line1 img {
  width: 80px;
  height: 80px;
}
.c-ticket-infos .line2 {
  display: flex;
  align-items: center;
  height: 80px;
  margin: 0 25px;
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
}
</style>

<template>
<div class="c-ticket-infos">
  <img src="/static/images/img.jpg" class="banner" :class="{'banner-hide': page === 'buy'}" v-if="showBanner" />
  <div class="line1 bBorder">
    <tk-info />
    <img src="/static/images/logo.png" />
  </div>
  <div class="line2 bBorder">
    <ul class="times">
      <li v-for="i in time" :key="i">{{i}}</li>
    </ul>
    <span>open</span>
    <img src="/static/images/common/dot.png" />
    <div class="addr"><span>L1深圳市福田区车公庙泰然大厦01层L1-11A</span></div>
  </div>
</div>
</template>

<script type='es6'>
import tkInfo from '@/components/tkInfo'
export default {
  name: 'app',
  props: {
    page: String,
    showBanner: {
      type: Boolean,
      default: true
    }
  },
  components: {
    tkInfo
  },
  data () {
    return {
      time: '21:30'
    }
  },
  methods: {}
}
</script>
