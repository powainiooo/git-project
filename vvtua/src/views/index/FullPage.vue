<style>
    #pageContain {
        overflow: hidden;
        position: relative;
    }
    .page {
        display: none;
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: absolute;
        top: 0;
        left: 0;
    }
    .contain {
        width: 100%;
        height: 100%;
        display: table;
        position: relative;
        z-index: 0;
    }
    .contain>div{
        display: table-cell;
        vertical-align: middle;
    }
    .current {
        display: block;
        z-index: 1;
    }
    .slide {
        display: block;
        z-index: 2;
    }
    .swipe {
        display: block;
        z-index: 3;
        transition-duration: 0ms !important;
        -webkit-transition-duration: 0ms !important;
    }
    .page1 {
        width: 100%; height: 100%; background: url('../../assets/images/page1bg.jpg') no-repeat; background-size: cover; background-position: right center;
    }
    .page2 {
        background: #fff;
    }
    .page3 {
        background: #fff;
    }
    .page4 {
        background: #fff;
    }
    #navBar {
        z-index: 3;
        position: absolute;
        top: 50%;
        left: 4%;
        margin-top: -100px;
    }
    #navBar .active {
        background: #bc9e44;
        width: 12px;
        height: 12px;
        margin-left: -3px;
    }
    #navBar li {
        cursor: pointer;
        margin-bottom: 20px;
        transition: all .7s ease;
        border-radius: 50%;
        text-align: center;
        width: 6px;
        height: 6px;
        background-color: #000;
    }
    .page2 .page2-content{ width: 1420px; margin: 0 auto;}
    .page2 .img-list{ width: 870px; float: left; margin-bottom: 100px;}
    .page2 .img-list li{ width: 280px; height: 280px; float: left; margin: 5px; box-shadow: 0 20px 50px rgba(0,0,0,0.2),0 -20px 50px rgba(0,0,0,0.2);}
    .page2 .infor{ float: left; margin: 230px 0 0 60px;}
    .page2 .infor h3{ font-weight: lighter; font-size: 30px; margin-bottom: 50px;}
    .page2 .infor div{ width: 480px; font-size: 16px; font-weight: bold; line-height: 1.5;}

    .page3 .page3-content{ width: 1340px; margin: 0 auto;}
    .page3 .img-list{ width: 600px; float: left; margin-bottom: 100px;}
    .page3 .img-list li{ width: 120px; height: 120px; float: left;}
    .page3 .infor{ float: left; margin: 50px 130px 0 0;}
    .page3 .infor h3{ font-weight: lighter; font-size: 30px; margin-bottom: 40px;}
    .page3 .infor div{ width: 480px; font-size: 16px; font-weight: bold; line-height: 1.5;}

    .page4 .page4-content{ width: 1440px; margin: 0 auto; position: relative;}
    .page4 .img-list{ overflow: hidden; margin-bottom: 100px;}
    .page4 .img-list li{ width: 220px; height: 300px; margin: 10px; float: left; background-color: #eaeaea;}
    .page4 .infor{ position: absolute; bottom: 140px; right: 80px;}
    .page4 .infor h3{ font-weight: lighter; font-size: 30px; margin-bottom: 40px;}
    .page4 .infor div{ width: 480px; font-size: 16px; font-weight: bold; line-height: 1.5;}


</style>

<template>
    <div>
        <div id="pageContain">
            <div class="page page1 current"></div>

            <div class="page page2 ">
                <div class="contain">
                    <div>
                        <div class="clearfix page2-content">
                            <ul class="img-list">
                                <li><img src='../../assets/images/img1.jpg'></li>
                                <li><img src='../../assets/images/img2.jpg'></li>
                                <li><img src='../../assets/images/img3.jpg'></li>
                                <li><img src='../../assets/images/img4.jpg'></li>
                                <li><img src='../../assets/images/img5.jpg'></li>
                                <li><img src='../../assets/images/img6.jpg'></li>
                            </ul>
                            <div class="infor">
                                <h3>专业</h3>
                                <div>はガラパゴス諸島へ旅をしました。人の手が加わっていないありのままの自然を見つめることで、<br>
                                    人の暮らしや幸せについて改めて考え、その体験を共有しようという試みです。プロジェクト全体の<br>
                                    コミュニケーションデザインを手掛けており、Webサイトでは旅の行程や写真、映像、文章を簡潔に見せています</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="page page3">
                <div class="contain">
                    <div>
                        <div class="clearfix page3-content">
                            <div class="infor">
                                <h3>合 作 品 牌</h3>
                                <div>はガラパゴス諸島へ旅をしました。人の手が加わっていないありのままの自然を見つめることで、<br>
                                    人の暮らしや幸せについて改めて考え、その体験を共有しようという試みです。プロジェクト全体の<br>
                                    コミュニケーションデザインを手掛けており、Webサイトでは旅の行程や写真、映像、文章を簡潔に見せています</div>
                            </div>
                            <ul class="img-list">
                                <li><img src='../../assets/images/logo1.jpg'></li>
                                <li><img src='../../assets/images/logo2.jpg'></li>
                                <li><img src='../../assets/images/logo3.jpg'></li>
                                <li><img src='../../assets/images/logo4.jpg'></li>
                                <li><img src='../../assets/images/logo5.jpg'></li>
                                <li><img src='../../assets/images/logo6.jpg'></li>
                                <li><img src='../../assets/images/logo7.jpg'></li>
                                <li><img src='../../assets/images/logo8.jpg'></li>
                                <li><img src='../../assets/images/logo9.jpg'></li>
                                <li><img src='../../assets/images/logo10.jpg'></li>
                                <li><img src='../../assets/images/logo11.jpg'></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div class="page page4">
                <div class="contain">
                    <div>
                        <div class="clearfix page4-content">
                            <ul class="img-list">
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                            </ul>
                            <div class="infor">
                                <h3>成 员</h3>
                                <div>はガラパゴス諸島へ旅をしました。人の手が加わっていないありのままの自然を見つめることで、<br>
                                    人の暮らしや幸せについて改めて考え、その体験を共有しようという試みです。プロジェクト全体の<br>
                                    コミュニケーションデザインを手掛けており、Webサイトでは旅の行程や写真、映像、文章を簡潔に見せています</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <ul id="navBar">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ul>
        <div class="logo-index"><img src="@/assets/images/logofix2.png"> </div>
    </div>
</template>

<script type='es6'>
    import FullPage2 from '@/assets/js/fullPage.js'
    export default {
        name: 'app',
        mounted(){
            let runPage = new FullPage2({
                id : 'pageContain',                            // id of contain
                slideTime : 800,                               // time of slide
                continuous : true,                             // create an infinite feel with no endpoints
                effect : {                                     // slide effect
                    transform : {
                        translate : 'Y',				   // 'X'|'Y'|'XY'|'none'
                        scale : [1, 1],				   // [scalefrom, scaleto]
                        rotate : [0, 0]				   // [rotatefrom, rotateto]
                    },
                    opacity : [0, 1]                       // [opacityfrom, opacityto]
                },
                mode : 'wheel,touch,nav:navBar',               // mode of fullpage
                easing : 'ease'                                // easing('ease','ease-in','ease-in-out' or use cubic-bezier like [.33, 1.81, 1, 1];
                //  ,beforeChange : function(index, thisPage) {   // callback before pageChange
                //    return 'stop';
                //  }
                //  ,callback : function(index, thisPage) {       // callback when pageChange
                //    alert(index);
                //  };
            });
        },
        data(){
            return{

            }
        }
    }

</script>

