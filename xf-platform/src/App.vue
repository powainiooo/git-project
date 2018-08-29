<template>
    <div id="app">
        <div class="logo"><i class="icon-logo"></i></div>
        <index v-if="showMenus"></index>
        <router-view/>
    </div>
</template>

<script type="es6">
    import index from '@/components/menu/index.vue'
    export default {
        name: 'App',
        components:{index},
        computed:{
            showMenus(){
                return this.$store.state.showGlobalMenu
            }
        },
        mounted(){
            let self = this;
            this.$ajax.defaults.baseURL = 'http://ticket.pc-online.cc';
            this.$ajax.interceptors.response.use(res=>{
                if(res.data.status == 0){
                    self.$tModal.warn({
                        title:'登录信息过期，请重新登录。',
                        onOk(){
                            self.$router.push('index')
                        }
                    })
                }
                return res;
            }, function (error) {
                // 对响应错误做点什么
                return Promise.reject(error);
            });
        }
    }
</script>

<style>
    html,body{ height: 100%;}
    body{ background: linear-gradient(165deg, #3052a7, #002aa6 54%,#003db9);}
    #app {
        font-family: 'Microsoft YaHei','Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    #app>.logo{ font-size: 32px; color: #ffffff; position: absolute; top: 60px; left: 60px; opacity: 0;}
</style>
