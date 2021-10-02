<template>
    <div class="bg-danger badge p-0" @click="deleteCategory">
        <i class="bi bi-x text-white" style="font-size: 20px"/>
    </div>
</template>

<script>
import getUser from '@/composables/getUser'
import {useI18n} from 'vue-i18n'
import {useToast} from 'vue-toastification'
import getCollectionSingle from '@/composables/getCollectionSingle'
import useCollection from '@/composables/useCollection'

export default {
    name: 'DeleteCategory',
    props: {
        categoryID: String
    },
    setup(props, context) {
        const {t} = useI18n()
        const toast = useToast()
        const {user} = getUser()
        const {error, deleteDoc} = useCollection(user.value.uid, 'categories')
        const checkUsage = async (id) => {
            const {error, documents, loadDocuments} = getCollectionSingle(user.value.uid)
            await loadDocuments('entries')
            if (!error.value) {
                return documents.value.some(el => el.category === id)
            }
        }
        const deleteCategory = async () => {
            if (!await checkUsage(props.categoryID)) {
                await deleteDoc(props.categoryID)
                if (!error.value) {
                    context.emit('category_deleted', props.categoryID)
                }
            } else {
                toast.error(t('category_is_used'))
            }
        }
        return {deleteCategory}
    }
}
</script>

<style scoped>

</style>
