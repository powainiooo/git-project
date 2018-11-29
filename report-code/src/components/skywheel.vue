<style>
    .c-skywheel{ width: 80px; height: 108px; position: absolute; font-size: 0; transform-origin: 0 100%; top: 50%; left: 20%; transform: scale(0.7)}
    .c-skywheel .c-skywheel-line{ width: 100%;}
    .c-skywheel .c-skywheel-roll{ width: 138px; height: 138px; position: absolute; left: -29px; bottom: 100%; margin-bottom: -79px; animation: roll 25s linear infinite;}
    @keyframes roll {
        0%{ transform: rotateZ(0deg);}
        100%{ transform: rotateZ(-360deg);}
    }
</style>

<template>
    <div class="c-skywheel">
        <img src="@/assets/images/wheel-bottom.png" class="c-skywheel-line">
        <img src="@/assets/images/wheel-roll.png" class="c-skywheel-roll">
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

        }
    }

</script>

