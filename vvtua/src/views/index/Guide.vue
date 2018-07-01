<style>
    @import '../../assets/css/animate.css';

    .guide-frane{ position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-color: #171918; z-index: 500;}
    .guide-table{ width: 100%; height: 100%; display: table;}
    .guide-table>div{ display: table-cell; vertical-align: middle;}
    .guide-content{ margin-left: 20%; position: relative;}
    .gif-logo{ position: absolute; top: 0; left: 0;}
    .guide-content p{ width: 560px; min-height: 228px; color: rgba(255,255,255,0.5); margin-top: 85px;}
    .guide-content p span{ font-size: 16px; font-family: 'trajanPro'; line-height: 2; letter-spacing: 2px;}
    .guide-content div{ height: 44px;margin-top: 20px; }
    .guide-content a{ display: inline-block;}
</style>

<template>
    <div class="guide-frane">
        <div class="guide-table">
            <div>
                <div class="guide-content">
                    <img src="../../assets/images/logo.png">
                    <img src="../../assets/images/logo.gif" class="gif-logo">

                    <p>
                        <transition
                            name="custom-classes-transition"
                            enter-active-class="animated fadeIn"
                            >
                        <span v-if="guide != ''" v-html="guide"></span>
                        </transition>
                    </p>
                    <!--<div>{{guide}}</div>-->

                    <div>
                        <transition
                            name="custom-classes-transition"
                            enter-active-class="animated bounceIn"
                            >
                        <a href="javascript:;" @click="btnInto" v-if="isGifOver"><img src="../../assets/images/btn1.png"> </a>
                        </transition>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="es6">
    export default{
        name: 'App',
        props:['guide'],
        data(){
            return{
                isGifOver:false
            }
        },
        mounted(){
            let self = this;
            setTimeout(()=>{
                self.isGifOver = true;
            },2000)
        },
        methods:{
            btnInto(){
                let self = this;
                self.$store.commit('doPassGuide')
            }
        }
    }

</script>

