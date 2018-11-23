<style>
    button{ padding: 10px 20px; margin:20px 0 0 20px;}
</style>

<template>
    <div>
        <p>选择风格</p>
        <ul>
            <li>王家卫体</li>
            <li>天猫体</li>
            <li>琼瑶体</li>
            <li>咆哮体</li>
        </ul>
        <button @click="doShare">分享</button>
    </div>
</template>

<script type='es6'>
    export default {
        name: 'app',
        data(){
            return{

            }
        },
        methods:{
            doShare(){
                window.location = '/share'
            }
        }
    }

</script>

