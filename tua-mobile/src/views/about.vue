<style>
    .about-tag{ width: 94%; height: 60px; border-bottom: 1px solid #e5e5e5; position: absolute; top: 190px; left: 3%; display: flex; justify-content: space-around; align-items: center; background-color: #fff; z-index: 500;}
    .about-tag li{ width: 80px; height: 20px; display: flex; justify-content: center; align-items: center; font-size: 14px; cursor: pointer;}
    .about-tag li.active{ background-color: #000; color: #fff;}

    .profile{ margin-top: 90px;}
    .profile,.contact,.team{ border-bottom: 1px solid #e5e5e5; padding-bottom: 40px; margin-bottom: 40px; padding-left: 3%; padding-right: 3%;}
    .profile div{ font-size: 14px; line-height: 1.8; margin-bottom: 20px;}

    .about-title{ margin-bottom: 20px;}
    .about-title p{ font-size: 20px; margin-bottom: 15px;}
    .about-title h3{ font-size: 16px; font-weight: normal;}
    .about-title h3 span{ font-size: 10px; display: block;}

    .contact{ padding-bottom: 0;}
    .contact .infos li{ font-size: 14px; margin-bottom: 30px;}
    .contact .infos li p:first-child{ margin-bottom: 15px;}
    .contact .infos li p{ line-height: 1.8;}
    .contact .infos li p a{ padding: 6px 16px; border: 1px solid #000; border-radius: 20px; color: #000;}

    .team .content{font-size: 14px; line-height: 1.8; margin-bottom: 20px;}

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
                <img src="../assets/images/banner5.jpg">
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
                <div>何方 设计事务所（HO），是一个极具活力和创造性的设计团队。我们的主要设计师和技术总监都为 Instagram，zcool，cargocollective 的邀请人员。我们的设计都是为上海，北京，深圳，广州等国内大都市品牌以及国际品牌服务，例如广州万科黄埔仓，铂涛集团，南方电网，上海风暴音乐节，深圳中诚安信等制作视觉策划，VI 规范系统。相信我们的工作经验和资源网络为我们服务的项目提供现代化的视野，区别于日渐呆板化的传统设计公司，为企业</div>
                <div class="hkLight">策略 Strategy 设计策略是辨识设计条件和制定设计目标后指导设计工作开展的首要环节。我们对每一个问题的所有原因结果的探索出发来寻求一个最有效，最经济的到达目的的途径。策略是想象与理性的结合。它领先于所有组织及设计工作。 规划 Planning 规划是对资源潜能的见证，对有形无形的各种条件整合。是逻辑性的，空间性的和物质性的。 我们在规划中搭接各种元素的互生体系，研究持续发展的生态机制。通过设计上的控制，将生产成本降到最低，确保生产环节不出错。 视觉 Visua 我们把视觉看成一个对图形，文字，颜色的选择组合的过程，绝不形式决定，而是敏锐社会触觉的折射。我们还把视觉看成一个思想的构成，我们又把它看成一个通过实验并调整获得的知识构成。 生活风尚 Life Style 设计是生活的提炼，平面设计的就是对未来企业文化的或推测或引导的思辨过程。我们认为前卫的设计，不应该是离经叛道和脱离现实的；反之，真正意义上的前卫设计应该是熟知现实而不断超越和激发生活风尚的惊喜。</div>
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
                            <p>鄭茗友</p>
                        </li>
                        <li>
                            <p>E-mail<br>電子郵箱</p>
                            <p>27318589@qq.com</p>
                        </li>
                        <li>
                            <p>Phone<br>手機</p>
                            <p><a href="#">+86 137-2553-8273</a> <br>10:00am-7:00pm(工作日)</p>
                        </li>
                        <li>
                            <p>Address<br>地址</p>
                            <p>廣東省 深圳市 南山區 <br>科慧1路沛鴻大廈A2棟402</p>
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
                    <div class="content">
                        何方 设计事务所（HO），是一个极具活力和创造性的设计团队。我们的主要设计师和技术总监都为 Instagram，zcool，cargocollective 的邀请人员。我们的设计都是为上海，北京，深圳，广州等国内大都市品牌以及国际品牌服务，例如广州万科黄埔仓，铂涛集团，南方电网，上海风暴音乐节，深圳中诚安信等制作视觉策划，VI 规范系统。相信我们的工作经验和资源网络为我们服务的项目提供现代化的视野，区别于日渐呆板化的传统设计公司，为企业
                    </div>
                    <ul class="item-list clearfix">
                        <li class="member-item">
                            <img src="../assets/images/pro-list1.jpg" >
                            <div>TAU</div>
                        </li>
                        <li class="member-item">
                            <img src="../assets/images/pro-list2.jpg" >
                            <div>TAU</div>
                        </li>
                        <li class="member-item">
                            <img src="../assets/images/pro-list3.jpg" >
                            <div>TAU</div>
                        </li>
                        <li class="member-item">
                            <img src="../assets/images/pro-list4.jpg" >
                            <div>TAU</div>
                        </li>
                        <li class="member-item">
                            <img src="../assets/images/pro-list1.jpg" >
                            <div>TAU</div>
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
                    <div class="content">
                        何方 设计事务所（HO），是一个极具活力和创造性的设计团队。我们的主要设计师和技术总监都为 Instagram，zcool，cargocollective 的邀请人员。我们的设计都是为上海，北京，深圳，广州等国内大都市品牌以及国际品牌服务，例如广州万科黄埔仓，铂涛集团，南方电网，上海风暴音乐节，深圳中诚安信等制作视觉策划，VI 规范系统。相信我们的工作经验和资源网络为我们服务的项目提供现代化的视野，区别于日渐呆板化的传统设计公司，为企业
                    </div>
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
            }
        },
        methods:{
            intervalCheck(){
                var st = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
                console.log(st);
                let bh = this.$refs.banner.offsetHeight;
                let teamH = this.$refs.team.offsetHeight;
                if(st >= bh){
                    this.$refs.aboutTag.style.position = 'fixed';
                    this.$refs.aboutTag.style.top = '52px';
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
                    this.$refs.aboutTag.style.top = 52+bh+'px';
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

