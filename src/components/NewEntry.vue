<template>
    <div class="card-body border-bottom">
        <form id="new_entry_form" @submit.prevent="addNewEntry" novalidate>
            <div class="row">
                <div class="form-group col-lg">
                    <label class="mb-1" for="input_date">{{ t('date') }}:</label>
                    <div class="input-group">
                        <input type="date" :class="['form-control', { 'is-invalid' : errors.date }]" v-model="date"
                               id="input_date"
                        >
                    </div>
                    <div class="invalid-feedback d-block">{{ errors.date }}</div>
                </div>
                <div class="form-group col-lg">
                    <label class="mb-1" for="input_date">{{ t('type') }}:</label>
                    <div class="input-group">
                        <select class="form-select" v-model="type" id="input_type">
                            <option value="EXIT">{{ t('exit') }}</option>
                            <option value="ENTRY">{{ t('entry') }}</option>
                        </select>
                    </div>
                    <div class="invalid-feedback d-block"></div>
                </div>
                <div class="form-group col-lg">
                    <label class="mb-1" for="input_category">{{ t('category') }}:</label>
                    <div class="input-group">
                        <input type="text" :class="['form-control', { 'is-invalid' : errors.category }]"
                               id="input_category" v-model="category"
                        >
                    </div>
                    <div class="invalid-feedback d-block">{{ errors.category }}</div>
                </div>
                <div class="form-group col-lg">
                    <label class="mb-1" for="input_amount">{{ t('amount') }}:</label>
                    <div class="input-group">
                        <input type="number" inputmode="decimal"
                               :class="['form-control', { 'is-invalid' : errors.amount }]"
                               id="input_amount" v-model="amount" step=".01" min="0"
                        >
                    </div>
                    <div class="invalid-feedback d-block">{{ errors.amount }}</div>
                </div>
            </div>
            <div class="row mt-3">
                <div class="form-group col-lg">
                    <label class="mb-1" for="input_description">{{ t('description') }}:</label>
                    <div class="input-group">
                            <textarea class="form-control" id="input_description" v-model="description" rows="5"
                            ></textarea>
                    </div>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-lg text-end">
                    <button class="btn btn-outline-success" form="new_entry_form">
                        <span class="spinner-border spinner-border-sm" role="status" v-if="isLoading"></span>
                        <span v-if="isLoading">{{ t('loading') }}...</span>
                        <span v-else>{{ t('add') }}</span>
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import {ref} from 'vue'
import useCollection from '@/composables/useCollection'
import getUser from '@/composables/getUser'
import {timestamp} from '@/firebase/config'
import {useToast} from 'vue-toastification'
import Dashboard from '@/views/Dashboard'
import {useI18n} from 'vue-i18n'

export default {
    name: 'NewEntry',
    components: {Dashboard},
    setup(props, context) {
        const {t} = useI18n()
        const {user} = getUser()
        const {addDoc, error, isLoading} = useCollection(user.value.uid, 'entries')
        const toast = useToast()

        const category = ref('')
        const type = ref('EXIT')
        const description = ref('')
        const amount = ref('0.00')
        const date = ref('')

        const errors = ref({
            category: '',
            amount: '',
            date: ''
        })

        const resetErrors = () => {
            errors.value.amount = ''
            errors.value.category = ''
            errors.value.date = ''
        }

        const checkData = () => {
            resetErrors()
            let ret = true
            if (!category.value) {
                errors.value.category = 'Empty'
                ret = false
            }
            if (isNaN(parseFloat(amount.value))) {
                errors.value.amount = 'Empty'
                ret = false
            }
            if (isNaN(Date.parse(date.value))) {
                errors.value.date = 'Empty'
                ret = false
            }
            return ret
        }

        const addNewEntry = async () => {
            if (checkData()) {
                const entry = {
                    createdAt: timestamp(),
                    createdBy: user.value.uid,
                    date: date.value,
                    type: type.value,
                    category: category.value,
                    description: description.value,
                    amount: amount.value
                }
                await addDoc(entry)
                if (!error.value) {
                    toast.success('New Entry added successfully!')
                    context.emit('added_new_entry')
                    category.value = ''
                    description.value = ''
                    date.value = ''
                    amount.value = ''
                } else {
                    toast.error(error.value)
                }
            }
        }

        return {
            category,
            type,
            description,
            amount,
            date,
            errors,
            addNewEntry,
            isLoading,
            t
        }
    }
}
</script>

<style scoped>

</style>