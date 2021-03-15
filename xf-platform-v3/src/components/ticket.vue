<style lang="stylus" type="text/stylus" scoped>
@import "../assets/css/global.styl"
.c-ticket
  &-operates
    height 60px
    between()
    background-color #ffffff
  &-status
    size(120px, 60px)
    background linear-gradient(165deg, #0027AF, #2154DA 54%,#003AC3)
    center()
    p
      color #ffffff
      margin-top -7px
      margin-left 10px
  &-nums
    margin-left 15px
    font-size 34px
    color #C8C9CA
    font-family HelveThin
    span
      font-size 34px
      color #6D9BF5
      font-weight bold
  &-select
    margin-right 10px
  .operates2
    .c-ticket-status
      background linear-gradient(165deg, #717071,#B4B4B5)
  .operates3
    .c-ticket-status
      background linear-gradient(165deg, #E95513, #F29600)
  .operates4
    .c-ticket-status
      background linear-gradient(165deg, #3E3A39, #000000 54%, #3E3A39)
  .operates5
    background linear-gradient(165deg, #5B85E6, #6D9AF4)
    .c-ticket-status
      background none
  .operates6
    background linear-gradient(165deg, #EC1A63, #E3007F)
    .c-ticket-status
      background none
  &-btn
    size(90px, 30px)
    border-radius 10px
    border none
    box-shadow 0px 2px 5px 0px rgba(0, 0, 0, 0.15)
    center()
    color #6D9BF5
    margin-right 10px
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
  <!-- 销售中:operates1 停止:operates2 已售罄:operates3 已结束:operates4  审核中:operates5  审核失败:operates5  -->
  <div class="c-ticket-operates operates6">
    <div class="flex">
      <div class="c-ticket-status">
        <a href="javascript:;"><img src="@/assets/img/ico-close.png" /></a>
        <p>销售中</p>
      </div>
      <div class="c-ticket-nums">
        <span>8</span>/600
      </div>
    </div>
<!--    <c-select class="c-ticket-select"/>-->
    <button class="c-ticket-btn">查看并修改</button>
  </div>
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
import cSelect from "./cSelect"
export default {
  name: 'app',
  components: {
    cSelect
  },
  data () {
    return {}
  },
  methods: {}
}
</script>
