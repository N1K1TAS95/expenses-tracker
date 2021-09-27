import {ref} from 'vue'
import {projectFirestore} from '@/firebase/config'

const getCollectionContinuous = (userID, collection) => {
    const documents = ref(null)
    const error = ref(null)
    let collectionRef = projectFirestore.collection('users').doc(userID).collection(collection)
    //.orderBy('createdAt', 'desc') // TODO
    collectionRef.onSnapshot((snap) => {
        let results = []
        snap.docs.forEach(doc => {
            doc.data().createdAt && results.push({...doc.data(), id: doc.id})
        })
        documents.value = results
        const compare = (a, b) => {
            if (a.date < b.date) {
                return 1
            } else if (a.date > b.date) {
                return -1
            }
            return 0
        }
        documents.value.sort(compare)
        error.value = null
    }, (err) => {
        documents.value = null
        error.value = err.message
    })
    return {error, documents}
}

export default getCollectionContinuous
