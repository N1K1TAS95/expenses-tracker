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
                <a :class="['btn', {'btn-success': !csv}, {'btn-danger': csv}]"
                   data-bs-toggle="collapse"
                   role="button"
                   href="#upload_csv_collapse"
                   @click="csv = !csv"
                >
                    <i class="bi bi-x-circle" v-if="csv"></i>
                    <i class="bi bi-file-earmark-arrow-up" v-else></i>
                </a>
            </div>
        </div>
        <div class="collapse" id="add_new_entry_collapse">
            <NewEntry @added_new_entry="hideAddEntry"/>
        </div>
        <div class="collapse" id="upload_csv_collapse">
            <UploadCsv />
        </div>
        <Entry v-for="(entry, index) in entries" :key="entry.id"
               :entry="entry"
               :index="index"
               :size="entries.length"
        />
        <div class="card-body text-center" v-if="!entries || !entries.length">
            {{ t('no_entries') }}
        </div>
    </div>
</template>

<script>
import getUser from '@/composables/getUser'
import {ref} from 'vue'
import NewEntry from '@/components/entries/NewEntry'
import {Collapse} from 'bootstrap'
import {useI18n} from 'vue-i18n'
import CategoryDisplay from '@/components/categories/CategoryDisplay'
import EditEntry from '@/components/entries/EditEntry'
import Entry from '@/components/entries/Entry'
import getCollection from '@/composables/getCollection'
import UploadCsv from '@/components/entries/UploadCsv'

export default {
    name: 'Entries',
    components: {UploadCsv, Entry, EditEntry, CategoryDisplay, NewEntry},
    setup() {
        const {t} = useI18n()
        const {user} = getUser()
        const {error, documents: entries, sub} = getCollection(
            user.value.uid,
            'entries',
            {
                date: 'desc',
                createdAt: 'desc'
            }
        )

        sub()

        const add = ref(false)
        const csv = ref(false)

        const hideAddEntry = () => {
            const addCollapse = new Collapse(document.getElementById('add_new_entry_collapse'), {})
            addCollapse.hide()
            add.value = false
        }

        const hideUploadCsv = () => {
            const uploadCsvCollapse = new Collapse(document.getElementById('upload_csv_collapse'), {})
            uploadCsvCollapse.hide()
            csv.value = false
        }

        return {t, error, entries, add, hideAddEntry, csv, hideUploadCsv}
    }
}
</script>

<style scoped>

</style>
