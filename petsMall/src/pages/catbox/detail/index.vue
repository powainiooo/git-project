<style>
page { background-color: #F3F2F1; }
.container { padding: 300px 0 200px 0;}
.catbox-detail .c-goods-list { margin-top: -100px; position: relative; z-index: 2; }

</style>

<template>
<div>
   <div class="container" :class="{'blur': showOrderType}">
      <c-header title="猫盒详情|Contents of the cat box" shareBtn />
      <div class="catbox-detail">
         <img :src="detailData.cover" mode="widthFix" style="width: 100%;" />
         <c-goods-list
            showDetail
            onlyList
            source="catbox"
            :title="detailData.china_name"
            :titleEn="detailData.english_name"
            titleIcon="cat"
            :list="detailData.productlist"/>
         <c-order-type :list="detailData.pricelist" />
      </div>
   </div>

   <c-goods-detail />

   <c-footer btnName="我要订购|Order" needAuth @btnFunc="openOrderType" />

   <c-order-type-modal :list="pricelist" :groupId="detailData.id" />

   <c-share ref="share" :itemData="shareData" @done="drawPosterDone" />
</div>
</template>

<script>
import cHeader from '@/components/header'
import cFooter from '@/components/footer'
import cShare from '@/components/share'
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
      cOrderTypeModal,
      cShare
   },
   computed: {
      showOrderType () {
         return store.state.showOrderType
      },
      shareData () {
         const price = this.pricelist.length === 0 ? 0 : this.pricelist[0].pay_price
         return {
            title: this.detailData.china_name,
            titleEn: this.detailData.english_name,
            price,
            img: this.detailData.recom_img,
            qrcode: this.detailData.wxacode,
            unit: '元/月'
         }
      }
   },
   data () {
      return {
         id: '',
         detailData: {},
         pricelist: [],
         posterSrc: ''
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
            this.pricelist = res.data.pricelist
            this.$nextTick(() => {
               this.$refs.share.initPoster()
            })
         })
      },
      drawPosterDone (e) {
         console.log('drawPosterDone', e)
         this.posterSrc = e
      }
   },
   onLoad (options) {
      // Object.assign(this.$data, this.$options.data())
      store.commit('SET_GOODSDETAILSTATUS', false)
      this.id = options.id || options.scene
      this.getData()
   },
   onShareAppMessage: function () {
      return {
         title: this.detailData.china_name,
         imageUrl: this.posterSrc,
         path: `pages/catbox/detail/main?id=${this.id}`
      }
   }
}
</script>
