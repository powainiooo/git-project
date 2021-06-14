<style lang="stylus" type="text/stylus">
@import "../assets/css/global.styl"
.account-container
  size(100%, 100vh)
  overflow hidden
  position relative
  center()
  .infos-container
    size(940px, 376px)
    display flex
    transition width .3s cubic-bezier(.23,.56,.24,.92)
  .logo
    text-align center
    margin-bottom 40px
    font-size 0
    img
      width 161px
</style>

<template>
<section class="account-container">
  <div class="infos-container">
    <Infos ref="infos" />
    <data-form ref="dataForm" />
  </div>
</section>
</template>

<script type='es6'>
import Infos from '@/components/login/Infos'
import dataForm from '@/components/login/dataForm'
export default {
  name: 'app',
  components: {
    Infos,
    dataForm
  },
  computed: {
    hasGlobalData () {
      return this.$store.state.hasGlobalData
    },
    globalData () {
      return this.$store.state.globalData
    }
  },
  watch: {
    hasGlobalData (val) {
      if (val) {
        this.setDatas()
      }
    }
  },
  data () {
    return {}
  },
  mounted () {
    if (this.hasGlobalData) {
      this.setDatas()
    }
  },
  provide () {
    return {
      changePage: this.changePage
    }
  },
  methods: {
    changePage (page) {
      this.page = page
    },
    setDatas () {
      this.$refs.infos.setDefaults(this.globalData.merchant.type)
      this.$refs.dataForm.setDefaults(this.globalData)
    }
  }
}
</script>
