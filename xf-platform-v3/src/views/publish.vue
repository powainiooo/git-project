<style lang="stylus" type="text/stylus">
@import "../assets/css/global.styl"
.step-frame
  height 100vh
</style>

<template>
<div>
  <step1 :step="step" v-if="step === 1"/>
  <step2 :step="step" v-else-if="step === 2"/>
  <step3 :step="step" v-else-if="step === 3"/>
</div>
</template>

<script type='es6'>
import step1 from '@/components/publish/step1'
import step2 from '@/components/publish/step2'
import step3 from '@/components/publish/step3'
export default {
  name: 'app',
  components: {
    step1,
    step2,
    step3
  },
  data () {
    return {
      step: 1
    }
  },
  methods: {}
}
</script>
