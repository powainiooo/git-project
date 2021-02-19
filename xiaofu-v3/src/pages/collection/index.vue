<style scoped>
.banner { width: 100%; height: 400px; margin-top: 100px; }
.collection-page { margin: -354px 25px 50px 25px; position: relative; z-index: 5; }
.collection-page .c-tag { margin-bottom: 46px }
.list-container { display: flex; flex-wrap: wrap; justify-content: space-between; }
.item-small { width: 340px; margin-bottom: 20px; }
.item-large { width: 100%; margin-bottom: 20px; }
</style>

<template>
  <div>
    <c-header
      ref="header"
      @close="handleClose" />
    <img src="/static/images/img.jpg" class="banner" />
    <div class="collection-page">
      <div class="c-tag">Baby let’s Bounce</div>
      <div class="list-container">
        <div class="item-large">
          <c-ticket size="large" />
        </div>
        <div class="item-small">
          <c-ticket />
        </div>
        <div class="item-small">
          <c-ticket />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cHeader from '@/components/header/header'
import cTicket from '@/pages/index/modules/ticket'
export default {
  data () {
    return {
    }
  },

  components: {
    cHeader,
    cTicket
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
