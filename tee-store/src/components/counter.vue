<style scoped>
.c-counter { width: 130px; text-align: center; }
</style>

<template>
<span class="c-counter">
{{timeStr}}
</span>
</template>

<script type='es6'>
import { formatDate } from '@/utils'
export default {
  name: 'app',
  props: {
    timer: Number
  },
  data () {
    return {
      times: 0
    }
  },
  computed: {
    timeStr () {
      return formatDate(new Date(this.times * 1000), 'mm:ss')
    }
  },
  mounted () {
    this.times = this.timer
    const t = setInterval(() => {
      if (this.times === 0) {
        clearInterval(t)
        this.$emit('done')
      } else {
        this.times -= 1
      }
      console.log('this.timer', this.timer, this.times)
    }, 1000)
  },
  methods: {}
}
</script>
