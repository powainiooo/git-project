<style>
    .page9-container{ height: 100vh; background-color: #EFF7FD;}
    .page9-container .bg{ width: 100%; position: absolute; left: 0; bottom: 0; font-size: 0;}
    .page9-container .title{ width: 90%; position: absolute; top: 5%; left: 5%;}

    .keywords-list{ width: 100%; height: 4.4rem;  position: absolute; left: 0; top: 25%; list-style: none;}
    .keywords-list li{ font-size: 0.7rem; color: #333333; position: absolute;left: -100%; animation: keyword 8s linear infinite both;}
    .keywords-list li:nth-child(1){ top:1.5rem; left: 30%;}
    .keywords-list li:nth-child(2){ top:0.7rem; left: 57%; opacity: 0.83; transform: scale(0.71); animation-delay: 0.5s;}
    .keywords-list li:nth-child(3){ top:2.8rem; left: 26%; opacity: 0.68; transform: scale(0.71); animation-delay: 1s;}
    .keywords-list li:nth-child(4){ top:0.7rem; left: 2%; opacity: 0.55; transform: scale(0.57); animation-delay: 1.5s;}
    .keywords-list li:nth-child(5){ top:3.3rem; left: 52%; opacity: 0.21; transform: scale(0.57); animation-delay: 2s;}
    .keywords-list li:nth-child(6){ top:2.2rem; left: 6%; opacity: 0.2; transform: scale(0.57); animation-delay: 2.5s;}
    .keywords-list li:nth-child(7){ top:0rem; left: 30%; opacity: 0.2; transform: scale(0.42); animation-delay: 3s;}
    .keywords-list li:nth-child(8){ top:0.7rem; left: 45%; opacity: 0.2; transform: scale(0.42); animation-delay: 3.5s;}
    .keywords-list li:nth-child(9){ top:2.5rem; left: 50%; opacity: 0.2; transform: scale(0.42); animation-delay: 4s;}
    .keywords-list li:nth-child(10){ top:3.6rem; left: 12%; opacity: 0.2; transform: scale(0.42); animation-delay: 4.5s;}
    .keywords-list li:nth-child(11){ top:2.1rem; left: 60%; opacity: 0.2; transform: scale(0.42); animation-delay: 5s;}
    @keyframes keyword {
        0%,100%{transform: scale(0.42); opacity: 0.2;}
        50%{transform: scale(0.7); opacity: 1;}
    }

    .page9-container .btn{ width: 50%; position: absolute; left: 25%; bottom: 6.7%;}

</style>

<template>
    <section class="page9-container">
        <div class="bg">
            <!--<img src="@/assets/images/bg7.jpg">-->
            <img src="/static/images/bg9.jpg">
        </div>
        <div class="title"><img src="@/assets/images/title9.png"> </div>

        <ul class="keywords-list">
            <li v-for="item in tagList">{{item}}</li>
        </ul>

        <div class="btn" @click="openSelect" v-if="showBtn"><img src="@/assets/images/btn.png"></div>

        <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
        <div class="style-container" v-if="showStyle" style="z-index: 650;">
            <div class="style-frame">
                <h3>选择风格</h3>
                <ul>
                    <li v-for="item in styleList"
                        :class="styleKey == item.key ? 'active' : ''"
                        @click="styleKey = item.key">
                        <div class="imgs"><img :src='"@/assets/images/style"+item.key+".jpg"' /> </div>
                        <p>{{item.name}}</p>
                    </li>
                </ul>
                <div class="btns">
                    <a href="javascript:;" @click="doCancel">取消</a>
                    <a href="javascript:;" @click="doDraw">确定</a>
                </div>
            </div>
        </div>
        </transition>
        <poster ref="poster" :styleKey="lastStyleKey" @showChange="openSelect"></poster>
    </section>
</template>

<script type='es6'>
    import poster from '@/components/poster.vue'
    export default {
        name: 'app',
        components:{poster},
        data(){
            return{
                showStyle:false,
                lastStyleKey:1,
                styleKey:1,
                styleList:[
                    {
                        name:'王家卫体',
                        key:1
                    },
                    {
                        name:'琼瑶体',
                        key:2
                    },
                    {
                        name:'天猫体',
                        key:3
                    }
                ]
            }
        },
        mounted(){
            //this.doDraw()
        },
        methods:{
            setValues(){

            },
            resetValues(){
                this.showStyle = false;
            },
            openSelect(){
                this.styleKey = this.lastStyleKey;
                this.showStyle = true;
            },
            doDraw(){
                this.lastStyleKey = this.styleKey;
                this.$nextTick(()=>{
                    this.$refs.poster.draw();
                    this.doCancel();
                })
            },
            doCancel(){
                this.showStyle = false;
            }
        },
        computed:{
            tagList(){
                let pageData = this.$store.state.pageData,arr = [];
                for(let item in pageData){
                    if(pageData[item].tag != undefined) arr.push(pageData[item].tag)
                }
                return arr;
            },
            showBtn(){
                let tagName = ['P2','P4','P7','P8'],arr = [],data = this.$store.state.pageData;
                for(let item of tagName){
                    if(data[item] != undefined){
                        arr.push(data[item].tag)
                    }
                }
                return arr.length != 0
            }
        }
    }

</script>

