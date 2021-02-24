<style>
page { background-color: #F3F2F1; }
.container { padding: 300px 0 200px 0;}
.catbox-detail .c-goods-list { margin-top: -100px; position: relative; z-index: 2; }

</style>

<template>
<div>
   <div class="container" :class="{'blur': showOrderType}">
      <c-header title="猫盒详情|Contents of the cat box" />
      <div class="catbox-detail">
         <img :src="detailData.cover" mode="widthFix" style="width: 100%;" />
         <c-goods-list
            showDetail
            source="catbox"
            :title="detailData.china_name"
            titleEn="detailData.english_name"
            titleIcon="cat"
            :list="detailData.productlist"/>
         <c-order-type :list="detailData.pricelist" />
      </div>
   </div>

   <c-goods-detail />

   <c-footer btnName="我要订购|Order" @btnFunc="openOrderType" />

   <c-order-type-modal :list="detailData.pricelist" :groupId="detailData.id" />
</div>
</template>

<script>
import cHeader from '@/components/header'
import cFooter from '@/components/footer'
import cGoodsList from '@/components/goodsList'
import cGoodsDetail from '@/components/goodsDetail'
import cOrderType from './modules/orderType'
import cOrderTypeModal from '../modules/orderType'
import store from '@/store'
import { getAction } from '@/utils/api'

export default {
   components: {
      cHeader,
      cFooter,
      cGoodsList,
      cGoodsDetail,
      cOrderType,
      cOrderTypeModal
   },
   computed: {
      showOrderType () {
         return store.state.showOrderType
      }
   },
   data () {
      return {
         id: '',
         detailData: {}
      }
   },
   methods: {
      openOrderType () {
         store.commit('SET_ORDERTYPESTATUS', true)
      },
      getData () {
         mpvue.showLoading()
         getAction('group_info', {
            id: this.id
         }).then(res => {
            mpvue.hideLoading()
            this.detailData = res.data
         })
      }
   },
   onLoad (options) {
      Object.assign(this.$data, this.$options.data())
      this.id = options.id || '2'
      this.getData()
   }
}
</script>
