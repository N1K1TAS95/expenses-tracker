<template>
    <form class="form-signin text-center" @submit.prevent="handleSubmit">
        <h1>Sign Up</h1>
        <div class="alert alert-danger alert-dismissible fade show mt-4" role="alert" v-if="error">
            {{ error }}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        <div class="input-group mt-4">
            <input type="text" class="form-control" id="inputUsername" required v-model="displayName" placeholder="Display Name">
        </div>
        <div class="input-group">
            <input type="email" class="form-control" id="inputEmail" required v-model="email" placeholder="Email">
        </div>
        <div class="input-group">
            <input type="password" class="form-control" id="inputPassword" required v-model="password" placeholder="Password">
        </div>
        <div class="input-group d-grid gap-2">
            <button class="btn btn-lg btn-primary my-4" type="submit">Submit</button>
        </div>
        <div class="input-group">
            <button class="btn btn-secondary my-2 mx-auto" @click.prevent="$emit('login')">Login</button>
        </div>
    </form>
</template>

<script>
import {ref} from 'vue'
import useSignup from '@/composables/useSignup'

export default {
    name: 'SignupForm',
    emits: ['login'],
    setup() {
        const {error, signup} = useSignup()

        const displayName = ref('')
        const email = ref('')
        const password = ref('')

        const handleSubmit = async () => {
            await signup(email.value, password.value, displayName.value)
        }

        return {
            displayName,
            email,
            password,
            handleSubmit,
            error
        }
    }
}
</script>

<style scoped>
.form-signin {
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: 0 auto;
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
}

.form-signin .form-control {
    position: relative;
    box-sizing: border-box;
    height: auto;
    padding: 10px;
    font-size: 16px;
}

.form-signin .form-control:focus {
    z-index: 2;
}

.form-signin input[id="inputUsername"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
}

.form-signin input[id="inputEmail"] {
    margin-bottom: -1px;
    border-radius: 0;
}

.form-signin input[id='inputPassword'] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
}
</style>