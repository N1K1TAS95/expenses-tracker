<template>
    <router-view/>
</template>

<script>
import {useStore} from 'vuex'
import {useI18n} from 'vue-i18n'

export default {
    name: 'App',
    title() {
        const {t} = useI18n()
        return `${t('app_name')}`
    },
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
</style>
