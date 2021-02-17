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
   <div>
      <diy-step :step="step" />
      {{totalPrice}}
      <div class="list-frame">
         <ul :style="{'transform': 'translateX(' + (-step * 100) + 'vw)'}">
            <li>
               <diy-item
                  v-for="item in listData"
                  :key="id"
                  :itemData="item"
                  :showArrow="selectedArr[0]"
                  @click="openDetail" />
            </li>
            <li>
               <diy-item
                  v-for="item in listData"
                  :key="id"
                  :itemData="item"
                  :showArrow="selectedArr[1]"
                  @click="openDetail" />
            </li>
            <li>
               <diy-item
                  v-for="item in listData"
                  :key="id"
                  :itemData="item"
                  :showArrow="selectedArr[2]"
                  @click="openDetail" />
            </li>
            <li>
               <div class="c-diy-item borderB" @click="needToy = 1">
                  <img src="/static/images/catbox/toy-yes.png" class="img" />
                  <div class="infos">
                     <div>
                        <h3 class="en">Hot toys</h3>
                        <h3>当月精选玩具</h3>
                     </div>
                     <div><span>{{toyPrice}}</span>元</div>
                  </div>
                  <img src="/static/images/catbox/radio-select.png" class="radio-select" v-if="needToy === 1" />
                  <img src="/static/images/catbox/radio.png" class="radio" v-else />
               </div>
               <div class="c-diy-item borderB" @click="needToy = 0">
                  <img src="/static/images/catbox/toy-no.png" class="img" />
                  <div class="infos">
                     <div>
                        <h3 class="en">Don't need toys</h3>
                        <h3>不需要玩具</h3>
                     </div>
                     <div><span>0</span>元</div>
                  </div>
                  <img src="/static/images/catbox/radio-select.png" class="radio-select" v-if="needToy === 0" />
                  <img src="/static/images/catbox/radio.png" class="radio" v-else />
               </div>
            </li>
         </ul>
      </div>
      <div class="hint" v-if="loadOver">没有更多了</div>
   </div>
   <c-footer :btnName="btnName" :price="totalPrice" @btnFunc="changeStep" />

   <select-type ref="details" @selected="goodsSelect" @close="btnName = '下一步|Next'" />

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
         const goodsPrice = this.priceArr.reduce((total, i) => total + Number(i), 0)
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
         step: 0,
         page: 1,
         listData: [],
         total: 0,
         selectedArr: [],
         priceArr: [],
         btnName: '下一步|Next',
         toyPrice: 10,
         needToy: 0,
         tempRecord: {}
      }
   },
   methods: {
      changeStep () {
         if (this.btnName === '确认|Confirm') {
            this.$refs.details.confirm()
         } else if (this.btnName === '下一步|Next') {
            if (this.step === 3) {
               this.createCatbox()
            } else {
               this.step += 1
               this.page = 1
               this.listData = []
               this.total = 0
               this.getData(this.step + 1)
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
