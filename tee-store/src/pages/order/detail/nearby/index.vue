<style scoped>

</style>

<template>
<div class="page">
  <c-header />
  <div class="container2 ovh order-detail">
    <div class="header between">
      <div class="f30">邮寄</div>
      <div class="flex">
        <button class="btn btn-style3 mr20">待发货</button>
        <button class="btn-circle btn-style1 mr20"><img src="/static/images/phone.png" mode="widthFix" class="w26"></button>
        <button class="btn-circle btn-style1"><img src="/static/images/icon-guide.png" mode="widthFix" class="w26"></button>
        <button class="btn-circle btn-style1" @click="openPost"><img src="/static/images/post.png" mode="widthFix" class="w34"></button>
        <button class="btn-circle btn-style1"><img src="/static/images/service.png" mode="widthFix" class="w26"></button>
      </div>
    </div>
    <div class="status-frame">
      <div class="mt20" v-if="false">
        <c-codes code="3910" />
      </div>
      <div class="mt60" v-if="false">
        <p class="f52 DinB tc">Finish</p>
        <p class="f52 tc">已完成</p>
      </div>
      <div class="form">
        <div class="form-line mb30">
          <div class="form-item">
            <input value="收件姓名" disabled />
          </div>
          <div class="form-item">
            <input value="联系电话" disabled />
          </div>
        </div>
        <div class="form-line mb30">
          <div class="form-item">
            <input value="选择 省份 / 市级 / 区" disabled />
          </div>
        </div>
        <div class="form-line">
          <div class="form-item">
            <input value="详细收件地址" disabled />
          </div>
        </div>
      </div>
      <div class="order-num">0016659884321</div>
    </div>
    <div class="body">
      <div class="c-goods-item mb60">
        <div class="imgs"><img src="/static/images/img2.png" mode="aspectFill" /></div>
        <div class="infos">
          <h3 class="title">[免费] 夏日特饮</h3>
          <div class="intro mt10">
            <span class="c-tag">粉色</span>
            <span class="c-tag">杯子+碟子</span>
          </div>
          <div class="price"><span>25</span>元</div>
          <div class="nums2">×1</div>
        </div>
      </div>
      <div class="c-goods-item mb60">
        <div class="imgs"><img src="/static/images/img2.png" mode="aspectFill" /></div>
        <div class="infos mt10">
          <h3 class="title">[免费] 夏日特饮</h3>
          <div class="intro">
            <span class="c-tag">粉色</span>
            <span class="c-tag">杯子+碟子</span>
          </div>
          <div class="price"><span>25</span>元</div>
          <div class="nums2">×1</div>
        </div>
      </div>
      <div class="borderB mb20 hr" style="margin-top: -20rpx; height: 1px;"></div>
      <div class="between">
        <div class="f24 ml10">邮费</div>
        <div class="price mr10"><span>45</span>元</div>
      </div>
      <div class="borderB mb30 hr mt20"></div>
      <div class="ml10 mr10">
        <div class="f24">备注</div>
        <div class="f20 lh150 c-c9">自带杯子，冰块单独打包。</div>
      </div>
      <div class="borderB hr mt30"></div>
      <div class="price tr mr10"><span>45</span>元</div>
      <div class="f20 c-c9 mr10 tr">共3件</div>
    </div>
  </div>

  <c-post ref="post" />

  <c-footer current="list" />
</div>
</template>

<script>
import cHeader from '@/components/header'
import cFooter from '@/components/footer'
import cCodes from '@/components/codes'
import cPost from './modules/post'
export default {
  components: {
    cHeader,
    cFooter,
    cCodes,
    cPost
  },
  data () {
    return {
      timer: ''
    }
  },

  methods: {
    openPost () {
      this.$refs.post.show()
    }
  },

  onLoad () {
    Object.assign(this.$data, this.$options.data())
  }
}
</script>
