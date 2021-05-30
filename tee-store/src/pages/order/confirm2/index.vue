<style scoped>

</style>

<template>
<div class="page">
  <c-header />
  <div class="container2 pt20 order-confirm">
    <tabs @change="tabChange">
      <tab-pane name="post" title="邮寄">
        <div class="bg-fff top-line">
          <div class="form-line mb30">
            <div class="form-item">
              <input placeholder="收件姓名" />
            </div>
            <div class="form-item">
              <input placeholder="联系电话" />
            </div>
          </div>
          <div class="form-line mb30">
            <div class="form-item">
              <input placeholder="选择 省份 / 市级 / 区" disabled />
              <img src="/static/images/arrow3.png" class="arrow3" mode="widthFix" />
            </div>
          </div>
          <div class="form-line">
            <div class="form-item">
              <input placeholder="详细收件地址" />
            </div>
          </div>
        </div>
      </tab-pane>
      <tab-pane name="store" title="门店自提">
        <div class="bg-fff top-line">
          <div class="addr-info" style="margin-left: 0; margin-right: 0;">
            <div class="between">
              <button class="btn" style="width: auto; margin-left: 0; margin-top: 0;">
                <span>喜茶·深圳宝安大仟里店</span>
                <img src="/static/images/arrow1.png" mode="widthFix" class="w10 ml20" />
              </button>
              <div class="dis">距离你1km</div>
            </div>
          </div>
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
      </tab-pane>
    </tabs>

    <div class="frame">
      <div class="c-goods-item mb60">
        <div class="imgs"><img src="/static/images/img2.png" mode="aspectFill" /></div>
        <div class="infos">
          <h3 class="title">[免费] 夏日特饮</h3>
          <div class="intro">
            <span class="c-tag">粉色</span>
            <span class="c-tag">杯子+碟子</span>
          </div>
          <div class="price"><span>25</span>元</div>
          <div class="nums2">×1</div>
        </div>
      </div>

      <div class="borderB mb30" style="margin-top: -20rpx; height: 1px;"></div>

      <template v-if="tab === 'post'">
      <div class="mt30 mb30 between">
        <p class="f24 ml30">打包带走</p>
        <div><span class="f54 DinB">15</span>元</div>
      </div>

      <div class="borderB mb30 hr"></div>
      </template>

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
import tabs from '@/components/Tabs/tabs'
import tabPane from '@/components/Tabs/tabPane'
import cTextarea from '@/components/cTextarea'
export default {
  components: {
    cHeader,
    tabs,
    tabPane,
    cTextarea
  },
  data () {
    return {
      show: false,
      tab: 'post'
    }
  },

  methods: {
    tabChange (e) {
      this.tab = e
    }
  },

  onLoad () {
    setTimeout(() => {
      this.show = true
    }, 2000)
  }
}
</script>
