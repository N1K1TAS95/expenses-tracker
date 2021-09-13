import {ref} from 'vue'
import {projectFirestore} from '@/firebase/config'

const useCollection = (userID, collection) => {
    const error = ref(null)
    const addDoc = async (doc) => {
        error.value = null
        try {
            await projectFirestore.collection('users').doc(userID).collection(collection).add(doc)
        } catch (err) {
            error.value = err.message
            console.log(err.message)
        }
    }
    return {error, addDoc}
}

export default useCollection