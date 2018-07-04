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
                <li class="hkLight">
                    <p>E-mail<br>電子郵箱</p>
                    <p>27318589@qq.com</p>
                </li>
                <li class="hkLight">
                    <p>Phone<br>手機</p>
                    <p>+86 137-2553-8273<br>10:00am-7:00pm(工作日)</p>
                </li>
                <li class="hkLight">
                    <p>Address<br>地址</p>
                    <p>廣東省 深圳市 南山區 <br>科慧1路沛鴻大廈A2棟402</p>
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
        methods:{
            gotoAbout(){
                this.$router.push({ name: 'about', params: { top: 1075 }})
            }
        }
    }

</script>

