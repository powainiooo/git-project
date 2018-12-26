<style>
    .n-upload{ display: flex; position: relative;}
    .n-upload .imgs{ width: 100px; height: 100px;box-shadow: 0 2px 10px rgba(0,0,0,0.2); overflow: hidden; border-radius: 5px; display: flex; justify-content: center; align-items: center;}
    .n-upload .imgs img{ width: 100%;}
    .n-upload .btn-add{ width: 40px; height: 40px; background: url('../../assets/img/add.png') no-repeat; display: block;box-shadow: 0 2px 3px rgba(0,0,0,0.2); border-radius: 50%; overflow: hidden;}
    .n-upload .infos{ margin-left: 20px; color: #888888; margin-top: 40px;}
    .n-upload .infos h3{ font-size: 16px;}
    .n-upload .infos p{ font-size: 12px;}
    .n-upload .btn{ width: 90px; position: absolute; top: 33px; right: 0;}
    .n-upload.min .btn{ right: auto; left: 120px; top: 68px;}
    .n-upload input[type=file]{ display: none;}

    .n-cropper{ width: 800px; height: 600px; background-color: #ffffff;box-shadow: 0 2px 10px rgba(0,0,0,0.2); overflow: hidden; border-radius: 5px; position: fixed; top: 50%; left: 50%; margin: -300px 0 0 -400px; box-sizing: border-box; padding:10px 30px;}
    .n-cropper .n-cropper-title{ font-size: 24px; color: #000000; display: flex; justify-content: space-between; align-items: center;}
    .n-cropper .n-cropper-title a{ font-size: 40px; color: #012cac;}
    .n-cropper .n-cropper-subtitle{ font-size: 14px; color: #888888; display: flex; align-items: center;}
    .n-cropper .n-cropper-area{ display: flex; justify-content: center; flex-direction: column; align-items: center; margin-top: 30px;}
</style>

<template>
    <div class="n-upload" :class="simple ? 'min' : ''">
        <div class="imgs">
            <img :src="value" v-if="value != ''" />
            <a href="javascript:;" class="btn-add"  v-if="value == ''" @click="doAdd"></a>
        </div>
        <div class="infos">
            <slot name="title"></slot>
            <div slot="hint">
                <slot name="hint"></slot>
            </div>
        </div>
        <div class="btn" v-if="value != ''">
            <t-button @dotap="doAdd" size="min" v-if="!hideButton" :red="false">重新上传</t-button>
        </div>
        <input type="file" ref="file" @change="fileChange" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg">

        <div class="n-cropper" v-if="showCropper">
            <h3 class="n-cropper-title">
                <span>宣传海报</span>
                <a href="javascript:;" @click="showCropper = false"><Icon type="md-close" /></a>
            </h3>
            <div class="n-cropper-subtitle">
                <span>海报尺寸为750px*650px</span>
                <t-button @dotap="openFile" size="min" style="width: 100px; margin-left: 20px;">选择图片</t-button>
            </div>
            <div class="n-cropper-area">
                <vueCropper
                    ref="cropper"
                    :img="imgUrl"
                    :outputSize="1"
                    autoCrop
                    style="width: 300px; height: 350px;"
                ></vueCropper>
                <p style="text-align: center; color: #aaa; margin-top: 5px;">鼠标滑轮控制图片放大缩小</p>
            </div>
            <div style="margin-top: 25px; display: flex; justify-content: center;">
                <t-button @dotap="doCropper" style="width: 400px;">保存</t-button>
            </div>
        </div>
    </div>
</template>

<script type='es6'>
    import TButton from '@/components/common/TButton.vue'
    import { VueCropper }  from 'vue-cropper'
    export default {
        name: 'app',
        components:{TButton,VueCropper},
        props:{
            value:{
                type:String,
                default:''
            },
            simple:{
                type:Boolean,
                default:false
            },
            hideButton:{
                type:Boolean,
                default:false
            },
            redButton:{
                type:Boolean,
                default:false
            },
            cropper:{
                type:Boolean,
                default:false
            }
        },
        data(){
            return{
                imgUrl:this.value,
                showCropper:false
            }
        },
        methods:{
            doAdd(){
                if(this.cropper){
                    this.showCropper = true;
                }else{
                    this.openFile();
                }
            },
            openFile(){
                this.$refs.file.click();
            },
            fileChange(){
                let file = event.target.files[0];
                let fr = new FileReader();
                fr.onload = (result)=>{
                    if(this.cropper){
                        this.imgUrl = result.currentTarget.result;
                    }else{
                        this.$emit('input',result.currentTarget.result);
                    }
                };
                fr.readAsDataURL(file);
            },
            doCropper(){
                this.showCropper = false;
                this.$refs.cropper.getCropData((data)=>{
                    this.$emit('input',data);
                })
            }
        }
    }

</script>

