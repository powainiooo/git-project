<style>
    @import '../assets/css/layout.css';
    @import '../assets/css/animate.css';
    .tsd{ animation-duration: 0.5s;}
</style>

<template>
    <div class="page-frame">
        <div class="title">ABOUT</div>
        <transition enter-active-class="animated tsd slideInUp">
        <div class="about-frame" v-if="intro != ''">
            <a href="javascript:;"><img src="@/assets/images/logo.png"></a>
            <div v-html="intro"></div>
        </div>
        </transition>
        <footer-nav></footer-nav>
    </div>
</template>

<script type="es6">
    import FooterNav from '@/components/FooterNav'
    export default{
        name: 'aboutus',
        components:{FooterNav},
        mounted(){
            this.init();
        },
        data(){
            return{
                intro:''
            }
        },
        methods:{
            init(){
                let self = this;
                self.$ajax.get('/admin/api/ajax_about').then((res)=>{
                    var data = res.data;
                    self.intro = data.intro;
                })
            }
        }
    }

</script>

