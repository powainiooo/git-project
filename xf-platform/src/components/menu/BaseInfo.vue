<style>
    .base-info{}
    .base-info .base-info-list{ margin: 0 50px 120px 50px;}
    .base-info .base-info-hint{ border-top: 1px solid #e2e2e2; background-color: #efefef; padding: 20px 50px 115px 50px;}
    .base-info .base-info-hint .logo-frame{ display: flex; align-items: center;}
    .base-info .base-info-hint .logo-frame .img{ width: 100px; height: 100px; display: flex; justify-content: center; align-items: center; border-radius: 6px; overflow: hidden; box-shadow: 0 2px 3px rgba(0,0,0,0.2); background-color: #ffffff;}
    .base-info .base-info-hint .logo-frame .img img{ width: 100%;}
    .base-info .base-info-hint .logo-frame .name{ font-size: 14px; color: #888888; margin-left: 20px;}
</style>

<template>
    <div class="base-info">
        <div class="base-info-list">
            <div class="info-item">
                <p class="name">类型</p>
                <p class="info">{{userData.type == '1' ? '公司' : '个人'}}</p>
            </div>
            <div class="info-item">
                <p class="name">名称</p>
                <p class="info">{{userData.activity}}</p>
            </div>
            <div class="info-item" v-if="userData.type == '1'">
                <p class="name">所属公司</p>
                <p class="info">{{userData.company}}</p>
            </div>
            <div class="info-item">
                <p class="name">联系地址</p>
                <p class="info" style="width: 300px;">{{userData.address}}</p>
            </div>
            <div class="info-item">
                <p class="name">负责人</p>
                <p class="info">{{userData.person}}</p>
            </div>
            <div class="info-item">
                <p class="name">身份证</p>
                <p class="info" style="width: 300px;">{{userData.idnum}}</p>
            </div>
            <div class="info-item">
                <p class="name">联系电话</p>
                <p class="info">{{userData.mobile}}</p>
            </div>
        </div>
        <div class="base-info-hint">
            <div class="logo-frame">
                <div class="img"><img :src="userData.logo_img"> </div>
                <div class="name">活动方LOGO</div>
            </div>
            <div style="font-size: 14px; color: #888888; margin-top: 60px;">活动方基本信息无法修改，如若有紧急情况需要修改信息，<br>请电话联系18000000000</div>
        </div>
    </div>
</template>

<script type="es6">
    export default{
        name: 'App',
        computed:{
            userData(){
                return this.$store.state.userData
            }
        },
        data(){
            return{

            }
        }
    }

</script>

