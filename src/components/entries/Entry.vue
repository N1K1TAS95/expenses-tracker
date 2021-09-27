<template>
    <div :class="['card-body', {'border-bottom' : index !== size - 1}]">
        <div class="row align-items-center">
            <div class="col-lg-2">
                <div class="badge bg-primary">
                    {{ new Date(entry.date).toLocaleDateString() }}
                </div>
            </div>
            <div class="col-lg-3 mt-2 mt-lg-0">
                <Suspense>
                    <CategoryDisplay :category="entry.category" class="p-0"/>
                </Suspense>
            </div>
            <div class="col-lg mt-2 mt-lg-0">
                {{ entry.description }}
            </div>
            <div class="col-lg-2 mt-2 mt-lg-0 text-end">
                <div :class="['badge', {'bg-success' : entry.type === 'ENTRY'}, {'bg-danger' : entry.type === 'EXIT'}]">
                    <span v-if="entry.type === 'ENTRY'">+</span>
                    <span v-else>-</span>
                    {{ entry.amount.toLocaleString('it', {style: 'currency', currency: 'EUR'}) }}
                </div>
            </div>
            <div class="col-lg-2 text-end">
                <button class="btn btn-sm btn-primary" data-bs-toggle="collapse" :href="'#edit_entry_' + entry.id">
                    Edit
                </button>
            </div>
        </div>
        <div class="collapse" :id="'edit_entry_' + entry.id">
            <EditEntry/>
        </div>
    </div>
</template>

<script>
import EditEntry from '@/components/entries/EditEntry'
import CategoryDisplay from '@/components/categories/CategoryDisplay'

export default {
    name: 'Entry',
    components: {EditEntry, CategoryDisplay},
    props: {
        entry: {
            type: Object,
            required: true
        },
        index: {
            type: Number,
            required: true
        },
        size: {
            type: Number,
            required: true
        }
    },
    setup(props) {
    }
}
</script>

<style scoped>
.badge {
    font-size: 16px;
}
</style>
