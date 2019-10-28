<style lang="stylus" type="text/stylus" scoped>
.contact-frame
   padding 50px
   border-bottom 1px solid #dee0df
   p
      color #707070
      font-size 14px
      line-height 1
      margin-bottom 10px
   div
      font-size 16px
      color #707070
      margin-top 40px
   &:last-child
      border-bottom none
</style>

<template>
<m-block>
   <template slot="en">Contact<br/>Information</template>
   <template slot="cn">联系方式</template>
   <div class="contact-frame">
      <p>合作联系</p>
      <p>Lee910123</p>
      <img src="@/assets/images/icon-wechat.png" />
   </div>
   <div class="contact-frame">
      <p>售后及服务</p>
      <p>leesticketaftersales</p>
      <img src="@/assets/images/icon-wechat.png" />
      <div>+86-176-2036-1663</div>
   </div>
</m-block>
</template>

<script type="es6">
import mBlock from './block'
export default {
   name: 'App',
   components: {mBlock},
   data () {
      return {

      }
   }
}

</script>
