<template>
    <div class="container">
        <h1>Welcome</h1>
        <div v-if="showLogin">
            <LoginForm @signup="showLogin = !showLogin"/>
        </div>
        <div v-else>
            <SignupForm @login="showLogin = !showLogin" />
        </div>
    </div>
</template>

<script>
import SignupForm from '@/components/SignupForm'
import {ref} from 'vue'
import LoginForm from '@/components/LoginForm'

export default {
    name: 'Welcome',
    components: {LoginForm, SignupForm},
    setup() {
        const showLogin = ref(true)

        return {
            showLogin
        }
    }
}
</script>

<style scoped>

</style>