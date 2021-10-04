import {ref, readonly} from 'vue'
import {projectFirestore} from '@/firebase/config'
import {useToast} from 'vue-toastification'
import i18n from '@/i18n'

const {t} = i18n.global
const {toast} = useToast()

const useCollection = (userID, collection) => {
    const error = ref(null)
    const loading = ref(false)
    const handleError = (err) => {
        toast.error(t('error'))
        loading.value = false
        error.value = err.message
        console.log(err.message)
    }
    const addDoc = async (doc) => {
        error.value = null
        loading.value = true
        try {
            await projectFirestore
                .collection('users')
                .doc(userID)
                .collection(collection)
                .add(doc)
            loading.value = false
            toast.success(t('added'))
        } catch (err) {
            handleError(err)
        }
    }
    const setDoc = async (doc) => {
        error.value = null
        loading.value = true
        try {
            await projectFirestore
                .collection('users')
                .doc(userID)
                .collection(collection)
                .doc(doc.id)
                .set(doc)
            loading.value = false
            toast.success(t('saved'))
        } catch (err) {
            handleError(err)
        }
    }
    const deleteDoc = async (docID) => {
        error.value = null
        loading.value = true
        try {
            await projectFirestore
                .collection('users')
                .doc(userID)
                .collection(collection)
                .doc(docID)
                .delete()
            loading.value = false
            toast.success(t('deleted'))
        } catch (err) {
            handleError(err)
        }
    }
    return {error, loading: readonly(loading), addDoc, setDoc, deleteDoc}
}

export default useCollection
