<style>
    @import '../assets/css/layout.css';
</style>

<template>
    <div class="page-frame">
        <div class="title">ABOUT</div>
        <div class="about-frame">
            <img src="@/assets/images/logo.png">
            <div v-html="intro"></div>
        </div>
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

