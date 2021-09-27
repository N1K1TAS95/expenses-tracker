import {ref} from 'vue'
import {projectFirestore} from '@/firebase/config'

const getCollectionSingle = (userID) => {
    const error = ref(null)
    const isLoading = ref(null)
    const documents = ref(null)
    const loadDocuments = async (collection) => {
        try {
            documents.value = null
            isLoading.value = true
            let results = []
            const res = await projectFirestore.collection('users').doc(userID).collection(collection).get()
            res.forEach(doc => {
                doc.data().createdAt && results.push({...doc.data(), id: doc.id})
            })
            documents.value = results
            error.value = null
            isLoading.value = false
        } catch (err) {
            isLoading.value = false
            documents.value = null
            error.value = err.message
        }
    }
    return {isLoading, error, documents, loadDocuments}
}

export default getCollectionSingle
