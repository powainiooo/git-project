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
      <div class="title"><span>{{record.score.score}}</span>积分</div>
      <p>{{record.score.content}}</p>
    </div>
    <div class="line1 pr" v-else-if="key === 'coupon'">
      <img src="/static/images/bg.png" mode="widthFix" class="bg" />
      <div class="icon2">
        <img src="/static/images/index/coupon.png" mode="widthFix" class="w100" />
      </div>
      <div class="title"><span>{{record.coupon.money}}</span>元代金券</div>
      <p>仅可用于周边商品，满{{record.coupon.condition}}元可用。有效期 至 {{record.coupon.expired}}</p>
    </div>
    <div class="line1 pr" v-else-if="key === 'gift'">
      <img src="/static/images/bg.png" mode="widthFix" class="bg" />
      <div class="icon3 center">
        <div class="imgs"><img :src="imgSrc + record.gift.cover" mode="aspectFill" /></div>
        <img src="/static/images/free@2x.png" mode="widthFix" class="free" />
      </div>
      <div class="title">{{record.gift.title}}</div>
      <p>需任意消费后可使用，点击立即加入购物车。有效期 至 {{record.gift.expired}}</p>
    </div>

    <div>
      <div class="acenter mt50 ml50">
        <img src="/static/images/index/icon1.png" mode="widthFix" class="w28 mr15" />
        <span class="f30">兑换好礼</span>
      </div>
      <goods-list />
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
      record: {
        score: {},
        coupon: {},
        gift: {}
      },
      isAjax: false
    }
  },

  methods: {
    getData () {
      getAction(this.url[this.key], {
        code: this.code
      }).then(res => {
        if (res.code === 0) {
          this.record[this.key] = res.data
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
          mpvue.navigateTo({
            url: '/pages/index/main?key=' + this.key
          })
        }
      })
    }
  },

  onLoad (options) {
    this.key = options.key
    this.code = options.code
    this.getData()
  }
}
</script>
