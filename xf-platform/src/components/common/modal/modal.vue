<style>
    .n-modal{ width: 100vw; height: 100vh; background-color: rgba(0,0,0,0.9); position: fixed; top: 0; left: 0; z-index: 2000; display: flex; justify-content: center; align-items: center;}
    .n-modal .modal-frame{ width: 750px; height: 400px; background-color: #fff; border-radius: 0 0 5px 5px; position: relative;}
    .n-modal .modal-frame:before{ content: ''; width: 100%; height: 3px; background: url('../../../assets/img/ticket-top.png') repeat-x; position: absolute; top: -3px; left: 0;}
    .n-modal .modal-frame .top{ margin: 30px 30px 70px 70px; display: flex; justify-content: space-between; color: #0129ac;}
    .n-modal .modal-frame .top .icon-logo{ font-size: 21px;}
    .n-modal .modal-frame .top .ivu-icon-md-close{ font-size: 24px;}
    .n-modal .modal-frame .title{ font-size: 32px; margin: 0 70px 20px 70px; color: #000000;}
    .n-modal .modal-frame .content{ font-size: 14px; height: 130px; margin: 0 70px; color: #000000;}
    .n-modal .modal-frame .txt{ margin: -50px 70px 10px 70px; height: 238px;}
    .n-modal .modal-frame .txt p{ font-size: 14px; text-align: right; margin-bottom: 6px; color: #002aa6;}
    .n-modal .modal-frame .txt textarea{ width: 100%; border: 1px solid #e5e5e5; border-radius: 6px; padding: 10px; box-sizing: border-box;}
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
            <div class="title" v-if="type == ''">{{title}}</div>
            <div class="content" v-html="content" v-if="type == ''"></div>
            <div class="txt" v-if="type == 'textarea'">
                <p>{{text.length}}/200</p>
                <textarea rows="9" placeholder="由于微信消息通知限制，只可在用户已购票后的7日内发送消息，超过7日的用户则无法收取该消息。请填写通知（200字）" v-model="text" maxlength="200"></textarea>
            </div>
            <div class="btns btns-one">
                <t-button @dotap="onOk">{{btn1Name}}</t-button>
                <t-button extraClass="gray" v-if="!isWarn" @dotap="onCancel">{{btn2Name}}</t-button>
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
                type:'',
                text:'',
                btn1Name:'确认',
                btn2Name:'取消',
                opts:{}
            }
        },
        methods:{
            warn(opts){
                this.isShow = true;
                this.isWarn = true;
                this.content = opts.content;
                this.title = opts.title;
                this.btn1Name = opts.btn1Name || '确认';
                this.opts = opts;
            },
            confirm(opts){
                this.isShow = true;
                this.isWarn = false;
                this.content = opts.content;
                this.title = opts.title;
                this.type = opts.type || '';
                this.btn1Name = opts.btn1Name || '确认';
                this.btn2Name = opts.btn2Name || '取消';
                this.opts = opts;
            },
            onCancel(){
                this.isShow = false;
            },
            onOk(){
                this.isShow = false;
                if(typeof this.opts.onOk == 'function'){
                    this.opts.onOk(this.text);
                }
            }
        }
    }

</script>

