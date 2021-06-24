<style lang="stylus" type="text/stylus">
@import "../assets/css/global.styl"
.c-header
  position fixed
  top 20px
  right 30px
  left 30px
  z-index 500
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
      display block; size(28px, 28px); background url("../assets/img/ico-menu.png") no-repeat; background-size 100% 100%; margin-left 10px;
      &:hover
        background-image url("../assets/img/ico-menu2.png")
</style>

<template>
<header class="c-header">
  <img src="@/assets/img/logo.png" width="161" />
  <div class="c-header-right">
    <input v-model='keyword' @keyup.enter="enter" />
    <a href="javascript:;" @click="openMenu"></a>
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
    return {
      keyword: ''
    }
  },
  methods: {
    openMenu () {
      this.$store.commit('SET_MENU', true)
    },
    enter () {
      this.$emit('confirm', this.keyword)
    }
  }
}
</script>
