<template>
    <div class="badge rounded-pill bg-danger p-1" @click="deleteCategory">
        <i class="bi bi-x text-white" style="font-size: 15px"/>
    </div>
</template>

<script>
import deleteDocument from '@/composables/deleteDocument'
import getUser from '@/composables/getUser'
import {useI18n} from 'vue-i18n'
import {useToast} from 'vue-toastification'
import getCollectionSingle from '@/composables/getCollectionSingle'

export default {
    name: 'DeleteCategory',
    props: {
        categoryID: String
    },
    setup(props, context) {
        const {t} = useI18n()
        const toast = useToast()
        const {user} = getUser()
        const {error, deleteDoc} = deleteDocument(user.value.uid, 'categories')
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
                    toast.success(t('category_deleted_successfully'))
                    context.emit('category_deleted', props.categoryID)
                } else {
                    toast.error(t('error'))
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
