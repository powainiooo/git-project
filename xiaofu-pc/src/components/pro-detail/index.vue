<style lang="stylus" type="text/stylus" scoped>
.pro-detail
   position fixed
   top 0
   right 0
   left 0
   bottom 0
   background-color rgba(0, 0, 0, 0.6)
   z-index 1500
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
<div class="pro-detail">
   <div class="detail-frame">
      <btn-func></btn-func>
      <z-block style="margin-top: 65px; height: 765px;">
         <list-item :width="500"></list-item>
      </z-block>
      <z-block title="艺人信息">
         <z-actor></z-actor>
      </z-block>
      <z-block title="须知">
         <z-notice></z-notice>
      </z-block>
      <z-block title="活动详情">
         <z-activity></z-activity>
      </z-block>
      <z-block title="联系主办方">
         <z-contact></z-contact>
      </z-block>
      <z-block title="更多推荐活动">
         <z-recommond></z-recommond>
      </z-block>
   </div>
   <div class="scan-frame">
      <qrcode></qrcode>
   </div>
</div>
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
   data() {
      return {

      }
   },
   methods: {}
}
</script>
