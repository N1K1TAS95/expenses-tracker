<template>
    <div class="row">
        <div class="col-lg mb-2">
            <label class="mb-2">{{ t('category') }}:</label>
            <div class="row row-cols-6">
                <div :class="['col-2', {'mt-4' : index > 5}]" v-for="(category, index) in documents" :key="category.id">
                    <div class="card">
                        <div class="card-body text-center">
                            <i :class="category.icon_class" style="font-size: 25px"></i>
                            <br>
                            <span style="font-size: 12px">{{ category.name }}</span>
                        </div>
                    </div>
                </div>
                <div class="col-2">
                    <a :class="['btn', 'btn-lg', 'new_category_button', add ? 'btn-outline-danger' : 'btn-outline-success']"
                       data-bs-toggle="collapse"
                       role="button"
                       href="#add_new_category_collapse"
                       @click="add = !add"
                    >
                        <i class="bi bi-x-circle category_icon" v-if="add"></i>
                        <i class="bi bi-plus-circle category_icon" v-else></i>
                        <br>
                        <span class="category_description" v-if="add">{{ t('cancel') }}</span>
                        <span class="category_description" v-else>{{ t('new_category') }}</span>
                    </a>
                </div>
            </div>
        </div>
    </div>
    <div class="collapse" id="add_new_category_collapse">
        <NewCategory class="my-3" @added_new_category="hideAddCategory"/>
    </div>
</template>

<script>
import {useI18n} from 'vue-i18n'
import {useToast} from 'vue-toastification'
import getUser from '@/composables/getUser'
import getCollection from '@/composables/getCollection'
import NewEntry from '@/components/NewEntry'
import NewCategory from '@/components/NewCategory'
import {ref} from 'vue'
import {Collapse} from 'bootstrap'

export default {
    name: 'Categories',
    components: {NewCategory, NewEntry},
    setup() {
        const {t} = useI18n()
        const toast = useToast()
        const {user} = getUser()
        const {error, documents} = getCollection(user.value.uid, 'categories')

        if (error.value) {
            toast.error(error.value)
        }

        const add = ref(false)

        const hideAddCategory = () => {
            const addCollapse = new Collapse(document.getElementById('add_new_category_collapse'), {})
            addCollapse.hide()
            add.value = false
        }

        return {error, documents, t, add, hideAddCategory}
    }
}
</script>

<style scoped>
.category_icon {
    font-size: 25px;
}

.category_description {
    font-size: 12px;
}

.new_category_button {
    height: 100%;
    width: 100%;
    padding-top: 12px
}
</style>
