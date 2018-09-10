<style>
    .pro-example{ position: fixed; top: 50%; left: 50px; margin-top: -170px;}
    .pro-example .line-t{ position: absolute; top: 15px; left: -25px;}
    .pro-example .line-m{ position: absolute; top: 100px; left: -25px;}
    .pro-example .line-b{ position: absolute; top: 288px; left: -25px;}
    .pro-example .line-l{ position: absolute; top: -40px; left: 18px;}
    .pro-example .line-r{ position: absolute; top: -40px; left: 348px;}
    .pro-example .line-d{ position: absolute; top: 202px; right: 5px;}
    .pro-example .btns{ width: 270px; margin-top: 80px; margin-left: 20px;}
    .breath{ animation:breath 1.2s ease-in-out 2;}
    @keyframes breath {
        0%,80%,100%{ opacity: 1;}
        40%{ opacity: 0.1;}
    }
    .anim05{ animation-duration: 0.3s}
    .pro-example .new-hint{ position: absolute; top: 70px; left: 460px;}
</style>

<template>
    <div class="pro-example">
        <transition enter-active-class="animated anim05 fadeIn">
            <img src="@/assets/img/ticket.png" v-if="showImg">
        </transition>
        <transition enter-active-class="animated anim05 slideInLeft">
        <div class="line-t" v-if="showLineT"><img src="@/assets/img/line-h.png"></div>
        </transition>
        <transition enter-active-class="animated anim05 slideInRight">
        <div class="line-m" v-if="showLineM"><img src="@/assets/img/line-h.png"></div>
        </transition>
        <transition enter-active-class="animated anim05 slideInLeft">
        <div class="line-b" v-if="showLineB"><img src="@/assets/img/line-h.png"></div>
        </transition>
        <transition enter-active-class="animated anim05 slideInDown">
        <div class="line-l" v-if="showLineL"><img src="@/assets/img/line-v.png"></div>
        </transition>
        <transition enter-active-class="animated anim05 slideInUp">
        <div class="line-r" v-if="showLineR"><img src="@/assets/img/line-v.png"></div>
        </transition>
        <transition enter-active-class="animated anim05 fadeIn">
        <div class="line-d" v-if="showLineD"><img src="@/assets/img/line-d.png"></div>
        </transition>
        <transition enter-active-class="animated anim05 bounceIn">
        <div class="btns" :class="className" v-if="showLineBtn"><t-button extraClass="white" @dotap="gotoNewitem">发布新活动</t-button></div>
        </transition>
        <transition enter-active-class="animated slideInRight">
        <div class="new-hint" v-if="showImg"><img src="@/assets/img/new-hint.png"> </div>
        </transition>
    </div>
</template>

<script type='es6'>
    import TButton from '@/components/common/TButton.vue'
    export default {
        name: 'app',
        components:{TButton},
        data(){
            return{
                className:'',
                showImg:false,
                showLineT:false,
                showLineM:false,
                showLineB:false,
                showLineL:false,
                showLineR:false,
                showLineD:false,
                showLineBtn:false
            }
        },
        mounted(){
            let space = 150,start = 500;
            setTimeout(()=>{
                this.showImg = true;
            },start);
            setTimeout(()=>{
                this.showLineT = true;
            },start+space);
            setTimeout(()=>{
                this.showLineD = true;
            },start+space*2);
            setTimeout(()=>{
                this.showLineM = true;
            },start+space*3);
            setTimeout(()=>{
                this.showLineR = true;
            },start+space*4);
            setTimeout(()=>{
                this.showLineB = true;
            },start+space*5);
            setTimeout(()=>{
                this.showLineL = true;
            },start+space*6);
            setTimeout(()=>{
                this.showLineBtn = true;
            },start+space*7);
            setTimeout(()=>{
                this.className = 'breath';
            },start+space*8+1000);
        },
        methods:{
            gotoNewitem(){
                this.$store.commit('setEditorData');
                this.$router.push('publish')
            }
        }
    }

</script>

