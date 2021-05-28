<style scoped>

</style>

<template>
<div class="page">
  <c-header />
  <div class="container">
    <c-timer :timer="timer" />
  </div>
  <c-footer current="order" />
</div>
</template>

<script>
import cHeader from '@/components/header'
import cFooter from '@/components/footer'
import cTimer from '@/components/timer'
export default {
  components: {
    cHeader,
    cFooter,
    cTimer
  },
  data () {
    return {
      timer: ''
    }
  },

  methods: {
  },

  onLoad () {
    setTimeout(() => {
      this.timer = 90
    }, 1000)
    setInterval(() => {
      this.timer -= 1
    }, 1000)
  }
}
</script>
