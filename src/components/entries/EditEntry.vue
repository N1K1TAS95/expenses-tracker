<template>
    <form class="form mt-3 border-top pt-4" :id="'edit_entry_form_' + entry.id" @submit.prevent="saveEntry">
        <div class="row gy-3">
            <div class="form-group col-lg">
                <div class="input-group">
                    <input type="date" :class="['form-control', { 'is-invalid' : errors.date }]"
                           v-model="entryEdit.date"
                    >
                </div>
                <div class="invalid-feedback d-block">{{ errors.date }}</div>
            </div>
            <div class="form-group col-lg">
                <div class="input-group">
                    <select class="form-select" v-model="entryEdit.category">
                        <option v-for="category in categories" :key="category.id" :value="category.id">
                            {{ category.name }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="form-group col-lg">
                <div class="input-group">
                    <select :class="['form-select', entryEdit.type === 'EXIT' ? 'border-danger' : 'border-success']"
                            v-model="entryEdit.type"
                    >
                        <option value="EXIT">{{ t('exit') }}</option>
                        <option value="ENTRY">{{ t('entry') }}</option>
                    </select>
                </div>
                <div class="invalid-feedback d-block"></div>
            </div>
            <div class="form-group col-lg">
                <div class="input-group">
                    <input type="number" inputmode="decimal"
                           :class="['form-control', { 'is-invalid' : errors.amount }]"
                           id="input_amount" v-model="entryEdit.amount" step=".01" min="0"
                    >
                </div>
                <div class="invalid-feedback d-block">{{ errors.amount }}</div>
            </div>
            <div class="col-lg">
                <div class="d-grid gap-2">
                    <button class="btn btn-outline-success" type="submit" :form="'edit_entry_form_' + entry.id">
                        <span class="spinner-border spinner-border-sm me-2" role="status" v-if="isLoading"></span>
                        <span v-if="isLoading">{{ t('loading') }}...</span>
                        <span v-else>{{ t('save') }}</span>
                    </button>
                </div>
            </div>
        </div>
        <div class="row mt-2 gy-3">
            <div class="form-group col-lg">
                <div class="input-group">
                    <textarea class="form-control" v-model="entryEdit.description" rows="5"/>
                </div>
            </div>
        </div>
        <div class="row mt-2 gy-3">
            <div class="col-3 d-grid gap-2">
                <DeleteEntry :entry-i-d="entry.id"/>
            </div>
        </div>
    </form>
</template>

<script>
import Dashboard from '@/views/Dashboard'
import {ref} from 'vue'
import {useI18n} from 'vue-i18n'
import getUser from '@/composables/getUser'
import useCollection from '@/composables/useCollection'
import {timestamp} from '@/firebase/config'
import DeleteEntry from '@/components/entries/DeleteEntry'
import getCollection from '@/composables/getCollection'

export default {
    name: 'EditEntry',
    components: {DeleteEntry, Dashboard},
    props: {
        entry: {
            type: Object,
            required: true
        }
    },
    setup(props) {
        const {t} = useI18n()
        const {user} = getUser()
        const entryEdit = ref({
            id: props.entry.id,
            createdAt: props.entry.createdAt,
            createdBy: props.entry.createdBy,
            date: props.entry.date,
            type: props.entry.type,
            category: props.entry.category,
            description: props.entry.description,
            amount: props.entry.amount
        })
        const {documents: categories, get} = getCollection(user.value.uid, 'categories')
        get()
        const errors = ref({
            date: '',
            category: '',
            amount: ''
        })
        const resetErrors = () => {
            errors.value.amount = ''
            errors.value.category = ''
            errors.value.date = ''
        }
        const checkData = () => {
            resetErrors()
            let ret = true
            if (!entryEdit.value.category) {
                errors.value.category = t('empty')
                ret = false
            }
            if (isNaN(parseFloat(entryEdit.value.amount))) {
                errors.value.amount = t('empty')
                ret = false
            } else if (parseFloat(entryEdit.value.amount) <= 0) {
                errors.value.amount = t('error_less_or_equal_zero')
                ret = false
            }
            if (isNaN(Date.parse(entryEdit.value.date))) {
                errors.value.date = t('empty')
                ret = false
            }
            return ret
        }
        const {error, isLoading, setDoc} = useCollection(user.value.uid, 'entries')
        const saveEntry = async () => {
            if (checkData()) {
                entryEdit.value.createdAt = timestamp()
                await setDoc(entryEdit.value)
                if (!error.value) {
                    resetErrors()
                }
            }
        }
        return {t, entryEdit, errors, saveEntry, isLoading, categories}
    }
}
</script>

<style scoped>

</style>
