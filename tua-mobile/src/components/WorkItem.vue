<style>
    .works-item{ width: 49%; margin-bottom:3%; box-sizing: border-box; border: 1px solid #dcdcdc; border-radius: 5px; overflow: hidden;}
    .works-item h3{ font-size: 16px; padding: 8px; margin-bottom: 10px; color: #000;}
    .works-item .time{ padding: 10px 8px 8px 8px; color: rgb(127,127,127);position: relative; font-size: 10px;}
    .works-item .time:before{ content: ''; width: 12px; height: 1px; background-color: #9f9f9f; position: absolute; top: 0; left: 8px;}
    .works-item .time span{ display: block; margin-bottom: 4px;}
</style>

<template>
    <a href="#" class="works-item">
        <img src="../assets/images/pro-list1.jpg">
        <h3>The Next Age <br>穿越未來來看你</h3>
        <div class="time hkLight">
            <span>音樂</span>
            <span>項目時間 06/2018</span>
        </div>
    </a>
</template>

<script type="es6">
    export default{
        name: 'App',
        data(){
            return{

            }
        }
    }

</script>

