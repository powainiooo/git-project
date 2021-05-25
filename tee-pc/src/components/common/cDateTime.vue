<style lang="stylus" type="text/stylus">
@import "../../assets/css/mixin.styl"
@import "../../assets/css/global.styl"
.c-date-time
  position relative
  .ivu-input-suffix
    display none
  &-arrow
    size(20px, 20px); abBR(10px, 11px); background-color mainColor; center(); color #ffffff; border-radius 20px; z-index 10; transition all .2s ease-in-out;
    &.rotate
      transform rotateZ(180deg)
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
  <TimePicker :value="value" :type="type" v-bind="$attrs" v-if="type === 'time' || type === 'timerange'" class="c-date-time-float" @on-change="onChange" @on-open-change="openChange"></TimePicker>
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
