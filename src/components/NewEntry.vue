<template>
    <div class="card">
        <div class="card-header d-flex flex-row flex-wrap justify-content-between py-3">
            <h2 class="my-auto flex-sm-grow-0 flex-grow-1">
                New Entry
            </h2>
            <div class="btn-group flex-sm-grow-0 flex-grow-1" role="group">
                <button class="btn btn-success" form="new_entry_form">
                    Add
                </button>
            </div>
        </div>
        <div class="card-body">
            <form id="new_entry_form" @submit.prevent="addNewEntry" novalidate>
                <div class="row">
                    <div class="form-group col-lg">
                        <label class="mb-1" for="input_date">Date:</label>
                        <div class="input-group">
                            <input type="date" :class="['form-control', { 'is-invalid' : errors.date }]" v-model="date"
                                   id="input_date"
                            >
                        </div>
                        <div class="invalid-feedback d-block">{{ errors.date }}</div>
                    </div>
                    <div class="form-group col-lg">
                        <label class="mb-1" for="input_date">Type:</label>
                        <div class="input-group">
                            <select class="form-select" v-model="type" id="input_type">
                                <option value="EXIT">Exit</option>
                                <option value="ENTRY">Entry</option>
                            </select>
                        </div>
                        <div class="invalid-feedback d-block"></div>
                    </div>
                    <div class="form-group col-lg">
                        <label class="mb-1" for="input_category">Category:</label>
                        <div class="input-group">
                            <input type="text" :class="['form-control', { 'is-invalid' : errors.category }]"
                                   id="input_category" v-model="category"
                            >
                        </div>
                        <div class="invalid-feedback d-block">{{ errors.category }}</div>
                    </div>
                    <div class="form-group col-lg">
                        <label class="mb-1" for="input_amount">Amount:</label>
                        <div class="input-group">
                            <input type="number" :class="['form-control', { 'is-invalid' : errors.amount }]"
                                   id="input_amount" v-model="amount"
                            >
                        </div>
                        <div class="invalid-feedback d-block">{{ errors.amount }}</div>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="form-group col-lg">
                        <label class="mb-1" for="input_description">Description:</label>
                        <div class="input-group">
                            <textarea class="form-control" id="input_description" v-model="description" rows="5"
                            ></textarea>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import {ref} from 'vue'
import useCollection from '@/composables/useCollection'
import getUser from '@/composables/getUser'
import {timestamp} from '@/firebase/config'
import {useToast} from 'vue-toastification'
import Dashboard from '@/views/Dashboard'

export default {
    name: 'NewEntry',
    components: {Dashboard},
    setup() {
        const {user} = getUser()
        const {addDoc, error} = useCollection(user.value.uid, 'entries')
        const toast = useToast()

        const category = ref('')
        const type = ref('EXIT')
        const description = ref('')
        const amount = ref('')
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
                    category.value = ''
                    description.value = ''
                    date.value = ''
                    amount.value = ''
                    toast.success('New Entry added successfully!')
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
            addNewEntry
        }
    }
}
</script>

<style scoped>

</style>