<style>
.container { padding: 300px 0 200px 0;}
.tips-diy { padding: 42px 0 54px 0; background-color: #EEEBEA; }
</style>

<template>
<div class="container">
   <c-header title="我的自定义猫盒|My cat box" titleColor="#E8E6E4" />
   <template v-if="hasData">
   <div>
      <diy-item
         v-for="(item, index) in detailData.productlist"
         :key="id"
         :title="item.type_englishname + '  ' + item.type_name"
         source="mine"
         showArrow
         :itemData="item"
         @click="toPage(item, index)"
      />
      <diy-item title="Toy  玩具" source="mine" showArrow :itemData="toyData" @click="toPage($event, 3)" />
      <div class="tips-diy">
         <div class="tips-content">
            <img src="/static/images/order/tips.png" mode="widthFix" />
            <p>提供随心搭配，保存后的自定义猫盒套餐将方便你订购，多次操作仅保存最新编辑的自定义猫盒套餐。</p>
         </div>
      </div>
   </div>
   <c-footer btnName="我要订购|Order" :price="price" @btnFunc="openOrderType" />
   <c-order-type-modal :list="detailData.pricelist" :groupId="detailData.id" />
   </template>
   <template v-else>
   <div class="hint-result">
      <img src="/static/images/goods/warn.png" mode="widthFix" style="width: 71rpx;" />
      <h3 class="en">No related content</h3>
      <h3>无相关内容！</h3>
   </div>
   <c-footer btnName="自定义|Customized" needAuth @btnFunc="toDiy" />
   </template>

</div>
</template>

<script>
import cHeader from '@/components/header'
import cFooter from '@/components/footer'
import diyItem from '../modules/diyItem'
import { getAction } from '@/utils/api'
import store from '@/store'
import cOrderTypeModal from '../modules/orderType'

export default {
   components: {
      cHeader,
      cFooter,
      diyItem,
      cOrderTypeModal
   },
   computed: {
      userInfoAuth () {
         return store.state.settings['scope.userInfo']
      },
      toyData () {
         if (this.detailData.toy === '1') {
            return {
               cover: '/static/images/catbox/toy-yes.png',
               english_name: this.toy.english_name,
               china_name: this.toy.china_name,
               attr_name: '随机',
               price: this.toy.price
            }
         } else {
            return {
               cover: '/static/images/catbox/toy-no.png',
               english_name: 'Don\'t need toys',
               china_name: '不需要玩具',
               price: 0
            }
         }
      }
   },
   data () {
      return {
         id: '',
         price: 0,
         detailData: {
            pricelist: []
         },
         toy: {
            english_name: '',
            china_name: '',
            price: ''
         },
         hasData: false
      }
   },
   methods: {
      toPage (data, page) {
         let selected = ''
         let price = 0
         let toy = this.detailData.toy
         const name = ['food', 'canned', 'snacks', 'toy']
         page = name[page]
         if (page !== 'toy') {
            console.log('toPage', data)
            selected = `${data.type_id}-${data.product_id}-${data.attr_id}-${data.specs}`
            price = data.price || 0
            toy = 0
         }
         // 1-1-2-400g|2-2-3-85g|3-3-4-40g
         mpvue.navigateTo({
            url: `/pages/catbox/diy/main?source=${page}&toy=${toy}&selected=${selected}&price=${price}`
         })
      },
      getData () {
         mpvue.showLoading()
         getAction('my_group', {
            token: store.state.token
         }).then(res => {
            const mineParams = store.state.mineParams
            console.log('mineParams', mineParams, this.detailData)
            if (mineParams.source) {
               const arr = res.data.productlist.map(i => `${i.type_id}-${i.product_id}-${i.attr_id}-${i.specs}`)
               console.log('arr', arr)
               const params = {
                  token: store.state.token,
                  pro_str: arr.join('|'),
                  toy: this.detailData.toy
               }
               if (mineParams.source === 'toy') {
                  params.toy = mineParams.data
               } else {
                  const split = mineParams.data.split('-')
                  arr[Number(split[0]) - 1] = mineParams.data
                  params.pro_str = arr.join('|')
               }
               getAction('diy_group', params).then(res => {
                  if (res.status === 0) {
                     store.commit('SET_MINEPARAMS', {})
                     this.getData()
                  }
               })
            } else {
               if (Array.isArray(res.data)) {
                  this.hasData = false
               } else {
                  this.hasData = true
                  this.detailData = res.data
                  this.price = res.data.pricelist[0].pay_price
               }
               mpvue.hideLoading()
            }
         })
      },
      openOrderType () {
         store.commit('SET_ORDERTYPESTATUS', true)
      },
      toDiy () {
         mpvue.navigateTo({
            url: '/pages/catbox/diy/main'
         })
      },
      getToyData () {
         getAction('get_toy').then(res => {
            console.log(res)
            this.toy.english_name = res.data.toy.english_name
            this.toy.china_name = res.data.toy.china_name
            this.toy.price = res.data.toy.price
         })
      }
   },
   onShow () {
      if (this.userInfoAuth) {
         this.getData()
      }
   },
   onLoad (options) {
      Object.assign(this.$data, this.$options.data())
      this.id = options.id || 4
      this.getToyData()
   }
}
</script>
