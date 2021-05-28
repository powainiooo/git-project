<style scoped>

</style>

<template>
<div class="page">
  <c-header />
  <div class="mt100">
    <addr-info />
  </div>
  <div class="container2 ovh order-confirm" style="margin-top: 0;">
    <div class="bg-fff top-line">
      <div class="flex">
        <div style="flex: 1;">
          <p class="form-title ml15">联系电话</p>
          <div class="form-line">
            <div class="form-item">
              <input value="19893998969" class="large" />
            </div>
          </div>
        </div>
        <button class="btn btn-style1">自动填写</button>
      </div>
    </div>

    <div class="frame">
      <div class="c-goods-item mb60">
        <div class="imgs"><img src="/static/images/img2.png" mode="aspectFill" /></div>
        <div class="infos">
          <h3 class="title">[免费] 夏日特饮</h3>
          <div class="intro">温、少冰、五分糖</div>
          <div class="price"><span>25</span>元</div>
          <div class="nums2">×1</div>
        </div>
      </div>
      <div class="c-goods-item mb60">
        <div class="imgs"><img src="/static/images/img2.png" mode="aspectFill" /></div>
        <div class="infos">
          <h3 class="title">[免费] 夏日特饮</h3>
          <div class="intro">温、少冰、五分糖</div>
          <div class="price"><span>25</span>元</div>
          <div class="nums2">×1</div>
        </div>
      </div>

      <div class="borderB mb30" style="margin-top: -20rpx; height: 1px;"></div>

      <div class="mt30 mb30 between">
        <p class="f24 ml30">打包带走</p>
        <div class="acenter">
          <p class="c-c9 f20">将提前为您打包好</p>
        </div>
      </div>

      <div class="reduce-item mb30">
        <img src="/static/images/bg2.png" mode="widthFix" class="bg" />
        <div class="between reduce-item-box">
          <p class="f24 ml30">优惠券</p>
          <div class="price"><span>-5</span>元</div>
        </div>
      </div>

      <div class="reduce-item mb30">
        <img src="/static/images/bg2.png" mode="widthFix" class="bg" />
        <div class="between reduce-item-box">
          <div class="ml30">
            <p class="f24">使用积分</p>
            <p class="f20 c-c9">100积分=1元，单次最多可用500积分</p>
          </div>
          <div class="price"><span>-5</span>元</div>
        </div>
      </div>

      <div class="ml30 mb10">备注</div>
      <c-textarea />
    </div>

    <div class="footer-btns">
      <div class="l center">
        <div class="price"><span>50</span>元</div>
      </div>
      <div class="r">
        <button>支付</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import cHeader from '@/components/header'
import addrInfo from '@/components/addrInfo'
import cTextarea from '@/components/cTextarea'
export default {
  components: {
    cHeader,
    addrInfo,
    cTextarea
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
