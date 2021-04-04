<style scoped>
.story-content { margin: 30px; }
.story-content h2 { font-size: 40px; color: #000000; margin-bottom: 20px; text-align: center; }
.story-content div { font-size: 22px; line-height: 50px; }
</style>

<template>
  <div class="container">
    <div class="hr20"></div>
    <div class="mt30 mb60">
      <c-search />
    </div>

    <ul class="tabs3 mb60">
      <li class="active">成语</li>
      <li>睡前</li>
      <li>童话</li>
      <li>预言</li>
    </ul>

    <div class="story-content">
      <h2>返老还童的故事</h2>
      <div>返老还童的故事返老还童的故事返老还童的故事返老还童的故事返老还童的故事返老还童的故事</div>
    </div>

    <operates />
  </div>
</template>

<script>
import operates from '@/components/operates'
import cSearch from '@/components/search'

export default {
  components: {
    operates,
    cSearch
  },
  data () {
    return {}
  },

  created () {
  }
}
</script>
