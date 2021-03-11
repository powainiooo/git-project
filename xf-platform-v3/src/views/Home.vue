<style lang="stylus">

</style>
<template>
  <div class="home">
    <bg-slide />
    <welcome />
  </div>
</template>

<script>
import bgSlide from '@/components/bgSilde'
import welcome from '@/components/home/welcome'
export default {
  name: 'Home',
  components: {
    bgSlide,
    welcome
  }
}
</script>
