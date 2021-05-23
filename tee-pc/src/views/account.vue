<style lang="stylus" type="text/stylus">

</style>

<template>
<div>
  <account-form ref="account" />
</div>
</template>

<script type='es6'>
import accountForm from '@/components/common/accountForm'
export default {
  name: 'app',
  components: {
    accountForm
  },
  data () {
    return {}
  },
  mounted () {
    this.$refs.account.show()
  },
  methods: {}
}
</script>
