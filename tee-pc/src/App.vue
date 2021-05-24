<template>
  <div id="app">
    <bubble />
    <logo @open="openModal" />
    <account-form ref="account" />
    <div class="pr"><router-view/></div>
  </div>
</template>

<script type='es6'>
import bubble from '@/components/common/bubble'
import logo from '@/components/common/logo'
import accountForm from '@/components/common/accountForm'
export default {
  name: 'app',
  components: {
    bubble,
    logo,
    accountForm
  },
  methods: {
    openModal () {
      this.$refs.account.view()
    }
  }
}
</script>
