import { ref, Ref, toRefs, computed, onMounted, onUnmounted, CSSProperties } from 'vue'
import { ButtonProps } from 'naive-ui'
import { Observer } from '@/utils/utils-observer'
import { useState } from '@/hooks/hook-state'
import { divineHandler, divineWherer } from '@/utils/utils-common'

/**左侧挂载容器**/
export const element = ref<HTMLElement>() as Ref<HTMLElement>

/**抽屉组件使用实例**/
export function useDrawer(scope: { mount?: boolean; unmount?: boolean; observer?: Observer<Omix> } = {}) {
    const { state, setState: fetchState } = useState({ visible: false, loading: false })
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
    async function divineLayerUnmounted<T>(observer: Observer<Omix<T>>, handler: Function) {
        await divineHandler(Boolean(scope.observer), {
            handler: () => scope.observer!.on('layer-unmounted', handler as never)
        })
        return observer.on('layer-unmounted', handler as never)
    }

    /**主动发起销毁事件**/
    async function divineUnmounted() {
        await divineHandler(Boolean(scope.observer), {
            handler: () => scope.observer!.emit('layer-unmounted')
        })
        return observer.emit('layer-unmounted')
    }

    onMounted(async () => {
        return await divineHandler(scope.mount ?? false, {
            handler: divineUnmounted
        })
    })

    onUnmounted(async () => {
        return await divineHandler(scope.unmount ?? false, {
            handler: divineUnmounted
        })
    })

    return {
        observer,
        state,
        element,
        chunkContent,
        ...toRefs(state),
        fetchState,
        divineUnmounted,
        divineLayerUnmounted
    }
}

/**模态框组件使用实例**/
export function useModal(option: { width: number; closable?: boolean }) {
    const { state, setState: fetchState } = useState({ visible: false, loading: false, disabled: false })
    const chunkContent = computed<CSSProperties>(() => ({
        width: option.width + 'px',
        '--n-padding': '20px 24px 24px',
        '--n-close-margin': '16px 16px 0 0',
        '--n-content-margin': '0px',
        '--n-close-size': divineWherer(option.closable ?? true, '22px', '-6px'),
        display: 'flex',
        flexDirection: 'column',
        rowGap: '10px'
    }))
    const chunkNegative = computed<ButtonProps>(() => ({
        size: 'medium',
        ghost: false,
        secondary: true,
        style: { '--n-height': '32px', '--n-padding': '0 10px', 'min-width': '80px' }
    }))
    const chunkPositive = computed<ButtonProps>(() => ({
        size: 'medium',
        type: 'error',
        style: { '--n-height': '32px', '--n-padding': '0 10px', 'min-width': '80px' },
        disabled: state.disabled,
        loading: state.disabled
    }))

    return { state, chunkContent, chunkNegative, chunkPositive, ...toRefs(state), fetchState }
}
