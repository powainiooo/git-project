<style>
    .about-tag{ width: 1440px; height: 120px; border-bottom: 1px solid #e5e5e5; position: absolute; top: 790px; left: 50%; margin-left: -720px; display: flex; justify-content: space-around; align-items: center; background-color: #fff; z-index: 500;}
    .about-tag li{ width: 150px; height: 30px; display: flex; justify-content: center; align-content: center; font-size: 14px; cursor: pointer;}
    .about-tag li.active{ background-color: #000; color: #fff;}

    .profile{ margin-top: 155px;}
    .profile,.contact,.team{ display: flex; justify-content: space-between; border-bottom: 1px solid #e5e5e5; padding-bottom: 80px; margin-bottom: 80px;}
    .profile .hkLight{ width: 625px; font-size: 14px; line-height: 1.8;}
    .about-title p{ font-size: 14px; margin-bottom: 25px;}
    .about-title h3{ font-size: 14px; font-weight: normal;}
    .about-title h3 span{ font-size: 12px; display: block; transform: scale(0.7,0.7); transform-origin: 0 0;}

    .contact .infos li{ font-size: 14px; margin-bottom: 25px; display: flex;}
    .contact .infos li p:first-child{ width: 225px;}
    .contact .infos li p{ line-height: 1.8;}
</style>

<template>
    <div>
        <top-nav></top-nav>
        <body-frame>
            <section><img src="../assets/images/banner5.jpg" width="1440" height="665"> </section>
            <ul class="about-tag">
                <li class="active">公司簡介</li>
                <li>聯繫方式</li>
                <li>團隊成員</li>
                <li>業務範圍</li>
            </ul>

            <section class="profile">
                <div class="about-title">
                    <p>01</p>
                    <h3>公司簡介<span>profile</span></h3>
                </div>
                <div class="hkLight" style="width: 500px;">content1 content1 content1 content1 content1 content1 content1 content1 content1 content1 content1 content1 content1 content1 content1 content1 content1 content1 content1 content1 </div>
                <div class="hkLight">content2 content2 content2 content2 content2 content2 content2 content2 content2 content2 content2 content2 content2 content2 content2 content2 content2 content2 content2 content2 content2 content2 content2 content2 </div>
            </section>

            <section class="contact">
                <div class="about-title">
                    <p>02</p>
                    <h3>聯繫方式<span>contact</span></h3>
                </div>
                <img src="../assets/images/about-map.jpg" width="500" height="450">
                <div style="width: 625px;">
                    <ul class="infos hkLight">
                        <li>
                            <p>The contact<br>聯繫人</p>
                            <p>鄭茗友</p>
                        </li>
                        <li>
                            <p>E-mail<br>電子郵箱</p>
                            <p>27318589@qq.com</p>
                        </li>
                        <li>
                            <p>Phone<br>手機</p>
                            <p>+86 137-2553-8273<br>10:00am-7:00pm(工作日)</p>
                        </li>
                        <li>
                            <p>Address<br>地址</p>
                            <p>廣東省 深圳市 南山區 <br>科慧1路沛鴻大廈A2棟402</p>
                        </li>
                    </ul>
                </div>
            </section>

            <section class="team">
                <div class="about-title">
                    <p>03</p>
                    <h3>團隊成員<span>team</span></h3>
                </div>
                <div style=" width: 1280px;"></div>
            </section>
        </body-frame>
        <bottom-nav></bottom-nav>
    </div>
</template>

<script type="es6">
    import TopNav from '@/components/TopNav.vue'
    import BottomNav from '@/components/BottomNav.vue'
    import BodyFrame from '@/components/BodyFrame.vue'
    export default{
        name: 'App',
        components:{TopNav,BottomNav,BodyFrame},
        data(){
            return{

            }
        }
    }

</script>

