<style scoped>
.titles {
  height: 120px;
  display: flex;
  align-items: center;
  margin: 130px 25px 42px 25px;
}
.titles img {
  margin-right: 32px;
  margin-left: 32px;
}
.titles h3 {
  font-size: 32px;
  line-height: 48px;
}
.titles h3 p.en {
  font-size: 24px;
  color: #9E9E9F;
  line-height: 29px;
}
.content {
  width: 580px;
  margin: 0 auto 50px auto;
  font-size: 20px;
  color: #9E9E9F;
  line-height: 30px;
}
.contact {
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 52px;
  position: relative;
}
.contact h3 {
  font-size: 20px;
  margin-bottom: 32px;
}
.contact h3 span {
  color: #9E9E9F;
  font-family: HelveL;
  margin-left: 10px;
}
.contact div {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.contact div img {
  width: 48px;
  height: 40px;
}
.contact div button {
  border-radius: 16px;
  padding: 8px 38px;
  background: linear-gradient(353deg, #00903A 0%, #1DAA38 100%);
  font-size: 20px;
  color: #ffffff;
}
</style>

<template>
<div>
  <c-header onlyLogo />
  <template v-if="source === 'aftersales'">
  <div class="titles bBorder">
    <img src="/static/images/menu/icon3.png" mode="widthFix" style="width: 48rpx;" />
    <h3>
      <p>售后声明</p>
      <p class="en">After sales</p>
    </h3>
  </div>
  <div class="content">
    <rich-text :nodes="contents"></rich-text>
  </div>
  </template>
  <template v-else-if="source === 'member'">
  <div class="titles bBorder">
    <img src="/static/images/menu/icon2.png" mode="widthFix" style="width: 80rpx;" />
    <h3>
      <p>隶属于</p>
      <p class="en">Member of HO</p>
    </h3>
  </div>
  <div class="content">
    <rich-text :nodes="contents"></rich-text>
  </div>
  </template>
  <template v-else-if="source === 'contact'">
  <div class="titles bBorder">
    <img src="/static/images/menu/icon4.png" mode="widthFix" style="width: 70rpx;" />
    <h3>
      <p>联系</p>
      <p class="en">Contact</p>
    </h3>
  </div>
  <div class="contact bBorder">
    <h3>票务合作<span>Ticketing cooperation</span></h3>
    <div>
      <img src="/static/images/common/icon-wechat.png" />
      <button>Lee910123</button>
    </div>
  </div>
  <div class="contact">
    <h3>售后及服务<span>After sales & service</span></h3>
    <div>
      <img src="/static/images/common/icon-wechat.png" />
      <button>leesticketaftersales</button>
    </div>
  </div>
  </template>
</div>
</template>

<script>
import cHeader from '@/components/header/header'
export default {
  data () {
    return {
      source: '',
      contents: ''
    }
  },

  components: {
    cHeader
  },

  methods: {
  },

  onLoad (option) {
    // let app = getApp()
    this.source = option.source || 'contact'
  }
}
</script>
