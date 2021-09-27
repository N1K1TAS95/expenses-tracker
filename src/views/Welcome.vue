<template>
    <div v-if="showLogin">
        <LoginForm @signup="showLogin = !showLogin" @login="enter" />
    </div>
    <div v-else>
        <SignupForm @login="showLogin = !showLogin" @signup="enter" />
    </div>
</template>

<script>
import SignupForm from '@/components/auth/SignupForm'
import {ref} from 'vue'
import LoginForm from '@/components/auth/LoginForm'
import {useRouter} from 'vue-router'
import {useToast} from 'vue-toastification'
import {useI18n} from 'vue-i18n'

export default {
    name: 'Welcome',
    components: {LoginForm, SignupForm},
    setup() {
        const {t} = useI18n()
        const toast = useToast()
        const showLogin = ref(true)
        const router = useRouter()

        const enter = () => {
            toast.success(t('login_successful'))
            router.push({name: 'Dashboard'})
        }

        return {
            showLogin,
            enter
        }
    }
}
</script>

<style scoped>

</style>
