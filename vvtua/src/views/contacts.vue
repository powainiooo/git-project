<style>
    @import '../assets/css/layout.css';
    @import '../assets/css/animate.css';

    .contacts-frame{ width: 1130px; height: 100%; margin-left: 20%; display: table; overflow: hidden;}
    .contacts-frame>div{ display: table-cell; vertical-align: middle;}
    .page-title{ font-size: 24px; font-family: 'trajanPro'; color: #bc9e44;}
    .contacts-list{ margin-top: 60px;}
    .contacts-list li{ overflow: hidden; margin-bottom: 30px; font-size: 14px; color: rgba(255,255,255,0.5); line-height: 1.5; letter-spacing: 4px;}
    .contacts-list li p{ width: 230px; float: left;}
    .contacts-list li p span{ font-family: '微软雅黑'}
    .contacts-list li p .tag{ color: #bc9e44; font-family: 'trajanPro'; display: inline-block; font-size: 12px; letter-spacing: 0; margin-top: 35px;}
    .contacts-list li div{ float: left;}
    .contacts-list li div img{ margin-top: 10px;}

    .animate05{animation-duration:.5s}
</style>

<template>
    <div class="page-frame bg1">
        <top-nav :showNav='false'></top-nav>
        <div class="contacts-frame">
            <div>
                <div class="clearfix" style="margin-bottom: 100px;">
                    <transition enter-active-class="animated animate05 slideInUp">
                    <div class="pull-left" v-show="isShow">
                        <h3 class="page-title">CONTACTS</h3>
                        <ul class="contacts-list">
                            <li>
                                <p><span>The contact</span><br>联系人</p>
                                <div>{{contactData.contact}}</div>
                            </li>
                            <li>
                                <p><span>E-mail</span><br>电子邮箱</p>
                                <div>{{contactData.email}}</div>
                            </li>
                            <li>
                                <p><span>Phone</span><br>手机</p>
                                <div>{{contactData.mobile}}<br>{{contactData.time_slot}}</div>
                            </li>
                            <li>
                                <p><span>Address</span><br>地址</p>
                                <div>{{contactData.address}}</div>
                            </li>
                            <li style="margin-top: 75px;">
                                <p>
                                    <img src="@/assets/images/icon-wechat.png" :title="contactData.wx_number"> <br>
                                    <span class="tag">TAU</span><br>头牌文化传播
                                </p>
                                <div><img :src="contactData.domain_url+contactData.ewm_url"></div>
                            </li>
                        </ul>
                    </div>
                    </transition>
                </div>
            </div>
        </div>
        <bottom-nav posLeft="150"></bottom-nav>
    </div>
</template>

<script type="es6">
    import BottomNav from '@/components/BottomNav.vue'
    import TopNav from '@/components/TopNav.vue'
    export default{
        name: 'contacts',
        components: {BottomNav,TopNav},
        mounted(){
            let self = this;
            this.$store.dispatch('doGetContact');
            setTimeout(()=>{
                self.isShow = true
            },200)
        },
        data(){
            return{
                isShow:false
            }
        },
        computed:{
            contactData(){
                return this.$store.state.contactData
            }
        }
    }

</script>

