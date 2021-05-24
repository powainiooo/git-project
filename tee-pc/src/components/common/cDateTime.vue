<style lang="stylus" type="text/stylus">
@import "../../assets/css/mixin.styl"
@import "../../assets/css/global.styl"
.c-date-time
  position relative
  &-arrow
    size(40px, 40px)
    abBR(0, 0)
    background-color mainColor
    center()
    color #ffffff
    border-radius 0 20px 20px 0
    z-index 10
  &-float
    size(100%, 100%)
.tee-date
  width 130px;
  .ivu-input
    background-color #A96854; color #ffffff;
    &::-webkit-input-placeholder
      color #ffffff;
  .c-date-time-arrow
    background-color transparent
</style>

<template>
<div class="c-date-time">
  <TimePicker :value="value" :type="type" v-bind="$attrs" v-if="type === 'time' || type === 'timerange'" class="c-date-time-float" @on-change="onChange"></TimePicker>
  <DatePicker :value="value" :type="type" v-bind="$attrs" v-else class="c-date-time-float" @on-change="onChange"></DatePicker>
  <div class="c-date-time-arrow"><Icon type="ios-arrow-down" /></div>
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
