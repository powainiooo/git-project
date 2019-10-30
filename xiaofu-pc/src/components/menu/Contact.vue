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
      <p>{{mail}}</p>
      <img src="@/assets/images/icon-wechat.png" />
   </div>
   <div class="contact-frame">
      <p>售后及服务</p>
      <p>{{wechat}}</p>
      <img src="@/assets/images/icon-wechat.png" />
      <div>{{phone}}</div>
   </div>
</m-block>
</template>

<script type="es6">
import mBlock from './block'
import {getMenuInfo} from '@/api.js'
export default {
   name: 'App',
   components: {mBlock},
   data () {
      return {
         mail: '',
         phone: '',
         wechat: ''
      }
   },
   computed: {
      contactData () {
         return this.$store.state.contactData
      }
   },
   mounted () {
      this.getData()
   },
   methods: {
      getData () {
         getMenuInfo('contact').then(res => {
            console.log(res)
            const contact = res.data.contact
            this.mail = contact.match(/邮箱：\S*；/)[0].replace('邮箱：', '').replace('；', '')
            this.phone = contact.match(/电话：\S*；/)[0].replace('电话：', '').replace('；', '')
            this.wechat = contact.match(/微信号：\S*；/)[0].replace('微信号：', '').replace('；', '')
         })
      }
   }
}

</script>
