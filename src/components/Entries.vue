<template>
    <div class="card">
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

export default {
    name: 'Entries',
    setup() {
        const toast = useToast()
        const {user} = getUser()
        const {error, documents} = getCollection(user.value.uid, 'entries')

        if (error.value) {
            toast.error(error.value)
        }
        return {error, documents}
    }
}
</script>

<style scoped>
.badge {
    font-size: 16px;
}
</style>