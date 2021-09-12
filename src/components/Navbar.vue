<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container my-2">
            <router-link :to="{ name: 'Dashboard' }" class="navbar-brand">Expenses Tracker</router-link>
            <div class="justify-content-end">
                <ul class="navbar-nav my-auto">
                    <li class="nav-item">
                    </li>
                    <li class="nav-item nav-link active">
                        Username
                    </li>
                    <li class="nav-item">
                        <button class="btn btn-outline-light" @click="handleClick">Log out</button>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import useLogout from '@/composables/useLogout'
import {useRouter} from 'vue-router'
import {useToast} from 'vue-toastification'

export default {
    name: 'Navbar',
    setup() {
        const toast = useToast()
        const router = useRouter()
        const {error, logout} = useLogout()
        const handleClick = async () => {
            await logout()
            if (!error.value) {
                toast.success('Successfully logged out!')
                await router.push({name: 'Welcome'})
            }
        }
        return {error, handleClick}
    }
}
</script>

<style scoped>

</style>