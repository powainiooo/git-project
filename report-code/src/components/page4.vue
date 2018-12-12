<style>
    .page4-container{ height: 100vh; background-color: #EFF7FD;}
    .page4-container .bg{ width: 100%; position: absolute; left: 0; bottom: 0; font-size: 0;}
    .page4-container .page-title{ width: 29.6%;}

    .page4-container .text1{ width: 100%; position: absolute; left: 0; bottom: 8%; font-size: 0.28rem; color: #666666; text-align: center;}

    .page4-container .value-frame{ position: absolute; top:0.2rem;}
    .page4-container .value-frame .name{ font-size: 0.36rem; text-align: center; color: #333333; transform: scale(0.5);}
    .page4-container .value-frame .value{ font-size: 0.7rem; text-align: center; color: #2B5FD5; font-family: quartz; margin-top: -0.06rem;}
    .page4-container .value-frame .unit{ font-size: 0.24rem; text-align: center; color: #666666; margin-top: -0.1rem;}
    .page4-container .value-frame-elec{ left: 1.3rem;}
    .page4-container .value-frame-gas{ left: 4.28rem;}
</style>

<template>
    <section class="page4-container">
        <div class="bg">
            <img src="/static/images/bg4.jpg">

            <div class="value-frame value-frame-elec">
                <p class="name">百公里平均电耗</p>
                <p class="value">{{animElecValue}}</p>
                <p class="unit">kw.h</p>
            </div>
            <div class="value-frame value-frame-gas">
                <p class="name">百公里平均油耗</p>
                <p class="value">{{animGasValue}}</p>
                <p class="unit">L</p>
            </div>
        </div>
        <div class="next-arrow"><img src="@/assets/images/nextpage.png"> </div>
        <div class="page-title"><img src="@/assets/images/title4.png"> </div>

        <div class="page-context">
            <p>这一年，</p>
            <p>平均每公里花费<span class="tag2">{{animMiles}}</span>元</p>
            <p v-if="pageData.tag == '节能王者'">原来是传说中的<span class="tag1">{{pageData.tag}}？</span></p>
            <p v-if="pageData.tag == '太会省钱'">简直不要<span class="tag1">{{pageData.tag}}！</span></p>
            <p v-if="pageData.tag == '潜力股'">能耗一般，但是看好你哦，<span class="tag1">{{pageData.tag}}！</span></p>
            <p v-if="pageData.tag == '还能更省点'">努努力<span class="tag1">{{pageData.tag}}钱哦！</span></p>
            <p v-if="pageData.tag == '省省吧'">能耗有点高，<span class="tag1">{{pageData.tag}}！</span></p>
        </div>

        <div class="text1">计算参考　油: 6.86元/升　电: 0.68元/度</div>
    </section>
</template>

<script type='es6'>
    export default {
        name: 'app',
        data(){
            return{
                elecValue:0,
                gasValue:0,
                miles:0
            }
        },
        methods:{
            setValues(){
                TweenLite.to(this.$data,1,{elecValue:this.pageData.eCost});
                TweenLite.to(this.$data,1,{gasValue:this.pageData.oCost});
                TweenLite.to(this.$data,1,{miles:this.pageData.mCost});
            },
            resetValues(){
                this.elecValue = 0;
                this.gasValue = 0;
                this.miles = 0;
            }
        },
        computed:{
            animElecValue(){
                return this.elecValue.toFixed(1);
            },
            animGasValue(){
                return this.elecValue.toFixed(1);
            },
            animMiles(){
                return this.elecValue.toFixed(2);
            },
            pageData(){
                return this.$store.state.pageData.P4
            }
        }
    }

</script>

