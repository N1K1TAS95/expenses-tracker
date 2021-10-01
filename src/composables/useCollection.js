import {ref} from 'vue'
import {projectFirestore} from '@/firebase/config'
import {useI18n} from 'vue-i18n'
import {useToast} from 'vue-toastification'

const useCollection = (userID, collection) => {
    const error = ref(null)
    const isLoading = ref(false)
    const {t} = useI18n()
    const toast = useToast()
    const handleError = (err) => {
        toast.error(t('error'))
        isLoading.value = false
        error.value = err.message
        console.log(err.message)
    }
    const addDoc = async (doc) => {
        error.value = null
        isLoading.value = true
        try {
            await projectFirestore
                .collection('users')
                .doc(userID)
                .collection(collection)
                .add(doc)
            isLoading.value = false
            toast.success(t('added'))
        } catch (err) {
            handleError(err)
        }
    }
    const setDoc = async (doc) => {
        error.value = null
        isLoading.value = true
        try {
            await projectFirestore
                .collection('users')
                .doc(userID)
                .collection(collection)
                .doc(doc.id)
                .set(doc)
            isLoading.value = false
            toast.success(t('saved'))
        } catch (err) {
            handleError(err)
        }
    }
    const deleteDoc = async (docID) => {
        error.value = null
        isLoading.value = true
        try {
            await projectFirestore
                .collection('users')
                .doc(userID)
                .collection(collection)
                .doc(docID)
                .delete()
            isLoading.value = false
            toast.success(t('deleted'))
        } catch (err) {
            handleError(err)
        }
    }
    return {error, isLoading, addDoc, setDoc, deleteDoc}
}

export default useCollection
