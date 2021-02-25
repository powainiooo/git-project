<style>
.container { padding-top: 300px; padding-bottom: 200px;}
.goods-details { margin: 0 40px;}
.infos { padding: 32px 26px; display: flex; justify-content: space-between; align-items: center; }
.infos .name p { color: var(--textColor2); text-shadow: var(--textShadow); font-size: 30px; }
.infos .name p.en { font-size: 34px; font-family: HelveThin; }
.infos .price { font-size: 66px; color: var(--textColor2); text-shadow: var(--textShadow); font-family: HelveThin; }
.infos .price span { font-size: 22px; }

</style>

<template>
<div>
   <div class="container" :class="{'blur': showCart || showShare}">
      <c-header title="主粮|Staple food" titleColor="#E8E6E4" cartBtn shareBtn :cartNums="cartList.length" />
      <c-banner :list="bannerList" />
      <div class="goods-details">
         <div class="infos borderB">
            <div class="name">
               <p class="en">{{detailData.english_name}}</p>
               <p>{{detailData.china_name}}</p>
            </div>
            <div class="price">{{specItem.price}}<span>元</span></div>
         </div>
         <div class="catalog borderB">
            <h3>· 选择种类</h3>
            <ul>
               <li
                  v-for="item in catalogList"
                  :key="id"
                  :class="{
                     'active': catalogId === item.id
                  }"
                  @click="selectCatalog(item)"
                  hover-class="hscale"
                  hover-stay-time="10">{{item.name}}</li>
            </ul>
            <h3>· 选择规格</h3>
            <ul>
               <li
                  v-for="item in specsList"
                  :key="id"
                  :class="{
                     'active': specsId === item.specs_id,
                     'diabled': item.nums == 0
                  }"
                  @click="selectSpec(item)"
                  :hover-class="item.nums == 0 ? '' : 'hscale'"
                  hover-stay-time="10">{{item.specs}}</li>
            </ul>
         </div>
         <div class="intros">
            <h3>适用对象:</h3>
            <p><text>{{detailData.apply}}</text></p>
            <h3>营养成分:</h3>
            <p><text>{{detailData.nutritional}}</text></p>
            <h3>主要成分:</h3>
            <p><text>{{detailData.mainly}}</text></p>
         </div>
      </div>

      <c-footer btnName="加入购物车|Add to cart" needAuth @btnFunc="addCart" />
   </div>
   <c-carts :list="cartList" @refresh="getCart" />

   <c-share />
</div>
</template>

<script>
import cHeader from '@/components/header'
import cFooter from '@/components/footer'
import cCarts from '@/components/carts'
import cShare from '@/components/share'
import cBanner from './modules/banner'
import { getAction } from '@/utils/api'
import store from '../../../store'

export default {
   components: {
      cHeader,
      cFooter,
      cCarts,
      cBanner,
      cShare
   },
   computed: {
      showCart () {
         return store.state.showCart
      },
      showShare () {
         return store.state.showShare
      },
      specItem () {
         return this.specsList.find(i => i.specs_id === this.specsId)
      }
   },
   data () {
      return {
         bannerList: [],
         detailData: {},
         catalogId: '',
         catalogList: [],
         specsId: '',
         specsList: [],
         isAjax: false,
         cartList: []
      }
   },
   methods: {
      getData () {
         getAction('product_info', {
            id: this.id
         }).then(res => {
            this.bannerList = res.data.img_list
            this.detailData = res.data
            this.catalogList = res.data.classes
            this.catalogId = res.data.classes[0].id
            this.specsList = res.data.classes[0].child
            this.specsId = res.data.classes[0].child[0].specs_id
         })
      },
      selectCatalog (data) {
         this.catalogId = data.id
         this.specsList = data.child
         this.specsId = data.child[0].specs_id
      },
      selectSpec (data) {
         this.specsId = data.specs_id
      },
      addCart () {
         console.log('addCart')
         if (this.isAjax) return
         this.isAjax = true
         getAction('add_shopping_cart', {
            token: store.state.token,
            product_id: this.detailData.id,
            type_id: this.catalogId,
            goods_attr: this.specItem.specs,
            buy_num: 1
         }).then(res => {
            this.isAjax = false
            if (res.status === 0) {
               this.getCart()
               mpvue.showToast({ title: res.msg })
            }
         })
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
   onLoad (options) {
      Object.assign(this.$data, this.$options.data())
      this.id = options.id || 1
      this.getData()
      this.getCart()
   },
   onShareAppMessage: function () {
      return {
         title: this.detailData.china_name,
         path: 'pages/goods/detail/main'
      }
   }
}
</script>
