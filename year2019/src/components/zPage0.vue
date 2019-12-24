<style scoped>

</style>

<template>
<div class="z-page0" :style="{'z-index':showParts ? 10 : 5}">

</div>
</template>

<script type='es6'>
import TweenLite from 'gsap'
export default {
	name: 'app',
	data() {
		return {
		   outTime: 300,
      }
	},
   computed: {
      currentPage () {
         return this.$store.state.currentPage
      },
      showParts () {
         return this.currentPage === 'p0'
      }
   },
   watch: {
      currentPage (page, lastPage) {
         if (lastPage === 'p0') {
            // this.reset()
         }
      }
   },
	methods: {
      reset () {}
   }
}
</script>
