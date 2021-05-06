<style scoped>

</style>

<template>
  <div class="container3">


    <operates :id="id" />
  </div>
</template>

<script>
import operates from '@/components/operates'

export default {
  components: {
    operates
  },
  data () {
    return {
      id: ''
    }
  },

  onShareAppMessage () {
    const pages = getCurrentPages()
    const view = pages[pages.length - 1]
    return {
      title: '抛硬币',
      path: `/${view.route}?id=${this.id}`
    }
  },
  onLoad (options) {
    this.id = options.id
  }
}
</script>
