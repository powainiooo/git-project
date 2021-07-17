<style scoped>

</style>

<template>
<div>

</div>
</template>

<script>
import store from '@/store'
export default {
  data () {
    return {
      id: 0
    }
  },

  methods: {
  },

  onLoad (options) {
    console.log('goods2 options', options)
    this.id = options.id || 2
    store.commit('SET_STOREINFO', {
      shop_id: this.id
    })
    mpvue.switchTab({
      url: '/pages/goods/main'
    })
  }
}
</script>
