<template>
    <div class="row">
        <div class="col-lg mb-2">
            <label class="">{{ t('category') }}:</label>
            <div class="row row-cols-auto">
                <div class="col-2 mt-4" v-for="category in documents" :key="category.id">
                    <div class="card">
                        <div class="card-body text-center">
                            <i :class="category.icon_class" style="font-size: 25px"></i>
                            <br>
                            <span style="font-size: 12px">{{ category.name }}</span>
                        </div>
                    </div>
                </div>
                <div class="col-2 mt-4">
                    <a class="btn btn-outline-success btn-lg new_category_button">
                        <i class="bi bi-plus-circle category_icon"></i>
                        <br>
                        <span class="category_description">New Category</span>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {useI18n} from 'vue-i18n'
import {useToast} from 'vue-toastification'
import getUser from '@/composables/getUser'
import getCollection from '@/composables/getCollection'
import {watch} from 'vue'

export default {
    name: 'Categories',
    setup() {
        const {t} = useI18n()
        const toast = useToast()
        const {user} = getUser()
        const {error, documents} = getCollection(user.value.uid, 'categories')

        if (error.value) {
            toast.error(error.value)
        }

        console.log(documents)

        return {error, documents, t}
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