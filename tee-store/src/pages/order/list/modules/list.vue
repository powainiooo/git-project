<style scoped>
.order-list { width: 100%; height: calc(100vh - 370px); background-color: #ffffff; box-sizing: border-box; }
.list-item { margin-bottom: 35px; margin-top: 35px; }
</style>

<template>
<scroll-view scroll-y class="order-list" :lower-threshold="100" @scrolltolower="touchBottom">
  <div class="list-item" v-for="item in 5" :key="item">
    <item />
  </div>
</scroll-view>
</template>

<script type='es6'>
import item from './item'
import item2 from './item2'
export default {
	name: 'app',
  components: {
    item,
    item2
  },
  props: {
	  type: Number
  },
	data() {
		return {}
	},
	methods: {
    touchBottom () {
      console.log('touchBottom')
    }
  }
}
</script>
