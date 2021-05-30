<style scoped>
.addr-item { padding-top: 30px; overflow: hidden; position: relative; }
.addr-box { border-radius: 35px 35px 0 0; box-shadow: 0px 3px 30px 0px rgba(0, 0, 0, 0.1); margin: 0 32px; background-color: #F9F9F9; overflow: hidden; }
.addr-box .header { height: 94px; background-color: #EDECEB; padding: 0 35px; }
.addr-box .body { padding: 30px 35px 0 35px; }
.addr-item .sd { width: 100%; position: absolute; left: 0; bottom: 0; }
</style>

<template>
<div class="addr-item">
  <div class="addr-box">
    <div class="header between">
      <div class="acenter">
        <img src="/static/images/radio.png" mode="widthFix" class="w30" />
        <span class="f20 c-9e ml10">设为默认地址</span>
      </div>
      <div class="flex">
        <button class="btn-circle btn-style1 mr20"><img src="/static/images/edit.png" mode="widthFix" class="w26" /></button>
        <button class="btn-circle btn-style1"><img src="/static/images/del.png" mode="widthFix" class="w24" /></button>
      </div>
    </div>
    <div class="body">
      <div class="form-line mb35">
        <div class="form-item">
          <span class="f30 ml15">赵小姐</span>
        </div>
        <div class="form-item">
          <span class="f36 DinL ml15">19893998969</span>
        </div>
      </div>
      <div class="form-line mb35">
        <div class="form-item">
          <span class="f24 ml15">广东省 / 深圳市 / 宝安区</span>
        </div>
      </div>
      <div class="form-line mb35">
        <div class="form-item">
          <span class="f24 ml15">新安街道新安六路众里创业社</span>
        </div>
      </div>
    </div>
  </div>
  <img src="/static/images/sd1.png" class="sd" mode="widthFix" />
</div>
</template>

<script type='es6'>
export default {
  name: 'app',
  data () {
    return {}
  },
  methods: {}
}
</script>
