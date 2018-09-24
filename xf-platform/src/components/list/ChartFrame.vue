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
                    <RadioGroup v-model="chart2Type" @on-change="dateChange">
                        <Radio label="1">
                            <span style="font-size: 16px;">点击量(次)</span>
                        </Radio>
                        <Radio label="2">
                            <span style="font-size: 16px;">销售量</span>
                        </Radio>
                    </RadioGroup>
                    <DatePicker type="daterange" format="yyyy/MM/dd" placement="bottom-end" placeholder="Select date" style="width: 200px" v-model="dateArr" @on-change="dateChange"></DatePicker>
                </div>
                <div id="proChart2" style="height: 310px;"></div>
            </div>
        </div>
        <div class="pr">
            <DatePicker type="date" format="yyyy/MM/dd" placement="bottom-end" placeholder="Select date" style="width: 200px; position: absolute; top: 20px; right: 20px; z-index: 10;" v-model="date" @on-change="dateChange"></DatePicker>
            <div id="proChart3" style="height:460px;background-color: #eeeef0;"></div>
        </div>
    </div>
</template>

<script type='es6'>
    import echarts from 'echarts';
    import {formatDate} from '@/assets/js/date.js';
    export default {
        name: 'app',
        data(){
            return{
                chart2Type:'1',
                dateArr:[],
                date:''
            }
        },
        props:['id'],
        mounted(){
            this.date = new Date();
            this.dateArr[0] = new Date(new Date().getTime() - 7*24*60*60*1000);
            this.dateArr[1] = new Date();
            setTimeout(()=>{
                this.getChartData();
            },200);
        },
        methods:{
            getChartData(){
                let begin = formatDate(this.dateArr[0],'yyyy/MM/dd');
                let end = formatDate(this.dateArr[1],'yyyy/MM/dd');
                let date = formatDate(this.date,'yyyy/MM/dd');
                this.$ajax.get('/client/api/sale_data',{
                    params:{
                        aid:this.id,
                        type:this.chart2Type,
                        begin:begin,
                        end:end,
                        date:date
                    }
                }).then(res=>{
                    let click = res.data.data.click;
                    let clickData = {
                        x:[],
                        y:[]
                    };
                    for(let item in click){
                        clickData.x.push(item);
                        clickData.y.push(click[item]);
                    }
                    let hoursale = res.data.data.hoursale;
                    let hoursaleData = [],index = 0;
                    for(let item in hoursale){
                        hoursaleData[index] = {
                            name:item,
                            x:[],
                            y:[]
                        };
                        for(let child in hoursale[item]){
                            hoursaleData[index].x.push(child);
                            hoursaleData[index].y.push(hoursale[item][child]);
                        }
                        index++;
                    };
                    let user = res.data.data.user;
                    let userData = [];
                    for(let item in user){
                        userData.push({
                            value:user[item],
                            name:item
                        })
                    }
                    this.drawChart1(userData);
                    this.drawChart2(clickData);
                    this.drawChart3(hoursaleData);
                })
            },
            dateChange(date){
                this.getChartData();
            },
            drawChart1(data){
                let myChart = echarts.init(document.getElementById('proChart1'));
                myChart.setOption({
                    title:{text:'已购票用户地区',textStyle:{color:'#000',fontSize:18}},
                    series: [
                        {
                            name:'访问来源',
                            type:'pie',
                            radius: '65%',
                            color:['#002aac','#1243af','#3355bd','#667fcd','#98a9dc','#acbde5'],
                            labelLine:{length:30},
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
                            data:data
                        }
                    ]
                })
            },
            drawChart2(data){
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
                        right: 40,
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis : [
                        {
                            type : 'category',
                            boundaryGap : false,
                            data : data.x
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
                            data:data.y
                        }
                    ]
                });
            },
            drawChart3(data){
                let all = [];
                for(let i=0;i<data[0].x.length;i++){
                    all[i] = 0;
                    for(let item of data){
                        all[i] += parseInt(item.y[i]);
                    }
                }
                let series = [{
                    name:'总数',
                    type:'line',
                    stack: '总量',
                    areaStyle: {normal: {color:'#0029a9',opacity:'0.3'}},
                    itemStyle:{
                        normal: {color:'#0029a9',borderColor:'#0029a9',borderWidth:4},
                        emphasis: {color:'#0029a9',borderColor:'#0029a9',borderWidth:4}
                    },
                    lineStyle:{opacity:0},
                    data:all
                }];
                let index = 1,formatter = '';
                for(let item of data){
                    series.push({
                        name:item.name,
                        type:'line',
                        stack: '总量',
                        areaStyle: {normal: {opacity:0}},
                        itemStyle:{opacity:0},
                        lineStyle:{opacity:0},
                        data:item.y
                    });
                    formatter += `{a${index}}: {c${index}}<br />`;
                    index += 1;
                }
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
                        formatter: formatter,
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
                            data : data[0].x
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value'
                        }
                    ],
                    series : series
                });
            }
        }
    }

</script>

