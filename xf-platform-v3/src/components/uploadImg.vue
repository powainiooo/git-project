<style lang="stylus" type="text/stylus">
@import "../assets/css/global.styl"
.c-upload
  display flex
  align-items center
  &-box
    center()
    overflow hidden
    size(90px, 90px)
    background-color #EEEEEF
    border-radius 10px
  &-content
    margin-left 10px
    p
      font-size 10px
      color #C8C9CA
      line-height 1.3
    div
      font-size 14px
      color #9E9E9F
      line-height 1.3
</style>

<template>
<div class="c-upload">
  <div class="c-upload-box" :style="{width: width + 'px'}">
    <img src="@/assets/img/ico-add.png" class="add" width="20" />
  </div>
  <div class="c-upload-content">
    <div><slot name="title"></slot></div>
    <p><slot name="hint"></slot></p>
  </div>
</div>
</template>

<script type='es6'>
export default {
  name: 'app',
  props: {
    width: {
      type: [Number, String],
      default: 90
    }
  },
  data () {
    return {}
  },
  methods: {}
}
</script>
