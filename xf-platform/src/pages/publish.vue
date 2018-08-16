<style>
    .publish{ position: relative;}
    .publish .top-line{ width: 1400px; position: absolute; left:60px; top: 60px; display: flex; justify-content: space-between; align-items: center;}
    .publish .top-line .name{ font-size: 157px; color: #fff; font-family: 'Helve';}
    .publish .top-line .n-btn{ width: 270px;}
</style>

<template>
    <div class="publish">
        <div class="top-line">
            <div class="name">Step1</div>
            <t-button extraClass="white">下一步</t-button>
        </div>
        <step1></step1>
    </div>
</template>

<script type='es6'>
    import TButton from '@/components/common/TButton.vue'
    import Step1 from '@/components/publish/Step1.vue'
    export default {
        name: 'app',
        components:{TButton,Step1},
        data(){
            return{

            }
        },
        methods:{

        }
    }

</script>

