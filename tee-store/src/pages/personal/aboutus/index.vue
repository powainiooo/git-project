<style scoped>
.addr-container { min-height: calc(100vh - 104px); background-color: #ffffff; overflow: hidden; padding-bottom: 20px; }
.addr-container .header { height: 122px; background-color: #F9F9F9; padding: 0 40px; box-shadow: 0px 3px 20px 0px rgba(0, 0, 0, 0.08); }
.addr-container .icon { width: 44px; height: 35px; }
.addr-container .btn { width: 200px; font-family: DinL; font-size: 25px; }
</style>

<template>
<div class="page">
  <c-header />
  <div class="container2 addr-container">
    <div class="header between mb60">
      <span class="f30">关于无事干杯</span>
    </div>
    <div class="ml60 mr60">
      <div class="f30 mb35">商务合作</div>
      <div class="acenter mb40">
        <img src="/static/images/wechat.png" mode="aspectFit" class="icon mr35" />
        <button class="btn btn-style1" hover-class="hscale" hover-stay-time="10" @click="copy(record.buesiness_weixin_no)">{{record.buesiness_weixin_no}}</button>
      </div>
      <div class="acenter mb65">
        <img src="/static/images/phone2.png" mode="aspectFit" class="icon mr35" />
        <button class="btn btn-style1" hover-class="hscale" hover-stay-time="10" @click="copy(record.buesiness_phone)">{{record.buesiness_phone}}</button>
      </div>
      <div class="borderB hr mb65"></div>
      <div class="f30 mb35">联系客服</div>
      <div class="acenter mb40">
        <img src="/static/images/wechat.png" mode="aspectFit" class="icon mr35" />
        <button class="btn btn-style1" hover-class="hscale" hover-stay-time="10" @click="copy(record.service_weixin_no)">{{record.service_weixin_no}}</button>
      </div>
      <div class="acenter mb65">
        <img src="/static/images/phone2.png" mode="aspectFit" class="icon mr35" />
        <button class="btn btn-style1" hover-class="hscale" hover-stay-time="10" @click="copy(record.service_phone)">{{record.service_phone}}</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import cHeader from '@/components/header'
import {getAction} from '../../../utils/api'
export default {
  components: {
    cHeader
  },
  data () {
    return {
      record: {}
    }
  },

  methods: {
    getData () {
      getAction('/userapi/config').then(res => {
        if (res.code === 0) {
          this.record = res.data
        }
      })
    },
    copy (str) {
      mpvue.setClipboardData({
        data: str,
        success (res) {
          console.log('setClipboardData', res)
        }
      })
    }
  },

  onLoad () {
    this.getData()
  }
}
</script>
