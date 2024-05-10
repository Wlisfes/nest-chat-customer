import { createComponent } from '@/utils/utils-component'
import { Observer } from '@/utils/utils-observer'
import * as env from '@/interface/instance.resolver'

/**双因子认证**/
export async function fetchFactor(props: Omix<{ uid: string; email: string }>) {
    return await import('@/components/layer/layer-factor.vue').then(async component => {
        return await createComponent(component.default, props)
    })
}

/**图片裁剪**/
export async function fetchCropper(props: Omix<{ src?: string; fileName?: string; ratio?: number }> = {}) {
    return await import('@/components/layer/layer-cropper.vue').then(async component => {
        return await createComponent(component.default, props)
    })
}

/**账号设置**/
export async function fetchResolver(props: Omix<{ observer: Observer<Omix> }>) {
    return await import('@/components/layer/layer-resolver.vue').then(async component => {
        return await createComponent(component.default, props)
    })
}

/**用户信息**/
export async function fetchProfile(props: Omix<{ observer: Observer<Omix> }>) {
    return await import('@/components/layer/layer-profile.vue').then(async component => {
        return await createComponent(component.default, props)
    })
}

/**安全设置**/
export async function fetchSafety(props: Omix<{ observer: Observer<Omix> }>) {
    return await import('@/components/layer/layer-safety.vue').then(async component => {
        return await createComponent(component.default, props)
    })
}

/**新建社群**/
export async function fetchCommunit(props: Omix<{ observer: Observer<Omix> }>) {
    return await import('@/components/layer/layer-communit.vue').then(async component => {
        return await createComponent(component.default, props)
    })
}

/**通知设置**/
export async function fetchNotice(props: Omix<{ observer: Observer<Omix> }>) {
    return await import('@/components/layer/layer-notice.vue').then(async component => {
        return await createComponent(component.default, props)
    })
}

/**通知设置**/
export async function fetchNotification(props: Omix<{ observer: Observer<Omix>; title: string; source: env.EnumNotificationSource }>) {
    return await import('@/components/layer/layer-notification.vue').then(async component => {
        return await createComponent(component.default, props)
    })
}

/**对话设置**/
export async function fetchRespon(props: Omix<{ observer: Observer<Omix> }>) {
    return await import('@/components/layer/layer-respon.vue').then(async component => {
        return await createComponent(component.default, props)
    })
}

/**联系人申请操作**/
export async function fetchCompadre(props: Omix<{ node: env.SchemaNotification }>) {
    return await import('@/components/layer/layer-compadre.vue').then(async component => {
        return await createComponent(component.default, props)
    })
}

/**联系人申请操作**/
export async function fetchJoiner(
    props: Omix<{ observer: Observer<Omix>; title: string; placeholder: string; source: env.EnumNotificationSource }>
) {
    return await import('@/components/layer/layer-joiner.vue').then(async component => {
        return await createComponent(component.default, props)
    })
}
