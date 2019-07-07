<style>
    .pro-detail{ width:650px;height: 100%; background-color: #ffffff; overflow-y:scroll; transition: all 0.5s cubic-bezier(.25,.76,.36,.97); padding-top: 140px; position: relative; box-shadow: 0 2px 10px rgba(0,0,0,0.2);}
    .pro-detail::-webkit-scrollbar{ width: 3px; background-color: #ffffff;}
    .pro-detail::-webkit-scrollbar-thumb{ background-color: #002aa6;}
    .pro-detail .opera-line{ width: 100%; box-sizing: border-box; height: 140px; padding: 60px 60px 40px 60px; display: flex; justify-content: space-between; align-items: center; background-color: #ffffff; position: absolute; top: 0; right: 0; z-index: 100; transition: all 0.5s cubic-bezier(.25,.76,.36,.97);}
    .pro-detail .opera-line a{ font-size: 40px; height: 40px; color: #012cac;}
    .pro-detail .opera-line a .ivu-icon{ display: block;}
    .pro-detail .opera-line div{ width: 420px; display: flex; justify-content: space-between; align-items: center;}
    .pro-detail .opera-line div.end{ width: 650px; justify-content: flex-end;}
    .pro-detail .opera-line div h1 { font-size: 48px; color: #000000; transform: translate(100px,0);  font-weight: normal;}
    .pro-detail .opera-line .tab{ width: 270px; border-radius: 6px; background-color: #c8c9cb; overflow: hidden; display: flex;}
    .pro-detail .opera-line .tab li{ width: 50%; height: 40px; font-size: 14px; color: #ffffff; display: flex; align-items: center; justify-content: center; cursor: pointer;}
    .pro-detail .opera-line .tab li.active{ background-color: #002aa6;}
</style>

<template>
    <div class="pro-detail" :style="{width:showItem === 'info' ? '650px' : '1300px'}">
        <div class="opera-line">
            <a href="javascript:;" v-show="showItem !== 'info'" @click="showItem = 'info'"><Icon type="ios-arrow-back" /></a>
            <div :class="showItem === 'info' ? 'end' : ''">
                <ul class="tab" v-show="showItem === 'chart' || showItem === 'table' ">
                    <li :class="showItem === 'chart' ? 'active' : ''" @click="showItem = 'chart'">销售数据</li>
                    <li :class="showItem === 'table' ? 'active' : ''" @click="showItem = 'table'">订单列表</li>
                </ul>
                <h1 v-if="showItem === 'refund'">退款申请</h1>
                <a href="javascript:;" @click="$emit('close')"><Icon type="md-close" /></a>
            </div>
        </div>
        <info-frame v-if="showItem === 'info'" @openstatistics="showItem = 'chart'" :itemData="itemData" :fileurl="fileurl"  @change="change"></info-frame>
        <chart-frame v-if="showItem === 'chart'" :id="itemData.id"></chart-frame>
        <table-frame v-if="showItem === 'table'" :itemData="itemData" @change="change"></table-frame>
        <refund-frame v-if="showItem === 'refund'" :itemData="itemData" @change="change"></refund-frame>
    </div>
</template>

<script type='es6'>
    import InfoFrame from '@/components/list/InfoFrame.vue'
    import ChartFrame from '@/components/list/ChartFrame.vue'
    import TableFrame from '@/components/list/TableFrame.vue'
    import RefundFrame from '@/components/list/RefundFrame.vue'
    export default {
        name: 'app',
        components:{InfoFrame,ChartFrame,TableFrame,RefundFrame},
        props:['itemData','fileurl'],
        data(){
            return{
                showItem: 'refund',
                showChart:true
            }
        },
        methods:{
            change(id){
                this.$emit('change',id);
            }
        }
    }

</script>

