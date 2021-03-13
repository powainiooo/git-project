<style lang="stylus" type="text/stylus">
@import "../assets/css/global.styl"
.step-frame
  height 100vh
</style>

<template>
<div>
  <step1 />
</div>
</template>

<script type='es6'>
import step1 from '@/components/publish/step1'
export default {
  name: 'app',
  components: {
    step1
  },
  data () {
    return {}
  },
  methods: {}
}
</script>
