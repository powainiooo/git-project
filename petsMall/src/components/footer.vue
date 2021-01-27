<style>
.c-footer { width: 100%; height: 200px; position: fixed; left: 0; bottom: 0; z-index: 1000; display: flex; box-shadow: 0 -5px 8px rgba(0, 0, 0, .05); }
.c-footer button { flex: 1; box-sizing: border-box; padding-top: 60px; border: none; font-size: 36px; color: var(--textColor); text-shadow: var(--textShadow); background-color: #E8E6E4; line-height: 1; }
.c-footer button span { font-size: 40px; font-family: Helve; }
</style>

<template>
<div class="c-footer">
   <button>{{titleArr[0]}}| {{titleArr[1]}}</button>
</div>
</template>

<script type='es6'>
export default {
   name: 'app',
   props: {
      btnName: String
   },
   data () {
      return {}
   },
   computed: {
      titleArr () {
         return this.btnName.split('|')
      }
   },
   methods: {}
}
</script>
