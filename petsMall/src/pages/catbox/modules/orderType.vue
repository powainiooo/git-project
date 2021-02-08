<style>
.c-order-type-modal { width: 100%; height: 80vh; overflow-y: auto; background-color: #ffffff; border-radius: 15px 15px 0 0; position: fixed; left: 0; bottom: 0; z-index: 1300; padding-bottom: 200px; box-sizing: border-box; transition: bottom .5s cubic-bezier(.23,.78,.33,.97); }
.c-order-type-modal-title { height: 170px; background-color: var(--mainColor); display: flex; flex-direction: column; justify-content: center; padding-left: 66px; border-radius: 15px 15px 0 0; position: relative; }
.c-order-type-modal-title p { font-size: 36px; line-height: 50px; color: #ffffff; text-shadow: var(--textShadow); }
.c-order-type-modal-title p.en { font-size: 40px; margin-bottom: 8px; font-family: HelveThin; }
.c-order-type-modal-title .close { width: 55px; height: 55px; position: absolute; top: 54px; right: 66px; }

.c-order-type-modal-list { margin: 0 42px; }
.c-order-type-modal-list li { height: 185px; display: flex; justify-content: space-between; align-items: center; }
.c-order-type-modal-list li>div { width: 530px; display: flex; justify-content: space-between; align-items: center; }
.c-order-type-modal-list li>div>div { margin-left: 40px; }
.c-order-type-modal-list li>div>div p { font-size: 30px; line-height: 1; color: var(--textColor); text-shadow: var(--textShadow); }
.c-order-type-modal-list li>div>div div { font-size: 20px; color: #9C9A9B; text-shadow: var(--textShadow); font-family: HelveThin; position: relative; padding-left: 12px; }
.c-order-type-modal-list li>div>div div:after { content: ''; width: 160px; height: 1px; background-color: var(--mainColor); position: absolute; top: 50%; left: 0; }
.c-order-type-modal-list li>div>div div span { font-size: 66px;  }
.c-order-type-modal-list li>div p { font-size: 20px; color: var(--textColor); text-shadow: var(--textShadow); font-family: HelveThin; }
.c-order-type-modal-list li>div p span { font-size: 66px; }
.c-order-type-modal-list li .radio { width: 71px; height: 71px; margin-right: 28px; }
.c-order-type-modal-list li .radio-select { width: 74px; height: 71px; margin-right: 25px; }

.c-order-type-modal-recommend { padding: 45px 40px 10px 45px; background-color: #F3F2F1; }
.c-order-type-modal-recommend>h3 { color: #CBBB9B; font-size: 40px; line-height: 40px; }
.c-order-type-modal-recommend>h3.en { font-size: 34px; font-family: Helve; line-height: 40px; margin-top: 8px; margin-bottom: 20px; }
.c-order-type-modal-recommend>p { color: #9B9A9A; font-size: 30px; line-height: 45px; margin-bottom: 20px; }

.c-recommend-list>li { display: flex; height: 278px; align-items: flex-end; margin-bottom: 62px; position: relative; }
.c-recommend-list li .imgs { width: 278px; height: 220px; border-radius: 28px; background-color: #ffffff; position: relative; margin-right: 32px; }
.c-recommend-list li .imgs img { width: 278px; height: 278px; position: absolute; left: 0; bottom: 0; }
.c-recommend-list li .infos h3 { font-size: 30px; color: var(--textColor2); text-shadow: var(--textShadow2); }
.c-recommend-list .infos ul { display: flex; margin-bottom: 4px; }
.c-recommend-list .infos ul li { display: flex; font-size: 20px; line-height: 1; padding: 5px 8px; color: #A6A5A5; position: relative; margin-right: 8px; }
.c-recommend-list .infos ul li:after { content: ''; width: 200%; height: 200%; border: 1px solid var(--mainColor); border-radius: 4px; position: absolute; top: 0; left: 0; transform: scale(.5); transform-origin: 0 0; }
.c-recommend-list .infos div { font-size: 20px; color: var(--textColor2); text-shadow: var(--textShadow2); line-height: 1; font-family: HelveThin; }
.c-recommend-list .infos div span { font-size: 66px; }
.c-recommend-list .infos div.overline { color: #9C9A9B; position: relative; }
.c-recommend-list .infos div.overline:after { content: ''; width: 130px; height: 2px; background-color: var(--mainColor); position: absolute; top: 50%; left: 0; }

.c-recommend-list .nums { width: 70px; height: 70px; border-radius: 35px; background-color: #ffffff; border: 1px solid #D1CECE; display: flex; align-items: center; box-sizing: border-box; position: absolute; bottom: 0; right: 0; transition: width .4s ease-out; }
.c-recommend-list .nums span { display: block; width: 60px; font-size: 32px; font-family: Helve; color: var(--textColor2); text-align: center; }
.c-recommend-list .nums div { width: 100px; height: 100px; position: absolute; top: -15px; right: -15px; transition: transform .4s ease-out; }
.c-recommend-list .nums img { width: 100%; height: 100%; position: absolute; top: 0; right: 0; }
.c-recommend-list .nums img:last-child { opacity: 0; transition: opacity .4s ease-out; }
.c-recommend-list .nums-show { width: 138px; }
.c-recommend-list .nums-show div { transform: rotateZ(360deg) }
.c-recommend-list .nums-show img:last-child { opacity: 1; }
</style>

<template>
<div class="c-order-type-modal" :style="{bottom: showOrderType ? 0 : '-100vh'}">
   <div class="c-order-type-modal-title">
      <p class="en">Selection Order type</p>
      <p>选择订购类型</p>
      <img src="/static/images/header/close.png" class="close" @click="close" />
   </div>
   <ul class="c-order-type-modal-list">
      <li class="borderB" v-for="(item, index) in list" :key="index">
         <div>
            <div>
               <p>订购{{item.name}}</p>
               <div v-if="item.old_price"><span>{{item.old_price}}</span>元</div>
            </div>
            <p><span>{{item.pay_price}}</span>元</p>
         </div>
         <img src="/static/images/catbox/radio.png" class="radio" v-if="index !== priceId" @click="selectType(index, item.nums)" />
         <img src="/static/images/catbox/radio-select.png" class="radio" v-else />
      </li>
   </ul>
   <div class="c-order-type-modal-recommend">
      <h3>推荐选购</h3>
      <h3 class="en">Recommend buy</h3>
      <p><text>推荐选购产品将加入每月订购猫盒中，固定\n订购量为当前选中猫盒订购月数。</text></p>

      <ul class="c-recommend-list">
         <li v-for="(item, index) in recList" :key="id">
            <div class="imgs"><img :src="item.small_img" /></div>
            <div class="infos">
               <h3>{{item.china_name}}</h3>
               <ul>
                  <li>{{item.name}}</li>
                  <li>{{item.specs}}</li>
               </ul>
               <div class="overline"><span>{{item.old_price}}</span>元 / 月</div>
               <div><span>{{item.pay_price}}</span>元 / 月</div>
            </div>
            <div class="nums" :class="{'nums-show': item.selected}">
               <span>{{nums}}</span>
               <div @click="item.selected = !item.selected">
                  <img src="/static/images/catbox/icon-add.png" />
                  <img src="/static/images/catbox/icon-reduce.png" />
               </div>
            </div>
         </li>
      </ul>
   </div>
   <c-footer btnName="下一步|Next" @btnFunc="stepNext" v-if="showOrderType" :price="totalPrice" />
</div>
</template>

<script type='es6'>
import store from '@/store'
import { getAction } from '@/utils/api'
import cFooter from '@/components/footer'
export default {
   name: 'app',
   components: {cFooter},
   props: {
      list: Array,
      groupId: {
         type: [String, Number],
         default: ''
      },
      source: {
         type: String,
         default: 'catbox'
      },
      extraFd: {
         type: Object,
         default: {}
      }
   },
   data () {
      return {
         nums: 0,
         priceId: 0,
         recList: []
      }
   },
   computed: {
      showOrderType () {
         return store.state.showOrderType
      },
      totalPrice () {
         const typePrice = Number(this.list[this.priceId].pay_price)
         const recPrice = this.recList.reduce((total, item) => {
            return total += item.selected ? Number(item.pay_price) * this.nums : 0
         }, 0)
         return typePrice + recPrice
      }
   },
   watch: {
      showOrderType (val) {
         if (val) {
            this.getRecData()
            this.nums = this.list[this.priceId].nums
         }
      }
   },
   methods: {
      getRecData () {
         getAction('recommend_product').then(res => {
            res.data.forEach(i => i.selected = false)
            this.recList = res.data
         })
      },
      close () {
         store.commit('SET_ORDERTYPESTATUS', false)
      },
      selectType (id, nums) {
         this.priceId = id
         this.nums = parseInt(nums)
      },
      stepNext () {
         const params = {
            recom_str: this.recList.filter(i => i.selected).map(i => `${i.id}-${this.nums}`).join('|')
         }
         if (this.source === 'catbox') {
            params.group_id = this.groupId
            params.price_id = this.priceId
         } else if (this.source === 'diy') {
            Object.assign(params, this.extraFd)
         }
         console.log('SET_CBFORMDATA', params)
         store.commit('SET_CBFORMDATA', params)
         mpvue.navigateTo({
            url: `/pages/address/main?status=new&source=${this.source}`
         })
      }
   }
}
</script>
