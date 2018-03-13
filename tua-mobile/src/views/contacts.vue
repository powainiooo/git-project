<style>
    @import '../assets/css/layout.css';
</style>

<template>
    <div class="page-frame">
        <div class="title">CONTACTS</div>
        <ul class="contacts-list">
            <li>
                <p>The contact<br>联系人</p>
                <div>郑茗友</div>
            </li>
            <li>
                <p>E-mail<br>电子邮箱</p>
                <div>27318589@qq.com</div>
            </li>
            <li>
                <p>Phone<br>手机</p>
                <div>
                    <a href="javascript:;" class="tel">+86 137-2553-8273</a>
                    <span class="time">10:00 am - 6:00 pm （工作日）</span>
                </div>
            </li>
        </ul>
        <footer-nav></footer-nav>
    </div>
</template>

<script type="es6">
    import FooterNav from '@/components/FooterNav'
    export default{
        name: 'contacts',
        components:{FooterNav},
        data(){
            return{

            }
        }
    }

</script>

