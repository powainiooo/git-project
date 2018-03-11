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
                        <div class="about-content" style="margin-top: 60px;">
                            はガラパゴス諸島へ旅をしました。人の手が加わっていないありのままの自然を見つめることで、<br>
                            人の暮らしや幸せについて改めて考え、その体験を共有しようという試みです。プロジェクト全体の<br>
                            コミュニケーションデザインを手掛けており、Webサイトでは旅の行程や写真、映像、文章を簡潔に見せています
                        </div>
                    </div>
                    <div class="pull-right" style="width: 480px">
                        <div class="about-content" style="margin-top: 96px;">
                            策略 Strategy<br>
                            设计策略是辨识设计条件和制定设计目标后指导设计工作开展的首要环节。我们对每一个问题的所有原因结果的探索出发来寻求一个最有效，最经济的到达目的的途径。策略是想象与理性的结合。它领先于所有组织及设计工作。<br>
                            规划 Planning<br>
                            规划是对资源潜能的见证，对有形无形的各种条件整合。是逻辑性的，空间性的和物质性的。 我们在规划中搭接各种元素的互生体系，研究持续发展的生态机制。通过设计上的控制，将生产成本降到最低，确保生产环节不出错。<br>
                            视觉 Visua<br>
                            我们把视觉看成一个对图形，文字，颜色的选择组合的过程，绝不形式决定，而是敏锐社会触觉的折射。我们还把视觉看成一个思想的构成，我们又把它看成一个通过实验并调整获得的知识构成。<br>
                            生活风尚 Life Style<br>
                            设计是生活的提炼，平面设计的就是对未来企业文化的或推测或引导的思辨过程。我们认为前卫的设计，不应该是离经叛道和脱离现实的；反之，真正意义上的前卫设计应该是熟知现实而不断超越和激发生活风尚的惊喜。
                        </div>
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
        data(){
            return{

            }
        }
    }

</script>

