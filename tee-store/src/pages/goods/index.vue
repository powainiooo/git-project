<style>
.goods-container2 { width: 565px; height: calc(100vh - 260px); margin-top: 0; margin-left: 160px; overflow-x: hidden; overflow-y: auto; padding-bottom: 0; z-index: 5; }
.goods-container2 .scrolls { height: 100%; }
.goods-container2 .list { margin: 0 32px; padding-bottom: 170px; }
.goods-container2 .list .c-goods-item { margin-bottom: 30px; margin-top: 30px; }
.goods-container2 .list .slideUp:nth-child(2) { animation-delay: .2s; }
.goods-container2 .list .slideUp:nth-child(3) { animation-delay: .4s; }
.goods-container2 .list .slideUp:nth-child(4) { animation-delay: .6s; }
.goods-container2 .list .slideUp:nth-child(5) { animation-delay: .8s; }

.close-hint { width: 100%; height: 280px; background-color: rgba(122, 115, 108, 0.95); position: fixed; left: 0; bottom: 0; z-index: 200; color: #FFFFFF; }
.close-hint div { font-size: 24px; line-height: 24px; text-align: center; margin-top: 24px; margin-bottom: 6px; }
.close-hint p { font-size: 20px; line-height: 26px; text-align: center; }

.close-img { width: 404px; }
</style>

<template>
<div class="page">
  <c-header menus :storeLogo="storeInfo.shop_logo" />
  <div class="container" style="padding-bottom: 0;">
    <!-- 地址信息 -->
    <addr-info ref="top"
               :showCart="!closeModalVisible && !closeHintVisible"
               showShare
               :record="addrData"
               @refresh="getCart"
               @tap="toStores" />

    <!-- 产品信息 -->
    <div class="pr">
      <cates :list="cateList" :current="current" @toggle="toggleCate" />
      <view class="container2 goods-container2">
        <scroll-view
          class="scrolls"
          :scroll-into-view="scrollKey"
          @scroll="onScroll"
          @scrolltolower="scrolltolower"
          scroll-with-animation
          scroll-y>
          <div class="list" id="list">
            <div class="slideUp" v-for="(i, index) in goodsList" :key="id" :id="i.aid">
              <div class="borderB mt60 mb60" v-if="index > 0 && i.aid !== ''" style="height: 1px;"></div>
              <item :record="i" @detail="openDetail" :cartList="cartsList" :disabled="closeHintVisible" />
            </div>
          </div>
        </scroll-view>
      </view>
    </div>
  </div>

  <!-- 关门弹窗 -->
  <div class="c-modal" v-if="closeModalVisible">
    <div class="c-modal-box">
      <img src="/static/images/bg.png" class="bg" />
      <div class="pr">
        <div class="line1 center">
          <img src="/static/images/close.png" mode="widthFix" class="close-img" />
        </div>
        <div class="title">本店休息中，请切换其他门店</div>
        <div class="desc" :style="{opacity: storeInfo.pause === 0 ? 1 : 0}">营业时间为{{storeInfo.word_time_start}} ~ {{storeInfo.word_time_end}}，目前时段已打烊，期待您的光临。</div>
        <div class="center">
          <button class="btn btn-style1" @click="toStores">切换门店</button>
          <button class="btn btn-style2" @click="doCloseModal">留在当前</button>
        </div>
      </div>
      <a href="javascript:;" class="close center" @click="doCloseModal"><img src="/static/images/x2.png" mode="widthFix" class="w18" /></a>
    </div>
  </div>

  <!-- 关门提示 -->
  <div class="close-hint" v-if="closeHintVisible">
    <div>本店休息中，请切换其他门店</div>
    <p v-if="storeInfo.pause === 0">营业时间为{{storeInfo.word_time_start}} ~ {{storeInfo.word_time_end}}</p>
  </div>

  <!-- 免费弹窗 -->
  <div class="c-modal" v-if="freeModalVisible">
    <div class="c-modal-box">
      <img src="/static/images/bg.png" class="bg" />
      <div class="pr">
        <img src="/static/images/arrow6.png" mode="widthFix" class="ar6" v-if="prizeData.length > 1" />
        <img src="/static/images/arrow7.png" mode="widthFix" class="ar7" v-if="prizeData.length > 1" />
        <swiper class="swiper" @change="giftChange">
          <swiper-item v-for="item in prizeData" :key="id">
            <div class="line1 center">
              <img src="/static/images/free@2x.png" mode="widthFix" class="free" />
              <div class="imgs"><img :src="imgSrc + item.cover" mode="aspectFill" /></div>
            </div>
            <div class="title">{{item.title}}</div>
            <div class="desc">{{item.content}}<br/>有效期 至 {{item.expired}}</div>
          </swiper-item>
        </swiper>
        <div class="center">
          <button class="btn btn-style1" @click="doUse">立即使用</button>
          <button class="btn btn-style2" @click="freeModalVisible = false">暂不使用</button>
        </div>
      </div>
      <a href="javascript:;" class="close center" @click="freeModalVisible = false"><img src="/static/images/x2.png" mode="widthFix" class="w18" /></a>
    </div>
  </div>

  <!-- 详情 -->
  <c-details ref="detail" @confirm="addCart" />

  <c-footer current="order" />
</div>
</template>

<script>
import cHeader from '@/components/header'
import cFooter from '@/components/footer'
import addrInfo from '@/components/addrInfo'
import cates from './modules/cates'
import item from './modules/item'
import cDetails from './modules/details'
import store from '../../store'
import {getAction, postAction} from '@/utils/api'
export default {
  components: {
    cHeader,
    cFooter,
    addrInfo,
    cates,
    item,
    cDetails
  },
  data () {
    return {
      imgSrc: mpvue.imgSrc,
      shopId: '',
      current: 0,
      scrollKey: '',
      cateList: [],
      goodsList: [],
      cartsList: [],
      closeModalVisible: false,
      closeHintVisible: false,
      freeModalVisible: false,
      cartNum: 0,
      isAjax: false,
      storeInfo: {},
      prizeData: [],
      priceIndex: 0,
      dis: [],
      lng: '',
      lat: ''
    }
  },
  computed: {
    iH () { // 单个商品高度
      const ww = store.state.sysInfo.windowWidth || 375
      return parseInt(ww * 0.2933)
    },
    sH () { // 单个分割线高度
      const ww = store.state.sysInfo.windowWidth || 375
      return parseInt(ww * 0.08)
    },
    addrData () {
      return {
        name: this.storeInfo.shop_name,
        dis: this.storeData.distance,
        cartNum: this.cartNum,
        cartType: 1,
        shopId: this.shopId
      }
    },
    storeData () {
      return store.state.storeInfo
    },
    canShowPrize () {
      return store.state.canShowPrize
    },
    canShowClose () {
      return store.state.canShowClose
    }
  },
  watch: {
    storeData (val) {
      console.log('change storeData', val)
      if (val.shop_id && this.shopId !== val.shop_id) {
        this.shopId = val.shop_id
        this.getAllData()
      }
    }
  },
  methods: {
    getAllData () {
      this.cateList = []
      this.goodsList = []
      this.getData()
      this.getCart()
      this.getLocation()
    },
    getData () {
      getAction('/userapi/goods/index/data', {
        shop_id: this.shopId
      }).then(res => {
        if (res.code === 0) {
          const types = []
          const goods = []
          for (const item of res.data) {
            if (item.goods.length > 0) {
              types.push({
                id: item.cid,
                name: item.cname
              })
              goods.push(...item.goods)
            }
          }
          let id = ''
          goods.forEach(i => {
            if (id !== i.cid) {
              id = i.cid
              i.aid = `g${i.cid}`
            } else {
              i.aid = ''
            }
          })
          this.current = goods[0].cid
          this.cateList = types
          this.goodsList = goods
          console.log('this.goodsList', this.goodsList)
          setTimeout(() => {
            this.getTopdis()
          }, 1000)
        }
      })
    },
    getLocation () {
      mpvue.getLocation({
        success: res => {
          this.lng = res.longitude
          this.lat = res.latitude
        },
        complete: res => {
          this.getStoreInfo()
        }
      })
    },
    getStoreInfo () {
      const _this = this
      getAction('/userapi/shop/show', {
        shop_id: _this.shopId,
        lng: this.lng,
        lat: this.lat
      }).then(res2 => {
        if (res2.code === 0) {
          // res2.data.word_status = 0
          _this.storeInfo = res2.data
          if (_this.storeInfo.word_status === 0 || _this.storeInfo.pause === 1) {
            if (_this.canShowClose) {
              _this.closeModalVisible = true
              store.commit('SET_CLOSESTATUS', false)
            }
          } else {
            _this.getPrize()
          }
        }
      })
    },
    getPrize () {
      getAction('/userapi/user/prize/index/data', {
        page: 1,
        limit: 20,
        status: 1
      }).then(res => {
        if (res.code === 0) {
          if (res.data.length > 0) {
            if (this.canShowPrize) {
              this.freeModalVisible = true
              store.commit('SET_PRIZESTATUS', false)
            }
            this.prizeData = res.data
          }
        }
      })
    },
    toggleCate (id) {
      this.current = id
      this.scrollKey = `g${id}`
    },
    getTopdis () {
      const query = mpvue.createSelectorQuery()
      query.select('#list').boundingClientRect()
      for (const i of this.cateList) {
        query.select(`#g${i.id}`).boundingClientRect()
      }
      query.selectViewport()
      query.exec(res => {
        console.log(res)
        const dis = []
        const top = res[0].top
        for (let i = 1; i < res.length; i++) {
          dis.push(res[i].top - top)
        }
        this.dis = dis
      })
      // 142 253 662 729 967 1301
    },
    onScroll (e) {
      const st = e.mp.detail.scrollTop
      const index = this.dis.findIndex(i => st <= i)
      this.current = this.cateList[index - 1].id
    },
    scrolltolower () {
      this.current = this.cateList[this.cateList.length - 1].id
    },
    goBack () {
      mpvue.navigateBack({
        delta: -1
      })
    },
    doCloseModal () {
      this.closeModalVisible = false
      this.closeHintVisible = true
    },
    giftChange (e) {
      this.priceIndex = e.mp.detail.current
    },
    doUse () {
      if (this.isAjax) return
      this.isAjax = true
      postAction('/userapi/shopping/card/add/prize', {
        shop_id: this.shopId,
        prize_qrcode_id: this.prizeData[this.priceIndex].id
      }).then(res => {
        if (res.code === 0) {
          mpvue.showToast({
            title: '添加成功'
          })
          this.getCart()
        }
        this.isAjax = false
        this.freeModalVisible = false
      })
    },
    openDetail (data) {
      if (this.storeInfo.word_status === 1) {
        this.$refs.detail.show(data)
      }
    },
    getCart () {
      getAction('/userapi/shopping/card/index/data', {
        shop_id: this.shopId,
        type: 1
      }).then(res => {
        if (res.code === 0) {
          this.cartsList = res.data
          let num = res.data.reduce((total, i) => total + i.buy_nums, 0)
          this.cartNum = num
          console.log('this.cartNum', this.cartNum)
          setTimeout(() => {
            console.log('addrData', this.addrData)
          }, 1000)
        }
      })
    },
    addCart (goods) {
      if (this.isAjax) return
      this.isAjax = true
      postAction('/userapi/shopping/card/store', {
        shop_id: this.shopId,
        type: 1,
        goods
      }).then(res => {
        if (res.code === 0) {
          mpvue.showToast({
            title: '添加成功'
          })
          this.getCart()
          this.$refs.detail.hide()
        }
        this.isAjax = false
      })
    },
    toStores () {
      const route = getCurrentPages()
      if (route.length === 1) {
        mpvue.switchTab({
          url: '/pages/stores/main'
        })
      } else {
        mpvue.navigateBack({
          delta: -1
        })
      }
    }
  },
  onShareAppMessage () {
    return {
      title: '饮茶有奖',
      path: `/pages/goods2/main?id=${this.shopId}`
    }
  },
  onShow () {
    if (this.$refs.top) {
      this.$refs.top.hideCarts()
    }
    if (this.$refs.detail) {
      this.$refs.detail.hide()
    }
  },
  onLoad (options) {
    console.log('goods onLoad', options)
    Object.assign(this.$data, this.$options.data())
    this.shopId = this.storeData.shop_id
    this.getAllData()
  }
}
</script>
