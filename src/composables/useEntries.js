import {ref, readonly} from 'vue'
import {useToast} from 'vue-toastification'
import i18n from '@/i18n'
import useCollection from '@/composables/useCollection'
import {timestamp} from '@/firebase/config'
import {projectFirestore} from '@/firebase/config'
import getCollection from '@/composables/getCollection'

const {t} = i18n.global
const {toast} = useToast()

const useEntries = (userID) => {
    const error = ref(null)
    const loading = ref(false)
    const {error: categoriesError, documents: categories, get} = getCollection(userID, 'categories')
    const uploadBulk = async (data) => {
        await get()
        if (!categoriesError.value) {
            loading.value = true
            let i, j, temporary, chunk = 450
            for (i = 0, j = data.length; i < j && !error.value; i += chunk) {
                temporary = data.slice(i, i + chunk)
                let batch = projectFirestore.batch()
                temporary.forEach((value, index) => {
                    let entryRef = projectFirestore.collection('users').doc(userID).collection('entries').doc()
                    batch.set(entryRef, {
                        amount: parseFloat(value.amount),
                        category: categories.value.find(category => {
                            return category.name === value.category
                        }).id,
                        createdAt: timestamp(),
                        createdBy: userID,
                        date: new Date(value.date).toDateString(),
                        description: value.description,
                        type: value.type
                    })
                })
                try {
                    await batch.commit()
                } catch (err) {
                    loading.value = false
                    console.log(err.message)
                    toast.error(t('error'))
                    error.value = err.message
                }
            }
            loading.value = false
        }
    }
    return {loading, error, uploadBulk}
}

export default useEntries
