<style scoped>
.ad-frame { width: 100%; position: fixed; top: 100px; bottom: 0; left: 0; z-index: 1000; }
.ad-frame-hide { animation: fadeOut 1s linear both; }
@keyframes fadeOut {
  0% { opacity: 1; }
  99% { opacity: 0; }
  100% { opacity: 0; display: none; }
}
.ad-frame .pic { width: 100%; height: 100%; }
.ad-frame .infos { width: 100%; height: 130px; background-color: rgba(0, 0, 0, 0.4); padding: 0 36px; display: flex; justify-content: space-between; align-items: center; position: absolute; top: 0; left: 0; }
.ad-frame .infos .name h3 { font-size: 53px; font-family: HelveB; line-height: 64px; color: #ffffff; }
.ad-frame .infos .name p { font-size: 20px; font-family: HelveL; line-height: 20px; color: #ffffff; }
/deep/.ad-frame .infos .c-tk-info { width: auto; margin-right: 50px; }
</style>

<template>
<div class="ad-frame"
     :class="{'ad-frame-hide': !show}"
     @click="toDetail"
     @animationend="animationend">
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
import store from '@/store'
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
		return {
		  show: true
    }
	},
	methods: {
    toDetail () {
      mpvue.navigateTo({
        url: `/pages/details/main?id=${this.record.id}`
      })
    },
    hide () {
      console.log('hide ad')
      this.show = false
    },
    animationend () {
      console.log('animationend')
      store.commit('SET_ADSTATE', false)
    }
  }
}
</script>
