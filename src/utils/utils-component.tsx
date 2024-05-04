import { createApp, createVNode, nextTick, render, App, CSSProperties, VNode } from 'vue'
import { DialogOptions, DialogReactive, NotificationOptions, NotificationReactive } from 'naive-ui'
import { setupI18n } from '@/i18n'
import { setupStore } from '@/store'
import { isEmpty } from 'class-validator'
import { divineWherer, divineHandler, divineDelay } from '@/utils/utils-common'
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
    const app = createApp(<common-provider>{createVNode(Component, { ...props, onSubmit, onClose })}</common-provider>)

    /**组件挂载**/
    async function mounte(): Promise<any> {
        return app.mount(element, true)
    }

    /**组件销毁**/
    async function unmount(delay: number = 0): Promise<any> {
        return await divineDelay(delay, () => {
            app.unmount()
            return element.remove()
        })
    }

    /**组件关闭事件**/
    async function onClose(scope: Omix) {
        return await divineHandler(Boolean(props.onClose), {
            handler: () => {
                return props.onClose!({ ...scope, unmount })
            }
        })
    }

    /**组件提交表单事件**/
    async function onSubmit(scope: Omix) {
        return await divineHandler(Boolean(props.onSubmit), {
            handler: () => {
                return props.onSubmit!({ ...scope, unmount })
            }
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
    option: Pick<
        DialogOptions,
        'type' | 'style' | 'closable' | 'negativeText' | 'positiveText' | 'negativeButtonProps' | 'positiveButtonProps'
    > & {
        title?: string | VNode
        content?: string | VNode
        icon?: 'BsMistake' | 'BsCorrect' | VNode
        onAfterEnter?: (e: HTMLElement, x: DialogReactive) => any
        onClose?: (x: DialogReactive) => boolean | Promise<boolean>
        onNegativeClick?: (e: MouseEvent, x: DialogReactive) => boolean | Promise<boolean>
        onPositiveClick?: (e: MouseEvent, x: DialogReactive, done: (loading: boolean) => Promise<boolean>) => boolean | Promise<boolean>
    }
): Promise<DialogReactive> {
    return new Promise(async resolve => {
        const vm = window.$dialog.create({
            showIcon: false,
            autoFocus: false,
            maskClosable: false,
            type: option.type ?? 'default',
            closable: option.closable,
            negativeText: option.negativeText,
            positiveText: option.positiveText,
            title: function render() {
                if (isEmpty(option.title)) {
                    return undefined
                } else if (typeof option.title === 'string') {
                    return <done-title content={option.title} icon={option.icon} type={option.type ?? 'default'}></done-title>
                }
                return (
                    <done-title icon={option.icon} type={option.type ?? 'default'}>
                        {option.title}
                    </done-title>
                )
            },
            content: function render() {
                if (isEmpty(option.content)) {
                    return undefined
                } else if (typeof option.content === 'string') {
                    return <done-content content={option.content} show-icon={Boolean(option.icon)}></done-content>
                }
                return <done-content show-icon={Boolean(option.icon)}>{option.content}</done-content>
            },
            style: {
                '--n-padding': '20px 24px 24px',
                '--n-close-margin': '16px 16px 0 0',
                '--n-content-margin': '0px',
                '--n-close-size': divineWherer(option.closable ?? true, '22px', '-6px'),
                display: 'flex',
                flexDirection: 'column',
                rowGap: '10px',
                ...((option.style ?? {}) as Omix<CSSProperties>)
            },
            negativeButtonProps: {
                size: 'medium',
                ghost: false,
                secondary: true,
                style: { '--n-height': '32px', '--n-padding': '0 10px', 'min-width': '80px' },
                ...option.negativeButtonProps
            },
            positiveButtonProps: {
                size: 'medium',
                type: 'error',
                style: { '--n-height': '32px', '--n-padding': '0 10px', 'min-width': '80px' },
                ...option.positiveButtonProps
            },
            onAfterEnter: async (e: HTMLElement) => {
                return await divineHandler(Boolean(option.onAfterEnter), {
                    handler: async () => {
                        await divineTransfer(e)
                        return await option.onAfterEnter!(e, vm)
                    },
                    failure: async () => {
                        return await divineTransfer(e)
                    }
                })
            },
            onClose: async function onClose() {
                return await divineHandler(Boolean(option.onClose), {
                    handler: () => option.onClose!(vm),
                    failure: () => true
                })
            },
            onEsc: async function onEsc() {
                return await divineHandler(Boolean(option.onClose), {
                    handler: () => option.onClose!(vm),
                    failure: () => true
                })
            },
            onNegativeClick: async function onNegativeClick(e: MouseEvent) {
                return await divineHandler(Boolean(option.onNegativeClick), {
                    handler: () => option.onNegativeClick!(e, vm),
                    failure: () => true
                })
            },
            onPositiveClick: async function onPositiveClick(e: MouseEvent) {
                return await divineHandler(Boolean(option.onPositiveClick), {
                    handler: () => option.onPositiveClick!(e, vm, async loading => (vm.loading = loading)),
                    failure: () => true
                })
            }
        } as unknown as DialogOptions)
        return await resolve(vm)
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
