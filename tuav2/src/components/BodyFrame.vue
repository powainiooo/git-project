<style>
    .btn-top{ position: absolute; bottom:-100px; right: 0; z-index: 500; }
</style>

<template>
    <section class="body-frame" :style="{'min-height':minHeight+'px'}">
        <slot></slot>
        <a href="javascript:;" class="btn-top" @click="backTop"><img src="../assets/images/btn-top.png"> </a>
    </section>
</template>

<script type='es6'>
    export default {
        name: 'app',
        data(){
            return{
                minHeight:window.innerHeight-185-230
            }
        },
        methods:{
            backTop(){
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
            }
        }
    }

</script>

