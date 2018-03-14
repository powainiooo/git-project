<style>
    @import '../../assets/css/layout.css';
</style>

<template>
    <div class="page-frame">
        <transition name="fade">
            <guide v-show="isGuide" @doInto="doInto" :guide="guide"></guide>
        </transition>
        <full-page :indexInfo="indexInfo" :domainUrl="domainUrl"></full-page>
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
        mounted(){
            this.$store.dispatch('doGetIndex')
        },
        data(){
            return {
                isGuide:true
            }
        },
        computed:{
            guide(){
                return this.$store.state.indexGuide
            },
            indexInfo(){
                return this.$store.state.indexInfo
            },
            domainUrl(){
                return this.$store.state.domainUrl
            }
        },
        methods:{
            doInto(){
                this.isGuide = false;
            }
        }
    }
</script>

