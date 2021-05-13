<style lang="stylus">
@import "../../assets/css/mixin.styl"
.c-float-box
  size(100%, 100vh)
  display flex; align-items flex-end; justify-content center;
</style>

<template>
<div class="c-float-box">
  <div class="box" :style="styles"></div>
</div>
</template>

<script type='es6'>
export default {
  name: 'app',
  props: {
    width: {
      type: [Number, String],
      default: 'auto'
    },
    height: {
      type: [Number, String], // 70 76
      default: 70
    }
  },
  computed: {
    styles () {
      return {
        width: this.width === 'auto' ? this.width : `${this.width}px`,
        height: `${this.height}vh`
      }
    }
  },
  data () {
    return {}
  },
  methods: {}
}
</script>
