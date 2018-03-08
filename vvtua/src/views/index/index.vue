<style>
    @import '../../assets/css/layout.css';
</style>

<template>
    <div class="page-frame">
        <guide v-show="isGuide"></guide>
        <full-page></full-page>
        <bottom-nav :showNav="!isGuide"></bottom-nav>
    </div>
</template>

<script type="es6">
    import BottomNav from './../../components/BottomNav.vue'
    import Guide from './Guide.vue'
    import FullPage from './FullPage.vue'
    export default{
        name: 'App',
        components: {BottomNav,Guide,FullPage},
        data(){
            return {
                isGuide:false
            }
        }
    }
</script>

