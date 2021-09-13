import {ref} from 'vue'
import {projectFirestore} from '@/firebase/config'

const getCollection = (userID, collection) => {
    const documents = ref(null)
    const error = ref(null)
    let collectionRef = projectFirestore.collection('users').doc(userID).collection(collection).orderBy('date', 'desc')
    collectionRef.onSnapshot((snap) => {
        let results = []
        snap.docs.forEach(doc => {
            doc.data().createdAt && results.push({...doc.data(), id: doc.id})
        })
        documents.value = results
        error.value = null
    }, (err) => {
        documents.value = null
        error.value = err.message
    })
    return {error, documents}
}

export default getCollection