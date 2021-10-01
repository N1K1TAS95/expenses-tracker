<template>
    <button class="btn btn-outline-danger" @click.prevent="deleteEntry">
        <span class="spinner-border spinner-border-sm me-2" role="status" v-if="isLoading"></span>
        <span v-if="isLoading">{{ t('loading') }}...</span>
        <span v-else>{{ t('delete_entry') }}</span>
    </button>
</template>

<script>
import getUser from '@/composables/getUser'
import useCollection from '@/composables/useCollection'
import {useI18n} from 'vue-i18n'
import {useToast} from 'vue-toastification'

export default {
    name: 'DeleteEntry',
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
        const deleteEntry = async () => {
            await deleteDoc(props.entryID)
        }
        return {t, isLoading, deleteEntry}
    }
}
</script>

<style scoped>

</style>
