<style>
    .top-nav{ width: 100%; position: fixed; top: 0; left: 0; z-index: 1000; background-color: #fff;}
    .top-nav section{ height: 50px; border-bottom: 1px solid #e5e5e5; display: flex; justify-content: space-between; align-items: center; padding: 0 3%;}
    .top-nav section .logo{ width: 80px;}
    .top-nav section a{ width: 30px; display: block;}

</style>

<template>
    <header class="top-nav">
        <section>
            <div class="logo" @click="gotoPage('/index',-4)"><img src="../assets/images/logo.png"> </div>
            <a href="javascript:;" @click="doShowMenu"><img src="../assets/images/btn-menu.png"> </a>
        </section>
    </header>
</template>

<script type="es6">
    export default{
        name: 'App',
        data(){
            return{
                activeIndex:-4//首页-1，全部-2，关于页-3
            }
        },
        methods:{
            gotoPage(name,index){
                this.activeIndex = index;
                this.$router.push(name)
            },
            doShowMenu(){
                this.$store.commit('setShowMenu',true)
            }
        }
    }

</script>

