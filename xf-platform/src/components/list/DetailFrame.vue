<style>
    .pro-detail{ width:650px;height: 100%; background-color: #ffffff; overflow-y:scroll; transition: all 0.5s linear;}
    .pro-detail::-webkit-scrollbar{ width: 3px; background-color: #ffffff;}
    .pro-detail::-webkit-scrollbar-thumb{ background-color: #002aa6;}
    .pro-detail .opera-line{ margin: 60px 60px 40px 60px; display: flex; justify-content: space-between; align-items: center;}
    .pro-detail .opera-line a{ font-size: 40px; height: 40px; color: #012cac;}
    .pro-detail .opera-line a .ivu-icon{ display: block;}
    .pro-detail .opera-line div{ width: 420px; display: flex; justify-content: space-between; align-items: center;}
    .pro-detail .opera-line .tab{ width: 270px; border-radius: 6px; background-color: #c8c9cb; overflow: hidden; display: flex;}
    .pro-detail .opera-line .tab li{ width: 50%; height: 40px; font-size: 14px; color: #ffffff; display: flex; align-items: center; justify-content: center;}
    .pro-detail .opera-line .tab li.active{ background-color: #002aa6;}
</style>

<template>
    <div class="pro-detail" :style="{width:showInfo ? '650px' : '1300px'}">
        <div class="opera-line">
            <a href="javascript:;"><Icon type="ios-arrow-back" /></a>
            <div>
                <ul class="tab">
                    <li class="active">销售数据</li>
                    <li>订单列表</li>
                </ul>
                <a href="javascript:;"><Icon type="md-close" /></a>
            </div>
        </div>
        <info-frame v-if="showInfo"></info-frame>
        <chart-frame v-if="!showInfo"></chart-frame>
    </div>
</template>

<script type='es6'>
    import InfoFrame from '@/components/list/InfoFrame.vue'
    import ChartFrame from '@/components/list/ChartFrame.vue'
    export default {
        name: 'app',
        components:{InfoFrame,ChartFrame},
        data(){
            return{
                showInfo:false
            }
        },
        methods:{

        }
    }

</script>

