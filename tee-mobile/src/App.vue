<template>
  <div id="app">
    <c-header />
    <router-view/>
  </div>
</template>

<script>
import cHeader from '@/components/header'
export default {
  name: 'app',
  components: {
    cHeader
  },
  methods: {
    openModal () {
      this.$refs.account.view()
    }
  }
}
</script>
