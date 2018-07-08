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
    .body-frame{margin: 50px 3% 60px 3%;}

    .recommend-title{ font-size: 16px; padding: 8px 0; border-bottom: 2px solid #ededed; background: url('assets/images/arrow2.png') no-repeat; background-position: 70px center; margin-bottom: 20px;}

    .item-list{ display: flex; flex-wrap: wrap; justify-content: space-between; margin-top: 70px;}
</style>
