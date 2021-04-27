<style scoped>
.c-contacts { padding: 130px 60px 60px 60px; }
</style>

<template>
<div class="c-contacts">
  <tag-line class="mb10" title="合作联系">{{globalData.cooperation}}</tag-line>
  <tag-line class="mb10" title="工作邮箱">{{globalData.work_email}}</tag-line>
  <tag-line class="mb10" title="操作疑问">{{globalData.operational_question}}</tag-line>
</div>
</template>

<script type='es6'>
import tagLine from '@/components/tagLine'
export default {
  name: 'app',
  components: {
    tagLine
  },
  computed: {
    globalData () {
      return this.$store.state.globalData.contact
    }
  },
  data () {
    return {}
  },
  methods: {}
}
</script>
