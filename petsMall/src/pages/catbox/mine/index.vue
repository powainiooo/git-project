<style>
.container { padding: 300px 0 200px 0;}
.tips-diy { padding: 42px 0 54px 0; background-color: #EEEBEA; }
</style>

<template>
<div class="container">
   <c-header title="我的自定义猫盒|My cat box" titleColor="#E8E6E4" />
   <div class="">
      <diy-item title="Staple food  主粮" source="mine" @click="toPage($event, 'food')" />
      <diy-item title="Canned  罐头" source="mine" @click="toPage($event, 'canned')" />
      <diy-item title="Snacks  零食" source="mine" @click="toPage($event, 'snacks')" />
      <diy-item title="Toy  玩具" source="mine" @click="toPage($event, 'toy')" />
      <div class="tips-diy">
         <div class="tips-content">
            <img src="/static/images/order/tips.png" mode="widthFix" />
            <p>提供随心搭配，保存后的自定义猫盒套餐将方便你订购，多次操作仅保存最新编辑的自定义猫盒套餐。</p>
         </div>
      </div>
   </div>
   <c-footer btnName="我要订购|Order" :price="price" />
</div>
</template>

<script>
import cHeader from '@/components/header'
import cFooter from '@/components/footer'
import diyItem from '../modules/diyItem'
import { getAction } from '@/utils/api'
import store from '@/store'

export default {
   components: {
      cHeader,
      cFooter,
      diyItem
   },

   data () {
      return {
         id: '',
         price: 0,
         detailData: {}
      }
   },
   methods: {
      toPage (data, page) {
         mpvue.navigateTo({
            url: `/pages/catbox/select/main?source=${page}`
         })
      },
      getData () {
         mpvue.showLoading()
         getAction('my_group', {
            token: store.state.token
         }).then(res => {
            mpvue.hideLoading()
            this.detailData = res.data
         })
      }
   },
   onLoad (options) {
      this.id = options.id || 4
      this.getData()
   }
}
</script>
