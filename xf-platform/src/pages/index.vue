<style>

</style>

<template>
    <div>
        <!-- 轮播图 -->
        <banner></banner>
        <!-- 表单区 -->
        <form-frame></form-frame>
    </div>
</template>

<script type='es6'>
    import banner from '@/components/index/banner.vue'
    import FormFrame from '@/components/index/FormFrame.vue'
    export default {
        name: 'app',
        components:{banner,FormFrame},
        data(){
            return{

            }
        },
        mounted(){

            //this.$ajax.get('http://ticket.pc-online.cc/client/api/index').then(res=>{
            //    console.log(res)
            //})

        },
        methods:{

        }
    }

</script>

