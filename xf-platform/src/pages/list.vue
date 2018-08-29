<style>
    .prolist-frame{ width: 100vw; height: 100vh; overflow-y: scroll;}
    .prolist-frame::-webkit-scrollbar{ width: 3px; background-color: rgba(0,0,0,0);}
    .prolist-frame::-webkit-scrollbar-thumb{ background-color: #ffffff;}
    .prolist-frame .company-name{ font-size: 157px; color: #fff; position: absolute; left:60px; top: 60px; font-family: 'Helve';}
    .prolist-frame .list-content{  width: 1560px; display: flex; margin: 320px auto 100px auto; flex-wrap: wrap;}
    .prolist-frame .list-content>div{ margin:0 30px 0px 30px;}

    .prolist-frame .detail-frame{ width: 100%; height: 100%; display: flex; justify-content: flex-end; align-items: center; overflow: hidden; position: fixed; top: 0; left: 0;}
    .prolist-frame .detail-frame .list-item{ margin-right: 60px; margin-top: 270px;}

    .prolist-frame .anim-detail{ animation-duration: 0.5s; animation-timing-function: cubic-bezier(.25,.76,.36,.97)}
    .prolist-frame .btn-link{ width: 270px; position: fixed; top: 200px; right: 50px;}
    .prolist-frame .search{ position: fixed; top: 15px; right: 90px; z-index: 490;}
</style>

<template>
    <section class="prolist-frame" @scroll="pageScroll($event)">
        <div class="company-name">{{userActivity}}</div>
        <div class="btn-link" v-if="!showDetail && frameST == 0"><t-button extraClass="white" @dotap="$router.push('publish')">发布新活动</t-button></div>
        <example v-if="showExample" @intolist="showExample=false"></example>

        <div class="search">
            <t-search></t-search>
        </div>

        <transition enter-active-class="animated anim-detail fadeIn" leave-active-class="animated anim-detail fadeOut">
        <div class="list-content" v-if="!showExample && !showDetail">
            <div v-for="(item,index) in listData" @click="gotoDetail(index)">
                <list-item :itemdata="item" :fileurl="fileurl"></list-item>
            </div>
        </div>
        </transition>

        <div class="detail-frame" v-show="!showExample && showDetail">
            <transition enter-active-class="animated bounceIn" leave-active-class="animated bounceOut">
            <list-item :itemdata="detailData" v-if="showDetail" :fileurl="fileurl"></list-item>
            </transition>
            <transition enter-active-class="animated anim-detail slideInRight" leave-active-class="animated anim-detail slideOutRight">
            <detail-frame v-if="showDetail" @close="showDetail = false" :itemData="detailData" :fileurl="fileurl"></detail-frame>
            </transition>
        </div>
    </section>
</template>

<script type='es6'>
    import Example from '@/components/list/Example.vue'
    import ListItem from '@/components/list/ListItem.vue'
    import DetailFrame from '@/components/list/DetailFrame.vue'
    import TButton from '@/components/common/TButton.vue'
    import TSearch from '@/components/common/TSearch.vue'
    import Cookies from 'js-cookie';
    export default {
        name: 'app',
        components:{Example,ListItem,DetailFrame,TButton,TSearch},
        data(){
            return{
                showExample:false,
                showDetail:false,
                listData:[],
                detailData:{},
                frameST:0,
                fileurl:''
            }
        },
        computed:{
            userActivity(){
                return this.$store.state.userData.activity || '';
            }
        },
        mounted(){
            this.$ajax.defaults.headers.common['mid'] = Cookies.get('xfmid');
            this.$ajax.defaults.headers.common['tokey'] = Cookies.get('xftokey');
            this.$ajax.defaults.baseURL = 'http://ticket.pc-online.cc';
            let self = this;
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
            this.getListData();
        },
        methods:{
            getListData(){
                let self = this;
                this.$ajax.get('/client/api/activity_list').then(res=>{
                    console.log('list');
                    let data = res.data;
                    if(data.data.length == 0){
                        self.showExample = true;
                    }else{
                        self.showExample = false;
                        self.listData = data.data;
                        self.fileurl = data.fileurl;
                        self.$store.commit('doShowGlobalMenu',true);
                    }
                })
            },
            gotoDetail(index){
                this.detailData = this.listData[index];
                this.showDetail = true;
            },
            pageScroll(e){
                this.frameST = e.target.scrollTop;
            }
        }
    }

</script>

