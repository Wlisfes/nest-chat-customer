import { App } from 'vue'
import { createPinia, defineStore, storeToRefs } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
export { useConfiger } from '@/store/configer'
export { useUser } from '@/store/user'
export { useSession } from '@/store/session'
export { useMessenger } from '@/store/messenger'
export { useChat } from '@/store/chat'
export { useComment } from '@/store/comment'
export { useNotification } from '@/store/notification'
export { useContact } from '@/store/contact'
export { useCommunit } from '@/store/communit'
/**挂载持久化缓存**/
const store = createPinia().use(piniaPluginPersistedstate)
/**导出解构函数**/
export function useStore<T extends ReturnType<typeof defineStore>>(useDataStore: T) {
    const data = useDataStore() as ReturnType<T>
    const refs = storeToRefs(data)
    return { ...data, ...refs }
}
export function setupStore(app: App<Element>) {
    app.use(store)
}

export default store
