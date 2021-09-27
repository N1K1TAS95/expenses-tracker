import {ref} from 'vue'
import {projectFirestore} from '@/firebase/config'

const getDocument = (userID) => {
    const error = ref(null)
    const isLoading = ref(false)
    const document = ref(null)
    const loadDocument = async (collection, docID) => {
        try {
            error.value = null
            isLoading.value = true
            const res = await projectFirestore.collection('users').doc(userID).collection(collection).doc(docID).get()
            if (res.data().createdAt) {
                document.value = {...res.data(), id: res.id}
                isLoading.value = false
            }
        } catch (err) {
            isLoading.value = false
            document.value = null
            error.value = err.message
        }
    }
    return {error, isLoading, document, loadDocument}
}

export default getDocument
