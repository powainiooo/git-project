<style>
    .n-menu{ position: fixed; top: 0; right: 0; z-index: 500;}
    .n-menu .btn{ font-size: 40px; color: #ffffff;}
    .n-menu .btn2{ font-size: 40px; color: #0129ac;}
    .n-menu .btn2 .ivu-icon{ display: block;}
    .n-menu .n-menu-frame{ width: 500px; height: 100vh; position: absolute; top: 0; right: 0; background-color: #ffffff; transition: all 0.5s cubic-bezier(.25,.76,.36,.97);}
    .n-menu .n-menu-frame::-webkit-scrollbar{ width: 3px; background-color: #ffffff;}
    .n-menu .n-menu-frame::-webkit-scrollbar-thumb{ background-color: #002aa6;}
    .n-menu .n-menu-btns{ overflow: hidden; margin: 50px 40px 100px 40px;}
    .n-menu .info-item{ display: flex; height: 40px; margin-bottom: 20px;}
    .n-menu .info-item .name{ width: 100px; height: 100%; box-sizing: border-box; font-size: 16px; color: #ffffff; padding-left: 15px; display: flex; align-items: center; background: linear-gradient(244deg,rgb(0,42,169),rgb(0,61,188)); border-radius: 5px 0 0 5px;}
    .n-menu .info-item .info{ width: 170px; height: 100%; box-sizing: border-box; font-size: 16px; color: #000000; font-weight: bold; padding-left: 15px; display: flex; align-items: center; background-color: #eeeef0; border-radius: 0 5px 5px 0;}
    .n-menu .copyright{ position: absolute; left: 35px; bottom: 30px; font-size: 20px; color: #000000;}
    .n-menu .copyright span{ font-size: 12px; color: #bebebe;}
    .n-menu .anim{ animation-duration: 0.5s; animation-timing-function: cubic-bezier(.25,.76,.36,.97);}
</style>

<template>
    <div class="n-menu">
        <a href="javascript:;" class="btn mt50 mr40" @click="showNavs=true"><Icon type="ios-menu" /></a>
        <transition enter-active-class="animated anim slideInRight" leave-active-class="animated anim slideOutRight">
        <div class="n-menu-frame" v-if="showNavs" :style="{width:showItem == 'recordlist' ? '1300px' : '500px'}">
            <div class="n-menu-btns">
                <a href="javascript:;"
                   class="btn2 fl"
                   v-if="showItem != 'nav'"
                   @click="toggle('nav')"><Icon type="ios-arrow-back" /></a>
                <a href="javascript:;" class="btn2 fr"  @click="showNavs=false;showItem='nav'"><Icon type="md-close" /></a>
            </div>
            <menu-nav v-if="showItem == 'nav'" @toggle="toggle"></menu-nav>
            <base-info v-if="showItem == 'baseinfo'"></base-info>
            <bank-info v-if="showItem == 'bankinfo'" @toggle="toggle"></bank-info>
            <editor-bank v-if="showItem == 'editorbank'"></editor-bank>
            <record-list v-if="showItem == 'recordlist'" @toggle="toggle"></record-list>
            <crash-out v-if="showItem == 'crashout'" @toggle="toggle"></crash-out>
            <t-laws v-if="showLaws" readonly @close="showLaws=false"></t-laws>
            <contact v-if="showItem == 'contact'" readonly></contact>
            <div class="copyright" v-if="showItem == 'nav'">
                <i class="icon-logo"></i><br>
                <span>Copyright &copyright;2018HO.AllRights reserved.粤ICP备16121686号-1</span>
            </div>
        </div>
        </transition>
    </div>
</template>

<script type="es6">
    import MenuNav from '@/components/menu/MenuNav.vue'
    import BaseInfo from '@/components/menu/BaseInfo.vue'
    import BankInfo from '@/components/menu/BankInfo.vue'
    import EditorBank from '@/components/menu/EditorBank.vue'
    import RecordList from '@/components/menu/RecordList.vue'
    import CrashOut from '@/components/menu/CrashOut.vue'
    import TLaws from '@/components/common/TLaws.vue'
    import Contact from '@/components/menu/Contact.vue'
    export default{
        name: 'App',
        components:{MenuNav,BaseInfo,BankInfo,EditorBank,RecordList,CrashOut,TLaws,Contact},
        data(){
            return{
                showItem:'nav',
                showNavs:false,
                showLaws:false
            }
        },
        methods:{
            toggle(val){
                if(val == 'laws'){
                    this.showLaws = true;
                }else{
                    this.showItem = val;
                }
            }
        }
    }

</script>

