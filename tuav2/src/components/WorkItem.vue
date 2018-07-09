<style>
    .works-item{ width: 265px; margin: 0 14px 28px 14px; float: left; box-sizing: border-box; border: 1px solid #dcdcdc; border-radius: 5px; overflow: hidden; position: relative;}
    .works-item .img{}
    .works-item .img:hover:after{ content: ''; width: 265px; height: 210px; position: absolute; top: 0; left: 0; background-color: rgba(0,0,0,0.5);}
    .works-item h3{ height: 40px; font-size: 18px; padding: 8px; margin-bottom: 30px; color: #000;word-break: break-all;text-overflow: ellipsis;-webkit-line-clamp: 2; overflow: hidden; display: -webkit-box;box-orient: vertical; -webkit-box-orient: vertical;}
    .works-item  h3:hover{ color: #7f7f7f;}
    .works-item .time{ padding: 10px 8px 8px 8px; color: rgb(127,127,127);position: relative; font-size: 14px;}
    .works-item .time:before{ content: ''; width: 12px; height: 1px; background-color: #9f9f9f; position: absolute; top: 0; left: 8px;}
    .works-item .time span{ display: block; margin-bottom: 4px;}
    .works-item .time span a{ color: rgb(127,127,127);}
    .works-item  .time span a:hover{ color: #000;}
</style>

<template>
    <a href="javascript:;" class="works-item" @click="toDetail(data.id)">
        <div class="img"><img :src="mainUrl+data.cover" width="265" height="210"></div>
        <h3>{{data.title}}<br>{{data.title_ext}}</h3>
        <div class="time hkLight">
            <span v-if="data.cate2 == ''"><a href="javascript:;" @click="getList(data.cate,0)"> {{data.catename}}</a></span>
            <span v-if="data.cate2 != ''"><a href="javascript:;" @click="getList(data.cate,0)"> {{data.catename}}</a> / <a href="javascript:;"  @click="getList(data.cate,data.cate2)"> {{data.catename2}}</a></span>
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
        computed:{

        },
        methods:{
            toDetail(id){
                this.$emit('refresh',id);
                this.$router.push({ name: 'workdetail', params: { id: id }})
            }
        }
    }

</script>

