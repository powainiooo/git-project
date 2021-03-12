<style>
.container { padding: 300px 0 200px 0;}
.list-frame { padding-top: 150px; width: 100%; overflow: hidden; }
.list-frame>ul { width: 400%; display: flex; transition: transform .3s ease-out; }
.list-frame>ul>li { flex: 1; }
.hint { font-size: 24px; color: #9B9A9A; text-align: center; margin: 50px; }
</style>

<template>
<div>
   <div class="container" :class="{'blur': showDetail}">
      <c-header :title="title" titleColor="#E8E6E4" />
      <diy-step :step="step" v-if="source === 'diy'" @change="changeStep" />
      <div class="list-frame" :style="{'padding-top': source === 'diy' ? '150rpx' : 0}">
         <ul :style="{'transform': 'translateX(' + (-step * 100) + 'vw)'}">
            <li>
               <!-- 主粮 -->
               <diy-item
                  v-for="item in listData[0]"
                  :key="id"
                  :itemData="item"
                  :selectedData="selectedArr[0]"
                  :showArrow="ids[0] === item.id"
                  @click="openDetail" />
            </li>
            <li>
               <!-- 罐头 -->
               <diy-item
                  v-for="item in listData[1]"
                  :key="id"
                  :itemData="item"
                  :selectedData="selectedArr[1]"
                  :showArrow="ids[1] === item.id"
                  @click="openDetail" />
            </li>
            <li>
               <!-- 零食 -->
               <diy-item
                  v-for="item in listData[2]"
                  :key="id"
                  :itemData="item"
                  :selectedData="selectedArr[2]"
                  :showArrow="ids[2] === item.id"
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
      <div class="hint" v-if="loadOver"></div>
   </div>
   <c-footer :btnName="btnName" :price="totalPrice" @btnFunc="btnFunc" />

   <select-type ref="details" @selected="goodsSelect" @close="typeClose" @price="changeTempPrice" />

   <!--   <c-order-type :list="typeList" source="diy" :extraFd="formData" />-->
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
         if (this.showDetail) {
            return this.tempPrice
         } else {
            let goodsPrice = this.priceArr.reduce((total, i) => total + (i ? Number(i) : 0), 0)
            goodsPrice = Number(goodsPrice.toFixed(2))
            return this.needToy === 1 ? this.toyPrice + goodsPrice : goodsPrice
         }
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
         listData: [
            [],
            [],
            []
         ],
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
               price: 0,
               id: 0
            }
         ],
         total: 0,
         selectedArr: ['', '', ''],
         tempPrice: 0,
         priceArr: [],
         ids: [],
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
         title: '',
         showDetail: false
      }
   },
   methods: {
      changeStep (step) {
         console.log('changeStep', step)
         this.step = step
         this.page = 1
         this.listData[this.step] = []
         this.total = 0
         this.getData(this.step + 1)
         if (this.step === 3) {
            this.btnName = '保存|Save'
         }
      },
      btnFunc () {
         if (this.btnName === '确认|Confirm') {
            this.$refs.details.confirm()
         } else {
            if (this.source === 'diy') {
               if (this.step === 3) {
                  this.createCatbox()
               } else {
                  if (this.selectedArr[this.step]) {
                     console.log('this.selectedArr[this.step]', this.step, this.selectedArr[this.step])
                     this.changeStep(this.step + 1)
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
            this.total = Number(res.data.nums)
            this.listData[this.step] = this.listData[this.step].concat(res.data.list)
            console.log('this.listData', this.listData)
         })
      },
      goodsSelect (data) {
         console.log('goodsSelect', data)
         this.selectedArr[this.step] = data.str
         const priceArr = [...this.priceArr]
         priceArr[this.step] = Number(data.price)
         this.priceArr = priceArr
         this.ids[this.step] = data.id
         this.showDetail = false
         // 确认后返回
         if (this.source !== 'diy') {
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
      },
      openDetail (record) {
         console.log('openDetail', record, this.step)
         this.showDetail = true
         this.tempRecord = record
         this.btnName = '确认|Confirm'
         let catalogIndex = 0
         let specsIndex = 0
         if (this.selectedArr[this.step] && this.ids[this.step] === record.id) {
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
         this.showDetail = false
         if (this.source === 'diy') {
            this.btnName = '下一步|Next'
         } else {
            this.btnName = '保存|Save'
         }
      },
      changeTempPrice (e) {
         console.log('changeTempPrice', e)
         this.tempPrice = e
      }
   },
   onReachBottom () {
      if (this.loadOver) return
      this.page += 1
      this.getData()
   },
   onShow () {
      if (this.source !== 'toy') {
         if (this.listData[this.step].length === 0) {
            this.getData(this.step + 1)
         }
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
            const selects = options.selected.split('-')
            this.ids[this.step] = selects[1]
         }
      }
   }
}
</script>
