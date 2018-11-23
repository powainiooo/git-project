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
    *{ margin: 0; padding: 0;}
    #app {
        font-family:"Micro Yahei", 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-size: 0.32rem;
    }
    img{ width: 100%;}
</style>
