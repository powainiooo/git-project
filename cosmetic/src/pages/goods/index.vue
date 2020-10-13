<style>
page { background-color: rgb(248, 248, 248)}
.type-tab { width: 100%; height: 220px; background-color: #ffffff; display: flex; justify-content: space-around; align-items: center; margin-bottom: 30px;}
.type-tab li div { width: 90px; height: 90px; border-radius: 50%; border: 1px solid #666666; margin-bottom: 14px; overflow: hidden;}
.type-tab li.active div { border-color: #333333; background-color: #333333;}
.type-tab li div img { width: 100%; height: 100%; }
.type-tab li p { font-size: 26px; color: #666666; text-align: center;}
.type-tab li.active p { color: #333333;}

.second-tabs { padding: 0 30px; height: 88px; position: relative; display: flex;}
.second-tabs:after { content: ''; width: 100%; height: 1px; background-color: #E8E8E8; position: absolute; bottom: 0; left: 0; transform: scaleY(.5);}
.second-tabs li { height: 100%; position: relative; font-size: 26px; color: #666666; margin-right: 50px; display: flex; align-items: center;}
.second-tabs li:last-child { margin-right: 0;}
.second-tabs li.active { color: #3A3A3A;}
.second-tabs li.active:after { content: ''; width: 100%; height: 5px; background-color: #3A3A3A; position: absolute; bottom: 0; left: 0;}
</style>

<template>
<div style="padding-bottom: 130rpx">
   <ul class="type-tab">
      <li v-for="(item, index) in typeList" :key="index" :class="{active: firstType === item.id}" @click="firstChange(item.id)">
         <div><img :src="imgSrc + item.cover" mode="aspectFit"/></div>
         <p>{{item.cname}}</p>
      </li>
   </ul>
   <div style="background-color: #ffffff; overflow: hidden;">
      <ul class="second-tabs" v-if="secondList.length !== 0">
         <li v-for="(item, index) in secondList" :key="index" :class="{active: secondType === item.id}" @click="secondChange(item.id)">{{item.cname}}</li>
      </ul>

      <div class="goods-list">
         <c-goods-item v-for="i in goodsList" :key="id" :itemData="i"/>
      </div>
   </div>

   <div class="load-over" v-if="isLoadAll">- 没有更多商品 -</div>

   <c-footer-nav active="goods"/>
</div>
</template>

<script>
import cGoodsItem from '@/components/goodsItem'
import cFooterNav from '@/components/footerNav'
import { getAction } from '@/utils/api'

export default {
   components: { cGoodsItem, cFooterNav },
   data () {
      return {
         imgSrc: mpvue.imgSrc,
         firstType: '',
         typeList: [],
         secondType: '',
         secondList: [],
         page: 1,
         goodsList: [],
         totals: 0,
         isLoadAll: false
      }
   },
   methods: {
      getTypeData () {
         getAction('get_jpsp_page').then(res => {
            this.typeList = res.data.cate_list
            this.firstType = this.typeList[0].id
            this.secondList = this.typeList[0].sub
            this.secondType = this.secondList[0].id
            this.getData()
         })
      },
      getData () {
         getAction('sub_list', {
            page: this.page,
            second_id: this.secondType
         }).then(res => {
            this.totals = parseInt(res.data.nums)
            this.goodsList = this.goodsList.concat(res.data.list)
            this.isLoadAll = this.totals === this.goodsList.length
         })
      },
      firstChange (id) {
         this.firstType = id
         const item = this.typeList.find(i => i.id === id)
         this.secondList = item.sub
         this.secondType = this.secondList[0].id
         this.reset()
         this.getData()
      },
      secondChange (id) {
         this.secondType = id
         this.reset()
         this.getData()
      },
      reset () {
         this.page = 1
         this.goodsList = []
      }
   },

   onLoad () {
      this.getTypeData()
      // let app = getApp()
   },
   onHide () {
      console.log('onHide')
   },
   onUnload () {
      console.log('onUnload')
      this.reset()
   },
   onReachBottom () {
      if (!this.isLoadAll) {
         this.page += 1
         this.getData()
      }
   }
}
</script>
