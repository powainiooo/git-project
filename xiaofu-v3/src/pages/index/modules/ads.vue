<style scoped>
.ad-frame { width: 100%; position: fixed; top: 100px; bottom: 0; left: 0; z-index: 500; background-color: #ffffff; }
.ad-frame .ad-container { width: 100%; height: 100%; }
.ad-frame .pic { width: 100%; height: 100%; }
.ad-frame .infos { width: 100%; height: 130px; background-color: rgba(0, 0, 0, 0.4); padding: 0 36px; display: flex; justify-content: space-between; align-items: center; position: absolute; top: 0; left: 0; }
.ad-frame .infos .name h3 { width: 600px; height: 64px; font-size: 53px; font-family: HelveB; line-height: 64px; color: #ffffff; text-overflow: ellipsis; overflow: hidden; white-space: nowrap; word-break: break-all; }
.ad-frame .infos .name p { font-size: 20px; font-family: HelveL; line-height: 20px; color: #ffffff; }
/deep/.ad-frame .infos .c-tk-info { width: auto; margin-right: 50px; }
.ad-frame-hide { animation: fadeOut .3s linear .4s both; }
@keyframes fadeOut {
  0% { opacity: 1; }
  99% { opacity: 0; }
  100% { opacity: 0; display: none; }
}
.ad-frame-hide .ad-container { animation: fadeOut2 0.3s linear both }
@keyframes fadeOut2 {
  0% { opacity: 1; transform: scale(1) }
  99% { opacity: 0; transform: scale(1.2) }
  100% { opacity: 0; transform: scale(1.2); }
}
.ad-frame-hide .infos { display: none; }
</style>

<template>
<div class="ad-frame"
     :class="{'ad-frame-hide': !show}"
     @click="toDetail"
     @animationend="animationend">
  <div class="ad-container" @click="toDetail">
    <img :src="adImg" mode="aspectFill" class="pic" @load="loadOver" @error="loadErr" v-if="adImg !== ''" />
    <div class="infos">
      <div class="name">
        <h3>{{record ? record.name : ''}}</h3>
        <p>{{record ? record.organizer_name : ''}}</p>
      </div>
      <tk-info :record="date" size="large" />
    </div>
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
      if (this.record.start_date) {
        date = this.record.start_date.split('-')
      }
      return {
        month: date[1],
        day: date[2],
      }
    },
    adImg () {
      return this.record ? this.record.splash_ad_image : ''
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
        url: `/pages/details/main?id=${this.record.id}&source=ad`
      })
      this.hide()
    },
    hide () {
      console.log('hide ad')
      this.show = false
    },
    animationend () {
      console.log('animationend')
      store.commit('SET_ADSTATE', false)
    },
    loadOver (e) {
      console.log('loadOver', e)
      this.$emit('load')
    },
    loadErr (err) {
      console.log('loadErr', err)
      store.commit('SET_ADSTATE', false)
    }
  }
}
</script>
