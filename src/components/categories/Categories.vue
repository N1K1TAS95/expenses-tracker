<template>
    <div class="row">
        <div class="col-lg mb-2">
            <label class="mb-2">{{ t('category') }}:</label>
            <div class="row row-cols-3 row-cols-lg-6 g-4">
                <div class="col" v-for="(category, index) in documents" :key="category.id"
                     @click="selectCategory(category.id)">
                    <div :class="['card', {'text-white' : selectedCategory === category.id}]">
                        <DeleteCategory class="position-absolute top-0 start-100 translate-middle"
                                        :category-i-d="category.id" @category_deleted="removedCategory"/>
                        <div
                            :class="['card-body', 'text-center', 'text-truncate', {'bg-primary rounded-1 border-0' : selectedCategory === category.id}]">
                            <i :class="[category.icon_class ? category.icon_class : 'bi bi-cash']"
                               style="font-size: 25px"></i>
                            <br>
                            <span style="font-size: 12px">{{ category.name }}</span>
                        </div>
                    </div>
                </div>
                <div class="col">
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
import getUser from '@/composables/getUser'
import NewEntry from '@/components/entries/NewEntry'
import NewCategory from '@/components/categories/NewCategory'
import {ref} from 'vue'
import {Collapse} from 'bootstrap'
import DeleteCategory from '@/components/categories/DeleteCategory'
import getCollection from '@/composables/getCollection'

export default {
    name: 'Categories',
    components: {DeleteCategory, NewCategory, NewEntry},
    emits: ['selected_category'],
    setup(props, context) {
        const {t} = useI18n()
        const {user} = getUser()
        const {documents, sub} = getCollection(user.value.uid, 'categories', {name: 'asc'})

        sub()

        const add = ref(false)

        const hideAddCategory = () => {
            const addCollapse = new Collapse(document.getElementById('add_new_category_collapse'), {})
            addCollapse.hide()
            add.value = false
        }

        const selectedCategory = ref('')

        const selectCategory = (id) => {
            selectedCategory.value = id
            context.emit('selected_category', id)
        }

        const removedCategory = (categoryID) => {
            if (selectedCategory.value === categoryID) {
                selectedCategory.value = ''
                context.emit('selected_category', '')
            }
        }

        return {documents, t, add, hideAddCategory, selectedCategory, selectCategory, removedCategory}
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
