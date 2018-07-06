<style>
    .about-tag{ width: 1440px; height: 120px; border-bottom: 1px solid #e5e5e5; position: absolute; top: 790px; left: 50%; margin-left: -720px; display: flex; justify-content: space-around; align-items: center; background-color: #fff; z-index: 500;}
    .about-tag li{ width: 150px; height: 30px; display: flex; justify-content: center; align-items: center; font-size: 14px; cursor: pointer;}
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
    .contact .wechat{ margin-top: 58px;}
    .contact .wechat p{ margin-top: 30px; font-size: 14px; line-height: 1.5;}
    .contact .wechat p span{ color: #c29832; display: block;}
    .contact .qrcode{ position: absolute; bottom: 0; left: 230px;}

    .team .content{ width: 500px; font-size: 14px; line-height: 1.8; margin-bottom: 40px;}

    .member-item{ position: relative; float: left; margin: 0 14px 28px 14px; font-size: 0;}
    .member-item div{ width: 100%; height: 100%; background-color: rgba(0,0,0,0.5); font-size: 30px; display: flex; justify-content: center; align-items: center; position: absolute; top: 0; left: 0; color: #fff; opacity: 0;}
    .member-item:hover div{ opacity: 1;}

    .services{ border-bottom: none; margin-bottom: 0;}
    .pro-tag-list{ overflow: hidden;}
    .pro-tag-list li{ width: 25%; float: left; display: flex;}
    .pro-tag-list li:nth-child(4n+2){ justify-content: center;}
    .pro-tag-list li:nth-child(4n+3){ justify-content: center;}
    .pro-tag-list li:nth-child(4n+4){ justify-content: flex-end;}
    .pro-tag-list li a{ display: flex; align-items: flex-end;}
    .pro-tag-list li h3{ color: #fff; font-size: 200px; -webkit-text-stroke:2px #9ea09f;}
    .pro-tag-list li div{ color: #000; font-size: 32px; margin-bottom: 40px; margin-left: -20px;}
    .pro-tag-list li a:hover h3{-webkit-text-stroke:2px #be9833; color: #be9833;}
</style>

<template>
    <div>
        <top-nav></top-nav>
        <body-frame>
            <section style="font-size: 0;"><img :src="aboutData.bannerUrl" width="1440" height="665"> </section>
            <ul class="about-tag" ref="aboutTag">
                <li :class="activeIndex == 1 ? 'active':''" @click="setTop(710)">公司簡介</li>
                <li :class="activeIndex == 2 ? 'active':''" @click="setTop(1075)">聯繫方式</li>
                <li :class="activeIndex == 3 ? 'active':''" @click="setTop(1685)">團隊成員</li>
                <li :class="activeIndex == 4 ? 'active':''" @click="setTop(2150)">業務範圍</li>
            </ul>

            <section class="profile">
                <div class="about-title">
                    <p>01</p>
                    <h3>公司簡介<span>profile</span></h3>
                </div>
                <div class="hkLight" style="width: 500px;">{{about.intro}}</div>
                <div class="hkLight">{{about.idea}}</div>
            </section>

            <section class="contact">
                <div class="about-title">
                    <p>02</p>
                    <h3>聯繫方式<span>contact</span></h3>
                </div>
                <img :src="contact.domain_url+contact.mapImg" width="500" height="450">
                <div style="width: 625px; position: relative;">
                    <ul class="infos hkLight">
                        <li>
                            <p>The contact<br>聯繫人</p>
                            <p>{{contact.contact}}</p>
                        </li>
                        <li>
                            <p>E-mail<br>電子郵箱</p>
                            <p>{{contact.email}}</p>
                        </li>
                        <li>
                            <p>Phone<br>手機</p>
                            <p>{{contact.mobile}}<br>{{time_slot}}</p>
                        </li>
                        <li>
                            <p>Address<br>地址</p>
                            <p>{{contact.address}}</p>
                        </li>
                    </ul>
                    <div class="wechat">
                        <img :src="contact.domain_url+contact.ewm_url">
                        <p><span>TAU</span>头牌文化传播</p>
                    </div>
                    <div class="qrcode"><img src="../assets/images/qrcode.png" width="100" height="100"> </div>
                </div>
            </section>

            <section class="team">
                <div class="about-title">
                    <p>03</p>
                    <h3>團隊成員<span>team</span></h3>
                </div>
                <div style=" width: 1280px;">
                    <div class="content">{{team.intro}}</div>
                    <ul class="item-list clearfix">
                        <li class="member-item" v-for="(item,index) in team.list" :key="index">
                            <img :src="item.imgUrl" width="265" height="210">
                            <div>{{item.name}}</div>
                        </li>
                    </ul>
                </div>
            </section>

            <section class="team services">
                <div class="about-title">
                    <p>04</p>
                    <h3>業務範圍<span>services</span></h3>
                </div>
                <div style=" width: 1280px;">
                    <div class="content">{{services.intro}}</div>
                    <ul class="pro-tag-list">
                        <li v-for="(item,index) in cateList">
                            <a href="#">
                                <h3>{{index+1}}</h3>
                                <div>{{item.name}}</div>
                            </a>
                        </li>
                    </ul>
                </div>
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
        mounted(){
            this.tCheck = setInterval(this.intervalCheck,60);
            let top = this.$route.params.top || 0;
            document.body.scrollTop = top;
            document.documentElement.scrollTop = top;

            this.$store.dispatch('doGetCate');
            this.$store.dispatch('doGetAbout');
        },
        data(){
            return{
                activeIndex:0,
                tCheck:0,
                about:{},
                contact:{},
                team:{},
                services:{}
            }
        },
        computed:{
            cateList(){
                return this.$store.state.cateList
            },
            aboutData(){
                let aboutData = this.$store.state.aboutData;
                this.about = aboutData.about;
                this.contact = aboutData.contact;
                this.team = aboutData.team;
                this.services = aboutData.services;
                return aboutData
            }
        },
        methods:{
            intervalCheck(){
                var st = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
                console.log(st);
                if(st >= 710){
                    this.$refs.aboutTag.style.position = 'fixed';
                    this.$refs.aboutTag.style.top = '80px';
                    if(st >= 710 && st < 1075){
                        this.activeIndex = 1;
                    }else if(st >= 1075 && st < 1685){
                        this.activeIndex = 2;
                    }else if(st >= 1685 && st < 2150){
                        this.activeIndex = 3;
                    }else if(st >= 2150){
                        this.activeIndex = 4;
                    }
                }else{
                    this.$refs.aboutTag.style.position = 'absolute';
                    this.$refs.aboutTag.style.top = '790px';
                }
            },
            setTop(pos){
                document.body.scrollTop = pos;
                document.documentElement.scrollTop = pos;
            }
        },
        beforeRouteLeave (to, from, next){
            clearInterval(this.tCheck);
            next();
        }
    }

</script>

