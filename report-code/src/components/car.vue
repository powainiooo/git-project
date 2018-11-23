<style>
    .c-car{ transform-origin: 0 100%; position: relative; font-size: 0;}
    .c-car .car-body{ width: 101px; position: absolute; bottom: 5px; left: -85px;}
    .c-car .car-wheel1{ width: 18px; position: absolute; left: -75px; bottom: 0;}
    .c-car .car-wheel2{ width: 18px; position: absolute; left: -15px; bottom: 0;}
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

