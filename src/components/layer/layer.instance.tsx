import { createComponent } from '@/utils/utils-component'

/**用户信息展示**/
export async function fetchResolver(props: Omix<{ element: HTMLElement; width: number | string }>) {
    return await import('@/components/layer/layer-resolver.vue').then(async component => {
        return await createComponent(component.default, props)
    })
}
