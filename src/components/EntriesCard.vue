<template>
    <div class="card">
        <div class="card-body">
            <table class="table table-hover" v-if="documents">
                <thead>
                <tr>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Category</th>
                    <th>Amount</th>
                    <th>Description</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="doc in documents" :key="doc.id">
                    <td>{{ doc.date }}</td>
                    <td>{{ doc.type }}</td>
                    <td>{{ doc.category }}</td>
                    <td>{{ doc.amount }}</td>
                    <td>{{ doc.description }}</td>
                </tr>
                </tbody>
            </table>
            <div v-else>
                No Entries...
            </div>
        </div>
    </div>
</template>

<script>
import getCollection from '@/composables/getCollection'
import getUser from '@/composables/getUser'
import {useToast} from 'vue-toastification'

export default {
    name: 'EntriesCard',
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

</style>