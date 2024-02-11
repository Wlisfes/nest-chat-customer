import { RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home.vue'

export const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        meta: { Authorize: 'AUTH' },
        component: Home
    }
]

export default routes
