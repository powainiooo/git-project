<style scoped>

</style>

<template>
  <div class="container">


    <operates :id="id" />
  </div>
</template>

<script>
import operates from '@/components/operates'
import store from '@/store'

export default {
  components: {
    operates
  },
  data () {
    return {
      id: '',
      type: '',
      map: {
        plant: 'sb_zw'
      }
    }
  },
  methods: {
  },
  onLoad (options) {
    this.id = options.id || '61'
    this.type = options.type || 'plant'
  }
}
</script>
