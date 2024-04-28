import { createApp, createVNode, nextTick, render, App, CSSProperties, VNode } from 'vue'
import { DialogOptions, DialogReactive, NotificationOptions, NotificationReactive, IconProps } from 'naive-ui'
import { setupI18n } from '@/i18n'
import { setupStore } from '@/store'
import { divineTransfer } from '@/utils/utils-transfer'

export interface ComponentResolver {
    element: HTMLElement
    app: App<Element>
    mounte: () => Promise<Omix<any>>
    unmount: (delay: number) => Promise<Omix<any>>
}

/**创建组件实例**/
export async function createComponent<T extends Omix>(Component: Parameters<typeof createApp>['0'], props: T): Promise<ComponentResolver> {
    const element = document.createElement('div')
    const app = createApp(<common-provider>{createVNode(Component, props)}</common-provider>)

    /**组件挂载**/
    async function mounte(): Promise<any> {
        return app.mount(element, true)
    }

    /**组件销毁**/
    function unmount(delay: number = 0): Promise<any> {
        return new Promise(resolve => {
            setTimeout(() => {
                app.unmount()
                return resolve(element.remove())
            }, delay ?? 0)
        })
    }

    setupI18n(app)
    setupStore(app)
    nextTick(async () => {
        await mounte()
    })

    return { element, app, mounte, unmount }
}

/**DOM生成函数**/
export async function createDOMRender<T extends Omix<{ style: CSSProperties }>>(
    Component: Parameters<typeof createApp>['0'],
    parameter?: T
) {
    const node = document.createElement('section')
    const component = createVNode(Component, parameter)
    await render(component, node)
    const element = Array.from(node.children).reduce((str: string, el) => (str += el.outerHTML), '')
    return { node, element, component }
}

/**异步返回VNode**/
export function divineRender(Component: Parameters<typeof createApp>['0']) {
    return () => createVNode(Component)
}

/**对话弹窗二次封装**/
export function divineDiscover(
    option: Omit<DialogOptions, 'onAfterEnter' | 'onAfterLeave' | 'onClose' | 'onEsc' | 'onNegativeClick' | 'onPositiveClick'> & {
        onAfterEnter?: (e: HTMLElement, x: DialogReactive) => void | any | undefined
        onAfterLeave?: (x: DialogReactive) => void | any | undefined
        onClose?: (x: DialogReactive) => boolean | Promise<boolean>
        onEsc?: (x: DialogReactive) => void | any | undefined
        onNegativeClick?: (e: MouseEvent, x: DialogReactive) => boolean | Promise<boolean>
        onPositiveClick?: (e: MouseEvent, x: DialogReactive, done: (loading: boolean) => Promise<boolean>) => boolean | Promise<boolean>
    }
): Promise<DialogReactive> {
    return new Promise(async resolve => {
        const vm = window.$dialog.create({
            ...option,
            showIcon: false,
            autoFocus: false,
            closable: option.closable,
            maskClosable: option.maskClosable ?? false,
            style: {
                '--n-padding': '16px 20px 20px',
                '--n-close-margin': '16px 16px 0 0',
                '--n-content-margin': '0px',
                '--n-close-size': '-6px'
            },
            negativeButtonProps: {
                size: 'medium',
                ghost: false,
                secondary: true,
                style: { '--n-height': '30px', '--n-padding': '0 10px' },
                ...option.negativeButtonProps
            },
            positiveButtonProps: {
                size: 'medium',
                type: 'error',
                style: { '--n-height': '30px', '--n-padding': '0 10px' },
                ...option.positiveButtonProps
            },
            onAfterEnter: async (e: HTMLElement) => {
                await divineTransfer(e)
                return option.onAfterEnter ? option.onAfterEnter(e, vm) : undefined
            },
            onAfterLeave: () => {
                return option.onAfterLeave ? option.onAfterLeave(vm) : undefined
            },
            onClose: () => {
                return option.onClose ? option.onClose(vm) : true
            },
            onEsc: () => {
                return option.onEsc ? option.onEsc(vm) : undefined
            },
            onNegativeClick: (e: MouseEvent) => {
                return option.onNegativeClick ? option.onNegativeClick(e, vm) : true
            },
            onPositiveClick: (e: MouseEvent) => {
                return option.onPositiveClick ? option.onPositiveClick(e, vm, async loading => (vm.loading = loading)) : true
            }
        } as unknown as DialogOptions)
        resolve(vm)
    })
}

/**通知弹窗二次封装**/
export function divineNotice(
    option: Omit<NotificationOptions, 'onLeave' | 'onClose' | 'onAfterLeave' | 'onAfterEnter'> & {
        duration?: number
        type?: NotificationOptions['type']
        onAfterEnter?: (x: NotificationReactive) => void | any | undefined
        onAfterLeave?: (x: NotificationReactive) => void | any | undefined
        onClose?: (x: NotificationReactive) => boolean | Promise<boolean>
        onLeave?: (x: NotificationReactive) => void | any | undefined
    }
): Promise<NotificationReactive> {
    return new Promise(resolve => {
        const vm = window.$notification.create({
            ...option,
            type: option.type ?? 'success',
            duration: option.duration ?? 2500,
            keepAliveOnHover: option.keepAliveOnHover ?? true,
            onAfterEnter: ((e: HTMLElement) => {
                return option.onAfterEnter ? option.onAfterEnter(vm) : undefined
            }) as NotificationOptions['onAfterEnter'],
            onAfterLeave: () => {
                return option.onAfterLeave ? option.onAfterLeave(vm) : undefined
            },
            onClose: () => {
                return option.onClose ? option.onClose(vm) : true
            },
            onLeave: () => {
                return option.onLeave ? option.onLeave(vm) : undefined
            }
        })
        resolve(vm)
    })
}
