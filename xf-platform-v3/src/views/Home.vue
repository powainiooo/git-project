<style lang="stylus" type="text/stylus">
@import "../assets/css/global.styl"
.btn-publish
  width 125px
  position fixed
  top 84px
  right 40px
  z-index 500
.list-container
  width 1340px
  margin 140px auto
  .c-ticket
    margin-bottom 40px
</style>
<template>
  <div class="home">
    <template v-if="showWelcome">
      <bg-slide />
      <welcome />
    </template>
    <template>
      <z-header />
      <Button class="btn-publish">发布新活动</Button>
      <div class="list-container">
        <Row :gutter="40">
          <Col span="8"><ticket /></Col>
          <Col span="8"><ticket /></Col>
          <Col span="8"><ticket /></Col>
          <Col span="8"><ticket /></Col>
        </Row>
      </div>
    </template>
  </div>
</template>

<script>
import bgSlide from '@/components/bgSilde'
import welcome from '@/components/home/welcome'
import zHeader from '@/components/header'
import ticket from '@/components/ticket'
export default {
  name: 'Home',
  components: {
    bgSlide,
    welcome,
    zHeader,
    ticket
  },
  data () {
    return {
      showWelcome: false
    }
  }
}
</script>
