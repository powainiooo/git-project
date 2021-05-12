<style>
.goods-container2 { width: 565px; height: calc(100vh - 260px); margin-top: 0; margin-left: 160px; overflow-x: hidden; overflow-y: auto; padding-bottom: 0; }
.goods-container2 .list { margin: 0 32px; padding-bottom: 170px; }
.goods-container2 .list .c-goods-item { margin-bottom: 30px; padding-top: 30px; }
.goods-container2 .list .slideUp:nth-child(2) { animation-delay: .2s; }
.goods-container2 .list .slideUp:nth-child(3) { animation-delay: .4s; }
.goods-container2 .list .slideUp:nth-child(4) { animation-delay: .6s; }
.goods-container2 .list .slideUp:nth-child(5) { animation-delay: .8s; }

.close-hint { width: 100%; height: 280px; background-color: rgba(122, 115, 108, 0.95); position: fixed; left: 0; bottom: 0; z-index: 200; color: #FFFFFF; }
.close-hint div { font-size: 24px; line-height: 24px; text-align: center; margin-top: 24px; margin-bottom: 6px; }
.close-hint p { font-size: 20px; line-height: 26px; text-align: center; }
</style>

<template>
<div class="page">
  <c-header storeLogo="/static/images/logo2.png" />
  <div class="container" style="padding-bottom: 0;">
    <!-- 地址信息 -->
    <div class="addr-info">
      <div class="between">
        <button class="btn">
          <span>喜茶·深圳宝安大仟里店</span>
          <img src="/static/images/arrow1.png" mode="widthFix" class="w10 ml20" />
        </button>
        <div class="acenter">
          <button class="btn-circle btn-cart">
            <img src="/static/images/icon-cart.png" mode="widthFix" class="w32" />
            <span class="nums">10</span>
          </button>
          <button class="btn-circle ml20" open-type="share"><img src="/static/images/icon-share.png" mode="widthFix" class="w28" /></button>
        </div>
      </div>
      <div class="dis">距离你1km</div>
    </div>

    <!-- 产品信息 -->
    <div class="pr">
      <cates :list="cateList" :current="current" @toggle="toggleCate" />
      <scroll-view
        class="container2 goods-container2"
        :scroll-into-view="scrollKey"
        @scroll="onScroll"
        scroll-with-animation
        scroll-y>
        <div class="list">
          <div class="slideUp" v-for="i in goodsList" :key="id" :id="i.aid">
            <item :record="i" :disabled="!closeModalVisible && !closeHintVisible" />
          </div>
        </div>
      </scroll-view>
    </div>
  </div>

  <!-- 关门弹窗 -->
  <div class="c-modal" v-if="closeModalVisible">
    <div class="c-modal-box">
      <img src="/static/images/bg.png" class="bg" />
      <div class="pr">
        <div class="line1 center">
          <div class="txt1">CLOSED</div>
        </div>
        <div class="title">本店休息中，请切换其他门店</div>
        <div class="desc">营业时间为10:00 ~ 22:00，目前时段已打烊，期待您的光临。</div>
        <div class="center">
          <button class="btn btn-style1" @click="goBack">切换门店</button>
          <button class="btn btn-style2" @click="doCloseModal">留在当前</button>
        </div>
      </div>
      <a href="javascript:;" class="close center" @click="doCloseModal"><img src="/static/images/x2.png" mode="widthFix" class="w18" /></a>
    </div>
  </div>

  <!-- 关门提示 -->
  <div class="close-hint" v-if="closeHintVisible">
    <div>本店休息中，请切换其他门店</div>
    <p>营业时间为10:00 ~ 22:00</p>
  </div>

  <!-- 免费弹窗 -->
  <div class="c-modal" v-if="freeModalVisible">
    <div class="c-modal-box">
      <img src="/static/images/bg.png" class="bg" />
      <div class="pr">
        <div class="line1 center">
          <div class="imgs"><img src="/static/images/img2.png" mode="aspectFill" /></div>
          <img src="/static/images/free@2x.png" mode="widthFix" class="free" />
        </div>
        <div class="title">[免费] 夏日特饮</div>
        <div class="desc">需任意消费后可使用，点击立即加入购物车。有效期 至 2021/04/01</div>
        <div class="center">
          <button class="btn btn-style1" @click="doUse">立即使用</button>
          <button class="btn btn-style2" @click="freeModalVisible = false">暂不使用</button>
        </div>
      </div>
      <a href="javascript:;" class="close center" @click="freeModalVisible = false"><img src="/static/images/x2.png" mode="widthFix" class="w18" /></a>
    </div>
  </div>

  <c-footer current="order" />
</div>
</template>

<script>
import cHeader from '@/components/header'
import cFooter from '@/components/footer'
import cates from './modules/cates'
import item from './modules/item'
import {types, goods} from './modules/datas'
import store from '../../store'
export default {
  components: {
    cHeader,
    cFooter,
    cates,
    item
  },
  data () {
    return {
      current: 0,
      scrollKey: '',
      cateList: [],
      goodsList: [],
      closeModalVisible: false,
      closeHintVisible: false,
      freeModalVisible: false
    }
  },
  computed: {
    iH () { // 单个商品高度
      const ww = store.state.sysInfo.windowWidth || 375
      return parseInt(ww * 0.2933)
    }
  },
  methods: {
    getData () {
      setTimeout(() => {
        this.cateList = types
        this.goodsList = goods
        let id = ''
        this.goodsList.forEach(i => {
          if (id !== i.typeId) {
            id = i.typeId
            i.aid = `g${i.typeId}`
          } else {
            i.aid = ''
          }
        })
        this.current = this.goodsList[0].typeId
      }, 500)
    },
    toggleCate (id) {
      this.current = id
      this.scrollKey = `g${id}`
    },
    onScroll (e) {
      const index = parseInt(e.mp.detail.scrollTop / this.iH)
      this.current = this.goodsList[index].typeId
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
    doUse () {
      this.freeModalVisible = false
    }
  },
  onShareAppMessage () {
    return {
      title: 'HEYTEA',
      path: `/pages/goods/main`
    }
  },
  onLoad () {
    this.getData()
  }
}
</script>
