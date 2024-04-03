import { createComponent } from '@/utils/utils-component'

/**用户信息展示**/
export async function fetchResolver(props: Omix<{ element: HTMLElement; width: number | string }>) {
    return await import('@/components/layer/layer-resolver.vue').then(async component => {
        return await createComponent(component.default, props)
    })
}

/**用户设置**/
export async function fetchSettings(props: Omix<{ element: HTMLElement; width: number | string }>) {
    return await import('@/components/layer/layer-settings.vue').then(async component => {
        return await createComponent(component.default, props)
    })
}

/**已标注的消息**/
export async function fetchAnnotate(props: Omix<{ element: HTMLElement; width: number | string }>) {
    return await import('@/components/layer/layer-annotate.vue').then(async component => {
        return await createComponent(component.default, props)
    })
}

/**新建社群**/
export async function fetchSociety(props: Omix<{ element: HTMLElement; width: number | string }>) {
    return await import('@/components/layer/layer-society.vue').then(async component => {
        return await createComponent(component.default, props)
    })
}

/**动态**/
export async function fetchDynamic(props: Omix<{ element: HTMLElement; width: number | string }>) {
    return await import('@/components/layer/layer-dynamic.vue').then(async component => {
        return await createComponent(component.default, props)
    })
}

/**新对话**/
export async function fetchAnswer(props: Omix<{ element: HTMLElement; width: number | string }>) {
    return await import('@/components/layer/layer-answer.vue').then(async component => {
        return await createComponent(component.default, props)
    })
}
