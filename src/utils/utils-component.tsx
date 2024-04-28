import { createApp, createVNode, nextTick, render, App, CSSProperties, VNode } from 'vue'
import { DialogOptions, DialogReactive, NotificationOptions, NotificationReactive, IconProps } from 'naive-ui'
import { setupI18n } from '@/i18n'
import { setupStore } from '@/store'
import { divineWherer, divineHandler } from '@/utils/utils-common'
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
    option: Pick<DialogOptions, 'type' | 'content' | 'title' | 'closable' | 'negativeText' | 'positiveText'> & {
        icon?: VNode
        onAfterEnter?: (e: HTMLElement, x: DialogReactive) => any
        onClose?: (x: DialogReactive) => boolean | Promise<boolean>
        onNegativeClick?: (e: MouseEvent, x: DialogReactive) => boolean | Promise<boolean>
        onPositiveClick?: (e: MouseEvent, x: DialogReactive, done: (loading: boolean) => Promise<boolean>) => boolean | Promise<boolean>
    }
): Promise<DialogReactive> {
    return new Promise(async resolve => {
        const closable = option.closable ?? true
        const vm = window.$dialog.create({
            ...option,
            closable,
            showIcon: false,
            autoFocus: false,
            maskClosable: false,
            title: function render() {
                console.log(option)
                if (!option.title) return undefined
                return (
                    <n-element class="n-chunk n-auto n-disover" style={{ columnGap: '10px' }}>
                        {option.icon && (
                            <div class="n-chunk n-center" style={{ height: '28px' }}>
                                <n-icon size={26} color="var(--error-color)" component={<Iv-BsMistake />}></n-icon>,
                            </div>
                        )}
                        <div class="n-chunk n-column n-auto n-disover">
                            <n-text style={{ fontSize: '18px', lineHeight: '28px', fontWeight: 500 }}>
                                确定要登出吗确定要登出吗确定要登出吗
                            </n-text>
                        </div>
                    </n-element>
                )
            },
            class: 'divineDiscover',
            style: {
                '--n-padding': '20px',
                '--n-close-margin': '16px 16px 0 0',
                '--n-content-margin': '0px',
                '--n-close-size': '-6px'
            },
            negativeButtonProps: {
                size: 'medium',
                ghost: false,
                secondary: true,
                style: { '--n-height': '30px', '--n-padding': '0 10px' }
            },
            positiveButtonProps: {
                size: 'medium',
                type: 'error',
                style: { '--n-height': '30px', '--n-padding': '0 10px' }
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
