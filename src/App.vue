<template>
    <router-view />
</template>

<script>
import {useStore} from 'vuex'
import {useI18n} from 'vue-i18n'

export default {
    name: 'App',
    setup() {
        const {locale} = useI18n()
        const store = useStore()
        store.commit('initializeStore')
        const language = store.state.language
        if (language) {
            locale.value = language
        }
    }
}
</script>

<style>
body {
    background: #f1f1f1;
}

.Vue-Toastification__toast.my-custom-toast-class {
    background-color: #0d6efd;
    border-radius: .25rem;
}

.Vue-Toastification__toast--error.my-custom-toast-class {
    background-color: #dc3545;
    border-radius: .25rem;
}

.Vue-Toastification__toast--info.my-custom-toast-class {
    background-color: #0dcaf0;
    border-radius: .25rem;
}

.Vue-Toastification__toast--success.my-custom-toast-class {
    background-color: #198754;
    border-radius: .25rem;
}

.Vue-Toastification__toast--warning.my-custom-toast-class {
    background-color: #ffc107;
    border-radius: .25rem;
}
</style>
