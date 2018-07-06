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

    #app {
        font-family:'hkMedium',"Helvetica Neue","Helvetica","Arial",sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    img{ width: 100%;}
    .body-frame{margin: 52px 3% 60px 3%;}

    .recommend-title{ font-size: 16px; padding-bottom: 8px; border-bottom: 2px solid #ededed; background: url('assets/images/arrow2.png') no-repeat; background-position: 70px 5px; margin-bottom: 20px;}

    .item-list{ display: flex; flex-wrap: wrap; justify-content: space-between;}
</style>
