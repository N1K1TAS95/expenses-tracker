import {ref} from 'vue'
import {projectFirestore} from '@/firebase/config'
import {useI18n} from 'vue-i18n'
import {useToast} from 'vue-toastification'

const getEntries = (userID) => {
    const {t} = useI18n()
    const toast = useToast()
    const error = ref(null)
    const entries = ref(null)
    let entriesRef = projectFirestore
        .collection('users')
        .doc(userID)
        .collection('entries')
        .orderBy('date', 'desc')
        .orderBy('createdAt', 'desc')
    const subscribe = () => {
        return entriesRef.onSnapshot((snap) => {
                let results = []
                snap.docs.forEach(doc => {
                    doc.data().createdAt && results.push({...doc.data(), id: doc.id})
                })
                entries.value = results
                error.value = null
            },
            (err) => {
                toast.error(t('error'))
                entries.value = null
                error.value = err.message
                console.log(err)
            })
    }
    let subscription = subscribe()
    const unsub = () => {
        if (subscription) {
            subscription()
        }
    }
    return {error, entries, subscribe, unsub}
}

export default getEntries
