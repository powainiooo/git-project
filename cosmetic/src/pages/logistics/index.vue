<style>
page { background-color: rgb(248, 248, 248)}

.infos { background-color: #ffffff; margin: 20px 0 25px 0; padding: 56px 40px; display: flex; align-items: center;}
.infos img { width: 142px; height: 142px; margin-right: 32px;}
.infos div h3 { font-size: 28px; color: #333333; line-height: 1; margin-bottom: 34px;}
.infos div p { font-size: 24px; color: #666666; line-height: 44px;}

.list { background-color: #ffffff; padding: 50px; margin-bottom: 50px}
.list li { margin-bottom: 50px;}
.list li h3 { font-size: 28px; color: #333333; line-height: 50px;}
.list li p { font-size: 28px; color: #999999; line-height: 1;}
</style>

<template>
<div>
   <div class="infos">
      <img src="/static/images/goods/icon1.png" mode="aspectFill" />
      <div>
         <h3>物流状态  {{pageData.state_str}}</h3>
         <p>
            承运来源：{{pageData.kd_company}}<br/>
            运单编号：{{pageData.kd_num}}
         </p>
      </div>
   </div>
   <ul class="list">
      <li v-for="(i, index) in listData" :key="index">
         <h3>{{i.content}}</h3>
         <p>{{i.time}}</p>
      </li>
   </ul>
</div>
</template>

<script>
import { postAction } from '@/utils/api'

export default {
   data () {
      return {
         imgSrc: mpvue.imgSrc,
         id: 0,
         pageData: {},
         listData: []
      }
   },

   methods: {
      getData () {
         postAction('look_wl', {
            order_id: this.id
         }).then(res => {
            if (res.ret === 0) {
               this.pageData = res.data
               this.listData = res.data.list
            }
         })
      }
   },

   onLoad (options) {
      Object.assign(this.$data, this.$options.data())
      this.id = options.id
      this.getData()
   }
}
</script>
