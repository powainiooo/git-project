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
      margin-right 750px
      height 100%
      display flex
      justify-content center
      align-items center
</style>

<template>
<transition enter-active-class="fadeIn" leave-active-class="fadeOut">
   <div class="pro-detail" v-if="show">
      <transition enter-active-class="slideIn750" leave-active-class="slideOut750">
         <div class="detail-frame" v-if="showFrame">
            <btn-func @click.native="doClose"></btn-func>
            <z-block style="margin-top: 65px; height: 765px;">
               <list-item :width="500"></list-item>
            </z-block>
            <z-block title="艺人信息" v-if="itemData.person.length !== 0">
               <z-actor :listData="itemData.person"></z-actor>
            </z-block>
            <z-block title="须知" v-if="itemData.info.notify.length !== 0">
               <z-notice :listData="itemData.info.notify"></z-notice>
            </z-block>
            <z-block title="活动详情" v-if="itemData.info.goods_desc.length !== 0">
               <z-activity :listData="itemData.info.goods_desc"></z-activity>
            </z-block>
            <z-block title="联系主办方">
               <z-contact :itemData="itemData.info"></z-contact>
            </z-block>
            <z-block title="更多推荐活动" v-if="itemData.recommend.length !== 0">
               <z-recommond :listData="itemData.recommend"></z-recommond>
            </z-block>
         </div>
      </transition>
      <transition enter-active-class="slideUp" leave-active-class="slideDown">
      <div class="scan-frame" v-if="showFrame">
         <qrcode :imgData="itemData.info.cover"></qrcode>
      </div>
      </transition>
   </div>
</transition>
</template>

<script type='es6'>
import listItem from '@/components/listItem.vue'
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
         showFrame: false
      }
   },
   methods: {
      doClose () {
         this.showFrame = false
         this.$nextTick(() => {
            this.$emit('update:show', false)
         })
      }
   }
}
</script>
