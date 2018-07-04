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

    .body-frame{ width: 1440px; min-width: 1440px; margin: 125px auto 60px auto;}

    .recommend-title{ font-size: 16px; padding-bottom: 8px; border-bottom: 2px solid #ededed; background: url('assets/images/arrow2.png') no-repeat; background-position: 70px 5px; margin-bottom: 40px;}

    .item-list{ margin: 0 -14px;}
</style>
