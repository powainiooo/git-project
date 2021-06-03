<style scoped>
.nearby-container { min-height: calc(100vh - 260px); margin-top: 0; overflow: hidden; }
.details-content { margin: 20px 34px; }
</style>

<template>
<div class="page">
  <c-header />
  <div class="container" style="padding-bottom: 0;">
    <!-- 地址信息 -->
    <addr-info showCart showShare showService :record="addrData"  />

    <div class="container2 nearby-container">
      <div class="nearby-goods-detail">
        <img src="/static/images/img.jpg" mode="aspectFill" class="bg" />
        <div class="between">
          <div class="title">时空穿越小熊飞碟款 双层玻璃杯盘组</div>
          <div class="prices">
            <p>100元</p>
            <div class="acenter">
              <img src="/static/images/jfh.png" mode="widthFix" />
              <div><span>90</span>元</div>
            </div>
          </div>
        </div>
        <div class="flex mt30 ml35">
          <div class="c-tag">满400包邮</div>
          <div class="c-tag">预计3天发货</div>
        </div>
      </div>
      <div class="details-content">
        <div class="borderB mb40 hr"></div>
        <div>详情</div>
      </div>
    </div>

    <div class="footer-btns">
      <div class="r">
        <button class="style1" @click="openDetail">立即购买</button>
      </div>
      <div class="r">
        <button @click="openDetail">加入购物车</button>
      </div>
    </div>

    <c-details ref="details" :record="record" />
  </div>
</div>
</template>

<script>
import cHeader from '@/components/header'
import addrInfo from '@/components/addrInfo'
import cDetails from './modules/details'
import { getAction } from '@/utils/api'
export default {
  components: {
    cHeader,
    addrInfo,
    cDetails
  },
  computed: {
    addrData () {
      return {
        cartNum: this.cartNum,
        cartType: 2
      }
    }
  },
  data () {
    return {
      imgSrc: mpvue.imgSrc,
      id: '',
      record: {},
      cartNum: 0
    }
  },

  methods: {
    openDetail () {
      this.$refs.details.show()
    },
    getData () {
      getAction('xxxx', {
        id: this.id
      }).then(res => {
        if (res.code === 0) {
          this.record = res.data
        }
      })
    },
    getCart () {
      getAction('/userapi/shopping/card/count', {
        type: 2
      }).then(res => {
        if (res.code === 0) {
          this.cartNum = res.data.count
        }
      })
    }
  },

  onLoad (options) {
    this.id = options.id
    this.getData()
  }
}
</script>
