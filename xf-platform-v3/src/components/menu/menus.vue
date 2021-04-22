<style lang="stylus" type="text/stylus">
@import "../../assets/css/global.styl"
.c-menus
  width 600px
  height 100%
  overflow-x hidden
  overflow-y auto
  background-color #ffffff
  position fixed
  top 0
  right 0
  transition all 0.5s cubic-bezier(.25,.76,.36,.97)
  z-index 2000
  &::-webkit-scrollbar
    width 2px
    background-color transparent
  &::-webkit-scrollbar-thumb
    background-color #5B85E6
  &-btns
    position absolute
    top 30px
    left 30px
    right 30px
  .form
    width 250px
    margin-left 60px
    margin-bottom 60px
  &-title
    font-size 18px
  .copyright
    font-size 12px
    color #9E9E9F
    position absolute
    bottom 30px
    left 60px
</style>

<template>
<div class="c-menus">
  <div class="c-menus-btns">
    <a href="javascript:;" class="fr"><img src="@/assets/img/ico-close2.png" width="28" /></a>
  </div>
  <navs v-if="page === 'navs'" @toggle="toggle" />
  <infos v-if="page === 'infos'" />
  <banks v-if="page === 'banks'" @toggle="toggle" />
  <bank-edit v-if="page === 'bankEdit'" />
  <div class="copyright">{{copyright}}</div>
</div>
</template>

<script type='es6'>
import navs from './navs'
import infos from './infos'
import banks from './banks'
import bankEdit from './bankEdit'
export default {
  name: 'app',
  components: {
    navs,
    infos,
    banks,
    bankEdit
  },
  computed: {
    copyright () {
      return this.$store.state.copyright
    }
  },
  data () {
    return {
      page: 'banks'
    }
  },
  methods: {
    toggle (page) {
      this.page = page
    }
  }
}
</script>
