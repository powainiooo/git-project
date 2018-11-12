<style>
    .page3-container{ height: 100vh; background-color: #EFF7FD;}
    .page3-container .bg{ width: 100%; position: absolute; left: 0; top: 45%; font-size: 0;}
    .page3-container .page-title{ width: 39.7%;}

    #chart2{ width: 100%; height: 4rem; position: absolute; left: 0; bottom: 8%;}

    .page3-container .page-context p{ margin-bottom: 10px;}
    .page3-container .c-car{ position: absolute; top: 51%; left: 20%;}
    .page3-container .page-context{ z-index: 10;}
    .page3-container .birds{ width: 2.48rem; height: 2.5rem; background: url('../assets/images/birds.png') no-repeat; background-size: 400%; position: absolute; top: 25%; right: 5%;}
</style>

<template>
    <section class="page3-container">
        <div class="bg">
            <img src="@/assets/images/bg3.jpg">
        </div>
        <div class="page-title"><img src="@/assets/images/title3.png"> </div>

        <div class="page-context">
            <p>今年<span class="tag2">3</span>月，</p>
            <p>你的里程最高达到<span class="tag2">2511</span>公里</p>
            <p>是回了故乡？</p>
            <p>还是去了<span class="tag1">远方</span>？</p>
        </div>

        <div class="birds"></div>

        <car :scale="0.5"></car>

        <div id="chart2"></div>
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

            }
        },
        mounted(){
            this.drawTable()
        },
        methods:{
            drawTable(){
                let chart = echarts.init(document.getElementById('chart2'));
                chart.setOption({
                    title:{text:'每月里程分布',left:'center',bottom:'0',textStyle:{fontSize:14}},
                    grid:{top:'13%',borderColor:'#2B5FD5'},
                    xAxis: {
                        type: 'category',
                        axisTick:{show:false},
                        axisLine:{lineStyle:{color:'#2B5FD5'}},
                        data: ['0', '4', '8', '12', '16', '20', '24(月)']
                    },
                    yAxis: {
                        type: 'value',
                        name:'(km)',
                        nameTextStyle:{color:'#2B5FD5'},
                        axisLabel:{color:'#2B5FD5'},
                        splitLine:{lineStyle:{color:'#2B5FD5'}},
                        axisTick:{show:false},
                        axisLine:{show:false}
                    },
                    series: [{
                        data: [1, 2, 15, 20, 10, 6, 15],
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
            }
        }
    }

</script>

