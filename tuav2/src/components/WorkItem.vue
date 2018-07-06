<style>
    .works-item{ width: 265px; margin: 0 14px 28px 14px; float: left; box-sizing: border-box; border: 1px solid #dcdcdc; border-radius: 5px; overflow: hidden;}
    .works-item h3{ font-size: 18px; padding: 8px; margin-bottom: 30px; color: #000;}
    .works-item .time{ padding: 10px 8px 8px 8px; color: rgb(127,127,127);position: relative; font-size: 14px;}
    .works-item .time:before{ content: ''; width: 12px; height: 1px; background-color: #9f9f9f; position: absolute; top: 0; left: 8px;}
    .works-item .time span{ display: block; margin-bottom: 4px;}
</style>

<template>
    <a href="javascript:;" class="works-item" @click="toDetail(item.id)">
        <img :src="data.imgUrl" width="265" height="210">
        <h3>{{data.title}}<br>{{data.title_ext}}</h3>
        <div class="time hkLight">
            <span>{{data.type}}</span>
            <span>項目時間 {{data.time}}</span>
        </div>
    </a>
</template>

<script type="es6">
    export default{
        name: 'App',
        props:['data'],
        data(){
            return{

            }
        },
        methods:{
            toDetail(id){
                this.$router.push({ name: 'workdetail', params: { id: id }})
            }
        }
    }

</script>

