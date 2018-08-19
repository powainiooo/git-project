<style>
    .publish{ position: relative;}
    .publish .top-line{ width: 1400px; position: absolute; left:60px; top: 60px; display: flex; justify-content: space-between; align-items: center;}
    .publish .top-line .name{ font-size: 157px; color: #fff; font-family: 'Helve';}
    .publish .top-line .n-btn{ width: 270px;}
    .publish .anim05{ animation-duration: 1s; animation-timing-function: cubic-bezier(.25,.76,.36,.97);}
</style>

<template>
    <div class="publish">
        <div class="top-line">
            <div class="name">Step{{step}}</div>
            <t-button extraClass="white" v-if="step == '1'" @dotap="step='2'">下一步</t-button>
            <t-button v-if="step == '2'" @dotap="step='1'">上一步</t-button>
            <t-button extraClass="white" v-if="step == '2'" @dotap="step='3'">下一步</t-button>
            <t-button v-if="step == '3'" @dotap="step='2'">上一步</t-button>
            <t-button extraClass="white" v-if="step == '3'">完成并提交审核</t-button>
        </div>
        <transition enter-active-class="animated anim05 slideInUp">
        <step1 v-if="step == '1'"></step1>
        </transition>
        <transition enter-active-class="animated anim05 slideInUp">
        <step2 v-if="step == '2'"></step2>
        </transition>
        <transition enter-active-class="animated anim05 slideInUp">
        <step3 v-if="step == '3'"></step3>
        </transition>
    </div>
</template>

<script type='es6'>
    import TButton from '@/components/common/TButton.vue'
    import Step1 from '@/components/publish/Step1.vue'
    import Step2 from '@/components/publish/Step2.vue'
    import Step3 from '@/components/publish/Step3.vue'
    export default {
        name: 'app',
        components:{TButton,Step1,Step2,Step3},
        data(){
            return{
                step:'1'
            }
        },
        methods:{

        }
    }

</script>

