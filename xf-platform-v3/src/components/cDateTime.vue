<style lang="stylus" type="text/stylus">
@import "../assets/css/global.styl"
.c-date-time
  position relative
  &-arrow
    size(40px, 40px)
    abBR(0, 0)
    bgG()
    center()
    color #ffffff
    border-radius 0 10px 10px 0
  &-float
    size(100%, 100%)
</style>

<template>
<div class="c-date-time">
  <TimePicker :value="value" v-bind="$attrs" v-if="type === 'time'" class="c-date-time-float" @on-change="onChange"></TimePicker>
  <DatePicker :value="value" :type="type" v-bind="$attrs" v-else class="c-date-time-float" @on-change="onChange"></DatePicker>
  <div class="c-date-time-arrow"><Icon type="ios-arrow-down" /></div>
</div>
</template>

<script type='es6'>
export default {
  name: 'app',
  props: {
    value: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'date'
    }
  },
  data () {
    return {
    }
  },
  methods: {
    onChange (e) {
      this.$emit('input', e)
      this.$emit('change', e)
    }
  }
}
</script>
