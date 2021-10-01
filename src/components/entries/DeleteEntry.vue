<template>
    <a class="btn btn-outline-danger" role="button" data-bs-toggle="modal" :data-bs-target="'#' + modal_id">
        <span class="spinner-border spinner-border-sm me-2" role="status" v-if="isLoading"></span>
        <span v-if="isLoading">{{ t('loading') }}...</span>
        <span v-else>{{ t('delete_entry') }}</span>
    </a>
    <ConfirmModal :modal-i-d="modal_id" @confirmed="deleteEntry"/>
</template>

<script>
import getUser from '@/composables/getUser'
import useCollection from '@/composables/useCollection'
import {useI18n} from 'vue-i18n'
import ConfirmModal from '@/components/modals/ConfirmModal'

export default {
    name: 'DeleteEntry',
    components: {ConfirmModal},
    props: {
        entryID: {
            type: String,
            required: true
        }
    },
    setup(props) {
        const {t} = useI18n()
        const {user} = getUser()
        const {isLoading, deleteDoc} = useCollection(user.value.uid, 'entries')
        const modal_id = 'delete_modal_' + props.entryID
        const deleteEntry = async () => {
            await deleteDoc(props.entryID)
        }
        return {t, isLoading, modal_id, deleteEntry}
    }
}
</script>

<style scoped>

</style>
