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
    <template v-else>
      <z-header />
      <Button class="btn-publish">发布新活动</Button>
      <div class="list-container">
        <Row :gutter="40">
          <Col span="8" v-for="item in list" :key="item.id"><ticket :record="item" /></Col>
        </Row>
      </div>
    </template>

    <c-details />
  </div>
</template>

<script>
import bgSlide from '@/components/bgSilde'
import welcome from '@/components/home/welcome'
import cDetails from '@/components/home/details'
import zHeader from '@/components/header'
import ticket from '@/components/ticket'
import { postAction } from '@/utils'

export default {
  name: 'Home',
  components: {
    bgSlide,
    welcome,
    cDetails,
    zHeader,
    ticket
  },
  data () {
    return {
      showWelcome: false,
      list: [],
      pageNo: 1,
      pageSize: 9
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      postAction('/editor/ticket/lists', {
        page: this.pageNo,
        limit: this.pageSize
      }).then(res => {
        if (res.code === 1) {
          this.list = res.data.list
          this.showWelcome = this.list.length === 0
        }
      })
    }
  }
}
</script>
