<style scoped>

</style>

<template>
<div class="page">
  <c-header />
  <div class="container">

  </div>
  <c-footer current="order" />
</div>
</template>

<script>
import cHeader from '@/components/header'
import cFooter from '@/components/footer'
export default {
  components: {
    cHeader,
    cFooter
  },
  data () {
    return {
    }
  },

  methods: {
  },

  created () {
  }
}
</script>
