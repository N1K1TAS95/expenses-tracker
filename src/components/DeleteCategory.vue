<template>
    <i class="bi bi-x-circle-fill text-danger"
       @click="deleteCategory"
    />
</template>

<script>
import deleteDocument from '@/composables/deleteDocument'
import getUser from '@/composables/getUser'
import {useI18n} from 'vue-i18n'
import {useToast} from 'vue-toastification'

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
        const deleteCategory = async () => {
            await deleteDoc(props.categoryID)
            if (!error.value) {
                toast.success(t('category_deleted_successfully'))
                context.emit('category_deleted', props.categoryID)
            } else {
                toast.error(t('error'))
            }
        }
        return {deleteCategory}
    }
}
</script>

<style scoped>

</style>
