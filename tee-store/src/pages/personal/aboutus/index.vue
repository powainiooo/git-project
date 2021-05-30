<style scoped>
.addr-container { min-height: calc(100vh - 104px); background-color: #ffffff; overflow: hidden; padding-bottom: 20px; }
.addr-container .header { height: 122px; background-color: #F9F9F9; padding: 0 40px; box-shadow: 0px 3px 20px 0px rgba(0, 0, 0, 0.08); }
.addr-container .icon { width: 44px; height: 35px; }
.addr-container .btn { width: 200px; }
</style>

<template>
<div class="page">
  <c-header />
  <div class="container2 addr-container">
    <div class="header between mb60">
      <span class="f30">收货地址</span>
    </div>
    <div class="ml60 mr60">
      <div class="f30 mb35">商务合作</div>
      <div class="acenter mb40">
        <img src="/static/images/wechat.png" mode="aspectFit" class="icon mr35" />
        <button class="btn btn-style1">wushiganbei</button>
      </div>
      <div class="acenter mb65">
        <img src="/static/images/phone2.png" mode="aspectFit" class="icon mr35" />
        <button class="btn btn-style1">wushiganbei</button>
      </div>
      <div class="borderB hr mb65"></div>
      <div class="f30 mb35">联系客服</div>
      <div class="acenter mb40">
        <img src="/static/images/wechat.png" mode="aspectFit" class="icon mr35" />
        <button class="btn btn-style1">wushiganbei</button>
      </div>
      <div class="acenter mb65">
        <img src="/static/images/phone2.png" mode="aspectFit" class="icon mr35" />
        <button class="btn btn-style1">wushiganbei</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import cHeader from '@/components/header'
export default {
  components: {
    cHeader
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
