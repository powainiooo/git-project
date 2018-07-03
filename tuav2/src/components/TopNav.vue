<style>
    .top-nav{ min-width: 1440px; width: 100%; position: fixed; top: 0; left: 0; z-index: 1000; background-color: #fff;}
    .top-nav section{ width: 1440px; margin: 0 auto; border-bottom: 2px solid #ededed;}
    .top-nav section .logo{ margin: 20px 0 15px 0; float: left;}
    .top-nav section nav{ float: left; margin-left: 60px;}
    .top-nav section nav .first-level{ display: flex; margin-top: 23px;}
    .top-nav section nav .first-level>li{ margin-right: 30px; position: relative; padding-bottom: 18px;}
    .top-nav section nav .first-level>li>a{ font-size: 14px; color: #010101;  text-align: center; display: block;}
    .top-nav section nav .first-level>li>a span{ transform: scale(0.7,0.7); display:block;}
    .top-nav section nav .first-level>li .second-level{ width: 90px; background-color: #000; position: absolute; top:56px; left: 50%; margin-left: -45px; display: none;}
    .top-nav section nav .first-level>li:hover .second-level{ display: block;}
    .top-nav section nav .first-level>li .second-level:before{ content: ''; width: 25px; height: 8px; background: url('../assets/images/arrow1.png') no-repeat; position: absolute; top: -7px; left: 32px;}
    .top-nav section nav .first-level>li .second-level li{ margin: 0 10px; border-bottom: 1px solid #fff;}
    .top-nav section nav .first-level>li .second-level li:last-child{ border-bottom: none;}
    .top-nav section nav .first-level>li .second-level li a{ padding: 10px 0; color: #fff; text-align: center; display: block;}
</style>

<template>
    <header class="top-nav">
        <section class="clearfix">
            <div class="logo"><img src="../assets/images/logo.png" width="115"> </div>
            <nav>
                <ul class="first-level hkLight">
                    <li>
                        <a href="#" class="hkLight">音樂<span class="hkMedium">MUSIC</span></a>
                        <ul class="second-level">
                            <li><a href="#">海報</a> </li>
                            <li><a href="#">HD</a> </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#" class="hkLight">平面<span class="hkMedium">GRAPHIC</span></a>
                    </li>
                    <li>
                        <a href="#" class="hkLight">繪畫<span class="hkMedium">PAINTING</span></a>
                    </li>
                    <li>
                        <a href="#" class="hkLight">影視<span class="hkMedium">VIDEO</span></a>
                    </li>
                    <li>
                        <a href="#" class="hkLight">關於<span class="hkMedium">ABOUT</span></a>
                    </li>
                </ul>
            </nav>
        </section>
    </header>
</template>

<script type="es6">
    export default{
        name: 'App',
        data(){
            return{
                cateID:0
            }
        },
        methods:{
            getList(id){
                this.cateID = id;
                this.$emit('getID',id);
            }
        },
        computed:{
            cateList(){
                return this.$store.state.cateList
            }
        }
    }

</script>

