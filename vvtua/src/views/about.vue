<style>
    @import '../assets/css/layout.css';
    .bg1{ background-color: #171918;}
    .about-frame{ width: 1130px; height: 100%; margin: 0 auto; display: table; overflow: hidden;}
    .about-frame>div{ display: table-cell; vertical-align: middle;}
    .page-title{ font-size: 24px; font-family: 'trajanPro'; color: #bc9e44;}
    .about-content{ font-size: 14px; color: rgba(255,255,255,0.5); line-height: 1.5;}
</style>

<template>
    <div class="page-frame bg1">
        <div class="logo-index"><router-link to="/index"><img src="@/assets/images/logofix1.png"></router-link> </div>
        <div class="btn-back-index"><router-link to="/index"><img src="@/assets/images/btn-close.png"></router-link> </div>
        <div class="about-frame">
            <div>
                <div class="clearfix" style="margin-bottom: 100px;">
                    <div class="pull-left" style="width: 480px">
                        <h3 class="page-title">ABOUT</h3>
                        <div class="about-content" style="margin-top: 60px;">{{aboutData.intro}}</div>
                    </div>
                    <div class="pull-right" style="width: 480px">
                        <div class="about-content" style="margin-top: 96px;">{{aboutData.idea}}</div>
                    </div>
                </div>
            </div>
        </div>
        <bottom-nav posLeft=60></bottom-nav>
    </div>
</template>

<script type="es6">
    import BottomNav from '@/components/BottomNav.vue'
    export default{
        name: 'about',
        components: {BottomNav},
        mounted(){
            this.$store.dispatch('doGetAbout')
        },
        data(){
            return{

            }
        },
        computed:{
            aboutData(){
                return this.$store.state.aboutData
            }
        }
    }

</script>

