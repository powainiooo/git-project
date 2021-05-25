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
    transition all .2s ease-in-out;
    &.rotate
      transform rotateZ(180deg)
  &-float
    size(100%, 100%)
</style>

<template>
<div class="c-date-time">
  <TimePicker :value="value" v-bind="$attrs" v-if="type === 'time'" class="c-date-time-float" @on-change="onChange" @on-open-change="openChange"></TimePicker>
  <DatePicker :value="value" :type="type" v-bind="$attrs" v-else class="c-date-time-float" @on-change="onChange" @on-open-change="openChange"></DatePicker>
  <div class="c-date-time-arrow" :class="{'rotate': rotate}"><Icon type="ios-arrow-down" /></div>
</div>
</template>

<script type='es6'>
export default {
  name: 'app',
  props: {
    value: {
      type: [String, Array],
      default: ''
    },
    type: {
      type: String,
      default: 'date'
    }
  },
  data () {
    return {
      rotate: false
    }
  },
  methods: {
    onChange (e) {
      this.$emit('input', e)
      this.$emit('change', e)
    },
    openChange (e) {
      this.rotate = e
    }
  }
}
</script>
