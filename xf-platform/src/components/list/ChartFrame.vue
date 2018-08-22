<style>
    .pro-chars .chart-line1{margin: 0 20px; border-top: 1px solid #dcdcdc; border-bottom: 1px solid #dcdcdc; padding: 20px 0; display: flex;}
    .pro-chars .chart-line1 #proChart1{ width: 38%; height: 380px; border-right: 1px solid #dcdcdc; box-sizing: border-box;}
    .pro-chars .chart-line1 .proChart2{ width: 62%;}
    .pro-chars .chart-line1 .proChart2 .opera{ height: 70px; display: flex; justify-content: space-between; align-items: center; margin-left: 30px;}
</style>

<template>
    <div class="pro-chars">
        <div class="chart-line1">
            <div id="proChart1"></div>
            <div class="proChart2">
                <div class="opera">
                    <RadioGroup v-model="chart2Type">
                        <Radio label="0">
                            <span style="font-size: 16px;">点击量(次)</span>
                        </Radio>
                        <Radio label="1">
                            <span style="font-size: 16px;">销售量</span>
                        </Radio>
                    </RadioGroup>
                    <DatePicker type="daterange" placement="bottom-end" placeholder="Select date" style="width: 200px"></DatePicker>
                </div>
                <div id="proChart2" style="height: 310px;"></div>
            </div>
        </div>
        <div class="pr">
            <DatePicker type="date" placement="bottom-end" placeholder="Select date" style="width: 200px; position: absolute; top: 20px; right: 20px; z-index: 10;"></DatePicker>
            <div id="proChart3" style="height:460px;background-color: #eeeef0;"></div>
        </div>

    </div>
</template>

<script type='es6'>
    import echarts from 'echarts';
    export default {
        name: 'app',
        data(){
            return{
                chart2Type:'0'
            }
        },
        mounted(){
            setTimeout(()=>{
                this.drawChart1();
                this.drawChart2();
                this.drawChart3();
            },600)

        },
        methods:{
            drawChart1(){
                let myChart = echarts.init(document.getElementById('proChart1'));
                myChart.setOption({
                    title:{
                        text:'已购票用户地区',
                        textStyle:{
                            color:'#000',
                            fontSize:18
                        }
                    },
                    series: [
                        {
                            name:'访问来源',
                            type:'pie',
                            radius: '65%',
                            color:['#002aac','#1243af','#3355bd','#667fcd','#98a9dc','#acbde5'],
                            label: {
                                normal: {
                                    show: false
                                },
                                emphasis: {
                                    show: true,
                                    //formatter: '{b}\n{c}人',
                                    formatter: [
                                        '{a|{b}\n}',
                                        '{b|{c}}',
                                        '{a| 人}'
                                    ].join(''),
                                    rich:{
                                        a:{fontSize:14},
                                        b:{fontSize:20}
                                    }
                                }
                            },
                            itemStyle:{
                                shadowOffsetY:3,
                                shadowBlur:8,
                                shadowColor: 'rgba(0, 0, 0, 0.2)'
                            },
                            data:[
                                {value:400, name:'深圳'},
                                {value:130, name:'广州'},
                                {value:50, name:'北京'},
                                {value:20, name:'其他'}
                            ]
                        }
                    ]
                })
            },
            drawChart2(){
                let myChart = echarts.init(document.getElementById('proChart2'));
                myChart.setOption({
                    tooltip : {
                        trigger: 'axis',
                        formatter:'{c}',
                        padding:[8,20],
                        backgroundColor:'rgba(13,41,164,1)'
                    },
                    grid: {
                        top:'3%',
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis : [
                        {
                            type : 'category',
                            boundaryGap : false,
                            data : ['周一','周二','周三','周四','周五','周六','周日']
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value'
                        }
                    ],
                    series : [
                        {
                            name:'联盟广告',
                            type:'line',
                            stack: '总量',
                            areaStyle: {normal: {color:'#0029a9',opacity:'0.3'}},
                            itemStyle:{
                                normal: {color:'#0029a9',borderColor:'#0029a9',borderWidth:4},
                                emphasis: {color:'#0029a9',borderColor:'#0029a9',borderWidth:4}
                            },
                            lineStyle:{opacity:0},
                            data:[220, 182, 191, 234, 290, 330, 310]
                        }
                    ]
                });
            },
            drawChart3(){
                let myChart = echarts.init(document.getElementById('proChart3'));
                myChart.setOption({
                    title:{
                        text:'24小时销售量',
                        textStyle:{
                            color:'#000',
                            fontSize:18
                        },
                        left:20,
                        top:20
                    },
                    tooltip : {
                        trigger: 'axis',
                        padding:[8,20],
                        formatter: '{a0}: {c0}<br />{a1}: {c1}',
                        backgroundColor:'rgba(13,41,164,1)'
                    },
                    grid: {
                        top:'20%',
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis : [
                        {
                            type : 'category',
                            boundaryGap : false,
                            data : ['周一','周二','周三','周四','周五','周六','周日']
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value'
                        }
                    ],
                    series : [
                        {
                            name:'邮件营销',
                            type:'line',
                            stack: '总量',
                            areaStyle: {normal: {color:'#0029a9',opacity:'0.3'}},
                            itemStyle:{
                                normal: {color:'#0029a9',borderColor:'#0029a9',borderWidth:4},
                                emphasis: {color:'#0029a9',borderColor:'#0029a9',borderWidth:4}
                            },
                            lineStyle:{opacity:0},
                            data:[120, 132, 101, 134, 90, 230, 210]
                        },
                        {
                            name:'联盟广告',
                            type:'line',
                            stack: '总量',
                            areaStyle: {normal: {opacity:0}},
                            itemStyle:{opacity:0},
                            lineStyle:{opacity:0},
                            data:[220, 182, 191, 234, 290, 330, 310]
                        }
                    ]
                });
            }
        }
    }

</script>

