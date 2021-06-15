<style lang="stylus" type="text/stylus">
.container
  size(100%, 100vh)
  overflow hidden
  position relative
</style>

<template>
<div class="container">
  <bg-slide />
  <alert ref="alert" @onRetry="onRetry" @onOk="backLogin" />
</div>
</template>

<script type='es6'>
import bgSlide from '@/components/bgSilde'
import alert from '@/components/login/alert'
import Vue from 'vue'
import { ACCESS_TOKEN } from '@/config'
export default {
  name: 'app',
  components: {
    bgSlide,
    alert
  },
  data () {
    return {}
  },
  mounted () {
    const merchant = this.$store.state.globalData.merchant
    if (merchant.status === 0) {
      this.$refs.alert.check('checkSuc', '<p class="tc">请耐心等待审核，如有疑问请联系客服<br/>联系客服（微信同号）：186 8143 8270<br/>工作时间：10:30~22：00</p>')
    } else if (merchant.status === 2) {
      this.$refs.alert.check('checkFail', `<p class="tc">${merchant.reason}</p>`)
    }
  },
  methods: {
    onRetry () {
      this.$router.push({
        name: 'Account'
      })
    },
    backLogin () {
      Vue.ls.remove(ACCESS_TOKEN)
      this.$router.push({
        name: 'Login'
      })
    }
  }
}
</script>
