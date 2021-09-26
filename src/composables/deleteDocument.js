import {ref} from 'vue'
import {projectFirestore} from '@/firebase/config'

const deleteDocument = (userID, collection) => {
    const error = ref(null)
    const isLoading = ref(false)
    const deleteDoc = async (docID) => {
        error.value = null
        isLoading.value = true
        try {
            await projectFirestore.collection('users').doc(userID).collection(collection).doc(docID).delete()
            isLoading.value = false
        } catch (err) {
            isLoading.value = false
            error.value = err.message
            console.log(err.message)
        }
    }
    return {error, isLoading, deleteDoc}
}

export default deleteDocument
