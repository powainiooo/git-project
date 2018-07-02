<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
    @font-face {
        font-family: 'hkMedium';
        src:url('assets/font/PingFang-HK-Medium.ttf');
    }
    @font-face {
        font-family: 'hkLight';
        src:url('assets/font/PingFang-HK-Ultralight.ttf');
    }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
