<style>
    .page2-container{ height: 100vh; background-color: #EFF7FD;}
    .page2-container .bg{ width: 100%; position: absolute; left: 0; bottom: 0; font-size: 0;}
    .page2-container .page-title{ width: 33.7%;}

    #chart1{ width: 100%; height: 4rem; position: absolute; left: 0; bottom: 8%;}
</style>

<template>
    <section class="page2-container">
        <div class="bg">
            <img src="/static/images/bg2.jpg">
        </div>
        <div class="page-title"><img src="@/assets/images/title2.png"> </div>

        <div class="page-context">
            <p>这一年，</p>
            <p>你常常<span class="tag1">早出晚归</span></p>
            <p>平均每天驾驶<span class="tag2">{{animHours}}</span>小时</p>
            <p>为了生活，累并快乐着</p>
        </div>

        <div id="chart1"></div>
    </section>
</template>

<script type='es6'>
    import echarts from 'echarts'
    export default {
        name: 'app',
        data(){
            return{
                hours:0,
                chart:{}
            }
        },
        mounted(){
            this.chart = echarts.init(document.getElementById('chart1'));
        },
        methods:{
            drawTable(data){
                this.chart.setOption({
                    title:{text:'0-24小时出行分布',left:'center',bottom:'0',textStyle:{fontSize:14}},
                    grid:{top:'13%',borderColor:'#2B5FD5'},
                    xAxis: {
                        type: 'category',
                        axisTick:{show:false},
                        axisLine:{lineStyle:{color:'#2B5FD5'}},
                        data: ['0', '4', '8', '12', '16', '20', '24(h)']
                    },
                    yAxis: {
                        type: 'value',
                        name:'(%)',
                        nameTextStyle:{color:'#2B5FD5'},
                        axisLabel:{color:'#2B5FD5'},
                        splitLine:{lineStyle:{color:'#2B5FD5'}},
                        axisTick:{show:false},
                        axisLine:{show:false}
                    },
                    series: [{
                        data: data,
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
                this.drawTable([1, 2, 15, 20, 10, 6, 15]);
                TweenLite.to(this.$data,1,{hours:2.5});
            },
            resetValues(){
                this.hours = 0;
                this.chart.clear()
            }
        },
        computed:{
            animHours(){
                return this.hours.toFixed(1);
            }
        }
    }

</script>

