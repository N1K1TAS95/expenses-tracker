<template>
    <form class="form-signin text-center" @submit.prevent="handleSubmit">
        <i class="bi bi-graph-up display-1"></i>
        <h4 class="mt-3">{{ t('app_name')}}</h4>
        <h5 class="mt-5">{{ t('signup') }}</h5>
        <div class="input-group mt-4">
            <input type="text" class="form-control" id="inputUsername" required v-model="displayName"
                   :placeholder="t('display_name')"
            >
        </div>
        <div class="input-group">
            <input type="email" class="form-control" id="inputEmail" required v-model="email" :placeholder="t('email')">
        </div>
        <div class="input-group">
            <input type="password" class="form-control" id="inputPassword" required v-model="password"
                   :placeholder="t('password')"
            >
        </div>
        <div class="input-group d-grid gap-2">
            <button class="btn btn-lg btn-primary my-4" type="submit">{{ t('submit') }}</button>
        </div>
        <div class="input-group">
            <button class="btn btn-secondary my-2 mx-auto" @click.prevent="$emit('login')">{{ t('login') }}</button>
        </div>
    </form>
</template>

<script>
import {ref} from 'vue'
import useSignup from '@/composables/useSignup'
import {useToast} from 'vue-toastification'
import {useI18n} from 'vue-i18n'


export default {
    name: 'SignupForm',
    title() {
        const {t} = useI18n()
        return `${t('app_name')} | ${t('signup')}`
    },
    setup(props, context) {
        const {t} = useI18n()
        const toast = useToast()
        const {error, signup} = useSignup()

        const displayName = ref('')
        const email = ref('')
        const password = ref('')

        const handleSubmit = async () => {
            await signup(email.value, password.value, displayName.value)
            if (!error.value) {
                toast.info(t('registration_successful'))
                console.log('Registration was successful.')
                context.emit('signup')
            } else {
                toast.error(error.value)
            }
        }

        return {
            displayName,
            email,
            password,
            handleSubmit,
            error,
            t
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
