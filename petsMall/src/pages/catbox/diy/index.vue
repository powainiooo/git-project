<style>
.container { padding: 300px 0 200px 0;}
.list-frame { padding-top: 150px; width: 100%; overflow: hidden; }
.list-frame>ul { width: 400%; display: flex; transition: transform .3s ease-out; }
.list-frame>ul>li { flex: 1; }
.hint { font-size: 24px; color: #9B9A9A; text-align: center; margin: 50px; }
</style>

<template>
<div class="container">
   <c-header title="自定义猫盒套餐|Customized cat box" titleColor="#E8E6E4" />
   <diy-step :step="step" />
   <div class="list-frame">
      <ul :style="{'transform': 'translateX(' + (-step * 100) + 'vw)'}">
         <li>
            <diy-item v-for="item in listData" :key="id" :itemData="item" />
         </li>
         <li>
            <diy-item />
         </li>
         <li>
            <diy-item />
            <diy-item />
         </li>
         <li>
            <diy-item />
            <diy-item />
         </li>
      </ul>
   </div>
   <div class="hint" v-if="loadOver">没有更多了</div>
   <c-footer btnName="下一步|Next" :price="totalProce" @btnFunc="changeStep" />

<!--   <c-order-type :list="detailData.pricelist" :groupId="detailData.id" />-->
</div>
</template>

<script>
import cHeader from '@/components/header'
import cFooter from '@/components/footer'
import diyStep from '../modules/diyStep'
import diyItem from '../modules/diyItem'
import cOrderType from '../modules/orderType'
import { getAction } from '@/utils/api'

export default {
   components: {
      cHeader,
      cFooter,
      diyStep,
      diyItem,
      cOrderType
   },
   computed: {
      loadOver () {
         return this.total === this.listData.length
      },
      totalProce () {
         return 0
      }
   },
   data () {
      return {
         step: 0,
         pageNo: 0,
         listData: [],
         total: 0
      }
   },
   methods: {
      changeStep () {
         this.step += 1
      },
      getData (id) {
         mpvue.showLoading()
         getAction('product_list', {
            word: '',
            page: this.pageNo,
            type_id: id,
            pet_id: 2
         }).then(res => {
            mpvue.hideLoading()
            this.total = res.data.nums
            this.listData = this.listData.concat(res.data.list)
         })
      }
   },
   onReachBottom () {
      if (this.loadOver) return
      this.page += 1
      this.getData()
   },
   onShow () {
      this.getData(1)
   }
}
</script>
