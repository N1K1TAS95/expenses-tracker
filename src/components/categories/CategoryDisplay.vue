<template>
    <div class="spinner-border spinner-border-sm my-auto" v-if="loading"/>
    <div class="d-inline-flex align-items-center" v-else>
        <i :class="[document.icon_class ? document.icon_class : 'bi bi-cash', 'me-2']" style="font-size: 25px"></i>
        <span>{{ document.name }}</span>
    </div>
</template>

<script>
import getUser from '@/composables/getUser'
import getDocument from '@/composables/getDocument'

export default {
    name: 'CategoryDisplay',
    props: {
        category: {
            type: String,
            required: true
        }
    },
    async setup(props) {
        const {user} = getUser()
        const {error, loading, document, get} = getDocument(user.value.uid)
        await get('categories', props.category)
        return {
            error,
            loading,
            document
        }
    }
}
</script>

<style scoped>

</style>
