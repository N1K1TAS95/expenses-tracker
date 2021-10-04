import {ref, readonly} from 'vue'
import {projectAuth} from '@/firebase/config'

const useLogout = () => {
    const loading = ref(false)
    const error = ref(null)
    const logout = async () => {
        loading.value = true
        error.value = null
        try {
            await projectAuth.signOut()
            loading.value = false
        } catch (err) {
            loading.value = false
            console.log(err.message)
            error.value = err.message
        }
    }
    return {error, loading: readonly(loading), logout}
}

export default useLogout
