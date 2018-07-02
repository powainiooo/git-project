<style>
    .item-list{ margin: 0 -14px;}
</style>

<template>
    <div>
        <top-nav></top-nav>
        <section class="body-frame">
            <div class="item-list clearfix">
                <work-item></work-item>
                <work-item></work-item>
                <work-item></work-item>
                <work-item></work-item>
                <work-item></work-item>
                <work-item></work-item>
                <work-item></work-item>
            </div>
        </section>
        <bottom-nav></bottom-nav>
    </div>
</template>

<script type="es6">
    import TopNav from '@/components/TopNav.vue'
    import BottomNav from '@/components/BottomNav.vue'
    import WorkItem from '@/components/WorkItem.vue'
    export default{
        name: 'App',
        components:{TopNav,BottomNav,WorkItem},
        data(){
            return{

            }
        }
    }

</script>

