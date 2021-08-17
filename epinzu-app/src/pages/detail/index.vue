<template>
  <view class="Detail container">
    <!-- 顶部导航 -->
    <view class="Detail-header" id="header">
      <view class="tab-frame">
        <Tabs :value="tabKey" :list="tabs" :border="true" @change="tabChange" />
      </view>
      <view class="btns acenter">
        <button class="btn-cart" @tap="toCart">
          <image src="@/img/cart3.png" mode="widthFix" />
          <view v-if="cartNum > 0">{{cartNum}}</view>
        </button>
        <button class="btn-cart ml8" open-type="share">
          <image src="@/img/share.png" mode="widthFix" />
        </button>
      </view>
    </view>
    <!-- 轮播图 -->
    <banner :list="banners" :video="videos" />
    <!-- 商品信息 -->
    <infos @coupon="openCoupons"
           :record="record" />
    <!-- 价格信息 -->
    <view class="Detail-section" v-if="record.type === 1">
      <price-item v-for="item in attrs"
                  :key="item.id"
                  :record="item" />
    </view>
    <!-- 店铺信息 -->
    <stores :record="shop"
            :status="attentionStatus"
            @store="toStore"
            @attention="attention"
            v-if="false" />
    <!-- 租赁信息 -->
    <rents v-if="record.type === 1" />
    <!-- 常见问题 -->
    <questions :list="questions" />
    <!-- 常见问题 -->
    <params @params="$refs.paramsList.show()" :list="params" />
    <!-- 物品详情 -->
    <c-details :list="contents" />
    <!-- 相似物品 -->
    <guess-like class="mt24" :list="dataSource">
      <text slot="title">相似物品</text>
    </guess-like>
    <!-- 购买弹窗 -->
    <buys ref="buys" :record="record" @refresh="getCartNum" />
    <!-- 优惠券弹窗 -->
    <coupons ref="coupons" :list="couponList" @fetch="fetchCoupon" />
    <!-- 参数弹窗 -->
    <params-list ref="paramsList" :list="params" />
    <!-- 底部操作栏 -->
    <view class="footer-container Detail-footer">
      <view class="between ml12 mr20 btns">
        <button class="btn" @tap="toStore" v-if="false">
          <image src="@/img/store.png" mode="aspectFit" />
          <view>店铺</view>
        </button>
        <button class="btn" @tap="openSevice">
          <image src="@/img/service.png" mode="aspectFit" />
          <view>客服</view>
        </button>
        <button class="btn" @tap="collection">
          <image src="@/img/star1.png" mode="aspectFit" v-if="collectionStatus === 0" />
          <image src="@/img/star2.png" mode="aspectFit" v-else-if="collectionStatus === 1" />
          <view>收藏</view>
        </button>
      </view>
      <button class="c-btn"
              :class="{'c-btn-disabled': record.status === 1}"
              @tap="openBuys">立即下单</button>

      <view class="offline" v-if="record.status === 1">该商品已下架</view>
    </view>
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import './index.styl'
import banner from './modules/banner'
import infos from './modules/infos'
import priceItem from './modules/prices'
import stores from './modules/stores'
import rents from './modules/rents'
import questions from './modules/questions'
import params from './modules/params'
import cDetails from './modules/details'
import buys from './modules/buys'
import coupons from './modules/coupons'
import paramsList from './modules/paramsList'
import GuessLike from '@/c/common/GuessLike'
import Tabs from '@/c/common/Tabs'
import { getAction, postAction, intercept } from '@/utils/api'
import { pageMixin } from '@/mixins/pages'

