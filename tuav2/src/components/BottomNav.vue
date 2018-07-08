<style>
    .bottom-nav{ width: 100%; min-width: 1440px; height: 230px; background-color: #171918; overflow: hidden;}
    .bottom-nav section{ width: 1440px; margin: 30px auto 0 auto; position: relative;}
    .bottom-nav .infos{ display: flex; margin-top: 40px;}
    .bottom-nav .infos li{ padding-right: 70px; margin-right: 70px; position: relative; display: flex;}
    .bottom-nav .infos li:after{ content: ''; width: 2px; height: 40px; background-color: #6b5927; position: absolute; top: 0; right: 0;}
    .bottom-nav .infos li:last-child:after{ width: 0;}
    .bottom-nav .infos li p{ font-size: 14px; line-height: 1.5; color: rgba(255,255,255,0.5);}
    .bottom-nav .infos li p:first-child{ margin-right: 40px;}
    .bottom-nav .copyright{ font-size: 12px; color: #fff; transform: scale(0.7,0.7); margin-top: 40px; transform-origin:0 0; color: rgba(255,255,255,0.5); }
    .bottom-nav .icon-wechat{ position: absolute; top: 90px; right: 0; cursor: pointer;}
</style>

<template>
    <footer class="bottom-nav">
        <section>
            <div class="logo"><img src="../assets/images/logo-bottom.png" width="115"> </div>
            <ul class="infos">
                <li>
                    <p>E-mail<br>電子郵箱</p>
                    <p>{{aboutData.email}}</p>
                </li>
                <li>
                    <p>Phone<br>手機</p>
                    <p>{{aboutData.mobile}}<br>{{aboutData.time_slot}}</p>
                </li>
                <li>
                    <p>Address<br>地址</p>
                    <p>{{aboutData.address}}</p>
                </li>
            </ul>
            <div class="icon-wechat" @click="gotoAbout"><img src="../assets/images/icon-wechat-bottom.png"> </div>
            <div class="copyright">Shenzhen TAUPAI Culture Communication Co.&copy;</div>
        </section>
    </footer>
</template>

<script type="es6">
    export default{
        name: 'App',
        data(){
            return{

            }
        },
        computed:{
            aboutData(){
                return this.$store.state.aboutData;
            }
        },
        mounted(){
            this.$store.dispatch('doGetAbout');
        },
        methods:{
            gotoAbout(){
                if(this.$route.name == 'about'){
                    this.$emit('clickWechat')
                }else{
                    this.$router.push({ name: 'about', params: { top: 1075 }})
                }
            }
        }
    }

</script>

