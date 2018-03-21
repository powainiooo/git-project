<style>
    .footer-nav{ position: fixed; bottom:0; left: 0; right:0; z-index: 500; border-bottom: 2px solid #000;}
    .footer-nav .btn-share{ position: absolute; left: 60px; bottom: 30px;}
    .footer-nav .lines{ width: 287px; margin: 0 auto; overflow: hidden; position: relative;}
    .footer-nav .lines li{ width: 1px; height: 2px; background-color: #fff; float: left; margin-right: 40px;}
    .footer-nav .lines .bar{ width: 40px; height: 2px; background-color: #fff; position: absolute; left: 1px; bottom: 0; transition:all 0.5s cubic-bezier(.76,.05,.28,.96) ;}
    .footer-nav .btn-customer{ position: absolute; right: 60px; bottom: 30px;}
</style>

<template>
    <div class="footer-nav">
        <a href="#" class="btn-share"><img src="../assets/images/share-bottom.png"> </a>
        <div class="lines">
            <ul>
                <li v-for="item in 7"></li>
            </ul>
            <div class="bar" :style="{left:((index-1)*40+index)+'px'}"></div>
        </div>
        <a href="#" class="btn-customer"><img src="../assets/images/share-bottom.png"> </a>
    </div>
</template>

<script type="es6">
    export default{
        name: 'App',
        props:['index'],
        data(){
            return{

            }
        }
    }

</script>

