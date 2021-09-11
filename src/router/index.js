import {createRouter, createWebHistory} from 'vue-router'
import Welcome from '@/views/Welcome'
import Dashboard from '@/views/Dashboard'

const routes = [
    {
        path: '/',
        name: 'Welcome',
        component: Welcome
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
