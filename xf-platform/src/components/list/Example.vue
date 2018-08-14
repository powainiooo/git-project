<style>
    .pro-example{ position: fixed; top: 50%; left: 50px; margin-top: -170px;}
    .pro-example .line-t{ position: absolute; top: 15px; left: -25px;}
    .pro-example .line-m{ position: absolute; top: 100px; left: -25px;}
    .pro-example .line-b{ position: absolute; top: 288px; left: -25px;}
    .pro-example .line-l{ position: absolute; top: -40px; left: 18px;}
    .pro-example .line-r{ position: absolute; top: -40px; left: 348px;}
    .pro-example .line-d{ position: absolute; top: 202px; right: 5px;}
    .pro-example .btns{ width: 270px; margin-top: 80px; margin-left: 20px; animation:breath 3s ease-in-out infinite;}
    @keyframes breath {
        0%,80%,100%{ opacity: 1;}
        40%{ opacity: 0.1;}
    }
</style>

<template>
    <div class="pro-example">
        <img src="@/assets/img/ticket.png">
        <div class="line-t"><img src="@/assets/img/line-h.png"></div>
        <div class="line-m"><img src="@/assets/img/line-h.png"></div>
        <div class="line-b"><img src="@/assets/img/line-h.png"></div>
        <div class="line-l"><img src="@/assets/img/line-v.png"></div>
        <div class="line-r"><img src="@/assets/img/line-v.png"></div>
        <div class="line-d"><img src="@/assets/img/line-d.png"></div>
        <div class="btns"><t-button extraClass="white">发布新活动</t-button></div>
    </div>
</template>

<script type='es6'>
    import TButton from '@/components/common/TButton.vue'
    export default {
        name: 'app',
        components:{TButton},
        data(){
            return{

            }
        },
        methods:{

        }
    }

</script>

