<style scoped>
.container { padding-top: 420px; background-color: #F3F2F1;}
.tabs { width: 265px; position: absolute; top: 340px; background-color: #e7e6e4; border-radius: 20px 20px 0 0;}
.tabs-active { background-color: #ffffff; z-index: 10; }
.tabs img { width: 265px; height: 80px; display: block; }
.tabs-dog { left: 96px;}
.tabs-cat { right: 96px;}

.list-container { min-height: calc(100vh - 420px); background-color: #ffffff; display: flex; flex-wrap: wrap; position: relative; padding: 52px 45px 0 45px; box-shadow: 0 0 25px rgba(0, 0, 0, .1); }
.list-container .grid:nth-child(2n) { display: flex; justify-content: flex-end; }
.list-container .grid { width: 50%; position: relative; }
.list-container .grid:before { content: ''; width: 100%; height: 2px; position: absolute; bottom: 0; left: 0; background-color: #D1CECE; transform: scaleY(.5); }
.list-container .grid:last-child:before { height: 0; }
.list-container .grid:nth-last-child(2):before { height: 0; }
.list-container .grid:nth-child(2n-1):after { content: ''; width: 2px; position: absolute; top: 0; right: 0; bottom: 0; background-color: #D1CECE; transform: scaleX(.5); }

.hint { font-size: 24px; color: #9B9A9A; text-align: center; margin: 50px; }
</style>

<template>
<div>
   <div class="container" :class="{'blur': showCart}">
      <c-header :title="title" searchBtn cartBtn @search="querySearch" :cartNums="cartNums" />

      <template v-if="!showResult">
      <div class="tabs tabs-dog" :class="{'tabs-active': tabs === 'dog'}" @click="toggleTab('dog')">
         <img src="/static/images/goods/dog-active.png" v-if="tabs === 'dog'" />
         <img src="/static/images/goods/dog.png" v-else />
      </div>
      <div class="tabs tabs-cat" :class="{'tabs-active': tabs === 'cat'}" @click="toggleTab('cat')">
         <img src="/static/images/goods/cat-active.png" v-if="tabs === 'cat'" />
         <img src="/static/images/goods/cat.png" v-else />
      </div>
      <div class="list-container">
         <template v-if="listData.length > 0">
         <div class="grid" v-for="item in listData" :key="id">
            <list-item :itemData="item" />
         </div>
         <div class="grid" v-if="listData.length % 2 !== 0"></div>
         </template>
         <div class="hint-result" v-else>
            <img src="/static/images/goods/warn.png" mode="widthFix" style="width: 71rpx;" />
            <h3 class="en">No related content</h3>
            <h3>无相关内容！</h3>
         </div>
      </div>
      </template>
      <div class="list-container" v-else style="background-color: transparent; box-shadow: none;">
         <template v-if="listData.length > 0">
         <div class="grid" v-for="item in listData" :key="id">
            <list-item :itemData="item" />
         </div>
         <div class="grid" v-if="listData.length % 2 !== 0"></div>
         </template>
         <div class="hint-result" v-else>
            <img src="/static/images/goods/warn.png" mode="widthFix" style="width: 71rpx;" />
            <h3 class="en">No related content</h3>
            <h3>无相关内容！</h3>
         </div>
      </div>

      <div class="hint" v-if="loadOver && keyword === ''"></div>

   </div>

   <c-carts :list="cartList" @refresh="getCart" />
</div>
</template>

<script>
import cHeader from '@/components/header'
import cCarts from '@/components/carts'
import listItem from './modules/listItem'
import { getAction } from '@/utils/api'
import store from '@/store'

export default {
   components: {
      cHeader,
      listItem,
      cCarts
   },
   data () {
      return {
         title: '',
         tabs: 'dog',
         showResult: false,
         typeKey: {
            dog: 1,
            cat: 2
         },
         listData: [],
         total: 0,
         cartList: [],
         typeId: '',
         pageNo: 1,
         keyword: ''
      }
   },
   computed: {
      loadOver () {
         return this.total === this.listData.length
      },
      noMoreHint () {
         return this.loadOver && this.keyword === ''
      },
      showCart () {
         return store.state.showCart
      },
      cartNums () {
         return this.cartList.reduce((total, i) => total + Number(i.buy_num), 0)
      }
   },
   methods: {
      getData () {
         mpvue.showLoading()
         getAction('product_list', {
            word: this.keyword,
            page: this.pageNo,
            type_id: this.typeId,
            pet_id: this.typeKey[this.tabs]
         }).then(res => {
            mpvue.hideLoading()
            this.total = Number(res.data.nums)
            this.listData = this.listData.concat(res.data.list)
            this.showResult = this.keyword !== ''
         })
      },
      querySearch (e) {
         this.keyword = e
         this.reset()
      },
      toggleTab (type) {
         this.tabs = type
         this.reset()
      },
      reset () {
         this.pageNo = 1
         this.listData = []
         this.getData()
      },
      getCart () {
         if (store.state.token !== '') {
            getAction('get_shopping_cart', {
               token: store.state.token
            }).then(res => {
               this.cartList = res.data
            })
         }
      }
   },
   onShow () {
      this.reset()
      this.getCart()
   },
   onReachBottom () {
      if (this.loadOver) return
      this.pageNo += 1
      this.getData()
   },
   onLoad (options) {
      store.commit('SET_CARTSTATUS', false)
      Object.assign(this.$data, this.$options.data())
      this.typeId = options.type || 1
      this.title = options.title || '主粮|Staple food'
   }
}
</script>
