import Swiper from "swiper"
import 'swiper/swiper-bundle.css'
import './assets/layout.css'


// 轮播图
var swiper = new Swiper('.swiper-container', {
	slidesPerView: "auto",
	centeredSlides : true,
	loop: true
});

// 菜单
let showMenu = false
const btnMenu = document.getElementById('btnMenu')
const menuFrame = document.getElementById('menuFrame')
btnMenu.addEventListener('click', () => {
	showMenu = !showMenu
	menuFrame.className = `menu ${showMenu ? 'menu-show' : ''}`
})

// 语言
let showEn = false
const btnEn = document.getElementById('btnEn')
const enFrame = document.getElementById('enFrame')
btnEn.addEventListener('click', () => {
	showEn = !showEn
	enFrame.className = `en ${showEn ? 'en-show' : ''}`
})
