<style>
.container { padding: 300px 0 200px 0;}
.list-frame { padding-top: 150px; width: 100%; overflow: hidden; }
.list-frame>ul { width: 400%; display: flex; transition: transform .3s ease-out; }
.list-frame>ul>li { flex: 1; }
.hint { font-size: 24px; color: #9B9A9A; text-align: center; margin: 50px; }
</style>

<template>
<div class="container">
   <c-header :title="title" titleColor="#E8E6E4" />
   <div>
      <diy-step :step="step" v-if="source === 'diy'" />
      <div class="list-frame" :style="{'padding-top': source === 'diy' ? '150rpx' : 0}">
         <ul :style="{'transform': 'translateX(' + (-step * 100) + 'vw)'}">
            <li>
               <!-- 主粮 -->
               <diy-item
                  v-for="item in listData"
                  :key="id"
                  :itemData="item"
                  :showArrow="selectedArr[0]"
                  @click="openDetail" />
            </li>
            <li>
               <!-- 罐头 -->
               <diy-item
                  v-for="item in listData"
                  :key="id"
                  :itemData="item"
                  :showArrow="selectedArr[1]"
                  @click="openDetail" />
            </li>
            <li>
               <!-- 零食 -->
               <diy-item
                  v-for="item in listData"
                  :key="id"
                  :itemData="item"
                  :showArrow="selectedArr[2]"
                  @click="openDetail" />
            </li>
            <li>
               <!-- 玩具 -->
               <diy-item
                  v-for="item in toyListData"
                  :key="id"
                  :itemData="item"
                  useSelect
                  :selectId="needToy"
                  @click="toggleToy" />
            </li>
         </ul>
      </div>
      <div class="hint" v-if="loadOver">没有更多了</div>
   </div>
   <c-footer :btnName="btnName" :price="totalPrice" @btnFunc="changeStep" />

   <select-type ref="details" @selected="goodsSelect" @close="typeClose" />

   <c-order-type :list="typeList" source="diy" :extraFd="formData" />
</div>
</template>

<script>
import cHeader from '@/components/header'
import cFooter from '@/components/footer'
import diyStep from '../modules/diyStep'
import diyItem from '../modules/diyItem'
import cOrderType from '../modules/orderType'
import selectType from '../modules/selectType'
import { getAction } from '@/utils/api'
import store from '@/store'

export default {
   components: {
      cHeader,
      cFooter,
      diyStep,
      diyItem,
      cOrderType,
      selectType
   },
   computed: {
      loadOver () {
         return this.total === this.listData.length
      },
      totalPrice () {
         const goodsPrice = this.priceArr.reduce((total, i) => total + i ? Number(i) : 0, 0)
         return this.needToy === 1 ? this.toyPrice + goodsPrice : goodsPrice
      },
      typeList () {
         return [
            { name: '一个月', nums: 1, pay_price: this.totalPrice },
            { name: '三个月', nums: 3, pay_price: this.totalPrice },
            { name: '六个月', nums: 6, pay_price: this.totalPrice },
            { name: '十二个月', nums: 12, pay_price: this.totalPrice }
         ]
      },
      formData () {
         return {
            pro_str: this.selectedArr.join('|'),
            toy: this.needToy
         }
      }
   },
   data () {
      return {
         source: 'diy',
         step: 0,
         page: 1,
         listData: [],
         toyListData: [
            {
               cover: '/static/images/catbox/toy-yes.png',
               english_name: 'Hot toys',
               china_name: '当月精选玩具',
               attr_name: '随机',
               price: 10,
               id: 1
            },
            {
               cover: '/static/images/catbox/toy-no.png',
               english_name: 'Don\'t need toys',
               china_name: '不需要玩具',
               attr_name: '随机',
               price: 0,
               id: 0
            }
         ],
         total: 0,
         selectedArr: [],
         priceArr: [],
         btnName: '下一步|Next',
         toyPrice: 10,
         needToy: 0,
         tempRecord: {},
         hash: {
            diy: {
               name: '自定义猫盒套餐|Customized cat box',
               id: 0
            },
            food: {
               name: '更换主粮|Replacing staple food',
               id: 0
            },
            canned: {
               name: '更换罐头|Replacing Canned',
               id: 1
            },
            snacks: {
               name: '更换零食|Replacing Snacks',
               id: 2
            },
            toy: {
               name: '更换玩具|Replacing Toy',
               id: 3
            }
         },
         title: ''
      }
   },
   methods: {
      changeStep () {
         if (this.btnName === '确认|Confirm') {
            this.$refs.details.confirm()
         } else {
            if (this.source === 'diy') {
               if (this.step === 3) {
                  this.createCatbox()
               } else {
                  if (this.selectedArr[this.step]) {
                     this.step += 1
                     this.page = 1
                     this.listData = []
                     this.total = 0
                     this.getData(this.step + 1)
                  } else {
                     mpvue.showToast({
                        title: '请选择产品',
                        icon: 'none'
                     })
                  }
               }
            } else {
               console.log(this.selectedArr, this.step)
               const params = {
                  source: this.source
               }
               if (this.source === 'toy') {
                  params.data = this.needToy
               } else {
                  params.data = this.selectedArr[this.step]
               }
               store.commit('SET_MINEPARAMS', params)
               mpvue.navigateBack({
                  delta: -1
               })
            }
         }
      },
      getData (id) {
         // mpvue.showLoading()
         getAction('product_list', {
            word: '',
            page: this.page,
            type_id: id,
            pet_id: 2
         }).then(res => {
            mpvue.hideLoading()
            this.total = res.data.nums
            this.listData = this.listData.concat(res.data.list)
         })
      },
      goodsSelect (data) {
         console.log('goodsSelect', data)
         this.selectedArr[this.step] = data.str
         const priceArr = [...this.priceArr]
         priceArr[this.step] = data.price
         this.priceArr = priceArr
         // const ids = data.str.split('-')
         // const type = this.tempRecord.attrs_list.find(i => i.id === ids[2])
         // const record = {
         //    small_img: type.small_img,
         //    product_img: type.product_img,
         //    english_name: this.tempRecord.english_name,
         //    china_name: this.tempRecord.china_name,
         //    apply: this.tempRecord.apply,
         //    mainly: this.tempRecord.mainly,
         //    nutritional: this.tempRecord.nutritional,
         //    attr_name: type.name,
         //    specs: ids[3]
         // }
         // this.goodsList[this.step] = record
      },
      openDetail (record) {
         console.log('openDetail', record)
         this.tempRecord = record
         this.btnName = '确认|Confirm'
         let catalogIndex = 0
         let specsIndex = 0
         if (this.selectedArr[this.step]) {
            const arr = this.selectedArr[this.step].split('-')
            catalogIndex = record.attrs_list.findIndex(i => i.id === arr[2])
            specsIndex = record.attrs_list[catalogIndex].child.findIndex(i => i.specs === arr[3])
         }
         this.$refs.details.select(record, catalogIndex, specsIndex)
      },
      toggleToy (record) {
         this.needToy = record.id
      },
      createCatbox () {
         const params = {
            token: store.state.token,
            pro_str: this.selectedArr.join('|'),
            toy: this.needToy
         }
         getAction('diy_group', params).then(res => {
            if (res.status === 0) {
               mpvue.navigateTo({
                  url: `/pages/catbox/mine/main?id=${res.data}`
               })
            }
         })
      },
      typeClose () {
         if (this.source === 'diy') {
            this.btnName = '下一步|Next'
         } else {
            this.btnName = '保存|Save'
         }
      }
   },
   onReachBottom () {
      if (this.loadOver) return
      this.page += 1
      this.getData()
   },
   onShow () {
      if (this.source !== 'toy') {
         this.getData(this.step + 1)
      }
   },
   onLoad (options) {
      Object.assign(this.$data, this.$options.data())
      this.source = options.source || 'diy'
      this.needToy = Number(options.toy) || 0
      this.title = this.hash[this.source].name
      this.step = this.hash[this.source].id
      if (this.source === 'diy') {
         this.btnName = '下一步|Next'
      } else {
         this.btnName = '保存|Save'
         if (this.source !== 'toy') {
            this.selectedArr[this.step] = options.selected
            this.priceArr[this.step] = options.price || 0
         }
      }
   }
}
</script>
