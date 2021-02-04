<style>
.c-date-mark { margin: 30px 20px; display: flex; flex-wrap: wrap; }
.c-date-mark li { width: 98px; height: 98px; border-radius: 10px; background-color: #E8E6E4; display: flex; justify-content: center; align-items: center; margin: 0 10px 20px 10px; }
.c-date-mark li span { color: #A6A5A5; font-size: 66px; font-family: HelveThin; }
.c-date-mark li img { width: 74px; height: 70px; }
.c-date-mark li.active { background-color: var(--mainColor); }
.c-date-mark li.active span { color: #ffffff; text-shadow: var(--textShadow); }
</style>

<template>
<ul class="c-date-mark">
   <li>
      <img src="/static/images/catbox/radio-select2.png" />
   </li>
   <li class="active"><span>2</span></li>
   <li><span>3</span></li>
   <li><span>4</span></li>
   <li><span>5</span></li>
   <li><span>6</span></li>
</ul>
</template>

<script type='es6'>
export default {
  name: 'app',
  data () {
    return {}
  },
  methods: {}
}
</script>
