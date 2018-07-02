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
    @import "assets/css/reset.css";
    @font-face {
        font-family: 'hkMedium';
        src:url('assets/font/PingFang-HK-Medium.ttf');
    }
    @font-face {
        font-family: 'hkLight';
        src:url('assets/font/PingFang-HK-Ultralight.ttf');
    }
    #app {
        font-family:'hkMedium', 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    .body-frame{ width: 1440px; min-width: 1440px; margin: 125px auto 60px auto;}
</style>
