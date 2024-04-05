import { App } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
export { useConfiger } from '@/store/configer'
export { useUser } from '@/store/user'
export { useSession } from '@/store/session'
export { useCommunit } from '@/store/communit'
export { useMessenger } from '@/store/messenger'
export { useChat } from '@/store/chat'

const store = createPinia().use(piniaPluginPersistedstate)

export function setupStore(app: App<Element>) {
    app.use(store)
}

export default store
