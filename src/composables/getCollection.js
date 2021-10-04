import {ref, readonly} from 'vue'
import {projectFirestore} from '@/firebase/config'
import {useToast} from 'vue-toastification'
import i18n from '@/i18n'

const {t} = i18n.global
const {toast} = useToast()

const getCollection = (userID, collection, ordering = null) => {
    const error = ref(null)
    const documents = ref(null)
    const loading = ref(false)
    let documentsRef = projectFirestore
        .collection('users')
        .doc(userID)
        .collection(collection)
    if (ordering) {
        for (let key in ordering) {
            documentsRef = documentsRef.orderBy(key, ordering[key])
        }
    }
    const sub = () => {
        return documentsRef.onSnapshot((snap) => {
                loading.value = true
                let results = []
                snap.docs.forEach(doc => {
                    results.push({...doc.data(), id: doc.id})
                })
                documents.value = results
                error.value = null
                loading.value = false
            },
            (err) => {
                toast.error(t('error'))
                loading.value = false
                documents.value = null
                error.value = err.message
                console.log(err)
            })
    }
    let subscription = sub()
    const unsub = () => {
        if (subscription) {
            subscription()
        }
    }
    const get = async () => {
        error.value = false
        try {
            documents.value = null
            loading.value = true
            let results = []
            const res = await documentsRef.get()
            res.forEach(doc => {
                results.push({...doc.data(), id: doc.id})
            })
            documents.value = results
            error.value = null
            loading.value = false
        } catch (err) {
            toast.error(t('error'))
            loading.value = false
            documents.value = null
            error.value = err.message
        }
    }
    return {error, loading: readonly(loading), documents: readonly(documents), sub, unsub, get}
}

export default getCollection
