import { ref, Ref, computed, onBeforeUnmount, CSSProperties } from 'vue'
import { Observer } from '@/utils/utils-observer'
import { divineHandler } from '@/utils/utils-common'

/**左侧挂载容器**/
export const element = ref<HTMLElement>() as Ref<HTMLElement>

export function useLayer(initialize: boolean = false) {
    const observer = new Observer()

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

    return { element, chunkContent, observer, divineUnmounted, divineLayerUnmounted }
}
