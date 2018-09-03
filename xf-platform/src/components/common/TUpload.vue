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
</style>

<template>
    <div class="n-upload" :class="simple ? 'min' : ''">
        <div class="imgs">
            <img :src="value" v-if="value != ''" />
            <a href="javascript:;" class="btn-add"  v-if="value == ''" @click="openFile"></a>
        </div>
        <div class="infos">
            <slot name="title"></slot>
            <div slot="hint">
                <slot name="hint"></slot>
            </div>
        </div>
        <div class="btn" v-if="value != ''">
            <t-button @dotap="openFile" size="min">重新上传</t-button>
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
            value:{
                type:String,
                default:''
            },
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
                    //self.imgUrl = result.currentTarget.result;
                    self.$emit('input',result.currentTarget.result);
                };
                fr.readAsDataURL(file);
            }
        }
    }

</script>

