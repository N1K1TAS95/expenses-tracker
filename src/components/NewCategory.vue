<template>
    <form id="new_category_form" @submit.prevent="addCategory" novalidate>
        <div class="row">
            <div class="form-group col-lg">
                <div class="input-group">
                    <input type="text" :class="['form-control', { 'is-invalid' : errors.name }]"
                           v-model="new_category.name"
                           id="input_name"
                           :placeholder="t('name')"
                    >
                </div>
                <div class="invalid-feedback d-block">{{ errors.name }}</div>
            </div>
            <div class="form-group col-lg">
                <div class="input-group">
                    <input type="text" :class="['form-control', { 'is-invalid' : errors.icon_class }]"
                           v-model="new_category.icon_class"
                           id="input_icon_class"
                           :placeholder="t('icon_class')"
                    >
                </div>
                <div class="invalid-feedback d-block">{{ errors.icon_class }}</div>
            </div>
            <div class="col-lg-2">
                <div class="d-grid gap-2">
                    <button class="btn btn-outline-success" type="submit">
                        <span class="spinner-border spinner-border-sm me-2" role="status" v-if="isLoading"></span>
                        <span v-if="isLoading">{{ t('loading') }}...</span>
                        <span v-else>{{ t('add') }}</span>
                    </button>
                </div>
            </div>
        </div>
    </form>
</template>

<script>
import {ref} from 'vue'
import {useI18n} from 'vue-i18n'
import {timestamp} from '@/firebase/config'
import getUser from '@/composables/getUser'
import useCollection from '@/composables/useCollection'
import {useToast} from 'vue-toastification'

export default {
    name: 'NewCategory',
    setup(props, context) {
        const {t} = useI18n()
        const {user} = getUser()
        const {addDoc, error, isLoading} = useCollection(user.value.uid, 'categories')
        const toast = useToast()
        const new_category = ref({
            name: '',
            icon_class: '',
            createdAt: null
        })
        const errors = ref({
            name: '',
            icon_class: ''
        })
        const resetErrors = () => {
            errors.value.name = ''
            errors.value.icon_class = ''
        }
        const checkFields = () => {
            resetErrors()
            let ret = true
            if (!new_category.value.name) {
                ret = false
                errors.value.name = t('empty')
            }
            if (!new_category.value.icon_class) {
                ret = false
                errors.value.icon_class = t('empty')
            }
            return ret
        }
        const addCategory = () => {
            if (checkFields()) {
                new_category.value.createdAt = timestamp()
                addDoc(new_category.value)
                if (!error.value) {
                    toast.success(t('category_added_successfully'))
                    context.emit('added_new_category')
                    new_category.value.name = ''
                    new_category.value.icon_class = ''
                    new_category.value.createdAt = null
                } else {
                    toast.error(error.value)
                }
            }
        }
        return {t, new_category, errors, isLoading, addCategory}
    }
}
</script>

<style scoped>

</style>
