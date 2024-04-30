import { ref, Ref, computed, onBeforeUnmount, CSSProperties } from 'vue'
import { Observer } from '@/utils/utils-observer'
import { divineHandler, divineWherer } from '@/utils/utils-common'

/**左侧挂载容器**/
export const element = ref<HTMLElement>() as Ref<HTMLElement>

/**抽屉组件使用实例**/
export function useDrawer(initialize: boolean = false) {
    const observer = new Observer()
    const visible = ref<boolean>(false)
    const loading = ref<boolean>(false)
    const chunkContent = computed<CSSProperties>(() => ({
        overflow: 'hidden',
        userSelect: 'none',
        backgroundColor: 'var(--chat-layer-color)',
        transition: 'background-color 0.3s var(--cubic-bezier-ease-in-out)',
        display: 'flex',
        flexDirection: 'column'
    }))

    /**监听销毁事件**/
    function divineLayerUnmounted<T>(observer: Observer<Omix<T>>, handler: Function) {
        return observer.once('layer-unmounted', handler as never)
    }

    /**主动发起销毁事件**/
    async function divineUnmounted() {
        return observer.emit('layer-unmounted')
    }

    onBeforeUnmount(async () => {
        return await divineHandler(initialize, {
            handler: divineUnmounted
        })
    })

    async function setVisible(value: boolean) {
        return (visible.value = value)
    }

    async function setLoading(value: boolean) {
        return (loading.value = value)
    }

    return { element, chunkContent, observer, setVisible, setLoading, divineUnmounted, divineLayerUnmounted }
}

/**模态框组件使用实例**/
export function useModal(option: { width: number; closable?: boolean }) {
    const visible = ref<boolean>(false)
    const loading = ref<boolean>(false)
    const chunkContent = computed<CSSProperties>(() => ({
        width: option.width + 'px',
        '--n-padding': '20px 20px',
        '--n-close-margin': '16px 16px 0 0',
        '--n-content-margin': '0px',
        '--n-close-size': divineWherer(option.closable ?? true, '22px', '-6px'),
        display: 'flex',
        flexDirection: 'column'
    }))

    async function setVisible(value: boolean) {
        return (visible.value = value)
    }

    async function setLoading(value: boolean) {
        return (loading.value = value)
    }

    return { visible, loading, chunkContent, setVisible, setLoading }
}
