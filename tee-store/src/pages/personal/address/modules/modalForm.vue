<style scoped>
.addr-form .footer-btns { left: -25px; right: -25px; }
</style>

<template>
<div class="c-drawer" v-if="visible">
  <div class="c-drawer-cover" :class="{'c-drawer-cover-show': showItem}" @animationend="animationend"></div>
  <div class="c-drawer-box addr-form" :class="{'c-drawer-show': showItem}">
    <div class="btn-circle c-drawer-close" @click="hide"><img src="/static/images/x2.png" /></div>
    <div class="c-drawer-title">新增收货地址</div>
    <div class="mt30 ml35 mr35 mb75">
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
    <div class="acenter ml35 mb200">
      <img src="/static/images/radio.png" mode="widthFix" class="w30" />
      <span class="f20 c-9e ml10">设为默认地址</span>
    </div>

    <div class="footer-btns">
      <div class="r">
        <button>保存地址</button>
      </div>
    </div>
  </div>
</div>
</template>

<script type='es6'>
export default {
  name: 'app',
  data() {
    return {
      visible: false,
      showItem: false
    }
  },
  methods: {
    show () {
      this.visible = true
      this.$nextTick(() => {
        this.showItem = true
      })
    },
    hide () {
      this.showItem = false
    },
    animationend () {
      this.visible = false
    }
  }
}
</script>
