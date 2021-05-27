<style scoped>
.nearby-container { min-height: calc(100vh - 260px); margin-top: 0; overflow: hidden; }
.details-content { margin: 20px 34px; }
</style>

<template>
<div class="page">
  <c-header />
  <div class="container" style="padding-bottom: 0;">
    <!-- 地址信息 -->
    <addr-info showCart showShare />
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
          <div class="tags">满400包邮</div>
          <div class="tags">预计3天发货</div>
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
        <button>加入购物车</button>
      </div>
    </div>

    <c-details ref="details" />
  </div>
</div>
</template>

<script>
import cHeader from '@/components/header'
import addrInfo from '@/components/addrInfo'
import cDetails from './modules/details'
export default {
  components: {
    cHeader,
    addrInfo,
    cDetails
  },
  data () {
    return {
    }
  },

  methods: {
    openDetail () {
      this.$refs.details.show()
    }
  },

  created () {
  }
}
</script>
