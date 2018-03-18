<style>
    .bottom-nav{ width: 100%; height: 100px; background-color: #171918; position: fixed; bottom: 0; left: 0;  z-index: 1000; box-shadow: 0 -10px 20px rgba(0,0,0,0.2); -webkit-box-shadow: 0 -10px 20px rgba(0,0,0,0.2); -moz-box-shadow: 0 -10px 20px rgba(0,0,0,0.2); color: #fff;}
    .bottom-nav a{ width:268px; height:60px;display: block; margin: 15px 0 0 40px; position: relative; z-index: 1001;}
    /*background: url('../assets/images/logo.png') no-repeat; background-size: 100% 100%; position: relative; z-index: 1001;*/
    .bottom-nav img{ width: 100%;}
</style>

<template>
    <div class="bottom-nav">
        <a href="javascript:;">
            <img src="@/assets/images/logo2.png">
        </a>
    </div>
</template>

<script type="es6">
    export default{
        name: 'App',
        data(){
            return{

            }
        }
    }

</script>

