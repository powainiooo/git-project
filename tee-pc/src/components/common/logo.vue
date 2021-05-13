<style lang="stylus" type="text/stylus">
@import "../../assets/css/mixin.styl"
.c-logo
  acenter()
  fxTL(55px, 45px)
  z-index 1000
</style>

<template>
<div class="c-logo">
  <img src="@/assets/img/logo@2x.png" width="164" />
</div>
</template>

<script type='es6'>
export default {
  name: 'app',
  data () {
    return {}
  },
  methods: {}
}
</script>
