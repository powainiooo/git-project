<style scoped>

</style>

<template>
  <div class="container">
    <bubble />
  </div>
</template>

<script>
import bubble from './modules/bubble'
import store from '../../store'
export default {
  components: {
    bubble
  },
  computed: {
    barHeight () {
      return store.getters.barHeight
    }
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