export default {
  name: 'Detail',
  components: {
    banner,
    infos,
    priceItem,
    stores,
    rents,
    questions,
    params,
    cDetails,
    buys,
    coupons,
    paramsList,
    GuessLike,
    Tabs
  },
  computed: {
    lnglat () {
      return this.$store.state.lnglat
    },
    isLogin () {
      return this.$store.state.isLogin
    }
  },
  mixins: [pageMixin],
  data () {
    return {
      imgSrc: Taro.imgSrc,
      queryParams: {
        goods_id: ''
      },
      tabs: [
        { key: 'goods', label: '商品' },
        { key: 'params', label: '参数' },
        { key: 'details', label: '详情' }
      ],
      tabKey: 'goods',
      dis: {
        goods: 0,
        params: 0,
        details: 0
      },
      cartNum: 0,
      record: {},
      details: {},
      banners: [],
      videos: {},
      attrs: [],
      params: [],
      comments: [],
      couponList: [],
      questions: [],
      contents: [],
      shop: {},
      collectionStatus: 0,
      attentionStatus: 0,
      url: {
        list: '/userapi/goods/similar'
      }
    }
  },
  methods: {
    tm (e) {
      console.log('tm')
      e.stopPropagation()
      e.preventDefault()
    },
    // 导航点击
    tabChange (e) {
      this.tabKey = e
      Taro.pageScrollTo({
        scrollTop: this.dis[e]
      })
    },
    // 获取模块距顶距离
    getSectionDis () {
      const query = Taro.createSelectorQuery()
      query.select('#header').boundingClientRect()
      query.select('#params').boundingClientRect()
      query.select('#details').boundingClientRect()
      query.selectViewport().exec(res => {
        const h = res[0].height
        this.dis.params = parseInt(res[1].top - h)
        this.dis.details = parseInt(res[2].top - h)
      })
    },
    // 前往购物车
    toCart () {
      intercept(() => {
        Taro.navigateTo({
          url: '/pages/cart/index'
        })
      })
    },
    // 打开购买弹窗
    openBuys () {
      intercept(() => {
        if (this.record.status === 1) {
          return
        }
        this.$refs.buys.show()
      })
    },
    // 打开优惠券弹窗
    openCoupons () {
      intercept(() => {
        this.getCoupons()
        this.$refs.coupons.show()
      })
    },
    // 领取优惠券
    fetchCoupon (id) {
      postAction('/userapi/coupon/fetch', {
        goods_id: this.queryParams.goods_id,
        coupon_id: id
      }).then(res => {
        if (res.code === 0) {
          Taro.showToast({
            title: res.msg
          })
          this.getCoupons()
        }
      })
    },
    // 获取商品详情
    getData () {
      getAction('/userapi/goods/detail', {
        goods_id: this.queryParams.goods_id,
        ...this.lnglat
      }, false).then(res => {
        if (res.code === 0) {
          this.record = res.data
          this.details = res.data.detail
          this.banners = res.data.detail.images
          this.videos = {
            url: res.data.detail.video_url,
            cover: res.data.detail.video_cover
          }
          this.attrs = res.data.attrs
          this.params = res.data.params
          this.comments = res.data.comments
          this.questions = res.data.questions
          this.contents = res.data.detail.content
          this.shop = res.data.shop
          this.$store.commit('SET_QUESLIST', res.data.questions)

          if (this.isLogin) {
            this.getAttentionStatus()
          }
        } else if (res.code === 2) {
          Taro.redirectTo({
            url: '/pages/none/index'
          })
        } else {
          Taro.showToast({
            title: res.msg
          })
        }
      })
    },
    // 获取购物车数量
    getCartNum () {
      if (this.isLogin) {
        getAction('/userapi/shopping/counts').then(res => {
          if (res.code === 0) {
            this.cartNum = res.data
          }
        })
      }
    },
    // 获取商品中的优惠券
    getCoupons () {
      getAction('/userapi/goods/coupons/has', {
        goods_id: this.queryParams.goods_id
      }).then(res => {
        if (res.code === 0) {
          console.log('this.couponList', this.couponList)
          this.couponList = res.data
        }
      })
    },
    // 进入店铺首页
    toStore () {
      Taro.navigateTo({
        url: `/pages/store/index?id=${this.record.shop_id}`
      })
    },
    // 关注店铺
    attention () {
      intercept(() => {
        postAction('/userapi/user/attention', {
          shop_id: this.record.shop_id,
          action: this.attentionStatus === 0 ? 1 : 0
        }).then(res => {
          if (res.code === 0) {
            Taro.showToast({
              title: res.msg
            })
            this.getAttentionStatus()
          }
        })
      })
    },
    // 收藏
    collection () {
      intercept(() => {
        postAction('/userapi/user/collection', {
          goods_id: this.queryParams.goods_id,
          action: this.collectionStatus === 0 ? 1 : 0
        }).then(res => {
          if (res.code === 0) {
            Taro.showToast({
              title: res.msg
            })
            this.getCollectionStatus()
          }
        })
      })
    },
    // 打开客服
    openSevice () {
      intercept(() => {
        Taro.showToast({
          title: '打开客服'
        })
      })
    },
    // 判断是否收藏商品
    getCollectionStatus () {
      getAction('/userapi/user/collection', {
        goods_id: this.queryParams.goods_id
      }).then(res => {
        if (res.code === 0) {
          this.collectionStatus = res.data
        }
      })
    },
    // 判断是否关注店铺
    getAttentionStatus () {
      getAction('/userapi/user/attention', {
        shop_id: this.record.shop_id
      }).then(res => {
        if (res.code === 0) {
          this.attentionStatus = res.data
        }
      })
    }
  },
  onShow () {
    this.getData()
    this.getCartNum()
    setTimeout(() => {
      this.getSectionDis()
    }, 1000)
  },
  onPageScroll (e) {
    const st = e.scrollTop
    if (st < this.dis.params) {
      this.tabKey = 'goods'
    }
    if (st >= this.dis.params) {
      this.tabKey = 'params'
    }
    if (st >= this.dis.details) {
      this.tabKey = 'details'
    }
  },
  onShareAppMessage () {
    let desc
    if (this.record.type === 1) {
      desc = `租金：${this.record.price_min}/天，押金：${this.record.deposit_min}元，`
    } else {
      desc = `售价：${this.record.price_min}，`
    }
    desc += '有更多五金工具、平板、电脑、手机、打印机、复印机、投影仪等欢迎你租用。'
    return {
      title: this.record.title,
      desc,
      imageUrl: `${this.imgSrc}${this.record.cover}`,
      bgImgUrl: `${this.imgSrc}${this.banners[0]}`,
      path: `/pages/detail/index?id=${this.queryParams.goods_id}`
    }
  },
  onLoad (options) {
    // options.id = 213
    this.queryParams.goods_id = options.id || 94
    if (this.isLogin) {
      this.getCollectionStatus()
    }
  }
}
</script>
