<style>
    .c-car{ transform-origin: 0 100%; position: relative; font-size: 0;}
    .c-car img{ width: auto;}
    .c-car .car-body{ position: absolute; bottom: 5px; left: -90px;}
    .c-car .car-wheel1{ position: absolute; left: -80px; bottom: 0;}
    .c-car .car-wheel2{ position: absolute; left: -20px; bottom: 0;}
    .c-car .driving{ animation: wheel 1s linear infinite;}
    @keyframes wheel {
        0%{ transform: rotateZ(0deg);}
        100%{ transform: rotateZ(360deg);}
    }
</style>

<template>
    <div class="c-car" :style="{transform:'scale('+scale+')'}">
        <img src="@/assets/images/car.png" class="car-body">
        <img src="@/assets/images/wheel.png" class="car-wheel1" :class="driving ? 'driving' : ''">
        <img src="@/assets/images/wheel.png" class="car-wheel2" :class="driving ? 'driving' : ''">
    </div>
</template>

<script type='es6'>
    export default {
        name: 'app',
        props:{
            scale:{
                type:[String,Number],
                default:1
            },
            driving:{
                type:Boolean,
                default:true
            }
        },
        data(){
            return{

            }
        },
        methods:{

        }
    }

</script>

