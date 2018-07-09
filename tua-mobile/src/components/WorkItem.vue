<style>
    .works-item{ width: 49%; margin-bottom:3%; box-sizing: border-box; border: 1px solid #dcdcdc; border-radius: 5px; overflow: hidden; }
    .works-item .flex{ display: flex; flex-direction: column; justify-content: space-between;}
    .works-item h3{ box-sizing: border-box; height: 70px; font-size: 14px; padding: 8px; margin-bottom: 10px; color: #000; overflow:hidden; text-overflow:ellipsis;-webkit-line-clamp:3;display:-webkit-box;-webkit-box-orient:vertical;box-orient:vertical;}
    .works-item .time{ padding: 10px 8px 8px 8px; color: rgb(127,127,127);position: relative; font-size: 10px;}
    .works-item .time:before{ content: ''; width: 12px; height: 1px; background-color: #9f9f9f; position: absolute; top: 0; left: 8px;}
    .works-item .time span{ display: block; margin-bottom: 4px;}
</style>

<template>
    <a href="javascript:;" class="works-item" @click="toDetail(data.id)">
        <img :src="mainUrl+data.cover">
        <h3>{{data.title}}<br>{{data.title_ext}}</h3>
        <div class="time hkLight">
            <span v-if="data.cate2 == ''">{{data.catename}}</span>
            <span v-if="data.cate2 != ''">{{data.catename}} / {{data.catename2}}</span>
            <span>項目時間 {{new Date(parseInt(data.ctime)).format('MM/dd')}}</span>
        </div>

    </a>
</template>

<script type="es6">
    export default{
        name: 'App',
        props:['data','mainUrl'],
        data(){
            return{

            }
        },
        methods:{
            toDetail(id){
                this.$emit('refresh',id);
                this.$router.push({ name: 'workdetail', params: { id: id }})
            }
        }
    }

</script>

