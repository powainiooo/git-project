<style scoped>
.c-stepper { display: flex; align-items: center; }
.c-stepper-btn { width: 46px; height: 46px; background-color: #EDECEB; box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.15); border-radius: 50%; display: flex; justify-content: center; align-items: center; color: #B9BABB; font-size: 46px; line-height: 46px; }
.c-stepper-num { width: 64px; text-align: center; font-size: 24px; color: #41372D; }
</style>

<template>
<div class="c-stepper">
  <div class="c-stepper-btn" @click="reduce">-</div>
  <span class="c-stepper-num">{{nums}}</span>
  <div class="c-stepper-btn" style="background-color: #F0916C;" @click="add"><img src="/static/images/add.png" mode="widthFix" class="w22" /></div>
</div>
</template>

<script type='es6'>
export default {
	name: 'app',
  props: {
	  value: {
	    type: [Number, String],
      default: 0
    }
  },
  watch: {
	  value: {
	    handler (val) {
        this.nums = Number(val)
      },
      immediate: true
    }
  },
	data() {
		return {
		  nums: 0,
      t: 0
    }
	},
	methods: {
    reduce () {
      if (this.nums === 1) return
      this.nums -= 1
      this.change()
    },
    add () {
      if (this.nums >= 10) return
      this.nums += 1
      this.change()
    },
    change () {
      clearTimeout(this.t)
      this.t = setTimeout(() => {
        this.$emit('change', this.nums)
      }, 500)
    }
  }
}
</script>
