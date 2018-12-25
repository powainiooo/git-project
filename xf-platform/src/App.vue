<template>
    <div id="app">
        <div class="logo" @click="gotoList" :style="{cursor: showMenus ? 'pointer' : 'default'}">
            <i class="icon-logo"></i>
        </div>
        <index v-if="showMenus"></index>
        <router-view v-if="isRouterAlive"/>

        <div class="cropper-frame">
            <vueCropper
                ref="cropper"
                :img="option.img"
                :outputSize="option.size"
                :outputType="option.outputType"
                autoCrop
                style="width: 400px; height: 400px;"
            ></vueCropper>
            <div>
                <label class="btn" for="uploads">upload</label>
                <input type="file" id="uploads" style="position:absolute; clip:rect(0 0 0 0);" accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg($event, 1)">
                <button @click="getImg">生成</button>
            </div>
            <img :src="cropSrc" />
        </div>
    </div>
</template>

<script type="es6">
    import index from '@/components/menu/index.vue'
    import { VueCropper }  from 'vue-cropper'
    export default {
        name: 'App',
        components:{index,VueCropper},
        data(){
            return{
                isRouterAlive:true,
                option:{
                    img:'',
                    size:1,
                    outputType:'jpeg'
                },
                cropSrc:''
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
                console.log('reload');
                this.isRouterAlive = false;
                this.$nextTick(function(){
                    this.isRouterAlive = true;
                })
            },
            uploadImg(e){
                let file = e.target.files[0];
                let fr = new FileReader();
                fr.onload = (result)=>{
                    this.option.img = result.currentTarget.result;
                };
                fr.readAsDataURL(file);
            },
            getImg(){
                console.log('save')
                this.$refs.cropper.getCropData((data)=>{
                    this.cropSrc = data;
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

    .cropper-frame{ width: 100%; height: 100vh; position: fixed; top: 0; left: 0; z-index: 10000; background-color: #ffffff;}
</style>
