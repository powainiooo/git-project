<style scoped>
.nearby-container { min-height: calc(100vh - 260px); margin-top: 0; overflow: hidden; }
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
      </div>
    </div>
  </div>
  <c-footer current="order" />
</div>
</template>

<script>
import cHeader from '@/components/header'
import cFooter from '@/components/footer'
import addrInfo from '@/components/addrInfo'
export default {
  components: {
    cHeader,
    cFooter,
    addrInfo
  },
  data () {
    return {
    }
  },

  methods: {
  },

  created () {
  }
}
</script>
