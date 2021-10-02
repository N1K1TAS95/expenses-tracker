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
    entriesRef.onSnapshot((snap) => {
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
    return {error, entries}
}

export default getEntries
