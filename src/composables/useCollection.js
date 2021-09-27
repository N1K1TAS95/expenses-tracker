import {ref} from 'vue'
import {projectFirestore} from '@/firebase/config'

const useCollection = (userID, collection) => {
    const error = ref(null)
    const isLoading = ref(false)
    const addDoc = async (doc) => {
        error.value = null
        isLoading.value = true
        try {
            await projectFirestore.collection('users').doc(userID).collection(collection).add(doc)
            isLoading.value = false
        } catch (err) {
            isLoading.value = false
            error.value = err.message
            console.log(err.message)
        }
    }
    const setDoc = async (doc) => {
        error.value = null
        isLoading.value = true
        try {
            await projectFirestore.collection('users').doc(userID).collection(collection).doc(doc.id).set(doc)
            isLoading.value = false
        } catch (err) {
            isLoading.value = false
            error.value = err.message
            console.log(err.message)
        }
    }
    return {error, isLoading, addDoc, setDoc}
}

export default useCollection
