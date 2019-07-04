<style>

</style>

<template>
   <div>
      <gallery :images="images" :index="index" @close="index = null"></gallery>
   </div>
</template>

<script type="es6">
import VueGallery from 'vue-gallery'
import data from '@/data.json'
export default {
   name: 'App',
   components: {
      'gallery': VueGallery
   },
   data () {
      return {
         images: [
            'https://placekitten.com/801/800',
            'https://placekitten.com/802/800',
            'https://placekitten.com/803/800',
            'https://placekitten.com/804/800',
            'https://placekitten.com/805/800',
            'https://placekitten.com/806/800',
            'https://placekitten.com/807/800',
            'https://placekitten.com/808/800',
            'https://placekitten.com/809/800',
            'https://placekitten.com/810/800'
         ],
         index: 0
      }
   }
}
</script>
