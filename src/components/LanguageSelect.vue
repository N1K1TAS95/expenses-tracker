<template>
    <select v-model="locale" class="form-select form-select-sm">
        <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">
            {{ lang.toUpperCase() }}
        </option>
    </select>
</template>

<script>
import {ref, watch} from 'vue'
import {useI18n} from 'vue-i18n'
import {useStore} from 'vuex'
import {useToast} from 'vue-toastification'

export default {
    name: 'LanguageSelect',
    setup() {
        const {t, locale} = useI18n()
        const toast = useToast()
        const store = useStore()
        watch(locale, () => {
            store.commit('setLanguage', locale.value)
            localStorage.setItem('language', locale.value)
            toast.success(t('language_changed'))
        })
        const langs = ref(['en', 'it'])
        return {store, t, locale, langs}
    }
}
</script>

<style scoped>

</style>
