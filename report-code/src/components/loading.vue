<style>
    .loading{ width: 100vw; height: 100vh; background-color: #EFF7FD; position: fixed; top: 0; left: 0; z-index: 500;}
    .loading .loading-title{ position: absolute; top: 20%; left: 13%;}
    .loading .loading-title img{ width: 52vw;}
    .loading .loading-title .year{ font-size: 0.8rem;}
    .loading .loading-title .name{ font-size: 0.5rem;}
    .loading .loading-title .name span{ color: rgb(43,95,213);}

    .loading .loading-progress{ width: 88%; position: absolute; left: 6%; bottom: 16%;}
    .loading .loading-progress .progress-bar{ width: 100%; height: 8px; border-radius: 10px; background: #FFFFFF;border: 1px solid #2B5FD5; overflow: hidden;}
    .loading .loading-progress .progress-bar .progress-line{ width: 50%; height: 100%;background: #2B5FD5; transition: width 0.1s linear;}
    .loading .loading-progress .progress-bar .progress-number{ font-size: 10px; color: #333333; position: absolute; top: 15px; left: 50%; margin-left: -10px; transition: left 0.1s linear;}
    .loading .loading-progress .tree1{ width: 18%; position: absolute; left: 2%; bottom: 10px; font-size: 0;}
    .loading .loading-progress .tree1 img{ width: 100%;}
    .loading .loading-progress .tree2{ width: 24%; position: absolute; left: 54%; bottom: 10px; font-size: 0;}
    .loading .loading-progress .tree2 img{ width: 100%;}
    .loading .loading-progress .c-car{ position: absolute; left:80%; bottom: 10px;transition: left 0.1s linear;}

    .loading .loading-cloud1{ width: 9%; position: absolute; bottom: 35%; left: 80%; animation: cloud1 15s ease-in-out infinite;}
    @keyframes cloud1 {
        0%,100%{ transform: translate(0,0);}
        50%{ transform: translate(-50px,0);}
    }
    .loading .loading-cloud2{ width: 6%; position: absolute; bottom: 26%; left: 43%; animation: cloud2 17s ease-in-out infinite;}
    @keyframes cloud2 {
        0%,100%{ transform: translate(0,0);}
        50%{ transform: translate(60px,0);}
    }
    .log{ width: 100%; position: absolute; top: 0; left: 0; z-index: 1000; background-color: #ffffff; font-size: 16px;}
</style>

<template>
    <div class="loading">
        <transition leave-active-class="animated fadeOut">
            <div class="loading-title" v-if="!isOver">
                <img src="@/assets/images/title-loading.png">
                <p class="year">2018</p>
                <p class="name"><span>{{userName}}</span>的年度报告</p>
            </div>
        </transition>

        <transition leave-active-class="animated fadeOut">
            <div class="loading-progress" v-if="!isOver">
                <div class="progress-bar">
                    <div class="progress-line" :style="{width:precent+'%'}"></div>
                    <div class="progress-number" :style="{left:precent+'%'}">{{precent}}%</div>
                </div>
                <div class="tree1"><img src="@/assets/images/tree1.png"></div>
                <div class="tree2"><img src="@/assets/images/tree2.png"></div>
                <car :scale="0.6" :style="{left:precent+'%'}"></car>
            </div>
        </transition>
        <div class="loading-cloud1" v-if="!isOver"><img src="@/assets/images/cloud.png"> </div>
        <div class="loading-cloud2" v-if="!isOver"><img src="@/assets/images/cloud.png"> </div>

        <!--<div class="log">-->
            <!--<p v-for="(item,index) in logList">{{index+1}}:{{item}}</p>-->
        <!--</div>-->
    </div>
</template>

<script type='es6'>
    import car from '@/components/car'
    import axios from 'axios'
    import window from './params.js'
    export default {
        name: 'app',
        components:{car},
        data(){
            return{
                precent:0,
                steps:0,
                userName:'',
                imgsList:[
                    '/static/images/bg1.jpg',
                    '/static/images/bg2.jpg',
                    '/static/images/bg3.jpg',
                    '/static/images/bg4.jpg',
                    '/static/images/bg5.jpg',
                    '/static/images/bg6.jpg',
                    '/static/images/bg7.jpg',
                    '/static/images/bg8.jpg',
                    '/static/images/bg9.jpg',
                    '/static/images/bgCover1.png',
                    '/static/images/phone1.png',
                    '/static/images/phone2.png',
                    '/static/images/phone3.png'
                ],
                logList:[],
                isOver:false,
                imgLoadOver:false,
                dataLoadOver:false
            }
        },
        mounted(){
            let name = window.getParams.userName;
            this.addLog(`name:${name}`);
            this.loadAll();
            this.getData();

            if(name.length > 4){
                this.userName = '*' + name.substr(1,3) + '...';
            }else{
                this.userName = '*' + name.substr(1,3);
            }
        },
        methods:{
            loadImgs(src){
                let self = this;
                return new Promise((resolve,reject)=>{
                    let img = new Image();
                    img.onload = function(){
                        self.steps += 1;
                        self.precent = Math.floor(self.steps / (self.imgsList.length+1) * 100);
                        resolve(img);
                    };
                    img.onerror = function(){
                        reject(new Error('Could not load image at ' + src));
                    };
                    img.src = src;
                })
            },
            loadAll(){
                let arr = [];
                for(let item of this.imgsList){
                    arr.push(this.loadImgs(item))
                }
                Promise.all(arr).then(res=>{
                    this.imgLoadOver = true;
                    this.addLog(`loadAll images`);
                    this.isAllLoad();
                })
            },
            getData(){
                this.addLog(`start getData`);
                let data;
                this.addLog(`window:${typeof window}`);
                this.addLog(`getParams:${typeof window.getParams}`);
                try{
                    data = window.getParams.data;
                    this.addLog(`data:${data}`);
                    axios.post('/mobileserve/Vehicle/getAnnuallyData',{data:data}).then(res=>{
                        let data = res.data;
                        this.addLog(`getData over:${data.result}`);
                        if(data.result == 0){
                            this.dataLoadOver = true;
                            this.steps += 1;
                            this.precent = Math.floor(this.steps / (this.imgsList.length+1) * 100);
                            this.isAllLoad();
                            this.$store.commit('setPageData',res.data.data);
                        }else{
                            window.errorData = data;
                            window.location = '/error';
                        }
                    })
                }catch(err){
                    this.addLog(`data err:${err}`);
                }

            },
            isAllLoad(){
                this.addLog(`isAllLoad--imgLoadOver:${this.imgLoadOver},dataLoadOver:${this.dataLoadOver}`);
                if(this.imgLoadOver && this.dataLoadOver){
                    this.isOver = true;
                    setTimeout(()=>{
                        this.$store.commit('setLoading',false)
                    },1000)
                }
            },
            addLog(txt){
                this.logList.push(txt);
            }
        }
    }

</script>

