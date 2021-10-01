<template>
    <div class="card">
        <div class="card-header d-flex flex-row flex-wrap justify-content-between py-3">
            <h2 class="my-auto flex-sm-grow-0 flex-grow-1">
                {{ t('entries') }}
            </h2>
            <div class="btn-group flex-sm-grow-0 flex-grow-1" role="group">
                <a :class="['btn', {'btn-success': !add}, {'btn-danger': add}]"
                   data-bs-toggle="collapse"
                   role="button"
                   href="#add_new_entry_collapse"
                   @click="add = !add"
                >
                    <span v-if="add">{{ t('cancel') }}</span>
                    <span v-else>{{ t('add') }}</span>
                </a>
            </div>
        </div>
        <div class="collapse" id="add_new_entry_collapse">
            <NewEntry @added_new_entry="hideAddEntry"/>
        </div>
        <Entry v-for="(doc, index) in documents" :key="doc.id" :entry="doc" :index="index" :size="documents.length"
               @saved_entry="savedEntry"/>
        <div class="card-body text-center" v-if="!documents || !documents.length">
            {{ t('no_entries') }}
        </div>
    </div>
</template>

<script>
import {useToast} from 'vue-toastification'
import getUser from '@/composables/getUser'
import getCollectionContinuous from '@/composables/getCollectionContinuous'
import {ref} from 'vue'
import NewEntry from '@/components/entries/NewEntry'
import {Collapse} from 'bootstrap'
import {useI18n} from 'vue-i18n'
import CategoryDisplay from '@/components/categories/CategoryDisplay'
import EditEntry from '@/components/entries/EditEntry'
import Entry from '@/components/entries/Entry'

export default {
    name: 'Entries',
    components: {Entry, EditEntry, CategoryDisplay, NewEntry},
    setup() {
        const {t} = useI18n()
        const toast = useToast()
        const {user} = getUser()
        const {error, documents} = getCollectionContinuous(user.value.uid, 'entries')

        if (error.value) {
            toast.error(error.value)
        }

        const add = ref(false)

        const hideAddEntry = () => {
            const addCollapse = new Collapse(document.getElementById('add_new_entry_collapse'), {})
            addCollapse.hide()
            add.value = false
        }

        const savedEntry = () => {
            toast.success(t('saved'))
        }

        return {error, documents, add, hideAddEntry, t, savedEntry}
    }
}
</script>

<style scoped>

</style>
