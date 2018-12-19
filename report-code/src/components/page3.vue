<style>
    .page3-container{ height: 100vh; background-color: #EFF7FD;}
    .page3-container .bg{ width: 100%; position: absolute; left: 0; top: 45%; font-size: 0; overflow: hidden;}
    .page3-container .bg .moves{ width: 200vw; display: flex; align-items: flex-start; animation: road1 8s linear infinite;}
    .page3-container .bg .moves img{ width: 100vw;}
    .page3-container .page-title{ width: 39.7%;}
    @keyframes road1 {
        0%{ transform: translate(0,0);}
        100%{ transform: translate(-100vw,0);}
    }

    .chart2{ width: 100%; height: 4rem; position: absolute; left: 0; bottom: 8%;}

    .page3-container .page-context p{ margin-bottom: 10px;}
    .page3-container .c-car{ position: absolute; top: 51%; left: 55%;}
    .page3-container .page-context{ z-index: 10;}
    .page3-container .birds{ width: 2.48rem; height: 2.5rem; background: url('../assets/images/birds.png') no-repeat; background-size: 400%; position: absolute; top: 40%; right: -40%; transform: scale(0.7);}
    .page3-container .birds-active{ animation:birds 15s linear;}
    @keyframes birds {
        0%{transform: translate(0,0) scale(0.7);}
        /*30%,50%{transform: translate(-70vw,-20vh);}*/
        /*35%,45%,55%{transform: translate(-70vw,-21vh);}*/
        100%{transform: translate(-190vw,-60vh) scale(0.7);}
    }
</style>

<template>
    <section class="page3-container">
        <div class="bg">
            <div class="moves">
                <img src="/static/images/bg3.jpg">
                <img src="/static/images/bg3.jpg">
            </div>
        </div>
        <div class="next-arrow"><img src="@/assets/images/nextpage.png"> </div>
        <div class="page-title"><img src="@/assets/images/title3.png"> </div>

        <div class="page-context" v-if="pageData.tag == '远方'">
            <p>今年<span class="tag2">{{maxMonth}}</span>月，</p>
            <p>你的里程最高达到<span class="tag2">{{animMiles}}</span>公里</p>
            <p>是回了故乡？</p>
            <p>还是去了<span class="tag1">{{pageData.tag}}？</span></p>
        </div>
        <div class="page-context" v-if="pageData.tag == '平淡是真'">
            <p>每月里程相差无几？</p>
            <p>生活也是这样，<span class="tag1">{{pageData.tag}}~</span></p>
        </div>

        <div class="birds" :style="{'background-position':-birdIndex*2.48+'rem 0'}" :class="showBird ? 'birds-active' : ''"></div>

        <car :scale="0.5"></car>

        <div ref="chart2" class="chart2"></div>
    </section>
</template>

<script type='es6'>
    import echarts from 'echarts'
    import car from '@/components/car.vue'
    export default {
        name: 'app',
        components:{car},
        data(){
            return{
                miles:0,
                birdIndex:0,
                maxMonth:'--',
                showBird:false,
                chart:{}
            }
        },
        mounted(){
            this.chart = echarts.init(this.$refs.chart2);
            this.birdMove();
            //this.setValues();
        },
        methods:{
            drawTable(xArr,yArr){
                this.chart.setOption({
                    title:{text:'每月里程分布',left:'center',bottom:'0',textStyle:{fontSize:14}},
                    grid:{top:'13%',borderColor:'#2B5FD5'},
                    xAxis: {
                        type: 'category',
                        axisTick:{show:false},
                        axisLabel:{showMaxLabel:true},
                        axisLine:{lineStyle:{color:'#2B5FD5'}},
                        boundaryGap:false,
                        data: xArr
                    },
                    graphic:[{type:'text',style:{text:'(km)',fill:'#2B5FD5',x:12}}],
                    yAxis: {
                        type: 'value',
                        axisLabel:{color:'#2B5FD5'},
                        splitLine:{lineStyle:{color:'#2B5FD5'}},
                        axisTick:{show:false},
                        axisLine:{show:false}
                    },
                    series: [{
                        data:yArr,
                        type: 'line',
                        smooth: true,
                        lineStyle:{color:'#2B5FD5',shadowColor:'#ffffff',shadowBlur:0,shadowOffsetX:2},
                        itemStyle:{opacity:0},
                        areaStyle:{
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: '#C6D7FF' // 0% 处的颜色
                                }, {
                                    offset: 1, color: 'rgba(255,255,255,0)' // 100% 处的颜色
                                }],
                                globalCoord: false // 缺省为 false
                            }
                        }
                    }]
                })
            },
            setValues(){
                let data = this.pageData.mileageByMonth,arr = [],xArr = [],yArr = [];
                for(let item in data){
                    arr.push({
                        name:item.replace('m',''),
                        value:data[item]
                    })
                }
                arr.sort(function(a,b){
                    return parseInt(a.name) - parseInt(b.name)
                });
                let max = arr[0].value,maxMonth = arr[0].name;
                for(let item of arr){
                    xArr.push(item.name);
                    yArr.push(item.value);
                    if(item.value >= max) {
                        max = item.value;
                        maxMonth = item.name;
                    }
                }
                xArr[xArr.length-1] += '(月)';
                this.drawTable(xArr,yArr);
                TweenLite.to(this.$data,1,{miles:max});
                this.maxMonth = maxMonth;
                this.showBird = true;
            },
            resetValues(){
                this.miles = 0;
                this.chart.clear();
                this.showBird = false;
            },
            birdMove(){
                setInterval(()=>{
                    this.birdIndex = this.birdIndex + 1 > 3 ? 0 : this.birdIndex + 1;
                },130)
            }
        },
        computed:{
            animMiles(){
                return this.miles.toFixed(0);
            },
            pageData(){
                return this.$store.state.pageData.P3
            }
        }
    }

</script>

