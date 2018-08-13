<style>
    .upload-frame{ display: flex; position: relative;}
    .upload-frame .imgs{ width: 100px; height: 100px;box-shadow: 0 2px 3px rgba(0,0,0,0.2); overflow: hidden; border-radius: 5px; display: flex; justify-content: center; align-items: center;}
    .upload-frame .imgs img{ width: 100%;}
    .upload-frame .btn-add{ width: 40px; height: 40px; background: url('../../assets/img/add.png') no-repeat; display: block;box-shadow: 0 2px 3px rgba(0,0,0,0.2); border-radius: 50%; overflow: hidden;}
    .upload-frame .infos{ margin-left: 20px; color: #888888; margin-top: 40px;}
    .upload-frame .infos h3{ font-size: 16px;}
    .upload-frame .infos p{ font-size: 12px;}
    .upload-frame .btn{ width: 90px; position: absolute; top: 33px; right: 0;}
    .upload-frame.min .btn{ right: auto; left: 120px; top: 68px;}
    .upload-frame .btn .n-btn { height: 32px;}
    .upload-frame .btn .n-btn a{ font-size: 12px;}
    .upload-frame input[type=file]{ display: none;}
</style>

<template>
    <div class="upload-frame" :class="simple ? 'min' : ''">
        <div class="imgs">
            <img :src="imgUrl" v-if="imgUrl != ''" />
            <a href="javascript:;" class="btn-add"  v-if="imgUrl == ''" @click="openFile"></a>
        </div>
        <div class="infos">
            <slot name="title"></slot>
            <div slot="hint">
                <slot name="hint"></slot>
            </div>
        </div>
        <div class="btn" v-if="imgUrl != ''">
            <t-button @dotap="openFile">重新上传</t-button>
        </div>
        <input type="file" ref="file" @change="fileChange" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg">
    </div>
</template>

<script type='es6'>
    import TButton from '@/components/common/TButton.vue'
    export default {
        name: 'app',
        components:{TButton},
        props:{
            simple:{
                type:Boolean,
                default:false
            }
        },
        data(){
            return{
                imgUrl:''
            }
        },
        methods:{
            openFile(){
                this.$refs.file.click();
            },
            fileChange(){
                let self = this;
                let file = event.target.files[0];
                let fr = new FileReader();
                fr.onload = function(result){
                    self.imgUrl = result.currentTarget.result;
                    self.$emit('getImgSrc',result.currentTarget.result);
                };
                fr.readAsDataURL(file);
            }
        }
    }

</script>

