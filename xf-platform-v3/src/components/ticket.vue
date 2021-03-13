<style lang="stylus" type="text/stylus">
@import "../assets/css/global.styl"
.c-ticket
  &-body
    size(420px, 280px)
    background-color #ffffff
  &-header
    height 60px
    between()
    padding 0 6px 0 12px
    .flex
      align-items center
    &-dates
      size(34px, 34px)
      border-radius 4px
      bgG()
      text-align center
      font-size 12px
      color #ffffff
      position relative
      &:after
        content ''
        height 1px
        background-color rgba(255, 255, 255, .6)
        position absolute
        top 16px
        left 7px
        right 7px
      p
        line-height 17px
      div
        line-height 17px
        font-weight bold
    &-titles
      margin-left 12px
      p
        font-size 16px
        line-height 18px
        color #000000
      div
        font-size 12px
        line-height 15px
        color #9E9E9F
    .logo
      size(48px, 48px)
  &-imgs
    size(100%, 220px)
    background-color #EEEEEF
</style>

<template>
<div class="c-ticket">
  <div class="c-ticket-body flip-box-min">
    <div class="c-ticket-header">
      <div class="flex">
        <div class="c-ticket-header-dates">
          <p>12</p>
          <div>8</div>
        </div>
        <div class="c-ticket-header-titles">
          <p>活动名称</p>
          <div>MAOLivehouse</div>
        </div>
      </div>
      <img src="@/assets/img/logo (2).png" class="logo" />
    </div>
    <div class="c-ticket-imgs">
      <img />
    </div>
  </div>
</div>
</template>

<script type='es6'>
export default {
  name: 'app',
  data () {
    return {}
  },
  methods: {}
}
</script>
