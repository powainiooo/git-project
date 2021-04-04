<style scoped>
.al-list li { padding: 40px 30px 10px 30px; }
.al-list li div { margin-bottom: 30px; }
.al-list li div .sp1 { font-size: 26px; color: #282828; }
.al-list li div .sp2 { font-size: 26px; color: #3D7FC7; margin-left: 30px; }
.al-list li div .sp3 { font-size: 20px; line-height: 40px; color: #282828; }
</style>

<template>
  <div class="container">
    <div class="hr20"></div>
    <div class="mt30 mb30">
      <c-search />
    </div>

    <ul class="al-list borderT">
      <li class="borderB">
        <div>
          <span class="sp1">【成语名称】：</span>
          <span class="sp2">才占八斗</span>
        </div>
        <div>
          <span class="sp1">【成语名称】：</span>
          <span class="sp3">才占八斗才占八斗才占八斗才占八斗才占八斗</span>
        </div>
      </li>
    </ul>

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
