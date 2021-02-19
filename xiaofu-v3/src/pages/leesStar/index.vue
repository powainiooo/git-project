<style scoped>
.banner { width: 100%; height: 588px; margin-top: 100px; }
.lees-page { margin: -488px 25px 50px 25px; position: relative; z-index: 5; }
.lees-page .lees-star { width: 318px; height: 160px; margin-bottom: 76px; margin-left: 20px;  }
</style>

<template>
  <div>
    <c-header
      ref="header"
      bgColor="#000018"
      logo="logo2"
      @close="handleClose" />
    <img src="/static/images/img.jpg" class="banner" />
    <div class="lees-page">
      <img src="/static/images/leesStar/lees-star.png" class="lees-star" />
      <div>
        <c-list-item v-for="i in 5" :key="i" :rank="i" />
      </div>
    </div>
  </div>
</template>

<script>
import cHeader from '@/components/header/header'
import cListItem from './modules/listItem'
export default {
  data () {
    return {
    }
  },

  components: {
    cHeader,
    cListItem
  },

  methods: {
    handleClose () {
      mpvue.navigateBack({
        delta: -1
      })
    }
  },
  mounted () {
    this.$refs.header.setStatus('onlyClose')
  },
  onLoad () {
    // let app = getApp()
  }
}
</script>
