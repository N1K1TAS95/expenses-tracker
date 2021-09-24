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
            <NewEntry @added_new_entry="hideAddEntry" />
        </div>
        <div :class="['card-body', {'border-bottom' : index !== documents.length - 1}]"
             v-for="(doc, index) in documents" :key="doc.id"
        >
            <div class="row">
                <div class="col-lg-2">
                    <div class="badge bg-primary">
                        {{ new Date(doc.date).toLocaleDateString() }}
                    </div>
                </div>
                <div class="col-lg-3 mt-2 mt-lg-0">
                    {{ doc.category }}
                </div>
                <div class="col-lg mt-2 mt-lg-0">
                    {{ doc.description }}
                </div>
                <div class="col-lg-2 mt-2 mt-lg-0 text-end">
                    <div :class="['badge', {'bg-success' : doc.type === 'ENTRY'}, {'bg-danger' : doc.type === 'EXIT'}]">
                        <span v-if="doc.type === 'ENTRY'">+</span>
                        <span v-else>-</span>
                        {{ doc.amount.toLocaleString('it', {style: 'currency', currency: 'EUR'}) }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {useToast} from 'vue-toastification'
import getUser from '@/composables/getUser'
import getCollection from '@/composables/getCollection'
import {ref} from 'vue'
import NewEntry from '@/components/NewEntry'
import {Collapse} from 'bootstrap'
import {useI18n} from 'vue-i18n'

export default {
    name: 'Entries',
    components: {NewEntry},
    setup() {
        const {t} = useI18n()
        const toast = useToast()
        const {user} = getUser()
        const {error, documents} = getCollection(user.value.uid, 'entries')

        if (error.value) {
            toast.error(error.value)
        }

        const add = ref(false)

        const hideAddEntry = () => {
            const addCollapse = new Collapse(document.getElementById('add_new_entry_collapse'), {})
            addCollapse.hide()
            add.value = false
        }

        return {error, documents, add, hideAddEntry, t}
    }
}
</script>

<style scoped>
.badge {
    font-size: 16px;
}
</style>