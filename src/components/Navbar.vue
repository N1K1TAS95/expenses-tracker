<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container my-2">
            <router-link :to="{ name: 'Dashboard' }" class="navbar-brand">
                <i class="bi bi-graph-up me-2"></i>
                {{ t('app_name') }}
            </router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="justify-content-end collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav my-auto">
                    <li class="nav-item">
                    </li>
                    <li class="nav-item nav-link active" v-if="user">
                        {{ user.displayName }}
                    </li>
                    <li class="nav-item my-lg-auto mt-2 me-2">
                        <button class="btn btn-sm btn-outline-light" @click="handleClick">{{ t('logout') }}</button>
                    </li>
                    <li class="nav-item my-lg-auto mt-2 me-auto">
                        <LanguageSelect/>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import useLogout from '@/composables/useLogout'
import {useToast} from 'vue-toastification'
import getUser from '@/composables/getUser'
import {useI18n} from 'vue-i18n'
import LanguageSelect from '@/components/LanguageSelect'

export default {
    name: 'Navbar',
    components: {LanguageSelect},
    setup() {
        const {t} = useI18n()
        const toast = useToast()
        const {error, logout} = useLogout()
        const {user} = getUser()
        const handleClick = async () => {
            await logout()
            if (!error.value) {
                toast.success('Successfully logged out!')
            }
        }
        return {error, handleClick, user, t}
    }
}
</script>

<style scoped>

</style>
