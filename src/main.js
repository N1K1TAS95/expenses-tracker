import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'


const toast_options = {
    position: 'bottom-right',
    toastClassName: 'my-custom-toast-class',
    pauseOnHover: true,
    hideProgressBar: true
}

createApp(App)
    .use(router)
    .use(Toast, toast_options)
    .mount('#app')
