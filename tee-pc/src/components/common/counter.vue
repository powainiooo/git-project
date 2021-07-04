<style scoped>
.c-counter { color: #9E9E9F; width: 70px; text-align: center; }
</style>

<template>
<span class="c-counter">
{{timeStr}}
</span>
</template>

<script type='es6'>
import { formatDate } from '@/utils/tools'
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
        console.log('timer done')
        setTimeout(() => {
          this.$emit('done')
        }, 1000)
      } else {
        this.times -= 1
      }
      console.log('this.timer', this.timer, this.times)
    }, 1000)
  },
  methods: {}
}
</script>
