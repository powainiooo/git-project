<style>
    .pro-detail{ width:650px;height: 100%; background-color: #ffffff; overflow-y:scroll; transition: all 0.5s cubic-bezier(.25,.76,.36,.97);}
    .pro-detail::-webkit-scrollbar{ width: 3px; background-color: #ffffff;}
    .pro-detail::-webkit-scrollbar-thumb{ background-color: #002aa6;}
    .pro-detail .opera-line{ margin: 60px 60px 40px 60px; display: flex; justify-content: space-between; align-items: center;}
    .pro-detail .opera-line a{ font-size: 40px; height: 40px; color: #012cac;}
    .pro-detail .opera-line a .ivu-icon{ display: block;}
    .pro-detail .opera-line div{ width: 420px; display: flex; justify-content: space-between; align-items: center;}
    .pro-detail .opera-line div.end{ justify-content: flex-end;}
    .pro-detail .opera-line .tab{ width: 270px; border-radius: 6px; background-color: #c8c9cb; overflow: hidden; display: flex;}
    .pro-detail .opera-line .tab li{ width: 50%; height: 40px; font-size: 14px; color: #ffffff; display: flex; align-items: center; justify-content: center; cursor: pointer;}
    .pro-detail .opera-line .tab li.active{ background-color: #002aa6;}
</style>

<template>
    <div class="pro-detail" :style="{width:showInfo ? '650px' : '1300px'}">
        <div class="opera-line">
            <span v-show="showInfo"></span>
            <a href="javascript:;" v-show="!showInfo" @click="showInfo = true"><Icon type="ios-arrow-back" /></a>
            <div :class="showInfo ? 'end' : ''">
                <ul class="tab" v-show="!showInfo">
                    <li :class="showChart ? 'active' : ''" @click="showChart = true">销售数据</li>
                    <li :class="showChart ? '' : 'active'" @click="showChart = false">订单列表</li>
                </ul>
                <a href="javascript:;" @click="$emit('close')"><Icon type="md-close" /></a>
            </div>
        </div>
        <info-frame v-if="showInfo" @openstatistics="showInfo = false" :itemData="itemData"></info-frame>
        <div v-if="!showInfo">
            <chart-frame v-show="showChart"></chart-frame>
            <table-frame v-show="!showChart"></table-frame>
        </div>

    </div>
</template>

<script type='es6'>
    import InfoFrame from '@/components/list/InfoFrame.vue'
    import ChartFrame from '@/components/list/ChartFrame.vue'
    import TableFrame from '@/components/list/TableFrame.vue'
    export default {
        name: 'app',
        components:{InfoFrame,ChartFrame,TableFrame},
        props:['itemData'],
        data(){
            return{
                showInfo:true,
                showChart:true
            }
        },
        methods:{

        }
    }

</script>

