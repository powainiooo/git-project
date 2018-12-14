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
        <div class="next-arrow"><img src="@/assets/images/nextpage.png"> </div>
        <div class="page-title"><img src="@/assets/images/title2.png"> </div>

        <div class="page-context">
            <p>这一年，</p>
            <p>你常常<span class="tag1">{{pageData.tag}}</span></p>
            <p v-if="pageData.tag == '轻松出行'">平均每天驾驶<span class="tag2">{{animHours}}</span>分钟</p>
            <p v-if="pageData.tag == '旋转的陀螺'">平均每天驾驶<span class="tag2">{{animHours}}</span>小时</p>
            <p v-if="pageData.tag == '早出晚归'">平均每天驾驶{{pageData.driveTime >= 1 && pageData.driveTime < 2 ? '只' : ''}}<span class="tag2">{{animHours}}</span>小时</p>
            <p v-if="pageData.tag == '朝九晚五'">平均每天驾驶{{pageData.driveTime >= 1 && pageData.driveTime < 2 ? '只' : ''}}<span class="tag2">{{animHours}}</span>小时</p>
            <p v-if="pageData.tag == '错峰出行'">{{pageData.driveTime >= 1 && pageData.driveTime < 2 ? '好在' : ''}}平均每天驾驶{{pageData.driveTime >= 1 && pageData.driveTime < 2 ? '只' : ''}}<span class="tag2">{{animHours}}</span>小时</p>

            <p>{{getText(pageData.tag)}}</p>
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
            //this.setValues();
        },
        methods:{
            drawTable(xArr,yArr){
                this.chart.setOption({
                    title:{text:'0-24小时出行分布',left:'center',bottom:'0',textStyle:{fontSize:14}},
                    grid:{top:'13%',borderColor:'#2B5FD5'},
                    xAxis: {
                        type: 'category',
                        axisTick:{show:false},
                        axisLabel:{showMaxLabel:true},
                        axisLine:{lineStyle:{color:'#2B5FD5'}},
                        boundaryGap:false,
                        data: xArr
                    },
                    graphic:[{type:'text',style:{text:'(%)',fill:'#2B5FD5',x:14}}],
                    yAxis: {
                        type: 'value',
                        axisLabel:{color:'#2B5FD5'},
                        boundaryGap:['5%','5%'],
                        splitLine:{lineStyle:{color:'#2B5FD5'}},
                        axisTick:{show:false},
                        axisLine:{show:false}
                    },
                    series: [{
                        data: yArr,
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
                let data = this.pageData.timeByHour,arr = [],xArr = [],yArr = [];
                for(let item in data){
                    arr.push({
                        name:item.replace('h',''),
                        value:data[item]
                    })
                }
                arr.sort(function(a,b){
                   return parseInt(a.name) - parseInt(b.name)
                });
                for(let item of arr){
                    xArr.push(item.name);
                    yArr.push(item.value);
                }
                xArr[xArr.length-1] += '(h)';
                this.drawTable(xArr,yArr);
                let time = this.pageData.driveTime;
                time = time < 1 ? time*60 : time;
                TweenLite.to(this.$data,1,{hours:time});
            },
            resetValues(){
                this.hours = 0;
                this.chart.clear()
            },
            getText(tag){
                let str = '',h = this.pageData.driveTime;
                if(tag == '轻松出行'){
                    str = '难道你上班只需一脚油门？';
                }else if(tag == '旋转的陀螺'){
                    str = '谁不是负重前行，再忙也要照顾好自己';
                }else if(tag == '早出晚归'){
                    if(h >= 1 && h < 2){
                        str = '好在不会太累';
                    }else if(h >= 2 && h < 4){
                        str = '为了生活，累并快乐着';
                    }else if(h >= 4 && h < 10){
                        str = '辛苦奔波，努力搬砖，都是为了更好的生活';
                    }
                }else if(tag == '朝九晚五'){
                    if(h >= 1 && h < 2){
                        str = '好在不会太累';
                    }else if(h >= 2 && h < 4){
                        str = '为了生活，累并快乐着';
                    }else if(h >= 4 && h < 10){
                        str = '辛苦奔波，努力搬砖，都是为了更好的生活';
                    }
                }else if(tag == '错峰出行'){
                    if(h >= 1 && h < 2){
                        str = '好在不会太累';
                    }else if(h >= 2 && h < 4){
                        str = '为了生活，累并快乐着';
                    }else if(h >= 4 && h < 10){
                        str = '辛苦奔波，努力搬砖，都是为了更好的生活';
                    }
                }
                return str
            }
        },
        computed:{
            animHours(){
                let time = this.pageData.driveTime;
                let num = time < 1 ? 0 : 1;
                return this.hours.toFixed(num);
            },
            pageData(){
                return this.$store.state.pageData.P2
            }
        }
    }

</script>

