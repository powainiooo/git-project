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
        display: none;
        position: relative;
        z-index: 0;
    }
    .current .contain,.slide .contain {
        display: block;
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
        background: #009922;
    }
    .page3 {
        background: #992211;
    }
    .page4 {
        background: #ff00ff;
    }
    .page5 {
        background: #00ff00;
    }
    .page6 {
        background: #22ffff;
    }
    #navBar {
        z-index: 3;
        position: absolute;
        top: 50%;
        left: 4%;
        margin-top: -40px;
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
</style>

<template>
    <div>
        <div id="pageContain">
            <div class="page page1 "><div class="contain"></div></div>

            <div class="page page2 current"><div class="contain"></div></div>

            <div class="page page3"><div class="contain"></div></div>

            <div class="page page4"><div class="contain"></div></div>
        </div>
        <ul id="navBar">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ul>
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

