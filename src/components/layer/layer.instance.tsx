import { createComponent } from '@/utils/utils-component'
import { Observer } from '@/utils/utils-observer'

/**用户信息展示**/
export async function fetchResolver(props: Omix<{ observer: Observer<Omix> }>) {
    return await import('@/components/layer/layer-resolver.vue').then(async component => {
        return await createComponent(component.default, props)
    })
}

/**图片裁剪**/
export async function fetchCropper(props: Omix<{ src?: string; fileName?: string; ratio?: number }> = {}) {
    return await import('@/components/layer/layer-cropper.vue').then(async component => {
        return await createComponent(component.default, props)
    })
}
