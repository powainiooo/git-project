<style>
    .prolist-frame{ width: 100vw; height: 100vh; overflow-y: scroll;}
    .prolist-frame::-webkit-scrollbar{ width: 3px; background-color: rgba(0,0,0,0);}
    .prolist-frame::-webkit-scrollbar-thumb{ background-color: #ffffff;}
    .prolist-frame .company-name{ font-size: 157px; color: #fff; position: absolute; left:60px; top: 60px; font-family: 'Helve';}
    .prolist-frame .list-content{  width: 1560px; display: flex; margin: 320px auto 100px auto; flex-wrap: wrap;}
    .prolist-frame .list-content>div{ margin:0 30px 0px 30px;}

    .prolist-frame .detail-frame{ width: 100%; height: 100%; display: flex; justify-content: flex-end; align-items: center; overflow: hidden; position: fixed; top: 0; left: 0;}
    .prolist-frame .detail-frame .list-item{ margin-right: 60px; margin-top: 160px;}

    .prolist-frame .anim-detail{ animation-duration: 0.5s; animation-timing-function: cubic-bezier(.25,.76,.36,.97)}
    .prolist-frame .btn-link{ width: 270px; position: fixed; top: 200px; right: 50px;}
    .prolist-frame .search{ position: fixed; top: 15px; right: 90px; z-index: 500;}
</style>

<template>
    <section class="prolist-frame" @scroll="pageScroll($event)">
        <div class="company-name">Sector</div>
        <div class="btn-link" v-if="!showDetail && frameST == 0"><t-button extraClass="white" @dotap="$router.push('publish')">发布新活动</t-button></div>
        <example v-if="showExample" @intolist="showExample=false"></example>

        <div class="search">
            <t-search></t-search>
        </div>

        <transition enter-active-class="animated anim-detail fadeIn" leave-active-class="animated anim-detail fadeOut">
        <div class="list-content" v-if="!showExample && !showDetail">
            <div v-for="(item,index) in listData" @click="gotoDetail(index)">
                <list-item :itemdata="item"></list-item>
            </div>
        </div>
        </transition>

        <div class="detail-frame" v-show="!showExample && showDetail">
            <transition enter-active-class="animated bounceIn" leave-active-class="animated bounceOut">
            <list-item :itemdata="detailData" v-if="showDetail"></list-item>
            </transition>
            <transition enter-active-class="animated anim-detail slideInRight" leave-active-class="animated anim-detail slideOutRight">
            <detail-frame v-if="showDetail" @close="showDetail = false" :itemData="detailData"></detail-frame>
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
    export default {
        name: 'app',
        components:{Example,ListItem,DetailFrame,TButton,TSearch},
        data(){
            return{
                showExample:true,
                showDetail:false,
                listData:[
                    {
                        status:1,
                        title:'Disco back',
                        begin:'2018/06/30',
                        type:'1',
                        logoImg:'',
                        posterImg:'',
                        ticketType:[
                            {
                                name:'早鸟票',
                                sale_nums:100,
                                all_nums:100,
                                is_sale_out:'2'
                            },
                            {
                                name:'预售票',
                                sale_nums:100,
                                all_nums:200,
                                is_sale_out:'1'
                            },
                            {
                                name:'普通票',
                                sale_nums:100,
                                all_nums:200,
                                is_sale_out:'1'
                            }
                        ]
                    },
                    {
                        status:2,
                        title:'Disco back',
                        begin:'2018/06/30',
                        type:'1',
                        logoImg:'',
                        posterImg:'',
                        ticketType:[
                            {
                                name:'早鸟票',
                                sale_nums:100,
                                all_nums:100,
                                is_sale_out:'2'
                            },
                            {
                                name:'预售票',
                                sale_nums:100,
                                all_nums:200,
                                is_sale_out:'1'
                            },
                            {
                                name:'普通票',
                                sale_nums:100,
                                all_nums:200,
                                is_sale_out:'1'
                            }
                        ]
                    },
                    {
                        status:3,
                        title:'Disco back',
                        begin:'2018/06/30',
                        type:'1',
                        logoImg:'',
                        posterImg:'',
                        ticketType:[
                            {
                                name:'早鸟票',
                                sale_nums:100,
                                all_nums:100,
                                is_sale_out:'2'
                            },
                            {
                                name:'预售票',
                                sale_nums:100,
                                all_nums:200,
                                is_sale_out:'1'
                            },
                            {
                                name:'普通票',
                                sale_nums:100,
                                all_nums:200,
                                is_sale_out:'1'
                            }
                        ]
                    },
                    {
                        status:4,
                        title:'Disco back',
                        begin:'2018/06/30',
                        type:'1',
                        logoImg:'',
                        posterImg:'',
                        ticketType:[
                            {
                                name:'早鸟票',
                                sale_nums:100,
                                all_nums:100,
                                is_sale_out:'2'
                            },
                            {
                                name:'预售票',
                                sale_nums:100,
                                all_nums:200,
                                is_sale_out:'1'
                            },
                            {
                                name:'普通票',
                                sale_nums:100,
                                all_nums:200,
                                is_sale_out:'1'
                            }
                        ]
                    },
                    {
                        status:5,
                        title:'Disco back',
                        begin:'2018/06/30',
                        type:'1',
                        logoImg:'',
                        posterImg:'',
                        ticketType:[
                            {
                                name:'早鸟票',
                                sale_nums:100,
                                all_nums:100,
                                is_sale_out:'2'
                            },
                            {
                                name:'预售票',
                                sale_nums:100,
                                all_nums:200,
                                is_sale_out:'1'
                            },
                            {
                                name:'普通票',
                                sale_nums:100,
                                all_nums:200,
                                is_sale_out:'1'
                            }
                        ]
                    },
                    {
                        status:6,
                        title:'Disco back',
                        begin:'2018/06/30',
                        type:'1',
                        logoImg:'',
                        posterImg:'',
                        ticketType:[
                            {
                                name:'早鸟票',
                                sale_nums:100,
                                all_nums:100,
                                is_sale_out:'2'
                            },
                            {
                                name:'预售票',
                                sale_nums:100,
                                all_nums:200,
                                is_sale_out:'1'
                            },
                            {
                                name:'普通票',
                                sale_nums:100,
                                all_nums:200,
                                is_sale_out:'1'
                            }
                        ]
                    }
                ],
                detailData:{},
                frameST:0
            }
        },
        methods:{
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

