<style lang="stylus" type="text/stylus" scoped>
@import "../../assets/css/animate.css"
.pro-detail
   position fixed
   top 0
   right 0
   left 0
   bottom 0
   background-color rgba(0, 0, 0, 0.7)
   z-index 2000
   .detail-frame
      width 750px
      height 100%
      background-color #f4f4f4
      position absolute
      top 0
      right 0
      overflow auto
      &::-webkit-scrollbar{ width: 3px; background-color: #ffffff;}
      &::-webkit-scrollbar-thumb{ background-color: #002aa6;}
   .scan-frame
      position absolute
      top 120px
      right 770px
   .btn-buy
      width 80px
      height 80px
      border-radius 50%
      overflow hidden
      position absolute
      top 200px
      right 770px
   .btn-buy-tap
      transition transform 0.2s linear
      transform scale(0.9)
</style>

<template>
<transition enter-active-class="fadeIn" leave-active-class="fadeOut">
   <div class="pro-detail" v-if="show" @click="doClose">
      <transition enter-active-class="slideIn750" leave-active-class="slideOut750">
         <div class="detail-frame" v-if="showFrame" ref="frame" @click.stop="stop">
            <list-item :itemData="itemData.info" style="margin-bottom: 60px;"></list-item>

            <z-block title="艺人信息" v-if="itemData.person.length !== 0" class="slideUp" style="animation-delay: 0.7s">
               <z-actor :listData="itemData.person"></z-actor>
            </z-block>

            <z-block title="须知" v-if="itemData.info.notify.length !== 0" class="slideUp" style="animation-delay: 0.9s">
               <z-notice :listData="itemData.info.notify"></z-notice>
            </z-block>

            <z-block title="活动详情" v-if="itemData.info.goods_desc.length !== 0" class="slideUp" style="animation-delay: 1.1s">
               <z-activity :listData="itemData.info.goods_desc"></z-activity>
            </z-block>

            <z-block title="联系主办方" class="slideUp" style="animation-delay: 1.3s">
               <z-contact :itemData="itemData.info"></z-contact>
            </z-block>

            <z-block title="更多推荐活动" v-if="itemData.recommend.length !== 0" class="z-block-none">
               <z-recommond :listData="itemData.recommend" @refresh="backTop"></z-recommond>
            </z-block>
         </div>
      </transition>
      <transition enter-active-class="slideIn100">
      <div class="scan-frame" v-if="showScan" @click.stop="stop">
         <qrcode :imgData="itemData.info.wxacode"></qrcode>
      </div>
      </transition>
      <a href="javascript:;"
         class="btn-buy scaleIn"
         :class="{'btn-buy-tap':isTap}"
         v-if="!showScan"
         @mousedown="isTap = true"
         @mouseup="mup">
         <img src="@/assets/images/btn-buy.png"/>
      </a>
   </div>
</transition>
</template>

<script type='es6'>
import listItem from './ticket.vue'
import btnFunc from '@/components/btnFunc.vue'
import zBlock from './block.vue'
import zActor from './actor.vue'
import zNotice from './notice.vue'
import zActivity from './activity.vue'
import zContact from './contact.vue'
import zRecommond from './recommond.vue'
import qrcode from './qrcode.vue'
export default {
   name: 'app',
   components: {
      listItem,
      btnFunc,
      zBlock,
      zActor,
      zNotice,
      zActivity,
      zContact,
      zRecommond,
      qrcode
   },
   props: {
      show: {
         type: Boolean,
         default: false
      },
      itemData: {
         type: Object,
         default: () => {}
      }
   },
   watch: {
      show (val) {
         if (val) {
            this.$nextTick(() => {
               this.showFrame = true
            })
         }
      }
   },
   data() {
      return {
         showFrame: false,
         showScan: false,
         isTap: false
      }
   },
   methods: {
      doClose () {
         this.showFrame = false
         this.$nextTick(() => {
            this.$emit('update:show', false)
         })
      },
      stop () {},
      mup () {
         this.isTap = false
         this.showScan = true
      },
      backTop () {
         this.$refs.frame.scrollTop = 0
      }
   }
}
</script>
