<template>
    <Navbar />
    <div class="container pt-1 pb-3">
        <Entries class="mt-4"/>
    </div>
</template>

<script>
import Navbar from '@/components/nav/Navbar'
import getUser from '@/composables/getUser'
import {watch} from 'vue'
import {useRouter} from 'vue-router'
import NewEntry from '@/components/entries/NewEntry'
import Entries from '@/components/entries/Entries'
import {useI18n} from 'vue-i18n'

export default {
    name: 'Dashboard',
    title() {
        const {t} = useI18n()
        return `${t('app_name')} | ${t('dashboard')}`
    },
    components: {Entries, NewEntry, Navbar},
    setup() {
        const {user} = getUser()
        const router = useRouter()
        watch(user, () => {
            if (!user.value) {
                router.push({name: 'Welcome'})
            }
        })
    }
}
</script>

<style scoped>

</style>
