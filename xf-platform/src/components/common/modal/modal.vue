<style>
    .n-modal{ width: 100vw; height: 100vh; background-color: rgba(0,0,0,0.9); position: fixed; top: 0; left: 0; z-index: 1000; display: flex; justify-content: center; align-items: center;}
    .n-modal .modal-frame{ width: 750px; height: 400px; background-color: #fff; border-radius: 0 0 5px 5px; position: relative;}
    .n-modal .modal-frame:before{ content: ''; width: 100%; height: 3px; background: url('../../../assets/img/ticket-top.png') repeat-x; position: absolute; top: -3px; left: 0;}
    .n-modal .modal-frame .top{ margin: 30px 30px 70px 70px; display: flex; justify-content: space-between; color: #0129ac;}
    .n-modal .modal-frame .top .icon-logo{ font-size: 21px;}
    .n-modal .modal-frame .top .ivu-icon-md-close{ font-size: 24px;}
    .n-modal .modal-frame .title{ font-size: 32px; margin: 0 70px 20px 70px;}
    .n-modal .modal-frame .content{ font-size: 14px; height: 130px; margin: 0 70px;}
    .n-modal .modal-frame .btns{ display: flex; justify-content: center;}
    .n-modal .modal-frame .btns .n-btn{ width: 270px; margin: 0 35px;}
</style>

<template>
    <section class="n-modal" v-if="isShow">
        <div class="modal-frame">
            <div class="top">
                <i class="icon-logo"></i>
                <Icon type="md-close" @click="onCancel" />
            </div>
            <div class="title">{{title}}</div>
            <div class="content">{{content}}</div>

            <div class="btns btns-one">
                <t-button @click="onOk">确认</t-button>
                <t-button extraClass="gray" v-if="!isWarn" @click="onCancel">取消</t-button>
            </div>
        </div>
    </section>
</template>

<script type='es6'>
    import TButton from '@/components/common/TButton.vue'
    export default {
        name: 'app',
        components:{TButton},
        data(){
            return{
                isShow:false,
                isWarn:true,
                title:'',
                content:'',
                opts:{}
            }
        },
        methods:{
            warn(opts){
                this.isShow = true;
                this.isWarn = true;
                this.content = opts.content;
                this.title = opts.title;
                this.opts = opts;
            },
            confirm(opts){
                this.isShow = true;
                this.isWarn = false;
                this.content = opts.content;
                this.title = opts.title;
                this.opts = opts;
            },
            onCancel(){
                this.isShow = false;
            },
            onOk(){
                this.isShow = false;
                if(typeof this.opts.onOk == 'function'){
                    this.opts.onOk();
                }
            }
        }
    }

</script>

