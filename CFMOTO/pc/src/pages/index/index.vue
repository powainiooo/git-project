<style>
@import "../../assets/reset.css";
   body { background-color: #000000;}
</style>

<template>
   <div id="app">
      {{name}}
   </div>
</template>

<script>
export default {
   name: 'index',
   data () {
      return {
         name: 'index1'
      }
   }
}
</script>
