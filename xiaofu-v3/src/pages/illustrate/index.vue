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
      <button
        hover-class="hscale"
        hover-stay-time="10"
        @click="doCopy(wx1)">{{wx1}}</button>
    </div>
  </div>
  <div class="contact">
    <h3>售后及服务<span>After sales & service</span></h3>
    <div>
      <img src="/static/images/common/icon-wechat.png" />
      <button
        hover-class="hscale"
        hover-stay-time="10"
        @click="doCopy(wx2)">{{wx2}}</button>
    </div>
  </div>
  </template>
</div>
</template>

<script>
import cHeader from '@/components/header/header'
import store from '@/store'
export default {
  data () {
    return {
      source: '',
      contents: '',
      wx1: '',
      wx2: ''
    }
  },
  components: {
    cHeader
  },
  computed: {
    configData () {
      return store.state.configData
    }
  },

  methods: {
    doCopy (text) {
      mpvue.setClipboardData({
        data: text,
        success (res) {
          mpvue.showToast({
            title: '复制成功'
          })
        }
      })
    }
  },

  onLoad (option) {
    // let app = getApp()
    this.source = option.source || 'contact'
    if (this.source === 'member') {
      this.contents = this.configData.belongs_to
    } else if (this.source === 'aftersales') {
      this.contents = this.configData.after_sales
    } else if (this.source === 'contact') {
      let contact = this.configData.contact.split('；')
      this.wx1 = contact[0].split('：')[1]
      this.wx2 = contact[2].split('：')[1]
    }
  }
}
</script>
