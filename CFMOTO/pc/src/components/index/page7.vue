<style scoped>
.z-page7 { width: 100%; height: 100%; position: relative; background: url("../../assets/images/index/bg7.jpg") no-repeat; background-size: cover; background-position: center center; overflow: hidden; animation: fadeIn 0.5s linear 0.3s both;}
.z-page7 .info-section { margin: 120px 0 0 13%;}
.z-page7 .info-section h3 { animation: infoIn 0.5s ease-out 0.5s both}
.z-page7 .hint { position: absolute; top: 50%; left: 13%;}
.z-page7 .step-title { width: 1100px; display: flex; justify-content: space-between; align-items: center; margin: 20px auto 0 auto;}
.z-page7 .step-title h3 { font-size: 20px; font-family: TTHBold; color: #ffffff;}
.z-page7 .step-title h3 span { font-size: 80px; font-family: TTHBold; margin-right: 20px; -webkit-text-stroke: 2px #ffffff; color: rgba(0,0,0,0)}
.fadeIn { animation: fadeIn 1s ease-out;}
.fadeOut { animation: fadeOut 0 ease-out;}
</style>

<template>
<div class="z-page7">
   <div class="info-section">
      <h3>Test Drive & After-sales</h3>
      <ul class="z-tab">
         <li :class="{'active':page !== 'aftersales'}" @click="page='map'">Test Drive</li>
         <li :class="{'active':page === 'aftersales'}" @click="page='aftersales'">After-Sales</li>
      </ul>
      <div v-if="page === 'map'">
         <Select placeholder="Province" class="z-select" style="width:200px; margin-right: 20px;">
            <Option value="1">广东省</Option>
         </Select>
         <Select placeholder="City" class="z-select" style="width:200px; margin-right: 20px;">
            <Option value="1">深圳市</Option>
         </Select>
         <Select placeholder="District" class="z-select" @on-change="disChange" style="width:200px; margin-right: 20px;">
            <Option value="1">福田区</Option>
         </Select>
      </div>
   </div>
   <transition-group enter-active-class="fadeIn" leave-active-class="fadeOut">
   <div v-if="page === 'map'" key="map">
      <img src="@/assets/images/index/findstore.png" class="hint" v-if="store === null"/>
      <page7-map v-else style="margin: 70px 0 0 13%;"></page7-map>
   </div>
   <after-sales v-if="page === 'aftersales'" key="aftersales" style="margin: 100px 0 0 13%;"></after-sales>
   <div v-if="page === 'step1'" key="step1">
      <div class="step-title">
         <h3><span>1</span>select models</h3>
         <a href="javascript:;" class="btn1" @click="page = 'step2'">Next</a>
      </div>
      <select-model></select-model>
   </div>
   <div v-if="page === 'step2'" key="step2">
      <div class="step-title">
         <h3><span>2</span>Fill in personal information</h3>
         <a href="javascript:;" class="btn1" @click="page = 'step3'">Next</a>
      </div>
      <step2 style="margin: 60px auto"></step2>
   </div>
   <step3 v-if="page === 'step3'" key="step3" style="margin: 60px 0 0 13%"></step3>
   </transition-group>
</div>
</template>

<script type='es6'>
import page7Map from './page7Map.vue'
import afterSales from './afterSales.vue'
import selectModel from './selectModel.vue'
import step2 from './step2.vue'
import step3 from './step3.vue'
export default {
   name: 'app',
   components: { page7Map, afterSales, selectModel, step2, step3 },
   data () {
      return {
         page: 'map',
         store: null
      }
   },
   methods: {
      disChange () {
         this.store = {}
      },
      changePage (page) {
         this.page = page
      }
   }
}
</script>
