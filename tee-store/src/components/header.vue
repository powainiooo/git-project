<style scoped>
.c-header { width: 100%; position: fixed; top: 0; left: 0; z-index: 500; background-color: #EADED0; }
.c-header-line { width: 100%; height: 104px; display: flex; justify-content: space-between; align-items: center; padding: 0 30px; }
.c-header-line .logos { height: 100%; display: flex; align-items: center; }
.c-header-line .logo { width: 175px; }
.c-header-line .x { width: 15px; margin-left: 18px; }
.c-header-line .logo2 { width: 210px; height: 80px; }
.c-header-line button { width: 60px; height: 56px; background-color: transparent; display: flex; justify-content: center; align-items: center; }
.c-header-line button .menu { width: 34px; }
</style>

<template>
<div class="c-header">
  <div class="c-header-line">
    <div class="logos">
      <img src="/static/images/logo@2x.png" mode="widthFix" class="logo" @click="toIndex" />
      <img src="/static/images/x.png" mode="widthFix" class="x" v-if="storeLogo !== ''" />
      <img :src="imgSrc + storeLogo" class="logo2" v-if="storeLogo !== ''" />
    </div>
    <button v-if="menus" @click="toMine"><img src="/static/images/menu.png" mode="widthFix" class="menu" /></button>
  </div>
</div>
</template>

<script type='es6'>
export default {
  name: 'app',
  props: {
    menus: {
      type: Boolean,
      default: false
    },
    storeLogo: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      imgSrc: mpvue.imgSrc
    }
  },
  methods: {
    toPage: mpvue.toPage,
    toMine () {
      mpvue.navigateTo({
        url: '/pages/personal/mine/main'
      })
    },
    toIndex () {
      mpvue.reLaunch({
        url: '/pages/index/main'
      })
    }
  }
}
</script>
