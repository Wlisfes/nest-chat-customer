import { App } from 'vue'
import { createRouter, createWebHistory, Router } from 'vue-router'
import { useConfiger } from '@/store/configer'
import { routes } from '@/router/routes'

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes
})

export function setupRouter(app: App<Element>) {
    app.use(router)
    setupGuardRouter(router)
}

/**路由守卫**/
export function setupGuardRouter(router: Router) {}
