<style>
.container { padding: 300px 0 200px 0;}
.list-frame { padding-top: 150px; width: 100%; overflow: hidden; }
.list-frame>ul { width: 400%; display: flex; transition: transform .3s ease-out; }
.list-frame>ul>li { flex: 1; }
</style>

<template>
<div class="container">
   <c-header title="自定义猫盒套餐|Customized cat box" titleColor="#E8E6E4" />
   <diy-step :step="step" />
   <div class="list-frame">
      <ul :style="{'transform': 'translateX(' + (-step * 100) + 'vw)'}">
         <li>
            <diy-item />
            <diy-item />
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

export default {
   components: {
      cHeader,
      cFooter,
      diyStep,
      diyItem,
      cOrderType
   },
   computed: {
      totalProce () {
         return 0
      }
   },
   data () {
      return {
         step: 0
      }
   },
   methods: {
      changeStep () {
         this.step += 1
      }
   },
   created () {
   }
}
</script>
