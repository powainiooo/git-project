<style>
button { width: 100px; height: 50px;}
</style>
<template>
  <div class="about">
    <h1>This is an about page{{new Date().getTime()}}</h1>
     <button @click="play(true)" ref="btn">play</button>
     <button @click="btn">btn</button>
     <button @click="hold">hold</button>
     <audio src="../assets/over.mp3" id="audio" muted autoplay @canplay="canplay"></audio>
  </div>
</template>
<script>
export default {
   name: 'home',
   data () {
      return {
         muted: true
      }
   },
   mounted () {
      // this.hold()
   },
   methods: {
      hold () {
         setTimeout(() => {
            this.play()
         }, 2000)
      },
      btn () {
         console.dir(this.$refs.btn)
         this.$refs.btn.click()
      },
      canplay (e) {
         console.log('canplay', e)
      },
      play (muted) {
         let audio = document.getElementById('audio')
         console.dir(audio)
         audio.muted = muted
         audio.play()
         if (muted) {
            setTimeout(() => {
               this.play(false)
            }, 8000)
         }

      }
   }
}
</script>
