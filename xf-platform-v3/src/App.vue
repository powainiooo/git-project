<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { postAction } from '@/utils'
export default {
  name: 'App',
  mounted () {
    postAction('/editor/common/init').then(res => {
      if (res.code === 1) {
        this.$store.commit('SET_CONFIG', res.data)
      }
    })
  }
}
</script>

<style>
@font-face {
  font-family: 'HelveThin';
  src: url('./assets/fonts/HelveticaNeueThin.ttf') format('woff2')
}
@font-face {
  font-family: 'HelveB';
  src: url('./assets/fonts/HelveticaNowDisplay-Bold.ttf') format('woff2')
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.helveT { font-family: HelveThin; }
.helveB { font-family: HelveB; }
</style>
