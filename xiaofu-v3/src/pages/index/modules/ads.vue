<style scoped>
.ad-frame { width: 100%; position: fixed; top: 100px; bottom: 0; left: 0; z-index: 1000; }
.ad-frame .pic { width: 100%; height: 100%; }
.ad-frame .infos { width: 100%; height: 130px; background-color: rgba(0, 0, 0, 0.4); padding: 0 36px; display: flex; justify-content: space-between; align-items: center; position: absolute; top: 0; left: 0; }
.ad-frame .infos .name h3 { font-size: 53px; font-family: HelveB; line-height: 64px; color: #ffffff; }
.ad-frame .infos .name p { font-size: 20px; font-family: HelveL; line-height: 20px; color: #ffffff; }
/deep/.ad-frame .infos .c-tk-info { width: auto; margin-right: 50px; }
</style>

<template>
<div class="ad-frame">
  <img :src="record.cover_image" mode="aspectFill" class="pic" />
  <div class="infos">
    <div class="name">
      <h3>{{record.name}}</h3>
      <p>{{record.organizer_name}}</p>
    </div>
    <tk-info :record="date" size="large" />
  </div>
</div>
</template>

<script type='es6'>
import tkInfo from '@/components/tkInfo'
export default {
	name: 'app',
  props: {
	  record: Object
  },
  components: {
    tkInfo
  },
  computed: {
    date() {
      let date = ['', '']
      if (this.record) {
        date = this.record.start_date.split('-')
      }
      return {
        month: date[1],
        day: date[2],
      }
    }
  },
	data() {
		return {}
	},
	methods: {}
}
</script>
