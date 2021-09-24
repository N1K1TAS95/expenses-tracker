<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container my-2">
            <router-link :to="{ name: 'Dashboard' }" class="navbar-brand">{{ t('app_name') }}</router-link>
            <div class="justify-content-end">
                <ul class="navbar-nav my-auto">
                    <li class="nav-item">
                    </li>
                    <li class="nav-item nav-link active" v-if="user">
                        {{ user.displayName }}
                    </li>
                    <li class="nav-item">
                        <button class="btn btn-outline-light" @click="handleClick">{{ t('logout') }}</button>
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

export default {
    name: 'Navbar',
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