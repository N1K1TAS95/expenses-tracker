import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import {projectAuth} from '@/firebase/config'


const toast_options = {
    position: 'bottom-right',
    toastClassName: 'my-custom-toast-class',
    pauseOnHover: true,
    hideProgressBar: true
}

let app

projectAuth.onAuthStateChanged(() => {
    if (!app) {
        app = createApp(App)
            .use(router)
            .use(Toast, toast_options)
            .mount('#app')
    }
})
