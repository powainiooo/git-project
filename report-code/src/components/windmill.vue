<style>
    .c-windmill{ width: 10px; height: 163px; position: absolute; font-size: 0; transform-origin: 0 100%;}
    .c-windmill .c-windmill-line{ width: 100%;}
    .c-windmill .c-windmill-roll{ width: 149px; height: 149px; position: absolute; left: -70px; bottom: 100%; margin-bottom: -76px; animation: roll 5s linear infinite;}
    @keyframes roll {
        0%{ transform: rotateZ(0deg);}
        100%{ transform: rotateZ(-360deg);}
    }
</style>

<template>
    <div class="c-windmill" :style="{transform:'scale('+scale+')'}">
        <img src="@/assets/images/wind-line.png" class="c-windmill-line">
        <img src="@/assets/images/wind-roll.png" class="c-windmill-roll">
    </div>
</template>

<script type='es6'>
    export default {
        name: 'app',
        props:{
            scale:{
                type:[String,Number],
                default:0.6
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

