import {ref, readonly} from 'vue'
import {projectFirestore} from '@/firebase/config'
import i18n from '@/i18n'
import {useToast} from 'vue-toastification'

const {t} = i18n.global
const toast = useToast()

const getDocument = (userID) => {
    const error = ref(null)
    const loading = ref(false)
    const document = ref(null)
    const get = async (collection, docID) => {
        try {
            error.value = null
            loading.value = true
            const res = await projectFirestore
                .collection('users')
                .doc(userID)
                .collection(collection)
                .doc(docID)
                .get()
            document.value = {...await res.data(), id: res.id}
            loading.value = false
        } catch (err) {
            toast.error(t('error'))
            loading.value = false
            document.value = null
            error.value = err.message
        }
    }
    return {error, loading: readonly(loading), document: readonly(document), get}
}

export default getDocument
