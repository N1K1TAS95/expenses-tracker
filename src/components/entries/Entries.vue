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

export default {
    name: 'Entries',
    components: {Entry, EditEntry, CategoryDisplay, NewEntry},
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

        const hideAddEntry = () => {
            const addCollapse = new Collapse(document.getElementById('add_new_entry_collapse'), {})
            addCollapse.hide()
            add.value = false
        }

        return {error, entries, add, hideAddEntry, t}
    }
}
</script>

<style scoped>

</style>
