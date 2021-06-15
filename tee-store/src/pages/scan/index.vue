<style scoped>
.scan-container { min-height: calc(100vh - 104px); }
.scan-container .line1 { width: 100%; height: 490px; box-shadow: 0px 3px 20px 0px rgba(0, 0, 0, 0.08); overflow: hidden; margin-bottom: 50px; }
.scan-container .line1 .bg { width: 100%; position: absolute; top: -10px; right: -6px; z-index: 0; }
.scan-container .line1 .icon1 { width: 134px; margin: 140px auto 25px auto; }
.scan-container .line1 .icon2 { width: 205px; margin: 130px auto 15px auto; }
.scan-container .line1 .icon3 { height: 160px; margin: 130px 0 40px 0; position: relative; }
.scan-container .line1 .icon3 .free { width: 274px; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); }
.scan-container .line1 .title { font-size: 30px; text-align: center; margin-bottom: 10px; }
.scan-container .line1 .title span { font-size: 48px; font-family: DinL; }
.scan-container .line1 p { width: 400px; margin: 0 auto; font-size: 20px; color: #C9C9C9; line-height: 26px; }
</style>

<template>
<div class="page">
  <c-header />
  <div class="container2 scan-container">
    <div class="line1 pr" v-if="key === 'score'">
      <img src="/static/images/bg.png" mode="widthFix" class="bg" />
      <div class="icon1">
        <img src="/static/images/icon1.png" mode="widthFix" class="w100" />
      </div>
      <div class="title"><span>{{score.score}}</span>积分</div>
      <p>{{score.content}}</p>
    </div>
    <div class="line1 pr" v-else-if="key === 'coupon'">
      <img src="/static/images/bg.png" mode="widthFix" class="bg" />
      <div class="icon2">
        <img src="/static/images/index/coupon.png" mode="widthFix" class="w100" />
      </div>
      <div class="title"><span>{{coupon.money}}</span>元代金券</div>
      <p>需任意消费后可使用，点击立即加入购物车。<br/>有效期 至 {{coupon.expired}}</p>
    </div>
    <div class="line1 pr" v-else-if="key === 'gift'">
      <img src="/static/images/bg.png" mode="widthFix" class="bg" />
      <div class="icon3 center">
        <div class="imgs"><img :src="imgSrc + gift.cover" mode="aspectFill" /></div>
        <img src="/static/images/free@2x.png" mode="widthFix" class="free" />
      </div>
      <div class="title">{{gift.title}}</div>
      <p>需任意消费后可使用，点击立即加入购物车。有效期 至 {{gift.expired}}</p>
    </div>

    <div>
      <div class="acenter mt50 ml50">
        <img src="/static/images/index/icon1.png" mode="widthFix" class="w28 mr15" />
        <span class="f30">附近门店</span>
      </div>
      <div>
        <goods-list :list="goodsList" />
      </div>
    </div>

    <div class="footer-btns">
      <div class="r">
        <button @click="handleGet">免费领取</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import cHeader from '@/components/header'
import goodsList from '@/components/goodsList'
import { getAction, postAction } from '@/utils/api'

export default {
  components: {
    cHeader,
    goodsList
  },
  data () {
    return {
      imgSrc: mpvue.imgSrc,
      key: 'gift',
      code: '',
      url: {
        score: '/userapi/user/score/fetch',
        coupon: '/userapi/user/coupon/fetch',
        gift: '/userapi/user/prize/fetch'
      },
      goodsList: [],
      score: {},
      coupon: {},
      gift: {},
      isAjax: false
    }
  },

  methods: {
    getData () {
      getAction(this.url[this.key], {
        code: this.code
      }).then(res => {
        if (res.code === 0) {
          this[this.key] = res.data
          console.log('this.record', this.record)
        }
      })
    },
    getGoodsList () {
      getAction('/userapi/nearby/index/data', {
        cid: 0,
        recommend: 1,
        page: this.page,
        limit: 20
      }).then(res => {
        if (res.code === 0) {
          this.goodsList = res.data
        }
      })
    },
    handleGet () {
      if (this.isAjax) return
      this.isAjax = true
      postAction(this.url[this.key], {
        code: this.code
      }).then(res => {
        this.isAjax = false
        if (res.code === 0) {
          mpvue.showToast({
            title: res.msg
          })
          setTimeout(() => {
            mpvue.redirectTo({
              url: '/pages/index/main?key=' + this.key
            })
          }, 1000)
        }
      })
    }
  },

  onLoad (options) {
    this.key = options.key || 'gift'
    this.code = options.code || 'aaf94de5a24f650afc5c9fff83'
    this.getData()
    this.getGoodsList()
  }
}
</script>
