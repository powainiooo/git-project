<style scoped>
.c-stepper { width: 166px; display: flex; align-items: center; }
.c-stepper-btn { width: 56px; height: 56px; }
.c-stepper-btn img { width: 100%; }
.c-stepper-num { width: 54px; text-align: center; font-size: 24px; color: #41372D; }
</style>

<template>
<div class="c-stepper">
  <div class="c-stepper-btn" @click="reduce"><img src="/static/images/reduce2.png" mode="widthFix" /></div>
  <span class="c-stepper-num">{{nums}}</span>
  <div class="c-stepper-btn" @click="add" v-if="canAdd"><img src="/static/images/add2.png" mode="widthFix" /></div>
</div>
</template>

<script type='es6'>
export default {
	name: 'app',
  props: {
	  value: {
	    type: [Number, String],
      default: 0
    },
    canAdd: {
	    type: Boolean,
      default: true
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
      if (this.nums === 1) {
        this.$emit('del')
      } else {
        this.nums -= 1
        this.change()
      }
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
