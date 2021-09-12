import {createRouter, createWebHistory} from 'vue-router'
import Welcome from '@/views/Welcome'
import Dashboard from '@/views/Dashboard'
import {projectAuth} from '@/firebase/config'
import { useToast } from 'vue-toastification'

const toast = useToast()

const requireAuth = (to, from, next) => {
    let user = projectAuth.currentUser
    if (!user) {
        toast.error('Please Log In first!')
        next({name: 'Welcome'})
    } else {
        next()
    }
}

const routes = [
    {
        path: '/',
        name: 'Welcome',
        component: Welcome
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        beforeEnter: requireAuth
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
