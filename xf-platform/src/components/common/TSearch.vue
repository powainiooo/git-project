<style>
    .n-search{ position: relative;}
    .n-search .n-search-input{ width: 0; height: 40px; display: flex; align-items: center; overflow: hidden; border-radius: 6px; position: relative; background-color: #ffffff; transition: width 0.3s cubic-bezier(.25,.76,.36,.97);}
    .n-search-open .n-search-input{ width: 300px;}
    .n-search .n-search-input:after{ content: ''; width: 1px; height: 36px; position: absolute; top: 2px; left: 260px; background-color: #e5e5e5;}
    .n-search .n-search-input input{ width: 260px; height: 40px; line-height: 40px; font-size: 16px; padding: 0 15px; box-sizing: border-box; color: #888888;}
    .n-search a{ width: 40px; height: 40px; display: flex; justify-content: center; align-items: center; font-size: 24px; color: #002aa6;}
    .n-search a:hover{ color: #002aa6;}
    .n-search .btn-search{ position: absolute; top: 0; right: 0; transition: right 0.3s cubic-bezier(.25,.76,.36,.97); color: #ffffff;}
    .n-search .btn-search:hover{ color: #ffffff;}
    .n-search-open .btn-search{ right: 40px; color: #002aa6;}
    .n-search-open .btn-search:hover{ color: #002aa6;}
</style>

<template>
    <div class="n-search" :class="showSearch ? 'n-search-open' : ''">
        <div class="n-search-input">
            <input type="text" placeholder="输入活动名称" v-model="keyword">
            <a href="javascript:;" @click="hide"><Icon type="md-close" /></a>
        </div>
        <a href="javascript:;" class="btn-search" @click="toggle"><Icon type="ios-search" /></a>
    </div>
</template>

<script type='es6'>
    export default {
        name: 'app',
        data(){
            return{
                showSearch:false,
                keyword:''
            }
        },
        methods:{
            toggle(){
                if(this.showSearch){
                    this.$emit('dosearch',this.keyword);
                }else{
                    this.showSearch = true;
                }
            },
            hide(){
                this.showSearch = false;
                this.keyword = '';
                this.$emit('dosearch',this.keyword);
            }
        }
    }

</script>

