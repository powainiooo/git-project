<style>

</style>

<template>
    <div>
        <top-nav @getID="getListData"></top-nav>
        <body-frame>
            <div class="item-list clearfix">
                <work-item></work-item>
                <work-item></work-item>
                <work-item></work-item>
                <work-item></work-item>
                <work-item></work-item>
                <work-item></work-item>
                <work-item></work-item>
            </div>
        </body-frame>
        <bottom-nav></bottom-nav>
    </div>
</template>

<script type="es6">
    import TopNav from '@/components/TopNav.vue'
    import BottomNav from '@/components/BottomNav.vue'
    import WorkItem from '@/components/WorkItem.vue'
    import BodyFrame from '@/components/BodyFrame.vue'
    export default{
        name: 'App',
        components:{TopNav,BottomNav,WorkItem,BodyFrame},
        computed:{
            cateID(){
                return this.$store.state.cateID
            }
        },
        mounted(){
            this.getListData(this.$store.state.cateID);
        },
        data(){
            return{

            }
        },
        methods:{
            getListData(id){
                console.log(id);
            }
        }
    }

</script>

