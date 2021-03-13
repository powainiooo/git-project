<style lang="stylus" type="text/stylus">
@import "../assets/css/global.styl"
.c-form-box
  position relative
  &-stpes
    height 58px
    position absolute
    left 25px
    right 25px
    top -10px
    between()
    img
      height 100%
    button
      min-width 90px
      margin-left 10px
  &-container
    width 100%
    margin-top 70px
    background-color #ffffff
    border-radius 10px 10px 0px 0px
    overflow-y auto
    overflow-x hidden
    position relative
    &::-webkit-scrollbar
      width 2px
      background-color transparent
    &::-webkit-scrollbar-thumb
      background-color #5B85E6
</style>

<template>
<div class="c-form-box" :style="styles">
  <div class="c-form-box-stpes" :style="{top: (dis - 80) + 'px'}">
    <img :src="stepSrc" :style="{opacity: this.index === '' ? 0 : 1}"/>
    <div class="flex">
      <slot name="button"></slot>
    </div>
  </div>
  <div class="c-form-box-container" :style="stylesContainer">
    <slot></slot>
  </div>
</div>
</template>

<script type='es6'>
export default {
  name: 'app',
  props: {
    width: [Number, String],
    height: [Number, String],
    dis: {
      type: [Number, String],
      default: 0
    },
    index: {
      type: [Number, String],
      default: ''
    }
  },
  computed: {
    styles () {
      return {
        width: this.width + 'px',
        height: this.height + 'px'
      }
    },
    stylesContainer () {
      return {
        marginTop: this.dis + 'px',
        height: this.containerHeight + 'px'
      }
    },
    stepSrc () {
      const index = this.index || 1
      return require(`@/assets/img/nums/${index}.png`)
    }
  },
  mounted () {
    this.containerHeight = window.innerHeight - (window.innerHeight - Number(this.height)) / 2 - this.dis
  },
  data () {
    return {
      containerHeight: 0
    }
  },
  methods: {}
}
</script>
