<style scoped>
.c-tag-line { width: 250px; height: 40px; border-radius: 10px; display: flex; align-items: center; background-color: #EEEEEF; }
.c-tag-line .c-tag-left { width: 70px; height: 100%; background: linear-gradient(349deg, #5B85E6 0%, #6D9AF4 100%); display: flex; align-items: center; justify-content: center; font-size: 10px; color: #ffffff; border-radius: 10px 0 0 10px; }
.c-tag-line .c-tag-right { padding: 0 10px; flex: 1; text-align: right; }
</style>

<template>
<div class="c-tag-line" :style="{width: width + 'px'}">
  <div class="c-tag-left" :style="{width: lWidth + 'px'}">{{title}}</div>
  <div class="c-tag-right">
    <slot></slot>
  </div>
</div>
</template>

<script type='es6'>
export default {
  name: 'app',
  props: {
    title: {
      type: String,
      default: ''
    },
    lWidth: {
      type: Number,
      default: 70
    },
    width: {
      type: Number,
      default: 250
    }
  },
  data () {
    return {}
  },
  methods: {}
}
</script>
