<style scoped>
.c-menu { width: 100%; height: calc(100vh - 100px); overflow-y: auto; box-sizing: border-box; padding: 0 25px; background-color: #ffffff; position: absolute; top: -100vh; left: 0; transition: top .5s cubic-bezier(.23,.78,.33,.97); }
.c-menu-show { top: 100px; }
.c-menu .personal { height: 210px; display: flex; align-items: center; }
.c-menu .personal .avatar { width: 147px; height: 147px; box-shadow: 0 5px 10px 5px rgba(0, 0, 0, 0.1); background: #D8D8D8; margin-right: 32px; border-radius: 36px; overflow: hidden; }
.c-menu .personal .avatar img { width: 100%; height: 100%; }
.c-menu .personal button { font-size: 26px; font-family: HelveB; margin: 0; background-color: transparent; }

.c-menu .ticket { width: 700px; height: 300px; position: relative; margin: 15px 0 80px 0; }
.c-menu .ticket>img { width: 100%; height: 100%; }
.c-menu .ticket-info { width: 100%; height: 200px; display: flex; position: absolute; top: 100px; left: 0; box-shadow: 0px 10px 15px 0px rgba(0, 0, 0, 0.15); border-radius: 0 0 20px 20px; background-color: #ffffff; overflow: hidden; }
.c-menu .ticket-info-left { flex: 1; display: flex; align-items: center; padding-left: 28px; }
.c-menu .ticket-info-img { flex: 1; height: 100%; background-color: #EEEEEF; mask-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAV4AAADJCAYAAABrP1pVAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTRBMjNCNkJDOUVGMTFFQkEyMUZDRTZDNzVDMkNBNjQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTRBMjNCNkNDOUVGMTFFQkEyMUZDRTZDNzVDMkNBNjQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo1NEEyM0I2OUM5RUYxMUVCQTIxRkNFNkM3NUMyQ0E2NCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo1NEEyM0I2QUM5RUYxMUVCQTIxRkNFNkM3NUMyQ0E2NCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PhB5zvIAAANhSURBVHja7Ns9a1NhHMbhow0uLuLYUXDUb+AgdOs3cJEiiIhfwNFJRMHdggURHB1cilB0FBwcixWh4OSgoDaC2jbeD7YgItEec/6L1wV3Q5smwxl+PORl1HXdpAOgj6fZ2YM+6LDrBtDbqT4PEl6A/o5nJ4UXoM6hbFF4AWpdyeaEF6DOieyS8ALUaS83XM2OCS9AnfnsofAC1J56z2QrwgtQp73Bdi5bzY4KL0CNI9lC9jxbmnY89pVhgNn7mK1n97JH2RvhBRhe6+tWNs4+ZK/arfAC1NnJdkeuA0CZ9gbcnDfXAIoJL4DwAggvAMILILwACC+A8AIgvADCCyC8AAgvgPACILwAwguA8AIIL4DwAiC8AMILgPACCC8AwgsgvADCC4DwAggvAMILILwACC+A8AIILwDCCyC8AAgvgPACILwAwgsgvAAIL4DwAiC8AMILgPACCC+A8AIgvADCC4DwAggvAMILILwAwguA8AIILwDCCyC8AAgvgPACCC8AwgsgvAAIL4DwAiC8AMILILwACC+A8AIgvADCC4DwAggvgPACILwAwguA8AIILwDCCyC8AMILgPACCC8AwgsgvAAIL4DwAiC8AMILILwACC+A8AIgvADCC4DwAggvgPACILwAwguA8AIILwDCCyC8AMILgPACCC8AwgsgvAAIL4DwAggvAMILILwACC+A8AIgvADCCyC8AAgvgPACILwAwguA8AIIL4DwAiC8AMILgPACCC8AwgsgvADCC4DwAggvAMILILwACC+A8AIILwDCCyC8AAgvgPACILwAwgsgvAAIL4DwAiC8AMILgPACCC+A8AIgvADCC4DwAggvAMILILwAwguA8AIILwDCCyC8AAgvgPAC/N8mwgtQ67PwAtTaEl6AWpvCC1BrQ3gBaj0TXoA6u9ma8ALUedkmvAB17rQfwgtQ4122LLwANSbZ7WwsvAA1Xmc3938RXoBhfckuZl+FF2B429n17MnPfxRegOGiez+79usdI9cGYOa+ZQ+yC7+704kXYHbapxfaa7k3svPdj2+qdU68AMPYyTazy9njaf/oxAvwbyfcdqr9lN3KTv8puk68AAcP7f5t20Z2d2/v//ZJWnjfupYAU7XXbcd7vWxfhniRrWXrfZ7suwADAJzASJtxriO3AAAAAElFTkSuQmCC); mask-size: 100% 100%; -webkit-mask-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAV4AAADJCAYAAABrP1pVAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTRBMjNCNkJDOUVGMTFFQkEyMUZDRTZDNzVDMkNBNjQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTRBMjNCNkNDOUVGMTFFQkEyMUZDRTZDNzVDMkNBNjQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo1NEEyM0I2OUM5RUYxMUVCQTIxRkNFNkM3NUMyQ0E2NCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo1NEEyM0I2QUM5RUYxMUVCQTIxRkNFNkM3NUMyQ0E2NCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PhB5zvIAAANhSURBVHja7Ns9a1NhHMbhow0uLuLYUXDUb+AgdOs3cJEiiIhfwNFJRMHdggURHB1cilB0FBwcixWh4OSgoDaC2jbeD7YgItEec/6L1wV3Q5smwxl+PORl1HXdpAOgj6fZ2YM+6LDrBtDbqT4PEl6A/o5nJ4UXoM6hbFF4AWpdyeaEF6DOieyS8ALUaS83XM2OCS9AnfnsofAC1J56z2QrwgtQp73Bdi5bzY4KL0CNI9lC9jxbmnY89pVhgNn7mK1n97JH2RvhBRhe6+tWNs4+ZK/arfAC1NnJdkeuA0CZ9gbcnDfXAIoJL4DwAggvAMILILwACC+A8AIgvADCCyC8AAgvgPACILwAwguA8AIIL4DwAiC8AMILgPACCC8AwgsgvADCC4DwAggvAMILILwACC+A8AIILwDCCyC8AAgvgPACILwAwgsgvAAIL4DwAiC8AMILgPACCC+A8AIgvADCC4DwAggvAMILILwAwguA8AIILwDCCyC8AAgvgPACCC8AwgsgvAAIL4DwAiC8AMILILwACC+A8AIgvADCC4DwAggvgPACILwAwguA8AIILwDCCyC8AMILgPACCC8AwgsgvAAIL4DwAiC8AMILILwACC+A8AIgvADCC4DwAggvgPACILwAwguA8AIILwDCCyC8AMILgPACCC8AwgsgvAAIL4DwAggvAMILILwACC+A8AIgvADCCyC8AAgvgPACILwAwguA8AIIL4DwAiC8AMILgPACCC8AwgsgvADCC4DwAggvAMILILwACC+A8AIILwDCCyC8AAgvgPACILwAwgsgvAAIL4DwAiC8AMILgPACCC+A8AIgvADCC4DwAggvAMILILwAwguA8AIILwDCCyC8AAgvgPAC/N8mwgtQ67PwAtTaEl6AWpvCC1BrQ3gBaj0TXoA6u9ma8ALUedkmvAB17rQfwgtQ4122LLwANSbZ7WwsvAA1Xmc3938RXoBhfckuZl+FF2B429n17MnPfxRegOGiez+79usdI9cGYOa+ZQ+yC7+704kXYHbapxfaa7k3svPdj2+qdU68AMPYyTazy9njaf/oxAvwbyfcdqr9lN3KTv8puk68AAcP7f5t20Z2d2/v//ZJWnjfupYAU7XXbcd7vWxfhniRrWXrfZ7suwADAJzASJtxriO3AAAAAElFTkSuQmCC); -webkit-mask-size: 100% 100%; }
.c-menu .ticket-info-img img { width: 100%; height: 100%; }

.c-menu .navs { width: 100%; margin-bottom: 60px; }
.c-menu .navs a { width: 100%; height: 100px; display: flex; align-items: center; background-color: #EEEEEF; border-radius: 20px; margin-bottom: 20px; }
.c-menu .navs a.active { background: linear-gradient(172deg, #0027AF 0%, #2154DA 57%, #003AC3 100%); }
.c-menu .navs a .icons { width: 98px; display: flex; justify-content: center; }
.c-menu .navs a div { font-size: 24px; color: #9E9E9F; }
.c-menu .navs a.active div { color: #ffffff; }
.c-menu .navs a div span { font-family: HelveL; margin-left: 13px; }
</style>

<template>
<div class="c-menu" :class="{'c-menu-show': show}">
  <div class="personal">
    <div class="avatar">
<!--      <img :src="userInfo.avatarUrl" v-if="hasUserInfo"/>-->
      <open-data type="userAvatarUrl" v-if="hasUserInfo"></open-data>
    </div>
    <button v-if="hasUserInfo"><open-data type="userNickName"></open-data></button>
    <button @click="handleLogin" v-else>点击登录</button>
  </div>

  <div class="ticket"
       hover-class="hscale"
       hover-stay-time="10"
       @click="toOrderList"
       v-if="hasUserInfo && orderData.id">
    <img src="/static/images/menu/frame.png" />
    <div class="ticket-info">
      <div class="ticket-info-left">
        <tk-info :record="infoData" />
      </div>
      <div class="ticket-info-img">
        <img :src="orderData.cover_image" mode="aspectFill" />
      </div>
    </div>
  </div>

  <nav class="navs">
    <a href="#"
       class="active"
       hover-class="hscale"
       hover-stay-time="10" @click="navJump('/pages/leesStar/main')">
      <div class="icons">
        <img src="/static/images/menu/icon1.png" style="width: 52rpx;" mode="widthFix" />
      </div>
      <div>小夫星選<span>Lee's Star</span></div>
    </a>
    <a href="#"
       hover-class="hscale"
       hover-stay-time="10" @click="navJump('/pages/illustrate/main?source=member')">
      <div class="icons">
        <img src="/static/images/menu/icon2.png" style="width: 55rpx;" mode="widthFix" />
      </div>
      <div>隶属于<span>Member of HO</span></div>
    </a>
    <a href="#"
       hover-class="hscale"
       hover-stay-time="10" @click="navJump('/pages/illustrate/main?source=aftersales')">
      <div class="icons">
        <img src="/static/images/menu/icon3.png" style="width: 38rpx;" mode="widthFix" />
      </div>
      <div>售后声明<span>After sales</span></div>
    </a>
    <a href="#"
       hover-class="hscale"
       hover-stay-time="10" @click="navJump('/pages/illustrate/main?source=contact')">
      <div class="icons">
        <img src="/static/images/menu/icon4.png" style="width: 44rpx;" mode="widthFix" />
      </div>
      <div>联系<span>Contact</span></div>
    </a>
  </nav>
</div>
</template>

<script type='es6'>
import tkInfo from '@/components/tkInfo'
import { doLogin, postAction } from '@/utils/api'
import store from '@/store'

export default {
  name: 'app',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  components: {
    tkInfo
  },
  computed: {
    hasUserInfo () {
      return store.state.token !== null
    }
  },
  watch: {
    show (val) {
      if (val && this.hasUserInfo) {
        this.getOrder()
      }
    }
  },
  data () {
    return {
      orderData: {},
      infoData: {}
    }
  },
  methods: {
    handleLogin () {
      mpvue.getUserProfile({
        desc: '用于完善会员资料',
        success: res => {
          console.log(res)
          doLogin(res)
        }
      })
    },
    toOrderList () {
      this.navJump('/pages/order/list/main')
    },
    getOrder () {
      postAction('/api/order/lists').then(res => {
        if (res.code === 1) {
          if (res.data.list.length === 0) return
          this.orderData = res.data.list[0]
          let date = this.orderData.start_date.split('-')
          this.infoData = {
            month: date[1],
            day: date[2],
            name: this.orderData.ticket_name,
            host: this.orderData.organizer_name
          }
        }
      })
    },
    navJump (url) {
      this.$emit('close')
      setTimeout(() => {
        mpvue.navigateTo({
          url
        })
      }, 100)
    }
  }
}
</script>
