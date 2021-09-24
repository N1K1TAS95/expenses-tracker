<template>
    <Navbar />
    <div class="container pt-4">
        <Entries class="mt-4"/>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import getUser from '@/composables/getUser'
import {watch} from 'vue'
import {useRouter} from 'vue-router'
import NewEntry from '@/components/NewEntry'
import Entries from '@/components/Entries'

export default {
    name: 'Dashboard',
    components: {Entries, NewEntry, Navbar},
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