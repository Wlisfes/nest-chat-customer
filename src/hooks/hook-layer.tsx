import { ref, Ref, onBeforeUnmount } from 'vue'

/**左侧挂载容器**/
const element = ref<HTMLElement>() as Ref<HTMLElement>

export function useLayer(handler: Function = Function) {
    onBeforeUnmount(() => {
        console.log('onBeforeUnmount')
        return handler()
    })

    return { element }
}
