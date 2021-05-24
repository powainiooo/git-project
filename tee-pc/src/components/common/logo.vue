<style lang="stylus" type="text/stylus">
@import "../../assets/css/mixin.styl"
.c-logo
  between(); fxTL(40px, 45px); z-index 1000; right 45px;
  .acenter
    span
      font-size 14px; color #41372D; margin 0 15px;
  .inofs
    acenter(); background url('../../assets/img/ar3.png') no-repeat; background-size 12px; background-position right center; padding-right 35px; cursor pointer;
    .logo
      size(50px, 50px); background-color #ffffff; border-radius 50%; overflow hidden; center(); box-shadow 0 0 5px 0 rgba(0, 0, 0, 0.12); margin-right 14px;
      img
        width 100%; display block;
    h3
      font-size 16px; line-height 16px; margin-bottom 10px;
    p
      font-size 12px; line-height 12px; color #9E9E9F;
</style>

<template>
<div class="c-logo">
  <div class="acenter">
    <img src="@/assets/img/logo@2x.png" width="164" />
    <span v-if="showInfos">x</span>
    <img :src="imgSrc + shopData.shop_logo" height="26" v-if="showInfos" />
  </div>
  <div class="inofs" v-if="showInfos" @click="$emit('open')">
    <div class="logo"><img :src="imgSrc + shopData.shop_logo" /></div>
    <div>
      <h3>{{shopData.shop_name}}</h3>
      <p>{{shopData.address}}</p>
    </div>
  </div>
</div>
</template>

<script type='es6'>
export default {
  name: 'app',
  computed: {
    shopData () {
      return this.$store.state.globalData.shop
    },
    imgSrc () {
      return this.$store.state.imgSrc
    },
    showInfos () {
      return this.shopData && this.shopData.address !== null
    }
  },
  data () {
    return {}
  },
  methods: {}
}
</script>
