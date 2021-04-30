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
<div class="c-menus" :style="{
  width: (page !== 'records' && page !== 'rules') ? '600px' : '1300px',
  right: showMenu ? '0px' : '-600px'
}">
  <div class="c-menus-btns">
    <a href="javascript:;" class="fl" v-show="page !== 'navs'" @click="page = 'navs'"><img src="@/assets/img/ico-back.png" width="28" /></a>
    <a href="javascript:;" class="fr" @click="hideMenu"><img src="@/assets/img/ico-close2.png" width="28" /></a>
  </div>
  <transition enter-active-class="animated anim-detail slideInRight">
  <navs v-if="page === 'navs'" @toggle="toggle" />
  <infos v-if="page === 'infos'" />
  <banks v-if="page === 'banks'" @toggle="toggle" />
  <bank-edit v-if="page === 'bankEdit'" @toggle="toggle" />
  <records v-if="page === 'records'" @toggle="toggle" />
  <cash-out v-if="page === 'cashOut'" :record="recordData" @toggle="toggle" />
  <contacts v-if="page === 'contacts'" />
  <rules v-if="page === 'rules'" />
  </transition>
  <div class="copyright" v-if="page !== 'rules'">{{copyright}}</div>
</div>
</template>

<script type='es6'>
import navs from './navs'
import infos from './infos'
import banks from './banks'
import bankEdit from './bankEdit'
import records from './records'
import cashOut from './cashOut'
import contacts from './contacts'
import rules from './rules'
export default {
  name: 'app',
  components: {
    navs,
    infos,
    banks,
    bankEdit,
    records,
    cashOut,
    contacts,
    rules
  },
  computed: {
    copyright () {
      return this.$store.state.copyright
    },
    showMenu () {
      return this.$store.state.showMenu
    }
  },
  data () {
    return {
      page: 'navs',
      recordData: {}
    }
  },
  methods: {
    toggle (data) {
      if (typeof data === 'string') {
        this.page = data
      } else {
        this.page = data.page
        this.recordData = data.data
      }
    },
    hideMenu () {
      this.$store.commit('SET_MENU', false)
      this.toggle('navs')
    }
  }
}
</script>
