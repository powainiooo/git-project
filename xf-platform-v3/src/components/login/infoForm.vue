<style lang="stylus" type="text/stylus">
.infos-container
  height 376px
  display flex
  transition width .3s cubic-bezier(.23,.56,.24,.92)
</style>

<template>
<div class="infos-container" :style="{width: page === 'form' ? '940px' : '300px'}">
  <Infos />
  <transition enter-active-class="moveIn" leave-active-class="moveOut">
  <data-form v-if="showForm" />
  </transition>
</div>
</template>

<script type='es6'>
import Infos from './Infos'
import dataForm from './dataForm'
export default {
  name: 'app',
  props: {
    page: String
  },
  watch: {
    page (val) {
      if (val === 'form') {
        setTimeout(() => {
          this.showForm = true
        }, 300)
      }
    }
  },
  components: {
    Infos,
    dataForm
  },
  data () {
    return {
      showForm: false
    }
  },
  methods: {}
}
</script>
