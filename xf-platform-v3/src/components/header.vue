<style lang="stylus" type="text/stylus">
@import "../assets/css/global.styl"
.c-header
  position fixed
  top 20px
  right 30px
  left 30px
  z-index 2500
  between()
  &-right
    display flex
    align-items center
    &>input
      outline none
      size(200px, 30px)
      padding 0 15px 0 30px
      line-height 30px
      border none
      border-radius 15px
      background url("../assets/img/ico-search.png") no-repeat 10px center #ffffff
    a
      margin-left 10px
      font-size 0
</style>

<template>
<header class="c-header">
  <img src="@/assets/img/logo.png" />
  <div class="c-header-right">
    <input />
    <a href="javascript:;" @click="openMenu"><img src="@/assets/img/ico-menu.png" /></a>
  </div>

  <menus />
</header>
</template>

<script type='es6'>
import menus from './menu/menus'
export default {
  name: 'app',
  components: {
    menus
  },
  data () {
    return {}
  },
  methods: {
    openMenu () {
      this.$store.commit('SET_MENU', true)
    }
  }
}
</script>
