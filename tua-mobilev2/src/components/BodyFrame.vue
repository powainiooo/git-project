<style>
    .btn-top{ position: fixed; bottom:180px; right: 100px; z-index: 500; }
</style>

<template>
    <section class="body-frame">
        <slot></slot>
        <a href="javascript:;" class="btn-top" @click="backTop"><img src="../assets/images/btn-top.png"> </a>
    </section>
</template>

<script type='es6'>
    export default {
        name: 'app',
        data(){
            return{

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

