import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router/index.js";
import { createPinia } from 'pinia';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCartPlus, faCartShopping, faCircleXmark, faHome, faUserSecret } from '@fortawesome/free-solid-svg-icons'

library.add(faUserSecret, faHome, faCartShopping, faCartPlus, faCircleXmark)

const pinia = createPinia();

createApp(App).component('font-awesome-icon', FontAwesomeIcon).use(router).use(pinia).mount('#app')
