<style>
    .page7-container{ height: 100vh; background-color: #EFF7FD;}
    .page7-container .bg{ width: 100%; position: absolute; left: 0; bottom: 0; font-size: 0;}
    .page7-container .page-title{ width: 40.4%;}

    .page7-container .times-list{ width: 100%; height: 6rem; position: absolute; top: 30%; left: 0;}
    .page7-container .times-list li{ width: 30vw; height: 30vw; position: absolute; list-style: none; transform: scale(0);}
    .page7-container .times-list li.active{ transform: scale(1); transition: transform 0.4s cubic-bezier(.29,.73,.46,1.29);}
    .page7-container .times-list li div{ width: 100%; height: 100%; border: 2px solid #2B5FD5; border-radius: 50%; background-color: #FFFFFF; display: flex; justify-content: center; align-items: center; flex-direction: column; font-size: 0.32rem; color: #333333; padding-top: 0.24rem; box-sizing: border-box;}
    .page7-container .times-list li span.value{ font-size: 0.66rem; color: #2B5FD5;}
    .page7-container .times-list li:first-child{ left: 28%; top: 2rem;}
    .page7-container .times-list li:nth-child(2){ left: 60%; top: 1.4rem;}
    .page7-container .times-list li:nth-child(3){ left: 20%; top: 4.3rem;}
    .page7-container .times-list li:nth-child(4){ left: 10%; top: 0.2rem;}
    .page7-container .times-list li:nth-child(5){ left: 51%; top: 2.9rem;}
    .page7-container .times-list li:nth-child(6){ left: 40%; top: -0.1rem;}
    .page7-container .times-list li:nth-child(7){ left: 50%; top: 4.4rem;}
    .page7-container .times-list li:nth-child(8){ left: 5%; top: 2.8rem;}
    .page7-container .times-list li:nth-child(2) div{ border-color: #46B3E9; transform: scale(0.68);}
    .page7-container .times-list li:nth-child(3) div{ border-color: #EBA729; transform: scale(0.62);}
    .page7-container .times-list li:nth-child(4) div{ border-color: #777AD9; transform: scale(0.71);}
    .page7-container .times-list li:nth-child(5) div{ border-color: #94D977; transform: scale(0.56);}
    .page7-container .times-list li:nth-child(6) div{ border-color: #B677D9; transform: scale(0.53);}
    .page7-container .times-list li:nth-child(7) div{ border-color: #777AD9; transform: scale(0.48);}
    .page7-container .times-list li:nth-child(8) div{ border-color: #D97777; transform: scale(0.51);}

    .page7-container .times-list li.active:nth-child(2){ transition-delay: 0.1s;}
    .page7-container .times-list li.active:nth-child(3){ transition-delay: 0.2s;}
    .page7-container .times-list li.active:nth-child(4){ transition-delay: 0.3s;}
    .page7-container .times-list li.active:nth-child(5){ transition-delay: 0.4s;}
    .page7-container .times-list li.active:nth-child(6){ transition-delay: 0.5s;}
    .page7-container .times-list li.active:nth-child(7){ transition-delay: 0.6s;}
    .page7-container .times-list li.active:nth-child(8){ transition-delay: 0.7s;}

    .page7-container .times-list li.animate:nth-child(1){ animation: floatTag1 6s linear infinite 1s;}
    .page7-container .times-list li.animate:nth-child(2){ animation: floatTag2 5s linear infinite 1.1s;}
    .page7-container .times-list li.animate:nth-child(3){ animation: floatTag3 4s linear infinite 1.2s;}
    .page7-container .times-list li.animate:nth-child(4){ animation: floatTag1 4s linear infinite 1.3s;}
    .page7-container .times-list li.animate:nth-child(5){ animation: floatTag2 5s linear infinite 1.4s;}
    .page7-container .times-list li.animate:nth-child(6){ animation: floatTag3 6s linear infinite 1.5s;}
    .page7-container .times-list li.animate:nth-child(7){ animation: floatTag1 5s linear infinite 1.6s;}
    .page7-container .times-list li.animate:nth-child(8){ animation: floatTag2 4s linear infinite 1.7s;}

    @keyframes floatTag1 {
        0%,100%{ transform: translate(0,0);}
        12%{ transform: translate(-3px,-3px);}
        24%{ transform: translate(-5px,-5px);}
        36%{ transform: translate(-3px,-8px);}
        48%{ transform: translate(0,-10px);}
        60%{ transform: translate(3px,-8px);}
        72%{ transform: translate(5px,-5px);}
        84%{ transform: translate(3px,-3px);}
    }
    @keyframes floatTag2 {
        0%,100%{ transform: translate(0,0);}
        25%{ transform: translate(-5px,5px);}
        50%{ transform: translate(-10px,0);}
        75%{ transform: translate(-5px,-5px);}
    }
    @keyframes floatTag3 {
        0%,100%{ transform: translate(0,0);}
        12%{ transform: translate(-3px,-4px);}
        24%{ transform: translate(-6px,-5px);}
        36%{ transform: translate(-8px,-4px);}
        48%{ transform: translate(-11px,0);}
        60%{ transform: translate(-8px,4px);}
        72%{ transform: translate(-6px,6px);}
        84%{ transform: translate(-4px,3px);}
    }

    .page7-container .hint{ width: 100%; text-align: center; position: absolute; left: 0; bottom: 7%; font-size: 0.36rem; color: #333333; font-weight: bold;}
    .page7-container .hint span{ color: #2B5FD5;}
</style>

<template>
    <section class="page7-container">
        <div class="bg">
            <img src="/static/images/bg7.jpg">
        </div>
        <div class="next-arrow"><img src="@/assets/images/nextpage.png"> </div>
        <div class="page-title"><img src="@/assets/images/title7.png"> </div>

        <div class="page-context">
            <p>今年</p>
            <p>你使用最多的控制是<span class="tag1">{{mostControl}}</span></p>
            <p v-if="pageData.tag == '科技先锋'">享便利生活，当<span class="tag1">{{pageData.tag}}</span></p>
            <p v-else-if="pageData.tag == '停车场不迷路'">我有<span class="tag1">{{pageData.tag}}的技巧</span></p>
            <p v-else>会生活，<span class="tag1">{{pageData.tag}}</span></p>
        </div>

        <ul class="times-list">
            <li :class="{active:showTags,animate:showTags}" v-for="item in timesList">
                <div><span>{{item.name}}</span><span class="value">{{item.value}}</span><span>次</span></div>
            </li>
        </ul>

        <div class="hint">云服务全年为用户提供<span>{{animTimes}}</span>次服务</div>
    </section>
</template>

<script type='es6'>
    export default {
        name: 'app',
        data(){
            return{
                showTags:false,
                mostControl:'',
                timesList:[],
                times:0
            }
        },
        mounted(){
            //this.setValues();
        },
        methods:{
            setValues(){
                let keys = {
                    airOpen:'开启空调',
                    doorUnlock:'车门解锁',
                    doorLock:'车门上锁',
                    airClose:'关闭空调',
                    lightWhistle:'闪灯鸣笛',
                    light:'闪灯',
                    airRes:'预约开空调'
                };
                this.mostControl = keys[this.pageData.control];
                let data = this.pageData.controlByType,arr = [];
                for(let item in data){
                    if(keys[item] != undefined){
                        arr.push({
                            name:keys[item],
                            value:data[item]
                        })
                    }
                }
                this.timesList = arr;
                TweenLite.to(this.$data,1,{times:this.pageData.totalTimes});
                setTimeout(()=>{
                    console.log('s')
                    this.showTags = true;
                },100)
            },
            resetValues(){
                this.times = 0;
                this.showTags = false;
            }
        },
        computed:{
            animTimes(){
                return this.times.toFixed(0);
            },
            pageData(){
                return this.$store.state.pageData.P7
            }
        }
    }

</script>

