<style>
@import "../../assets/css/reset.css";
@import "../../assets/css/fonts.css";
   body { background-color: #000000; color: #fff}
</style>

<template>
   <div id="app">
      <z-header></z-header>
   </div>
</template>

<script>
import zHeader from '@/components/header.vue'
export default {
   name: 'index',
   components: { zHeader },
   data () {
      return {
         name: 'index1'
      }
   }
}
</script>
