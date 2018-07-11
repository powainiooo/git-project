<style scoped>
    .about-tag{ width: 94%; height: 60px; border-bottom: 1px solid #e5e5e5; position: absolute; top: 190px; left: 3%; display: flex; justify-content: space-around; align-items: center; background-color: #fff; z-index: 500;}
    .about-tag li{ width: 80px; height: 20px; display: flex; justify-content: center; align-items: center; font-size: 14px; cursor: pointer;}
    .about-tag li.active{ background-color: #000; color: #fff;}

    .profile{ margin-top: 90px;}
    .profile,.contact,.team{ border-bottom: 1px solid #e5e5e5; padding-bottom: 40px; margin-bottom: 40px; padding-left: 3%; padding-right: 3%;}
    .profile div{ font-size: 14px; line-height: 1.8; margin-bottom: 20px; letter-spacing: 1.5px;}

    .about-title{ margin-bottom: 20px;}
    .about-title p{ font-size: 20px; margin-bottom: 15px;}
    .about-title h3{ font-size: 16px; font-weight: normal; letter-spacing: 1.5px;}
    .about-title h3 span{ font-size: 10px; display: block;}

    .contact{ padding-bottom: 0;}
    .contact .infos li{ font-size: 14px; margin-bottom: 30px;}
    .contact .infos li p:first-child{ margin-bottom: 15px;}
    .contact .infos li p{ line-height: 1.8;}
    .contact .infos li p a{ padding: 2px 16px; border: 1px solid #000; border-radius: 20px; color: #000; margin-bottom: 10px; display: inline-block;}

    .team .content{font-size: 14px; line-height: 1.8; margin-bottom: 20px; letter-spacing: 1.5px;}

    .member-item{ position: relative; width: 49%; margin-bottom: 2%; font-size: 0;}
    .member-item div{ color: #000; font-size: 12px; margin-top: 3%;}

    .services{ border-bottom: none; margin-bottom: 0;}
    .pro-tag-list{ display: flex; flex-wrap: wrap; overflow: hidden;}
    .pro-tag-list li{ width: 48%; display: flex; margin-bottom: 4%;}
    .pro-tag-list li:nth-child(4n+2){ justify-content: center;}
    .pro-tag-list li:nth-child(4n+3){ justify-content: center;}
    .pro-tag-list li:nth-child(4n+4){ justify-content: flex-end;}
    .pro-tag-list li a{ display: flex; align-items: flex-end;}
    .pro-tag-list li h3{ color: #fff; font-size: 140px; -webkit-text-stroke:2px #9ea09f;}
    .pro-tag-list li div{ color: #000; font-size: 20px; margin-bottom: 30px; margin-left: -10px;}
    .pro-tag-list li a:hover h3{-webkit-text-stroke:2px #be9833; color: #be9833;}
</style>

<template>
    <div>
        <top-nav></top-nav>
        <body-frame>
            <section style="font-size: 0; margin: 0 -3%;" ref="banner">
                <img :src="aboutData.domain_url+aboutData.cover">
            </section>
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
                <div v-html="aboutData.intro"></div>
                <div class="hkLight" v-html="aboutData.idea"></div>
            </section>

            <section class="contact">
                <div class="about-title">
                    <p>02</p>
                    <h3>聯繫方式<span>contact</span></h3>
                </div>
                <div style=" position: relative;">
                    <ul class="infos hkLight">
                        <li>
                            <p>The contact<br>聯繫人</p>
                            <p>{{aboutData.contact}}</p>
                        </li>
                        <li>
                            <p>E-mail<br>電子郵箱</p>
                            <p>{{aboutData.email}}</p>
                        </li>
                        <li>
                            <p>Phone<br>手機</p>
                            <p><a :href="'tel:'+getPhone(aboutData.mobile)" class="btn">{{aboutData.mobile}}</a> <br>{{aboutData.time_slot}}</p>
                        </li>
                        <li>
                            <p>Address<br>地址</p>
                            <p>{{aboutData.address}}</p>
                        </li>
                    </ul>
                </div>
            </section>

            <section class="team" ref="team">
                <div class="about-title">
                    <p>03</p>
                    <h3>團隊成員<span>team</span></h3>
                </div>
                <div>
                    <div class="content">{{aboutData.team}}</div>
                    <ul class="item-list clearfix">
                        <li class="member-item" v-for="(item,index) in teamList" :key="index">
                            <img :src="aboutData.domain_url+item.cover">
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
                <div>
                    <div class="content">{{aboutData.range}}</div>
                    <ul class="pro-tag-list">
                        <li v-for="(item,index) in cateList">
                            <a href="javascript:;"  @click="getList(index,item.id,0)">
                                <h3>{{index+1}}</h3>
                                <div>{{item.cname}}</div>
                            </a>
                        </li>
                    </ul>
                </div>
            </section>
        </body-frame>
    </div>
</template>

<script type="es6">
    import TopNav from '@/components/TopNav.vue'
    import BodyFrame from '@/components/BodyFrame.vue'
    export default{
        name: 'App',
        components:{TopNav,BodyFrame},
        mounted(){
            this.tCheck = setInterval(this.intervalCheck,60);
            let top = this.$route.params.top || 0;
            document.body.scrollTop = top;
            document.documentElement.scrollTop = top;
            this.$store.dispatch('doGetAbout');
        },
        data(){
            return{
                activeIndex:0,
                tCheck:0
            }
        },
        computed:{
            cateList(){
                return this.$store.state.cateList
            },aboutData(){
                return this.$store.state.aboutData;
            },
            teamList(){
                try{
                    return this.$store.state.aboutData.teams.list;
                }catch(err){
                    return []
                }
            }
        },
        methods:{
            getPhone(phone){
                return phone.replace(/\s/g,'').replace(/-/g,'');
            },
            intervalCheck(){
                var st = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
                console.log(st);
                let bh = this.$refs.banner.offsetHeight;
                let teamH = this.$refs.team.offsetHeight;
                if(st >= bh){
                    this.$refs.aboutTag.style.position = 'fixed';
                    this.$refs.aboutTag.style.top = '50px';
                    if(st >= bh && st < 1080){
                        this.activeIndex = 1;
                    }else if(st >= 1080 && st < 1740){
                        this.activeIndex = 2;
                    }else if(st >= 1740 && st < 1780 + teamH){
                        this.activeIndex = 3;
                    }else if(st >= 1780 + teamH){
                        this.activeIndex = 4;
                    }
                }else{
                    this.$refs.aboutTag.style.position = 'absolute';
                    this.$refs.aboutTag.style.top = 50+bh+'px';
                }
            },
            setTop(pos){
                document.body.scrollTop = pos;
                document.documentElement.scrollTop = pos;
            },
            getList(index,id,id2){
                this.$store.commit('setNavActiveIndex',index);
                this.$store.commit('setCateID',[id,id2]);
                if(this.$route.name != 'works'){
                    this.$router.push('/works');
                }else{
                    this.$emit('getID',[id,id2]);
                }
            }
        },
        beforeRouteLeave (to, from, next){
            clearInterval(this.tCheck);
            next();
        }
    }

</script>

