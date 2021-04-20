<style lang="stylus" type="text/stylus">
@import "../../assets/css/global.styl"

.details-frame
  width 600px
  overflow-y auto
  background-color #ffffff
  position relative
  transition all 0.5s cubic-bezier(.25,.76,.36,.97)
  &::-webkit-scrollbar
    width 2px
    background-color transparent
  &::-webkit-scrollbar-thumb
    background-color #5B85E6
  .details-btns
    position absolute
    top 75px
    left 30px
    right 30px
</style>

<template>
<div class="details-frame" :style="{width: page === 'info' ? '650px' : '1300px'}">
  <div class="details-btns">
    <a href="javascript:;" class="fl" v-show="page !== 'info'"><img src="@/assets/img/ico-back.png" width="28" /></a>
    <a href="javascript:;" class="fr" @click="$emit('close')"><img src="@/assets/img/ico-close2.png" width="28" /></a>
  </div>

  <infos v-if="page === 'info'" :record="record" />
</div>
</template>

<script type='es6'>
import infos from './infos'
export default {
  name: 'app',
  components: {
    infos
  },
  props: {
    record: Object,
    default: () => {}
  },
  data () {
    return {
      visible: false,
      page: 'info'
    }
  },
  methods: {

  }
}
</script>
