<style>
    @import '../../assets/css/layout.css';
</style>

<template>
    <div class="page-frame">
        <transition name="fade">
            <guide v-show="isGuide" @doInto="doInto"></guide>
        </transition>
        <full-page></full-page>
        <bottom-nav :showNav="!isGuide"></bottom-nav>
    </div>
</template>

<script type="es6">
    import BottomNav from './../../components/BottomNav.vue'
    import Guide from './Guide.vue'
    import FullPage from './FullPage.vue'
    export default{
        name: 'index',
        components: {BottomNav,Guide,FullPage},
        data(){
            return {
                isGuide:true
            }
        },
        methods:{
            doInto(){
                this.isGuide = false;
            }
        }
    }
</script>

