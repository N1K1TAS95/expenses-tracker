<template>
    <Navbar />
    <div class="container pt-4">
        <h1>Dashboard</h1>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import getUser from '@/composables/getUser'
import {watch} from 'vue'
import {useRouter} from 'vue-router'

export default {
    name: 'Dashboard',
    components: {Navbar},
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