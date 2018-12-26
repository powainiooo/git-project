<template>
    <div id="app">
        <div class="logo" @click="gotoList" :style="{cursor: showMenus ? 'pointer' : 'default'}">
            <i class="icon-logo"></i>
        </div>
        <index v-if="showMenus"></index>
        <router-view v-if="isRouterAlive"/>
    </div>
</template>

<script type="es6">
    import index from '@/components/menu/index.vue'
    import { VueCropper }  from 'vue-cropper'
    import TUpload from '@/components/common/TUpload.vue'
    export default {
        name: 'App',
        components:{index,VueCropper,TUpload},
        data(){
            return{
                isRouterAlive:true,
            }
        },
        provide(){
            return{
                reload:this.reload
            }
        },
        computed:{
            showMenus(){
                return this.$store.state.showGlobalMenu
            },
            iframeLink(){
                return this.$store.state.iframeLink
            }
        },
        mounted(){
            let self = this;
            //this.$ajax.defaults.baseURL = 'http://wechat.leesticket.com';
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
        },
        methods:{
            gotoList(){
                if(this.showMenus){
                    this.$router.push('list');
                }
            },
            reload(){
                this.isRouterAlive = false;
                this.$nextTick(function(){
                    this.isRouterAlive = true;
                })
            }
        }
    }
</script>

<style>
    html,body{ height: 100%;}
    body{ background: linear-gradient(165deg, #3052a7, #002aa6 54%,#003db9);}
    #app {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    #app>.logo{ font-size: 32px; color: #ffffff; position: absolute; top: 60px; left: 60px; cursor: pointer; z-index: 1500;}

    .cropper-frame{ width: 100%; height: 100vh; position: fixed; top: 0; left: 0; z-index: 10000; background-color: #fff; padding: 100px;}
</style>
