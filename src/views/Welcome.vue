<template>
    <div v-if="showLogin">
        <LoginForm @signup="showLogin = !showLogin" @login="enter" />
    </div>
    <div v-else>
        <SignupForm @login="showLogin = !showLogin" @signup="enter" />
    </div>
</template>

<script>
import SignupForm from '@/components/SignupForm'
import {ref} from 'vue'
import LoginForm from '@/components/LoginForm'
import {useRouter} from 'vue-router'

export default {
    name: 'Welcome',
    components: {LoginForm, SignupForm},
    setup() {
        const showLogin = ref(true)
        const router = useRouter()

        const enter = () => {
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