<template>
    <Navbar />
    <div class="container pt-4">
        <NewEntry />
    </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import getUser from '@/composables/getUser'
import {watch} from 'vue'
import {useRouter} from 'vue-router'
import NewEntry from '@/components/NewEntry'

export default {
    name: 'Dashboard',
    components: {NewEntry, Navbar},
    setup() {
        const {user} = getUser()
        const router = useRouter()
        watch(user, () => {
            if (!user.value) {
                router.push({name: 'Welcome'})
            }
        })
    }
}
</script>

<style scoped>

</style>