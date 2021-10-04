import {ref, readonly} from 'vue'
import {projectAuth} from '@/firebase/config'

const useSignup = () => {
    const error = ref(null)
    const loading = ref(false)
    const signup = async (email, password, displayName) => {
        loading.value = true
        error.value = null
        try {
            const res = await projectAuth.createUserWithEmailAndPassword(email, password)
            await res.user.updateProfile({displayName})
            error.value = null
            loading.value = false
            return res
        } catch (err) {
            loading.value = false
            console.log(err.message)
            error.value = err.message
        }
    }
    return {error, loading: readonly(loading), signup}
}

export default useSignup
