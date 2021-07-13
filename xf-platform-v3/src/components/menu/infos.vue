<style scoped>
.c-infos-top { padding: 130px 60px 60px 60px; border-bottom: 1px solid #EEEEEF; }
.c-infos-bottom { margin: 60px; }
.c-infos-bottom .logo { width: 90px; height: 90px; border-radius: 10px; border: 2px solid #5B85E6; overflow: hidden; margin-bottom: 46px; display: flex; justify-content: center; align-items: center; }
.c-infos-bottom .logo img { width: 100%; display: block; }
</style>

<template>
<div class="c-infos">
  <div class="c-infos-top">
    <tag-line class="mb10" title="类型">{{globalData.type === 1 ? '个人': '公司'}}</tag-line>
    <tag-line class="mb10" title="名称">{{globalData.organizer_name}}</tag-line>
<!--    <tag-line class="mb10" title="所属公司">{{globalData.company}}</tag-line>-->
    <tag-line class="mb10" title="负责人">{{globalData.person}}</tag-line>
    <tag-line class="mb10" title="身份证">{{globalData.id_card_no}}</tag-line>
    <tag-line class="mb10" title="联系电话">{{globalData.phone}}</tag-line>
    <tag-line class="mb10" title="地址" :width="340">{{globalData.address}}</tag-line>
  </div>
  <div class="c-infos-bottom">
    <div class="logo"><img :src="cdnurl + globalData.logo" /></div>
    <div class="c-c8 f12">活动方基本信息无法修改，如若有紧急情况需要修改信息，<br/>
      请电话联系 186 8143 8270</div>
  </div>
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
    cdnurl () {
      if (this.$store.state.config && this.$store.state.config.uploaddata) {
        return this.$store.state.config.uploaddata.cdnurl
      } else {
        return ''
      }
    },
    globalData () {
      return this.$store.state.globalData.merchant
    }
  },
  data () {
    return {}
  },
  methods: {}
}
</script>
