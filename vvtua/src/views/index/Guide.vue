<style>
    .guide-frane{ position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-color: #171918; z-index: 500;}
    .guide-table{ width: 100%; height: 100%; display: table;}
    .guide-table>div{ display: table-cell; vertical-align: middle;}
    .guide-content{ margin-left: 20%;}
    .guide-content p{ width: 560px; font-size: 16px; color: rgba(255,255,255,0.5); margin-top: 85px; font-family: 'trajanPro'; line-height: 2; letter-spacing: 2px;}
    .guide-content div{ font-size: 14px; color: rgba(255,255,255,0.5); margin-top: 25px;}
    .guide-content a{ margin-top: 120px; display: inline-block;}
</style>

<template>
    <div class="guide-frane">
        <div class="guide-table">
            <div>
                <div class="guide-content">
                    <img src="../../assets/images/logo.png">
                    <p v-html="guide"></p>
                    <!--<div>{{guide}}</div>-->
                    <a href="javascript:;" @click="btnInto"><img src="../../assets/images/btn1.png"> </a>
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

            }
        },
        methods:{
            btnInto(){
                let self = this;
                self.$store.commit('doPassGuide')
            }
        }
    }

</script>

