<template>
    <div class="card-body border-bottom">
        <form id="upload_csv_form" @submit.prevent="handleSubmit" novalidate>
            <div class="row">
                <div class="form-group col-lg">
                    <div class="input-group">
                        <input type="file" :class="['form-control', { 'is-invalid' : fileError }]"
                               @change="handleFileChange"
                               id="input_file"
                        >
                    </div>
                    <div class="form-text">{{ t('csv_only_files') }}</div>
                    <div class="invalid-feedback d-block">{{ fileError }}</div>
                </div>
                <div class="col-lg-2">
                    <div class="d-grid gap-2">
                        <button class="btn btn-outline-success" type="submit" form="upload_csv_form">
                            <span class="spinner-border spinner-border-sm me-2" role="status" v-if="loading"></span>
                            <span v-if="loading">{{ t('loading') }}...</span>
                            <span v-else>{{ t('upload') }}</span>
                        </button>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import {ref} from 'vue'
import {useI18n} from 'vue-i18n'
import {useToast} from 'vue-toastification'
import * as Papa from 'papaparse'
import useEntries from '@/composables/useEntries'
import getUser from '@/composables/getUser'

export default {
    name: 'UploadCsv',
    setup() {
        const {t} = useI18n()
        const toast = useToast()
        const loading = ref(false)
        const file = ref(null)
        const fileError = ref(null)
        const types = ['text/csv']
        const {user} = getUser()
        const handleFileChange = (e) => {
            const selected = e.target.files[0]
            console.log(selected)
            if (selected && types.includes(selected.type)) {
                file.value = selected
                fileError.value = null
            } else {
                file.value = null
                fileError.value = t('csv_format_error')
            }
        }
        const handleSubmit = () => {
            if (file.value) {
                fileError.value = null
                loading.value = true
                Papa.parse(file.value, {
                    header: true,
                    worker: true,
                    complete: async (results, file) => {
                        loading.value = false
                        console.log(results)
                        const {uploadBulk} = useEntries(user.value.uid)
                        await uploadBulk(results.data)
                        toast.success(t('csv_uploaded'))
                    },
                    error: (error, file) => {
                        loading.value = false
                        toast.error(t('error'))
                        console.log(error.message)
                    }
                })
            } else {
                loading.value = false
                fileError.value = t('empty')
            }
        }
        return {t, file, fileError, handleFileChange, loading, handleSubmit}
    }
}
</script>

<style scoped>

</style>
