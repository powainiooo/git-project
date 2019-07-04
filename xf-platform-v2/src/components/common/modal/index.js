import ModalComponent from './modal.vue'

let $vm

const install = function (Vue, opts = {}) {
   const ModalPlugin = Vue.extend(ModalComponent)
   $vm = new ModalPlugin()
   document.body.appendChild($vm.$mount().$el)

   Vue.prototype.$tModal = $vm
   return $vm
}

if (typeof window !== 'undefined' && window.Vue) {
   install(window.Vue)
}

export default {
   install,
   $vm: ModalComponent
}
