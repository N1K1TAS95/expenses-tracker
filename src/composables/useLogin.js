import {readonly, ref} from 'vue'
import {projectAuth} from '@/firebase/config'

const useLogin = () => {
    const error = ref(null)
    const loading = ref(false)
    const login = async (email, password) => {
        loading.value = true
        error.value = null
        try {
            const res = await projectAuth.signInWithEmailAndPassword(email, password)
            loading.value = false
            error.value = null
            return res
        } catch (err) {
            loading.value = false
            console.log(err.message)
            error.value = err.message
        }
    }
    return {error, loading: readonly(loading), login}
}

export default useLogin
