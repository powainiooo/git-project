<style lang="stylus" type="text/stylus">
@import "../../assets/css/global.styl"

.details-frame
  width 600px
  position fixed
  top 0
  right 0
  bottom 0
  z-index 1500
  overflow-y auto
  background-color #ffffff
  &::-webkit-scrollbar
    width 2px
    background-color transparent
  &::-webkit-scrollbar-thumb
    background-color #5B85E6
  .details-btns
    position absolute
    top 20px
    left 30px
    right 30px
</style>

<template>
<div class="details-frame">
  <div class="details-btns">
    <a href="javascript:;" class="fl"><img src="@/assets/img/ico-back.png" width="28" /></a>
    <a href="javascript:;" class="fr"><img src="@/assets/img/ico-close2.png" width="28" /></a>
  </div>

  <infos />
</div>
</template>

<script type='es6'>
import infos from './infos'
export default {
  name: 'app',
  components: {
    infos
  },
  data () {
    return {}
  },
  methods: {}
}
</script>
