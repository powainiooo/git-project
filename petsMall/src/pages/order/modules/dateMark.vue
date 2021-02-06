<style>
.c-date-mark { margin: 30px 20px 0 20px; display: flex; flex-wrap: wrap; }
.c-date-mark li { width: 98px; height: 98px; border-radius: 10px; background-color: #E8E6E4; display: flex; justify-content: center; align-items: center; margin: 0 10px 20px 10px; }
.c-date-mark li span { color: #A6A5A5; font-size: 66px; font-family: HelveThin; }
.c-date-mark li img { width: 74px; height: 70px; }
.c-date-mark li.active { background-color: var(--mainColor); }
.c-date-mark li.active span { color: #ffffff; text-shadow: var(--textShadow); }
</style>

<template>
<ul class="c-date-mark">
   <li v-for="item in list" :key="id" :class="{'active': item.is_finish === '1'}">
      <img src="/static/images/catbox/radio-select2.png" v-if="item.is_finish === '2'" />
      <span v-else>{{item.month}}</span>
   </li>
</ul>
</template>

<script type='es6'>
export default {
  name: 'app',
   props: {
     list: Array
   },
  data () {
    return {}
  },
  methods: {}
}
</script>
