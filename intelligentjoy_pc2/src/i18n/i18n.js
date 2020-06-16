import Vue from "vue";
import VueI18n from "vue-i18n";
import zh_cn from "./lang/zh_cn";
import zh_tw from "./lang/zh_tw";
Vue.use(VueI18n);

//ch_cn 中文简体  ch_tw 中文繁体
const messages = {
    zh_cn: zh_cn,
    zh_tw: zh_tw
};

let locale = "zh_cn";
//先判断localstorage中是否有local，没有则获取浏览器语言标示，并设置localStorage
if (localStorage.locale) {
    locale = localStorage.locale;
} else {
    let lang = navigator.browserLanguage
        ? navigator.browserLanguage
        : navigator.language;
    if (lang.toLowerCase() == "zh-cn") {
        locale = "zh_cn";
    } else {
        locale = "zh_tw";
    }
    localStorage.locale = locale;
}

console.log(locale);
export default new VueI18n({
    locale: locale, // 语言标识
    messages
});
