<style lang="stylus" type="text/stylus">
@import "../assets/css/global.styl"
.c-date-time
  position relative
  &-line
    size(100%, 40px)
    background-color #EEEEEF
    border-radius 10px
    position relative
    overflow hidden
    div
      size(40px, 40px)
      abBR(0, 0)
      bgG()
      center()
      color #ffffff
    p
      height 100%
      font-size 14px
      color #000000
      line-height 40px
      padding-left 8px
    .placeholder
      color #c5c8ce
  &-float
    size(100%, 100%)
    abTL(0, 0)
    .ivu-date-picker-rel
      opacity 0
</style>

<template>
<div class="c-date-time">
  <div class="c-date-time-line">
    <p :class="{'placeholder': value === ''}">{{value === '' ? placeholder : value}}</p>
    <div><Icon type="ios-arrow-down" /></div>
  </div>
  <DatePicker type="date" v-if="type === 'date'" class="c-date-time-float"></DatePicker>
  <TimePicker type="time" v-else-if="type === 'time'" class="c-date-time-float"></TimePicker>
</div>
</template>

<script type='es6'>
export default {
  name: 'app',
  props: {
    placeholder: {
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
      value: ''
    }
  },
  methods: {}
}
</script>
